import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan'
import 'dotenv/config'
import { EmployeeAlreadyExistsError, EmployeeNotFoundError } from '../service/EmployeesServiceMap.ts';
import { Employee } from '../model/Employee.ts';
import service from '../service/EmployeesServiceMap.ts';
import { EmployeeSchema } from '../middleware/Validation/Schemas.ts';
import Validation from '../middleware/Validation/Validation.ts';
import { getRandomEmployee, getRandomEmployees } from '../utils/sevice-helpers.ts';
import { errorsHandler } from '../middleware/Errors-Handling/handler.ts';


const {PORT, MORGAN_FORMAT, SKIP_CODE_THRESHOLD} = process.env;
const port = PORT || 3500;

const morganFormat = MORGAN_FORMAT ?? 'tiny';
const skipCodeThreshold = SKIP_CODE_THRESHOLD ?? 404;

const app = express();
const server = app.listen(port, () => console.log(`server is listening on port ${port}`));

app.use(express.json());
app.use(morgan(morganFormat,{skip : (_, res) => res.statusCode < +skipCodeThreshold}));

app.get("/employees", (req, res)=>{
    res.json(service.getAll(req.query.department as string))
})

app.post("/employees", Validation(EmployeeSchema), (req, res) => {
    res.json(service.addEmployee(req.body as Employee))
})

app.delete("/employees/:id",(req, res) => {
    res.json(service.deleteEmployee(req.params.id))
})

app.patch("/employees/:id", Validation(EmployeeSchema.partial()),
  (req, res) => {
    res.json(service.updateEmployee(req.params.id, req.body));
  }
);

app.use(errorsHandler)

function shutdown() {
    server.close(() => {
    console.log("server closed");
    service.save();
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

if (process.env.NODE_ENV !== "production") {
    if(service.getAll().length === 0) {
        const employees = getRandomEmployees();
        employees.forEach(empl => service.addEmployee(empl));
    }
}