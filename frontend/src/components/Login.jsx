import { useState,useContext} from "react";
import { UserContext } from "../context/UserContext";
import {Link,useNavigate} from "react-router-dom";


export default function Login(){

    const loggedInData=useContext(UserContext);

    const navigate=useNavigate();
    

    const [userCred,setuserCred]=useState({
        email:"",
        password:""
    })
    const [message,setmessage]=useState({
        type:"invisible-msg",
        text:"dummy"
    })

    function handleInput(event){
        
        setuserCred((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value}
        })

        
    }

    function handleSubmit(event){
        event.preventDefault();
        
        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(userCred),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>{
            if(res.status===404){
                setmessage({type:"error",text:"Username Does not Exist"});
            }
            else if(res.status===403){
                setmessage({type:"error",text:"Incorrect Password"});
            }
            
            setTimeout(() => {
                setmessage({type:"invisible-msg",text:"dummy"})
            }, 5000);

            return res.json();

            })
        .then((data)=>{
            
            if(data.token!==undefined){
                localStorage.setItem("nutrify-item",JSON.stringify(data));
                loggedInData.setuserLogged(data)
                navigate("/track");
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    return (
       <section className="container">
           <form className="form" onSubmit={handleSubmit}> 
               <h1>Login to Fitness </h1>
               
               <input className="inp" type="email" required onChange={handleInput} 
               placeholder="Enter your email-id" name="email" value={userCred.email}/>
               <input className="inp"  type="password" required onChange={handleInput}
               placeholder="Enter password" name="password" value={userCred.password}/>
               
               <button className="btn">Join</button>
               <p>Dont have an account?<Link to='/register'>Regiter Now</Link></p>
               <p className={message.type}>{message.text}</p>

           </form>
       </section>
    )   
   }