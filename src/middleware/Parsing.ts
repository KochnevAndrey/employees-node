import { NextFunction, Request,Response } from "express";

export function Validation(req: Request & {error: Error}, res: Response, next: NextFunction){
    let obj: any = req.body;
    if (!req.body) {
        return res.status(400).send("Request body is missing or empty.");
    }
    dataValidation(obj);
    obj.salary = +obj.salary
    next();
}

function dataValidation(parsedData: any): void {
   if (!parsedData.fullName || typeof parsedData.fullName != "string") {
      throw new Error("field fullName of 'string' type must exist")
   }

   if (!parsedData.avatar || typeof parsedData.avatar != "string") {
      throw new Error("field avatar of 'string' type must exist")
   }

   if (!parsedData.department || typeof parsedData.department != "string") {
      throw new Error("field department of 'string' type must exist")
   }

   if (!parsedData.birthDate || typeof parsedData.birthDate != "string") {
      throw new Error("field birthDate of 'string' type must exist")
   }

   if (isNaN(Number(parsedData.salary))) {
      throw new Error("field salary of 'number' type must exist")
   }
}
