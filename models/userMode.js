import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    }
},
{
    timestamps: true
})

 export const user=mongoose.model('users',userSchema);