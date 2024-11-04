const jwt=require("jsonwebtoken")

function verifytoken(req,res,next){
    console.log(req.headers)

    if(req.headers.authorization!==undefined){
        let token=req.headers.authorization.split(' ')[1];
        jwt.verify(token,"nesarakey",(err,data)=>{
            if(!err){
                next();
            }
            else{
                res.status(403).send({message:"Invalid Token"})
            }
        })
    }
    else{
        res.send({message:"please send a token"})
    }
}

module.exports=verifytoken;