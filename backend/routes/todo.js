const express = require('express');
const router=express.Router();


const { PrismaClient } = require('@prisma/client');
const verifyUser = require('../middleware/verify');
const prisma = new PrismaClient();

router.use(verifyUser)  // verify that the user is loged in

router.post('/create',async(req,res)=>{
    try {
        const body=req.body;
        const todo = await prisma.todo.create({
            data: {
            title: body.title,
            description: body.description,
            userId: req.userId,
            },
        });
        res.status(200).json({
            "Message":"Todo Created",
            todo
        })
    } catch (error) {
        console.log(error,"Error Occured");
        res.status(400).json({
            message: 'Error Occured'
          });
        
    }   
    
})

router.delete('/delete',async(req,res)=>{
    try {
        const {todoId}=req.query;
        const todo=await prisma.todo.delete({
            where:{
                id:todoId,
                userId:req.userId
            }
        })
        res.status(200).json({
            "Message":"Todo Deleted",
            todo
        })
    } catch (error) {
        // console.log(error,"Todo id may be wrong");
        res.status(400).json({
            message: 'Todo id may be wrong'
          });
        
    }
    
})

router.patch('/update', async (req, res) => {
    try {
      const { todoId } = req.query; // Get todoId from query parameters
      const { title, description, isCompleted } = req.body; // Get task details from request body
  
      // Validate that required fields are provided
      if (!todoId || !title || !description) {
        return res.status(400).json({
          message: 'Missing required fields: todoId, title, and description',
        });
      }
  
      // Update the todo in the database
      const updatedTodo = await prisma.todo.update({
        where: {
          id: todoId,
          userId: req.userId, // Ensure the user can only update their own todos
        },
        data: {
          title: title,          // Update title
          description: description,  // Update description
          isCompleted: isCompleted !== undefined ? isCompleted : false, // Update completion status (optional)
        },
      });
  
      // Respond with the updated todo
      res.status(200).json({
        message: 'Todo updated successfully',
        updatedTodo,
      });
    } catch (error) {
      console.error(error, 'Error updating todo');
      res.status(400).json({
        message: 'Error updating todo, please check the provided todoId and userId',
      });
    }
  });
  

router.patch('/marktrue', async (req, res) => {
    try {
        const { todoId } = req.query;

        // Find the current value of isCompleted
        const currentTodo = await prisma.todo.findUnique({
            where: {
                id: todoId,
            },
        });

        // If todo does not exist, send a 404 response
        if (!currentTodo || currentTodo.userId !== req.userId) {
            return res.status(404).json({
                message: 'Todo not found or you are not authorized',
            });
        }

        // Toggle the value of isCompleted
        const updatedTodo = await prisma.todo.update({
            where: {
                id: todoId,
            },
            data: {
                isCompleted: !currentTodo.isCompleted,
            },
        });

        // Send the response
        res.status(200).json({
            message: `Todo updated. isCompleted is now ${updatedTodo.isCompleted}`,
            todo: updatedTodo,
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(400).json({
            message: 'An error occurred while toggling isCompleted',
        });
    }
});

router.get('/showtodos',async(req,res)=>{
    try {
        const todos=await prisma.todo.findMany({
            where:{
                userId:req.userId
            }
        })
        res.status(200).json({
            Message:"All todos fetched",
            count:todos.length,
            todos
        })
    } catch (error) {
        // console.log(error,"some problem occured while fetching all the todos of the user");
        res.status(400).json({
            message: 'some problem occured while fetching all the todos of the user'
          });
        
    }
})

router.delete('/deleteallguest',async(req,res)=>{
    try {
        // const { userId } = req.query;
        const todo=await prisma.todo.deleteMany({
            where:{
                userId:req.userId
            }
        })
        res.status(200).json({
            "Message":"ALL guest Todos Deleted",
            todo,
            userid:req.userId
        })
    } catch (error) {
        // console.log(error,"Todo id may be wrong");
        res.status(400).json({
            message: 'Todo id may be wrong'
          });
        
    }
    
})




















module.exports=router