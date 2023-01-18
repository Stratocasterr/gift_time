import React,{useState, useEffect} from "react"
import $ from 'jquery'
import Message from "../messages_system/Message"
export default function Orders(props)
{
    const all_users = props.all_users
    const [state, setState] = React.useState(false)
   
// assign variables  and consts
    
    let user_messages = props.signed_user_messages
    if (user_messages === undefined) user_messages = {}
    if(Object.keys(user_messages).length) 
        user_messages = user_messages.user_messages

    let orders_to_display = []
    if(all_users.length>0)
    {
        all_users.forEach(user =>
            {
                
                if(user.user_presents["0"]==="0" || user.user_presents["0"]==="1")
                {
                    orders_to_display.push(
                        <Message
                            sender = {[user.user_data.username,'Child',user.id]}                      
                            subject = {""}               
                            message = {""}
                            signed_user = {user}
                            message_id = {user.user_data.username}
                            all_user_messages = {user_messages}
                            order_message = {true} 
                            presents_list = {user.user_presents}
                        />  
                    )
                }
                    
            })
    }
    
   
// close/ open orders
    function change_state()
    {
        setState(prevState => {return !prevState})
        $(document.querySelector('.pop_window')).css('opacity','1')
        $(document.querySelector('.pop_window')).css('visibility','visible')
        $(document.querySelector('.window_container')).css('opacity','1')
        $(document.querySelector('.window_container')).css('visibility','visible')
    }


    
    return(
        <div id="orders-box-container" >
            {!state && <div id="orders-box-button" className="profile-window-button-container" >
                <button 
                    type="button" 
                    onClick={change_state}>
                    <img 
                        alt = "orders" 
                        style={{'height':'400px',"marginTop":"-75px"}}
                        
                        src={require("../../images/orders.png")}/>
                </button>
                <header style={{"marginTop":"-40px"}}>Orders</header>
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
                                    <header 
                                        id = "orders-header">
                                        Orders
                                    </header>
                                    {orders_to_display}
                                </div>    
                            </div>         
                    </div>          
                </div>}
       </div>
    )
}