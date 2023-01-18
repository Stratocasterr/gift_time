import React from "react"
import $ from 'jquery'
import Message from "../messages_system/Message"
export default function MailBox(props)
{
// assign variables  and consts
    const signed_user = props.signed_user
    let user_messages = props.signed_user_messages
    if (user_messages === undefined) user_messages = {}
    const [state, setState] = React.useState(false)
    
    if(Object.keys(user_messages).length) 
        user_messages = user_messages.user_messages

// close/ open mailbox
    function change_state()
    {
        setState(prevState => {return !prevState})
        $(document.querySelector('.pop_window')).css('opacity','1')
        $(document.querySelector('.pop_window')).css('visibility','visible')
        $(document.querySelector('.window_container')).css('opacity','1')
        $(document.querySelector('.window_container')).css('visibility','visible')
    }

// put user's messages in mailbox
    let messages_to_display = []
    if (typeof user_messages ==='object')
    {   
        const messages_keys = Object.keys(user_messages)
        messages_keys.forEach(key => {
            messages_to_display.push(
                <Message 
                    sender = {user_messages[key].sender}                      
                    subject = {user_messages[key].subject}               
                    message = {user_messages[key].text}
                    signed_user = {signed_user}
                    message_id = {key}
                    all_user_messages = {user_messages}    
                    order_message = {false}        
                />  
            )
        })
    }
    
    return(
        <div id="mail-box-container" >
            {!state && <div id="mail-box-button" className="profile-window-button-container" >
                <button 
                    type="button" 
                    onClick={change_state}>
                    <img alt = "mail_img" src={require("../../images/mail_img.png")}/>
                </button>
                <header style={{"marginTop":"-40px"}}>Messages</header>
            </div>}
            
                {state &&<div className="shadow-background">
                    <div id="mail-box-content">
                            <div id="messages-container" className="profile-window-container">  
                                <button type="button"
                                    id = "close-message-box-button"
                                    className="icon-button"
                                    onClick={change_state}>
                                    <img alt="x_button" src={require("../../images/x.png")}/>
                                </button>              
                                <div id="messages">
                                    {messages_to_display}
                                </div>    
                            </div>         
                    </div>          
                </div>}
       </div>
    )
}