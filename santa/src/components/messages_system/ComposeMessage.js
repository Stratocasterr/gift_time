import React from "react"

export default function ComposeMessage(props)
{
    const signed_user = props
    console.log(signed_user)
    const [composer_state, setOcomposer_state] = React.useState(false)
    function change_composer_state()
    {
        setOcomposer_state((prevComposer_state) => !prevComposer_state)
    }

    return(
    <div id='message-components'>
        {!composer_state && <button 
            className="mess-button" 
            type='button' 
            id="compose-mess-button"
            style={{'marginTop':-8}}>
            <img className="compose"
                alt='write_mess' 
                onClick={change_composer_state}
                src={require("../../images/write_message_img.png")} 
            />
            <span  
                style ={{'fontWeight':900,color:'white', position:'absolute' ,left:20, top:153}}
                className="compose">
                Write message to {}
                </span> 
        </button>}

        {composer_state && <div id="message-composer-container">
            <input className="message-input-field" type="text" placeholder="*To..." />
            <input className="message-input-field" type="text" placeholder="*Subject..." />
            <textarea className="message-input-field" id="message-text-area" rows="5" cols="100" placeholder="*Your's message"></textarea>
            <button type="button"
                id = "close-message-box-button"
                className="icon-button"
                onClick={change_composer_state}
                style ={{ position: "absolute",right: "0",top:"0"}}>
                <img 
                    alt="x_button" src={require("../../images/x.png")} 
                    style={{width:"4vh", height:"4vh",}}
                />
            </button>

            <button type="button"
                id = "save-message-button"
                className="icon-button"
                onClick={change_composer_state}
                style ={{ position: "absolute",right: "21vw",top:"23vh"}}>
                <img 
                    alt="ok_button" src={require("../../images/ok.png")} 
                    style={{width:"6vh", height:"4vh",}}
                />
            </button>
        </div>}
    </div>
    
    )
}