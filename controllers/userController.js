import pool from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


const getUsers = async (req,res)=>{
    const [rows]= await pool.query("SELECT * FROM users");
    res.json(rows);
}

const getById = async(req,res)=>{
    const [rows] = await pool.query("SELECT * FROM users WHERE id =?",[req.params.id]);
    res.json(rows);
}

const createUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
       const [rows]= await pool.query("SELECT * FROM users WHERE email= ?",[email]);
       if(rows.length >0){
        return res.json({success:false, message:"User already exists with this email"})
       }
       if(!validator.isEmail(email)){
         return res.json({success:false, message:"Enter valid email"});
       }
       if(password.length< 8){
        return res.json({success:false,message:"Enter a strong password"});
       }
       // if everything is valid, then hash the password;
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);
       const [result] = await pool.query("INSERT INTO users(name,email,password) VALUES(?,?,?)",[name,email,hashedPassword]);
       const token = createToken(result.insertId);

       res.json({success:true, id:result.insertId, token});
    } catch (error) {
        console.log(error);
        res.json({success:false, error:error.message})
    }
};

const updateUser = async(req,res)=>{
    const{name,email,age} = req.body;
    await pool.query("UPDATE users SET name = ?, email=? ,age=? WHERE id=? ",[name,email,age,req.params.id]);
    res.json({message:"User updated"})
};

const deleteUser = async (req, res) => {
    await pool.query("DELETE FROM users WHERE id=?", [req.params.id]);
    res.json({ message: "User deleted" });
};

export{getUsers,createUser,getById,updateUser,deleteUser}
