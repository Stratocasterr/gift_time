import React, {useState, useEffect } from 'react';
import $ from 'jquery'

import pop_info from '../../useful_functions/pop_info'
import MainSection from '../../components/profile-window/MainSection'

export default function AccountWindow(props)
{
    
//login
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);

//account window after login
    const [login, setLogin] = useState(props.login)
    const [logOut, setLogout] = useState(false)
    
// create account
    const account_types = ['Santa', 'Child', 'Elf']
    const [create_username, setCreate_username] = useState('');
    const [create_password, setCreate_password] = useState('');
    const [create_type, setCreate_type] = useState('')

    var new_account = {
        username: create_username,
        password: create_password,
        account_type: create_type,
        user_presents: {},
        user_messages: {}
    }
   
   

// take all users from database
const [users, setUsers] = useState([])

const getUsers = async () => {
    try {
        const response = await fetch("http://localhost:5000/santa_users")
        const jsonData = await response.json()
        setUsers(jsonData);
    } 
    catch (error) {console.log(error)}
}

useEffect(() => {
    getUsers();
}, [])

//take user names list

let usernames
if(users != null && users.length > 0)
    usernames = users.map((user) => {return user.user_data.username})


// logging in / out
    useEffect(()=>{
        if(!login && logOut)
        {
            open_account_window('log-in')
            setLogin('') 
            setPassword('')
            setLogout(false)
        }    
    })
    

    function check_login_input()
    {
        
        if(usernames.includes(username))
        {
            
            users.forEach((user) => {
                if(user.user_data.username === username)
                {
                  
                    if(user.user_data.password === password)
                    {
                       
                        pop_info("correct-login-password")
                        setLogin(true)
                        
                        //localStorage.setItem('signed_user', username)
                        localStorage.setItem('signed_user',JSON.stringify(user))
                        
                        $(document.querySelector('#main-header')).css('display','none')                    
                    }
                    else pop_info("invalid-password")
                }         
            })
        }
        else pop_info("invalid-username")
    }

    function open_account_window(button_name)
    {
        const sing_in_window = document.querySelector('#sing_in_window')
        const login_create_pop_window = sing_in_window.querySelector('.pop_window')
        const window_container = document.querySelector('.window_container')
        const log_in_container = document.querySelector('#log_in_container')
        const create_account_container = document.querySelector('#create_account_container')
        const main_header = document.querySelector('#main-header')

        if(button_name !== "close")
        {
            let window_to_open
            let window_to_close
            
            if(button_name ==="log-in") 
            {
                window_to_open = log_in_container
                window_to_close = create_account_container             
                $(main_header).css('opacity',0)
            }

            else if(button_name === "create-account")
            {
                window_to_open = create_account_container
                window_to_close = log_in_container
            }     
    
            $(login_create_pop_window).css('opacity','1')
            $(login_create_pop_window).css('visibility','visible')  
            $(window_container).css('opacity','1')
            $(window_container).css('visibility','visible')
    
            $(window_to_open).css('opacity','1')
            $(window_to_open).css('visibility','visible')
            $(window_to_close).css('opacity','0')
            $(window_to_close).css('visibility','hidden')
        }

        else
        {
            const windows = [window_container, 
                                login_create_pop_window, log_in_container, 
                                                create_account_container]
            windows.forEach(window => {
                $(window).css('visibility','hidden')
                $(window).css('opacity','0')
            })          
            $(main_header).css('opacity',1)
        }
    }

// add new user to database
    const addUser = async e => 
    {
        const user_data = 
        {
            username: e.username, 
            password:e.password, 
            account_type: e.account_type
        }

        const user_presents = e.user_presents
        const user_messages = e.user_messages
    
        try {
        
            const body = {user_data, user_presents, user_messages }
            const response = await fetch("http://localhost:5000/santa_users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }); 
            window.location = "/";
            
        } 
        catch (err) 
        {console.error(err.message)}

    }

// display letters instead of dots while typing password
    function showPassword()
    {
        var x = document.getElementById("password_input" );
        if (x.type === "password") x.type = "text";
        else x.type = "password";     
    }

    return(
        <div >
            
            {!login &&  <div id="sing_in_window">            
                <button 
                        id="log-in-start-button"
                        className='basic-button' 
                        onClick={() => {open_account_window("log-in")}}
                        type='button'>
                        Log in
                </button>         
                <div className="pop_window">
                    <div className="window_container">
                        <button 
                            className="close-btn"  
                            onClick={() =>{open_account_window("close")}}>
                            <line className="line1" ></line>
                            <line className="line2" ></line>
                        </button>    
                        <div id = "log_in_container">                     
                            <h3 style={{color:'white'}}>Log in</h3>
                            <form id = "log_in">
                                <input 
                                    type="text" 
                                    placeholder="Username*" 
                                    id = "username_input"
                                    value = {username}
                                    onChange = { (u) => setUsername(u.target.value)}
                                    />
                                <br></br>
                                <input 
                                    type="password" 
                                    placeholder="Password*" 
                                    id = "password_input" 
                                    value = {password}
                                    onChange = { (u) => setPassword(u.target.value)}
                                />
                            </form>
                            <div id ="show_password">
                                <button 
                                    type = "button" 
                                    id = "show_password_button" 
                                    onClick={showPassword}>
                                    <img 
                                        alt='show-password' 
                                        className = 'icon-button' 
                                        src={require('../../images/aye_icon.png')}
                                    />
                                </button>
                            </div>
                            <div id="log-in-buttons">
                                <button 
                                    className = "basic-button" 
                                    type="button" 
                                    id = "log_in_button"
                                    onClick={ () => {
                                        check_login_input()
                                        }}>
                                    Log in
                                </button>    
                                <div id = "donthave_account_container">
                                    <h1>Don't have account yet?</h1>
                                    
                                    <button 
                                        onClick={() => {open_account_window("create-account")}}
                                        className = "basic-button" 
                                        type="button" 
                                        style={{"marginTop": 30}}
                                        id = "create_account_window_button">Create account
                                    </button>
                                </div>
                            </div>                   
                        </div>                  
                        <div id ="create_account_container">
                            <h3 style={{color:'white'}} >Create account</h3>
                            <form id = "create_account">
                                <input 
                                    type="text" 
                                    placeholder="Your username*" 
                                    id = "your_username_input"
                                    value = {create_username}
                                    onChange = { (u) => 
                                        {
                                            setCreate_username(u.target.value)
                                            if(usernames.includes(u.target.value)) 
                                            {
                                                pop_info('username-exist')
                                                new_account.username = ''
                                            }
                                            
                                            else 
                                            {
                                                pop_info('correct-username')
                                                new_account.username = create_username
                                                
                                            }
                                        }
                                    }
                                    />
                                <br></br>                       
                                <input 
                                    list="account-types"   
                                    placeholder="Account type*" 
                                    id = "account-type-input"
                                    value = {create_type}
                                    onChange = { (u) => 
                                            {
                                                if(account_types.includes(u.target.value))
                                                {
                                                    setCreate_type(u.target.value)
                                                    new_account.account_type = u.target.value
                                                    
                                                } 
                                                else new_account.account_type = ''                                 
                                            }
                                        }                             
                                    onClick ={ (u) => setCreate_type('')}
                                    />
                                <datalist 
                                id="account-types">
                                    <option value="Santa"/>
                                    <option value="Child"/>
                                    <option value="Elf"/>                 
                                </datalist>
                                <br></br>
                                <input 
                                    type="text" 
                                    placeholder="Type password*" 
                                    id = "type_password_input"
                                    value = {create_password}
                                    onChange = { (u) => setCreate_password(u.target.value)}
                                    />
                                <br></br>                        
                                <input 
                                    type="text" 
                                    placeholder="Retype password*" 
                                    id = "retype_password_input"
                                    onChange = { (u) => 
                                        {
                                            if(u.target.value !== create_password) 
                                            {
                                                new_account.password =''
                                                pop_info('invalid-retype-password')
                                            }
                                               
                                            if(u.target.value === create_password) 
                                            {
                                                new_account.password = create_password
                                                pop_info('correct-retype-password')
                                                
                                            }                                          
                                        }
                                    }/>
                                <button 
                                    className = "basic-button"
                                    type="button" 
                                    id = "create_account_button"
                                    onClick={() => 
                                        {
                                            if(new_account.password && new_account.username
                                                && new_account.account_type) {
                                                    
                                                    addUser(new_account)
                                                }
                                            //open_account_window("log-in")
                                        }}
                                    >
                                    Create account
                                </button>
                            </form>
                            <div className="profile_img" id="profile_img_display">
                                <img 
                                alt="user" 
                                id ="user_profile_img" 
                                width = "150px"
                                height = "150px" 
                                src={
                                    (create_type === 'Santa' || create_type === 'Elf' || create_type === 'Child')? 
                                        require((`../../images/${create_type + '.png'}`)) 
                                        : require((`../../images/${'NoUser.png'}`))
                                    }/>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>}    
            <div>
                {login && 
                <div>
                    <MainSection
                    signed_user = {JSON.parse(localStorage.getItem('signed_user'))}
                    />
                    <button
                        id= "log-out-button"
                        type="button"
                        className='main-section-button'
                        onClick={()=>{
                            setLogin(false)
                            setLogout(true)
                            localStorage.clear();
                            $(document.querySelector('#main-header')).css('display','block')   
                        }}
                        >
                        Log out
                    </button>
                </div>}                
            </div>
        </div>
    )
}