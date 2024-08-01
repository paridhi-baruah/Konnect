import express from 'express';
import {getAllUsers,deleteUser, followUser, getUser, updateUser,unfollowUser} from '../Controllers/UserController.js';
import AuthMiddleware from '../AuthMiddleware/AuthMiddleware.js';

const router=express.Router();

router.get('/',getAllUsers);
router.get('/:id',getUser);
router.put('/:id',updateUser);
router.delete('/:id',AuthMiddleware,deleteUser);
router.put('/:id/follow',AuthMiddleware,followUser);
router.put('/:id/unfollow',AuthMiddleware,unfollowUser);
export default router;
