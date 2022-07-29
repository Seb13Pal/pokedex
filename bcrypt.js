import bcrypt from "bcrypt"
const saltRounds = process.env.SALT_ROUND;
let pass = async function (password) {
  let salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(password, salt)
}
let comparePass = async function (plainPass, hashPass) {
  let compare = bcrypt.compare(plainPass, hashPass)
  return compare
}
export { comparePass }
export { pass }

