import 'dotenv/config'

export class PortServer{
    port = process.env.PORT || 3500;
}


export class WrongOperationError extends Error {
    constructor(message: string) {
       super(message)
       Object.setPrototypeOf(this, WrongOperationError.prototype);
    }
}