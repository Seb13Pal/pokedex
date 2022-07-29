import userModels from "./models/userModels.js";

let authguard = async function (req,res,next) {
    let user = await userModels.findOne({_id: req.session.user})
    if (user) {
        console.log(user);
        next()
    }else{
        res.redirect('/connection')
    }
}
export default authguard