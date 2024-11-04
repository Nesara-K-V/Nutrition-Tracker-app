const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const userModel= require("./models/userModel")
const foodModel= require("./models/foodModel")
const verifytoken=require("./verifytoken")
const trackingModel=require("./models/trackingModel")


mongoose.connect("mongodb://localhost:27017/nutrify")
.then(()=>{
    console.log("database connection succesful")
})
.catch((err)=>{
    console.log(err)
})

const app=express();

app.use(express.json());
app.use(cors())

app.post('/register', (req,res)=>{
    let user=req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        if(!err){
            bcrypt.hash(user.password,salt,async (err,hpass)=>{
                if(!err){
                    user.password=hpass;
                    try{
       
                        let doc= await userModel.create(user);
                        res.status(201).send({message:"User Registration Successful"})
                    }
                    catch(err){
                        console.log(err);
                        res.status(500).send({message:"Some problem"})
                    }
                }
            })
        }
    })

})

app.post('/login',async (req,res)=>{
    const userCred=req.body;

    try{
        const user=await userModel.findOne({email:userCred.email});
        if(user!=null){
            bcrypt.compare(userCred.password,user.password,(err,success)=>{
                if(success==true){
                    jwt.sign({email:userCred.email},"nesarakey",(err,token)=>{
                        if(!err){
                            res.send({message:"Login succesful",token:token,name:user.name,
                                userid:user._id})
                        }
                    })
                }
                else{
                    res.status(403).send({message:"Invalid passoword"})
                }
            })
        }
        else{
            res.status(404).send({message:"User Not Found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Some Problem"})
    }
    
})

app.get('/foods',verifytoken,async (req,res)=>{
    try{
        let food=await foodModel.find();
        res.send(food);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"some problem"})
    }
})

app.get('/foods/:name',verifytoken,async (req,res)=>{
    try{
        let foods=await foodModel.find({name:{$regex:req.params.name,$options:'i'}})
        if(foods.length!=0){
            res.send(foods)
        }
        else{
            res.status(404).send({message:"Food Item Not Found"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:"Some problem in getting the food"})
    }
})

// endpoint to track food
app.post('/track',verifytoken,async (req,res)=>{
    let trackData=req.body;
    console.log(trackData)
    try{
        let data=await trackingModel.create(trackData);
        res.status(201).send({message:"Food Added"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Some Problem"});
    }
})

// endpoint to fetch all food items eaten by a person
app.get('/track/:userid/:date',verifytoken,async(req,res)=>{
    let userid=req.params.userid;
    let date=new Date(req.params.date);
    let strDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

    try{
        let foods=await trackingModel.find({userID:userid,eatenDate:strDate}).populate('userID').populate('foodID');
        res.send(foods)
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:"Some Problem in getting the food"})
    }
})

app.listen(8000,()=>{
    console.log("Server is up")
})