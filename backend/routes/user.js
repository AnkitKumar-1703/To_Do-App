const express = require('express');
const router=express.Router();
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getJwt = require('../controller/getjwt');
const { checkPassword } = require('../controller/checkPassword');


router.post('/signup',async(req,res)=>{
    try {
        const body=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(body.password,salt);
        const user = await prisma.user.create({
            data: {
            name: body.name,
            email: body.email,
            password: hashedPassword, 
            },
        });
        const token =getJwt(user.id);
        // user.password=null;
        res.status(200).json({
            "Message":"User Created",
            token,
            user
        })
    } catch (error) {
        // console.log(error,"Error Occured");
        res.status(400).json({
            message: 'Error Occured may be email already exist'
          });
        
    }   
    
})
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