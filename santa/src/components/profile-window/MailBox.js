import React from "react"
import $ from 'jquery'
import Message from "../messages_system/Message"
export default function MailBox()
{
    const [state, setState] = React.useState(false)
    
    function change_state()
    {
        setState(prevState => {return !prevState})
        $(document.querySelector('.pop_window')).css('opacity','1')
        $(document.querySelector('.pop_window')).css('visibility','visible')
        $(document.querySelector('.window_container')).css('opacity','1')
        $(document.querySelector('.window_container')).css('visibility','visible')
       
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
                                    <Message 
                                    sender = {"john"}
                                    age ={"10"}
                                    subject = {"present"}
                                    sender_img = {""}
                                    message = {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an 
                                                unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                                It has survived not only five centuries, but also the leap into electronic typesetting.`}

                                    date = {"20.08.2021"}
                                    />  
                                </div>    
                            </div>         
                    </div>          
                </div>}
       </div>
    )
}