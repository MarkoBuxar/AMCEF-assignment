import { Router } from 'express';
import { Database } from '../Database';

export type userResponseArray = {
  users: userResponse[];
};

type userResponse = {
  username: string;
};

export class Users {
  public baseRoute: string;
  public router: Router;
  public static schemas: string[] = ['userResponseArray'];

  constructor() {
    this.baseRoute = '/';
    this.router = Router();

    this.router.get('/users', async (req, res) => {
      // #swagger.tags = ['User Managment']

      // schema should be array of objects. dunno how to do that properly yet so Im gonna spend my time elsewhere

      /* #swagger.responses[200] = {
                description: "Returns all users and their lists",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/userResponseArray"
                        },
                        example: [{ 
                            username: "JonDoe"
                        }]
                    }           
                }
            }  
        */

      try {
        const users = await Database.Instance.endpoints['users'].findAll({
          attributes: ['username'],
        });
        res.status(200).send(users);
      } catch (error) {
        res.status(400).send(error);
      }
    });
  }
}
