import userModels from "../models/userModels.js";
import { comparePass, pass } from '../bcrypt.js'
export class userController {
    
    static async connection(req) {
        let user = await userModels.findOne({ mail: req.body.mail });
        if (user) {
            if (await comparePass(req.body.password, user.password)) {
                return user
            }
        }
        return null
    }
}
export default userController
