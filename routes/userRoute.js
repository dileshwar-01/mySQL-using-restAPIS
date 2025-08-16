import express from "express";
import { getUsers,createUser,getById,updateUser,deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/getall',getUsers)
userRouter.get('/get/:id',getById)
userRouter.post('/create',createUser);
userRouter.put('/update/:id',updateUser);
userRouter.delete('/delete/:id',deleteUser);

export default userRouter;