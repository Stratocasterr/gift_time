import React from 'react'
import ComposeMessage from './ComposeMessage'


export default function Message(props)
{
    const [fullView, setFullView] = React.useState(false)

    function change_mess_view()
    {
        setFullView(prevView =>{ return !prevView})
    }

    return(
        <div id = "message-container">
            {/* message shortcut view */}
            {!fullView&&<div id="message-shortcut">
                <div className = "message-shortcut" id="img-name-container">
                    <img  
                        alt="elf_img" 
                        src={require('../../images/Elf.png')}
                    />
                    <span  id = "sender-name">
                        {props.sender} 
                        <h1 style={{
                                position: "relative", 
                                top:-5, 
                                float:'right', 
                                "font-size":15}}>
                            ({props.age}yo.)
                        </h1>
                    </span>              
                </div>
                <h3 className = "message-shortcut" id = "message-subject">{props.subject}</h3>
                <h3 className = "message-shortcut" id = "message">
                    {props.message.slice(0,50) + "..."}
                </h3>
                <h3 className = "message-shortcut" id = "message-date">{props.date}</h3>
                
                <div id="mess-buttons-container">
                    <button className="mess-button" type='button' id="delete-mess-button">
                        <img 
                            alt='delete_img' 
                            src={require("../../images/delete_img.png")} 
                        />
                    </button>

                    <button className="mess-button" type='button' id="read-mess-button">
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
            {fullView&&<div id='message-full-view'>
                <button type="button"
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
                    src={require('../../images/Elf.png')}
                />
                <div id='text-content'>
                    <header id='subject'>{props.subject}</header>
                    <header id="date">{props.date}</header>
                    <p>{props.message} <h1>{props.sender}</h1></p>
                </div>
                <br></br>                       
                <div id="composers">
                    <ComposeMessage 
                        receiver = {props.sender}
                    />   
                    
                </div>     
            </div>}              
        </div>
    )
}