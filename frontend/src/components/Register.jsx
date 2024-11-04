import { useState } from "react"
import {Link} from "react-router-dom"
export default function Register(){
    const [userDetails,setUserDetails]=useState({
        name:"",
        email:"",
        password:"",
        age:""
    })

    const [message,setmessage]=useState({
        type:"invisible-msg",
        text:"dummy"
    })



    function handleInput(event){
        setUserDetails((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value};
        })

    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(userDetails);

        fetch("http://localhost:8000/register",{
            method:"POST",
            body:JSON.stringify(userDetails),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setmessage({type:"success",text:data.message});
            setUserDetails({
                name:"",
                email:"",
                password:"",
                age:""
            })

            setTimeout(()=>{
                setmessage({type:"invisible-msg",text:"dummy"})
            },5000)
        })

        .catch((err)=>{
            console.log(err);
        })
    }
 return (
    <section className="container">
        <form className="form" onSubmit={handleSubmit}> 
            <h1>register</h1>
            <input className="inp" type="text" required onChange={handleInput}
            placeholder="Enter your name" name="name" value={userDetails.name}/>

            <input className="inp" type="email" required onChange={handleInput}
            placeholder="Enter your email-id" name="email" value={userDetails.email}/>

            <input className="inp"  type="password" required minLength={10} onChange={handleInput}
            placeholder="Enter password" name="password" value={userDetails.password}/>

            <input className="inp" type="number" required min={16} onChange={handleInput}
             placeholder="Enter your age" name="age" value={userDetails.age}/>

            <button className="btn">Join</button>

            <p>Already registered? <Link to='/login'>Login</Link></p>
            <p className={message.type}>{message.text}</p>
        </form>
    </section>
 )   
}