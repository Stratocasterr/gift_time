import React from 'react'
import pop_info from '../../useful_functions/pop_info'
import ListAllPresents from '../compose_presents/ListAllPresents'
import ComposeMessage from './ComposeMessage'


export default function Message(props)
{

    const sender_name = props.sender[0]
    const sender_id = props.sender[2]
    const sender_account_type = props.sender[1]
    const signed_user_id = props.signed_user.id
    const signed_user_account_type = props.signed_user.user_data.account_type

    const user_to_reply = [{ 
            id: sender_id,
            user_data:{username: sender_name, account_type: sender_account_type} 
        }]    
    
    console.log("su",props.signed_user)
    const [fullView, setFullView] = React.useState(false)

    function change_mess_view()
    {
        setFullView(prevView =>{ return !prevView})
    }

    const deleteMessage = async (message_to_delete) => {
        try {        
            let body = props.all_user_messages
            delete body[message_to_delete]
            
            const response = await fetch(`http://localhost:5000/santa_users/` 
                    + signed_user_id + `/user_messages`,
            {
                method:"PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
            
            pop_info("mess-removed")
            window.location = "/"
           
        } 
        catch (error) {console.log(error)}} 

    return(
        <div>
            {/* message shortcut view */}
            {!fullView&&<div 
                id="message-shortcut" 
                className = "message" >
                <div 
                    
                    id="img-name-container">
                    <img  
                        alt="elf_img" 
                        src={require('../../images/'+ sender_account_type +'.png')}
                    />
                    <span  id = "sender-name">
                        {sender_name} 
                        <h1 style={{
                                position: "relative", 
                                top:-5, 
                                float:'right', 
                                "fontSize":15}}>
                        </h1>
                    </span>              
                </div>

                <h3 
                    className = "message-shortcut" 
                    id = "message-subject">
                    {props.subject.length>20? 
                        props.subject.slice(0,15) + "..." 
                            : props.subject}
                </h3>

                <h3 
                    className = "message-shortcut" 
                    id = "message">
                    {props.message.length>40? 
                        props.message.slice(0,40) + "..." 
                            : props.subject}
                </h3>

                
                <div id="mess-buttons-container">
                    <button 
                        className="mess-button" 
                        type='button' 
                        id="delete-mess-button">
                        <img 
                            alt='delete_img' 
                            onClick={() => deleteMessage(props.message_id)}
                            src={require("../../images/delete_img.png")} 
                        />
                    </button>

                    <button 
                        className="mess-button" 
                        type='button' 
                        id="read-mess-button">
                        <img 
                            alt='read_mess_img' 
                            onClick={change_mess_view}
                            src={require("../../images/read_mess_img.png")} 
                            style={{width: "5vh", "marginBottom" : -4}}
                            />
                    </button>
                </div>
            </div>}
            
            {/* message full view */}
            {fullView&&<div 
                id='message-full-view'
                className = "message">
                <button 
                    type="button"
                    id = "close-message-box-button"
                    className="icon-button"
                    onClick={change_mess_view}
                    style ={{ position: "absolute",right: "0",top:"0"}}>
                    <img 
                        alt="x_button" 
                        src={require("../../images/x.png")} 
                        style={{width:"4vh", height:"4vh",}}
                    />
                </button>
                <img 
                    alt='elf_img' 
                    src={require('../../images/'+ sender_account_type +'.png')}
                />
                <div id='fullview-container'>
                    <header 
                        id='subject'>
                        {props.subject}
                    </header>
                    <p
                        id='full-text'>
                        {props.message} 
                        <h1 id='sender-signature'>
                            {sender_name}
                        </h1>
                    </p>

                </div>
                <br></br>                       
                <div id="composers">
                    <ComposeMessage  
                        signed_user = {props.signed_user}
                        all_users = {user_to_reply}
                        main_header= {"Reply"}
                    />

                    {signed_user_account_type==='Santa' &&
                        <ListAllPresents
                            marginTop = {'100px'}
                            main_header = {props.sender[0] + "'s presents"}
                            sender_id = {props.sender[2]}
                        />
                    }       
                                 
                </div>     
            </div>}              
        </div>
    )
}