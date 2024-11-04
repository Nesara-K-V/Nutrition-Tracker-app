import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Private(props){
    const loggedInData=useContext(UserContext);

    return(
        loggedInData.userLogged!==null?
        <props.Component/>
        :
        <Navigate to='/login'/>
    )
}