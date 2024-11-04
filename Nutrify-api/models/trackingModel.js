const mongoose=require('mongoose');

const trackingSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    foodID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'foods',
        required:true
    },
    details:{
        type:Object,
        required:true
    },
    eatenDate:{
        type:String,
        default:new Date().toLocaleDateString(),
        required:true

    },
    quantity:{  
        type:Number,
        min:1,
        required:true
    }
},{timestamps:true})

const trackingModel=mongoose.model('trackings',trackingSchema);

module.exports=trackingModel;