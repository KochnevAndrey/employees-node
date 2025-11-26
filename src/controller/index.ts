import express from 'express';
import { PortServer,WrongOperationError } from '../middleware/Parsing';
import morgan from 'morgan'

//TODO required middleware

const port = PortServer;
const app = express();
app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.json());
app.use(morgan('tiny'));


//TODO for app listening

//GET employee
app.get("...", (req, res)=>{
    //TODO
})
//Add new employee
app.post("...", (req, res)=>{
    //TODO
})
//delete employee
app.delete("...", (req, res)=>{
    //TODO
})
//update employee
app.patch("...", (req, res)=>{
    //TODO
})