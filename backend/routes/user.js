const express = require('express');
const router=express.Router();
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getJwt = require('../controller/getjwt');
const { checkPassword } = require('../controller/checkPassword');


router.post('/signup', async (req, res) => {
    try {
        const body = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' }); // 409 Conflict
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        // Create new user
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = getJwt(user.id);

        res.status(200).json({
            message: 'User Created',
            token,
            user,
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});
router.post('/signin',async(req,res)=>{
    try {
        const body=req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                // password: body.password,
            },
            include: {
                todos: true,
            },
        });
        const isPasswordCorrect = await checkPassword(body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Wrong Password',
            });
        }
        const token =getJwt(user.id);
        // user.password=null;
        res.status(200).json({
            "Message":"User Found",
            token,
            user
        })
    } catch (error) {
        // console.log(error,"Error Occured");
        res.status(400).json({
            message: 'Error Occured'
          });
        
    }   
    
})













module.exports=router