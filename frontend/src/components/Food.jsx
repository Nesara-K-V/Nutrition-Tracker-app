import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function Food(props){

    
    const [eatenquantity,setEatenQuantity]=useState(100);
    const [food,setFood]=useState({});
    const [foodInitial,setFoodInitial]=useState({});

    let loggedInData=useContext(UserContext);

    useEffect(()=>{
        setFood(props.item);
        setFoodInitial(props.item);
        console.log(food,"nesaara")
    },[props.item])

    

    function calculateMacros(event){
        if(event.target.value!==0){

            let quantity=Number(event.target.value);
            setEatenQuantity(quantity)
            let copy={...food}
        
            copy.protein=(foodInitial.protein*quantity)/100;
            copy.carbohydrates=(foodInitial.carbohydrates*quantity)/100;
            copy.fat=(foodInitial.fat*quantity)/100;
            copy.fiber=(foodInitial.fiber*quantity)/100;
            copy.calories=(foodInitial.calories*quantity)/100;

            setFood(copy)
        
        }
        
    }


    function trackFoodItem(){
        let trackedItem={
            userID:loggedInData.userLogged.userid,
            foodID:food._id,
            details:{
                protein:food.protein,
                carbohydrates:food.carbohydrates,
                fat:food.fat,
                fiber:food.fiber,
                calories:food.calories,
            },
            quantity:eatenquantity
        }
        
        

        fetch("http://localhost:8000/track",{
            method:"POST",
            body:JSON.stringify(trackedItem),
            headers:{
                "Authorization":`Bearer ${loggedInData.userLogged.token}`,
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            
            console.log(data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    
    return (
        
        <div className="food">
                 
                 <div className="food-img"></div>
                 <h2>{food.name} ({food.calories } Kcal for {eatenquantity}G)</h2>
                 
                 <div className="nutrient">
                        <div className="n-title">Protein</div>
                        <div className="n-value">{food.protein}g</div>
                    </div>
                    <div className="nutrient">
                        <div className="n-title">Carbs</div>
                        <div className="n-value">{food.carbohydrates}g</div>
                    </div>
                    <div className="nutrient">
                        <div className="n-title">Fat</div>
                        <div className="n-value">{food.fat}g</div>
                    </div>
                    <div className="nutrient">
                        <div className="n-title">Fiber</div>
                        <div className="n-value">{food.fiber}g</div>
                    </div>
                    <div className="track-control">
                        <input  onChange={calculateMacros} 
                        className="inp" type="number" placeholder="Quality in gms"/>
                    
                        <button className="btn" onClick={trackFoodItem}>Track</button>
                    </div>
                    
                 </div>
    )
}