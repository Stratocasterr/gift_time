import React ,{useState, useEffect} from "react";
import MailBox from "./MailBox";
import ListAllPresents from '../compose_presents/ListAllPresents'
import ComposeMessage from "../messages_system/ComposeMessage";
import Orders from "../delivery/Orders";
export default function MainSection(props)
{
// assign variables  and consts
    
    const signed_user_data = props.signed_user.user_data
    const [signed_user_messages,setSigned_user_messages] = useState({})
    const [all_users,setAll_users] = useState([])
    

   
// get user messages
    const getMessages = async() =>{
        try {
            const response = await fetch(`http://localhost:5000/santa_users/`+
                                props.signed_user.id+`/user_messages`)
            const jsonData = await response.json()        
            setSigned_user_messages(jsonData)    
        } 
        catch (error) {console.log(error)}
    }

// get all users
    const getAllUsers = async() =>{
        try {
            const response = await fetch("http://localhost:5000/santa_users")
            const jsonData = await response.json()            
            setAll_users(jsonData)    
        } 
        catch (error) {console.log(error)}
    }

// get all user and messages from database
    useEffect(() => {   
        getMessages()
        getAllUsers()
    }, [])

    return(
        <div>
            <div id ="profile-section-container">
                <div id = "header-container">
                    <header 
                        id="hello-header"          
                        >Hello 
                        {" " + signed_user_data.username}
                    </header> 
                </div>
                <div id = "content">
                    <div className="MScomponent">
                        <MailBox
                            signed_user = {props.signed_user}
                            signed_user_messages = {signed_user_messages}                            
                        />
                    </div>
                    <div className="MScomponent">
                        <ComposeMessage
                            signed_user = {props.signed_user}
                            all_users = {all_users}
                            main_header = {"Write message"}
                        />
                    </div>
                       
                    <div className="MScomponent">
                        {signed_user_data.account_type === "Child" && 
                        <> 
                            <ListAllPresents
                                signed_user = {props.signed_user}
                                main_header = {"Your presents"}
                                account_type = {'Child'}
                            />    
                        </>}
                    </div>

                    <div className="MScomponent">
                        {signed_user_data.account_type === "Elf" && 
                        <> 
                            <Orders
                                all_users = {all_users}
                            />    
                        </>}
                    
                    </div>
                </div>          
            </div>
        </div>    
    )
}