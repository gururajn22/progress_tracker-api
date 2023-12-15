import express from 'express';
import { user } from '../models/userMode.js';
export const router=express.Router();

// router.get("/",(req,res)=>{
// return res.json({msg:"working"})
// })

//to create the data in the database

router.post("/",async(req,res)=>{
    try{
        if(!req.body.title||!req.body.description||!req.body.status){
            return res.status(400).json({msg:"pls enter all the fields"})
        }
        const newData=await user.create({
            title:req.body.title,
            description:req.body.description,
            status:req.body.status
        })
        return res.status(201).json(newData)
    }catch(error){
        return res.status(500).json({msg:error.message});
    }
})

//to delete the data in the database
//  mongoose.Types.ObjectId.isValid(id)
router.delete("/:id",async(req,res)=>{
    try{ 
        const {id}=req.params;
        if(!id){
            return res.status(400).json({msg:"pls enter the valid id"});
        }
        const deleteData=await user.findByIdAndDelete(id);
        if(!deleteData){
            return res.status(404).json({msg:"data not found"});
        }
        return res.status(200).json({msg:"deleted successfully"});

    }catch(error){
        return res.status(500).json({msg:error.message});
    }
})

//to update the data in the database
router.put("/:id",async(req,res)=>{
    try{
        if(!req.body.title || !req.body.description|| !req.body.status){
            return res.status(400).send({msg:"all field are required"});
         }
      const {id}=req.params;
      const result=await user.findByIdAndUpdate(id,req.body);
      if(!result){
        return res.status(404).json({msg:"pls enter valid id"})
      }
      return res.status(200).json({msg:"data updated successfully"});
    }catch(error){
        return res.status(500).json({msg:error.message});
    }
})


//to get all data in the database
router.get("/",async(req,res)=>{
        try{
           const findData=await user.find({});
           return res.status(201).json({
              count : findData.length,
              data : findData
           });
        }
        catch(error){
          return res.status(500).send({msg:"error"});
        }
})

//to get the particular id get request

router.get("/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await user.findById(id);
        if(!result){
            return res.status(404).json({msg:"pls enter valid id"})
    }
    return res.status(200).json(result);
}
 
    catch(error){
        return res.status(500).json({msg:error.message});
    }
})