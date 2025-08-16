import pool from '../db.js'

const getUsers = async (req,res)=>{
    const [rows]= await pool.query("SELECT * FROM users");
    res.json(rows);
}

const getById = async(req,res)=>{
    const [rows] = await pool.query("SELECT * FROM users WHERE id =?",[req.params.id]);
    res.json(rows);
}

const createUser = async(req,res)=>{
    const {name,email,age} = req.body;
    const [result] = await pool.query("INSERT INTO users(name,email,age) VALUES(?,?,?)",[name,email,age]);
    res.json({id:result.insertId, name,email,age});
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
