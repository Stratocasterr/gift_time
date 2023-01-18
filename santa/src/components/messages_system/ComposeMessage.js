import React ,{useEffect, useState} from "react"
import pop_info from "../../useful_functions/pop_info";
export default function ComposeMessage(props)
{

// assign variables  and consts
    let signed_user_data
    let signed_user_id
    if(typeof props.signed_user === 'undefined') signed_user_data = {} 
    else 
    {
        signed_user_data = props.signed_user.user_data
        signed_user_id = props.signed_user.id
    }
    const all_users = props.all_users
    const main_header = props.main_header
    let keys = []
    let ids = []

    if(typeof all_users !== 'undefined')
    {
        keys = Object.keys(all_users)
        ids = keys.map(key => {return all_users[key].id})
    }

    let all_usernames = []
    let all_usernames_options = []
    let addressee_id 
    
// states
    const [addressee, setAdressee] = useState("")
    const [composer_state, setOcomposer_state] = useState(false)
    const [messageText, setMessageText] = useState('')
    const [messageSubject, setMessageSubject] = useState('')
    
// get all usernames from database
    function get_all_usernames()
    {  
        //console.log(all_users)
        keys.forEach((key) => {
            //console.log(all_users[key])
            const name = all_users[key].user_data.username
            all_usernames.push(name)
            all_usernames_options.push(
                <option value={name}></option>
            )
        })
    }
    get_all_usernames()

// get addressee id
    function get_addressee_id()
    { 
        for(let i=0;i<ids.length;i++)
        {       
            if(all_users[keys[i]].user_data.username === addressee)
            return ids[i]   
        }
    }

// close/open mess sender window
    function change_composer_state()
    {
        setOcomposer_state((prevComposer_state) => !prevComposer_state)
    }

// send message function
    async function send_message()
    {  
        
        addressee_id= get_addressee_id()
        let previous_addresse_mes 

    // get previous addressee messages    
        try {
            const response = await fetch(`http://localhost:5000/santa_users/`+
                        addressee_id+`/user_messages`)
            const jsonData = await response.json()         
            previous_addresse_mes =jsonData
            
        } catch (error) {console.log(error)}

        
    // create new message
        const new_message = 
        {
            "text":messageText,
            "subject":messageSubject,
            "sender":[signed_user_data.username, 
                signed_user_data.account_type, signed_user_id]
        }
        let keys = Object.keys(previous_addresse_mes.user_messages)

    //find id for new message
        let new_mess_id = 0
        if(keys.length > 0 ) new_mess_id = Math.max(...keys) + 1   
        let new_message_obj = previous_addresse_mes.user_messages

    // add new message to previous messages
        new_message_obj[new_mess_id] = new_message

    // update addressee messages database  
        try {         
            const body =  new_message_obj;     
            const response = await fetch(`http://localhost:5000/santa_users/`+ 
                                                          addressee_id  + `/user_messages`, 
            {
                method:'PUT',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/"
            pop_info("mess-sent")     
        } 
        catch (error) 
        {
            pop_info("fail-mess-sent")
            console.log(error)
        }   
    }   

    return(
    <div id='message-components'>
        {!composer_state && <button 
            className="mess-button" 
            type='button' 
            id="compose-mess-button">

            <img className="compose"
                alt='write_mess' 
                onClick={change_composer_state}
                src={require("../../images/write_message_img.png")} 
            />
            <span    
                className="compose"
                style={{'marginTop':'5px'}}>
                {main_header}
            </span> 
        </button>}

        {composer_state && <div id="message-composer-container">
            <input 
                list = "available-addresses"
                className="message-input-field" 
                type="text" 
                placeholder ="To: "
                value={all_usernames.includes(addressee)?addressee:''}
                onChange ={(e) => 
                    {setAdressee(e.target.value)}}
                onClick = {()=>{setAdressee('')}}
            />

            <datalist
                id="available-addresses">
                {all_usernames_options}
            </datalist>

            <input 
                className="message-input-field"
                type="text" 
                placeholder="*Subject..." 
                value={messageSubject}
                onChange={(e)=>{setMessageSubject(e.target.value)}}>
            </input>

            <textarea 
                className="message-input-field" 
                id="message-text-area" 
                rows="5" 
                cols="100" 
                placeholder="*Your's message"
                value={messageText}
                onChange={(e)=>{setMessageText(e.target.value)}}>
            </textarea>

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

            <button 
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                onClick={() => {send_message()}}
                >
                Send message to {addressee}
                </button>
        </div>}
    </div>
    )
}