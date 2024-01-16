import {Router} from 'express';

export type testResponse = {
    message: string;
}

export type testRequest = {
    $message: string, 
    guid: number
}


export class test {
    public baseRoute: string;
    public router: Router;
    public static schemas: string[] =  ["testResponse", "testRequest"];

    constructor() {
        this.baseRoute = "/";
        this.router = Router();

        this.router.get("/test", (req, res) => {


            /* #swagger.responses[200] = {
                    description: "Some description...",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#components/schemas/testResponse"
                            }  
                        }           
                    }
                }   
            */


            const response: testResponse = {message: "working"};
            res.send(response);




        });
    }
}


