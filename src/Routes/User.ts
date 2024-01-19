import { Router } from 'express';
import { Database } from '../Database';

export type userResponse = {
  username: string;
};

export class User {
  public baseRoute: string;
  public router: Router;
  public static schemas: string[] = ['userResponse'];

  constructor() {
    this.baseRoute = '/';
    this.router = Router();

    this.router.get('/user/:username', async (req, res) => {
      // #swagger.tags = ['User Managment']

      /* #swagger.responses[200] = {
                description: "Returns a specific user and their lists",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/userResponse"
                        },
                        example: { 
                            username: "JonDoe"
                        }
                    }           
                }
            }  
        */

      try {
        const user = await Database.Instance.endpoints['users'].findAll({
          where: { username: req.params.username },
          attributes: ['username'],
        });
        res.status(200).send(user);
      } catch (error) {
        res.status(400).send(error);
      }
    });
  }
}
