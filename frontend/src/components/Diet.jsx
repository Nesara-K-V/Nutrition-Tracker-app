import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import Header from "./Header";

export default function Diet(){

    let loggedInData=useContext(UserContext);
    const [items,setItems]=useState([]);
    const [date,setDate]=useState(new Date())
    
    let [total,setTotal]=useState({
        totalcalories:0,
        totalProtein:0,
        totalCarbs:0,
        totalFats:0,
        totalFiber:0
    })

    useEffect(()=>{
        
        fetch(`http://localhost:8000/track/${loggedInData.userLogged.userid}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedInData.userLogged.token}`
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            
            setItems(data);
            console.log(data)
            
        })  
        .catch((err)=>{
            console.log(err)
        })
        },[date])

    useEffect(()=>{
        calculateTotal();
        
    },[items])

    
    function calculateTotal(){
        console.log(items)
        let totalcopy={
            totalcalories:0,
            totalProtein:0,
            totalCarbs:0,
            totalFats:0,
            totalFiber:0
        };

        items.forEach((item)=>{
            totalcopy.totalcalories+=item.details.calories;
            
            totalcopy.totalCarbs+=item.details.carbohydrates;
            totalcopy.totalFats+item.details.fat;
            totalcopy.totalProtein+=item.details.protein;
           
            totalcopy.totalFiber+=item.details.fiber;
        })

        setTotal(totalcopy);
        
    }



    
    return (
        <section className="container diet-container">
            <Header/>
            
            <input type="date" onChange={(event)=>{
                setDate(new Date(event.target.value))   
            }}/>
            {items.map((item)=>{
                
                return(
                <div className="item" key={item._id}>
                   <h3>{item.foodID.name} ({item.details.calories} Kcal for {item.quantity}g)</h3 > 
                   <p>protien {item.details.protein}g Carbs {item.details.carbohydrates}g  Fat {item.details.fat}g
                    Fiber {item.details.fiber}g
                   </p>
                </div>)
            })}
            <div className="item">
                   <h3>{total.totalcalories}  Kcal for </h3 > 
                   <p>protien {total.totalProtein}g Carbs {total.totalCarbs}g  Fat {total.totalFats}g
                    Fiber {total.totalFiber}g
                   </p>
                </div>

        </section>
    )
}