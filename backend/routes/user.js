const express = require('express');
const router=express.Router();


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getJwt = require('../controller/getjwt');


router.post('/signup',async(req,res)=>{
    try {
        const body=req.body;
        const user = await prisma.user.create({
            data: {
            name: body.name,
            email: body.email,
            password: body.password, 
            },
        });
        const token =getJwt(user.id);
        user.password=null;
        res.status(200).json({
            "Message":"User Created",
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
router.post('/signin',async(req,res)=>{
    try {
        const body=req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            },
            include: {
                todos: true,
            },
        });
        const token =getJwt(user.id);
        user.password=null;
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