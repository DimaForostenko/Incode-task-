const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcrypt');
const {validationResult}=require(express-validator);
const jwt=require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken =(id,role)=>{
    const payload={
      id,
      role
    }
    return jwt.sign(payload,secret,{expiresIn:24})
}

class authController{
   async registration(req, res){
      try{   
        const error = validationResult(req)
        if(!error.isEmpty()){
          return res.status(400).json("Помилка при рєєстрацій")
        }
        const { username, password} = req.body;
        const candidate = await User.findOne({username})
        if(candidate){
          return res.status(400).json({message:"Користувач з таким ім'ям  вже існує"})
        }
        const hashPassword = bcrypt.hashSync(password, 5);
        const userRole= await Role.findOne({value:'user'}) ;
        const user = new User({username,password:hashPassword,roles:[userRole.value]});
        await user.save();
        const adminRole= await Role.findOne({value:'admin'}) ;
        const admin = new User({username,password:hashPassword,roles:[adminRole.value]});
        await admin.save();
        const bossRole= await Role.findOne({value:'boss'}) ;
        const boss = new User({username,password:hashPassword,roles:[bossRole.value]});
        await boss.save();
        return res.json({message:"Новий користувач зареестрованний"})

      }catch(e){
        console.log(e)
        res.status(400).json({message:'registration error'})
      }         
   }
  
   async login(req, res){
      try{
             const {username,password}=req.body;
             const user = await User.findOne({username})
             if(!user){
              return res.status(400).json({message:`Користувач ${username} не знайдено` })
             }
             const validPassword=bcrypt.compareSync(password,user.password);
             if(!validPassword){
              return res.status(400).json({message:'Введено не вірний пароль'})
             }
             const token=generateAccessToken(user._id,user.roles)
             return res.json({token})
      }catch(e){
        console.log(e)
        res.status(400).json({message:'login error'})
      }
   }

   async getUsers(req, res){
       try{
        const { id, role } = req.user;

        if (role === 'admin') {
          const users = await User.find();
          return res.json(users);
        } else if (role === 'boss') {
          const user = await User.findById(id);
          const subordinateIds = this.getSubordinateIds(user);
          const users = await User.find({ $or: [{ _id: id }, { managerId: { $in: subordinateIds } }] });
          return res.json(users);
        } else if (role === 'user') {
          const user = await User.findById(id);
          return res.json([user]);
          }
        }catch(e){
        console.log(e)
      }
   }
  }


module.exports =new authController;