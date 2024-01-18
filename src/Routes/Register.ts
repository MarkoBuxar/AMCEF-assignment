import { Router } from 'express';
import { Database } from '../Database';

export type registerResponse = {
  message: string;
  username: string;
};

export type registerRequest = {
  $username: string;
  $password: string;
};

export class Register {
  public baseRoute: string;
  public router: Router;
  public static schemas: string[] = ['registerRequest', 'registerResponse'];

  constructor() {
    this.baseRoute = '/';
    this.router = Router();

    this.router.post('/register', async (req, res) => {
      // #swagger.tags = ['User Managment']

      /* #swagger.responses[200] = {
                description: "Returns confirmation and username",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/registerResponse"
                        },
                        example: {
                            message: "User successfully created", 
                            username: "JonDoe"
                        } 
                    }           
                }
            }   
        */

      /* #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/registerRequest" },
                        example: {
                                username: "Jon",
                                password: "Doe"
                        }
                    }
                }
            }
        */

      try {
        await Database.Instance.endpoints['users'].create(req.body);
        res.status(200).send({
          message: 'User successfully created',
          username: req.body.username,
        });
      } catch (error) {
        res.status(400).send(error);
      }
    });
  }
}
