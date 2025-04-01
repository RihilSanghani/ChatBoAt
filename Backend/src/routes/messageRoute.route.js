import express from 'express';
import { protectedUser } from '../middleware/auth.middleware.js';
import { getAllMessages, getAllUsersForSideBar, sendMessages } from '../controller/message.controller.js';

const route = express.Router();

route.get('/getusers',protectedUser,getAllUsersForSideBar );
route.get('/:id',protectedUser,getAllMessages );
route.get('/send/:id',protectedUser,sendMessages );

export default route;