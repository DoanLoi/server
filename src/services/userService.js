import UserModel from "../models/userModel"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const saltRounds=8;
const createUser=(phone,password)=>{
  return new Promise(async(resolve,reject)=>{
  
    try {
      let findUser=await UserModel.findByPhone(phone);
      if(findUser){
        reject('Số điện thoại đã được đăng kí');
      }
      else{
      let hashPassword=await bcrypt.hash(password, saltRounds);
      const item={
        phone:phone,
        password:hashPassword
      }
      const user=await UserModel.createNew(item);
      let token=jwt.sign({user},process.env.MY_SECRET);
      resolve(token);
      }
      
    } catch (error) {
      reject(error);
    }
  })
 
 

}
const findUser=(phone,password)=>{
  return new Promise(async(resolve,reject)=>{
    try {
      let findUser=await UserModel.findByPhone(phone);
      
      if(!findUser){
        reject('Số điện thoại chưa được đăng ký');
      }else{
        findUser=findUser.toObject();
        let checkPassword=await bcrypt.compare(password,findUser.password);
        if(checkPassword){
          let token=jwt.sign(findUser,process.env.MY_SECRET);
          resolve(token);
        }
        else reject('Mật khẩu không chính xác');
      }
    } catch (error) {
      console.log(error)
    }
  })
}
export default {
  createUser:createUser,
  findUser:findUser
}