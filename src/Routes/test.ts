import { Router } from 'express';

export type testResponse = {
  message: string;
};

export type testRequest = {
  $message: string;
  guid: number;
};

export class test {
  public baseRoute: string;
  public router: Router;
  public static schemas: string[] = ['testResponse', 'testRequest'];

  constructor() {
    this.baseRoute = '/';
    this.router = Router();

    this.router.get('/test', (req, res) => {
      // #swagger.tags = ['test']

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
      const response: testResponse = { message: 'working' };
      res.send(response);
    });

    this.router.get('/test2', (req, res) => {
      // #swagger.tags = ['test']

      /* #swagger.responses[200] = {
                        description: "a new test",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#components/schemas/testResponse"
                                }  
                            }           
                        }
                    }   
                */
      res.send({ message: 'new test' });
    });

    this.router.post('/test', (req, res) => {
      // #swagger.tags = ['test']

      /* #swagger.requestBody = {
            required: false,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/testRequest" },
                    example: { 
                        message: "this is a message string"
                    }
                }
            }
        }
    */

      res.status(200).send('okay');
    });
  }
}
