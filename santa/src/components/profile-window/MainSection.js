import React ,{useState, useEffect} from "react";
import MailBox from "./MailBox";
import ListAllPresents from '../compose_presents/ListAllPresents'
import ComposeMessage from "../messages_system/ComposeMessage";


export default function MainSection(props)
{
   
    let user_components 
    const signed_user = props.signed_user.user_data
    
//components for child user
    if(signed_user.account_type === "Child") 
        user_components = [ListAllPresents(props.signed_user), 
                            MailBox(signed_user), ComposeMessage(signed_user)]
//components for santa user
    else if(signed_user.account_type === "Elf") 
        user_components = [MailBox(signed_user)]
//components for elf user
    else if(signed_user.account_type === "Santa") 
        user_components = [MailBox(signed_user)]
    
    
    return(
        <div>
            <div id ="profile-section-container">
                <div id = "header-container">
                    <header id="hello-header">Hello {signed_user.username}</header>
            
                </div>
               
                <div id = "content">
                    {user_components}
                </div>              
            </div>
        </div>    
    )
}