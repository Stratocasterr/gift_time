import $ from 'jquery'
import React, { useState, Fragment, useEffect } from "react";
import AddPresent from './AddPresent';
import EditPresent from './EditPresent';
import new_presents_obj from '../../useful_functions/new_presents_obj';
import pop_info from "../../useful_functions/pop_info";

const ListAllPresents = (props) => 
{

// assign variables  and consts
    let user_id
    let user_account_type = props.account_type
    if(typeof props.signed_user !== 'undefined')  user_id= props.signed_user.id
    
    if(props.sender_id) 
        user_id = props.sender_id

    let main_header = props.main_header
    let presents_path = "/santa_users/" + user_id + '/user_presents'

// check if user is editing present database
    let editing_present_database 
    
    if(localStorage.getItem('editing-present-database')!=null)
        editing_present_database = JSON.parse(localStorage.getItem('editing-present-database'))
    
// states
   const [delivery, setDelivery] = useState('')
   const [state, setState] = useState(editing_present_database);
   const [top_present_index, setTopPresentIndex] = useState(0)
   const [presents, setPresents] = useState([])
   console.log(delivery)
    const getPresents = async() =>{
        try {
            const response = await fetch("http://localhost:5000"+presents_path)
            const jsonData = await response.json()   
            const keys = Object.keys(jsonData.user_presents)
            const user_presents = keys.map((key)=>{return jsonData.user_presents[key]})
            setPresents(user_presents)
            setDelivery(jsonData.user_presents["0"])
           
        } catch (error) {console.log(error)}
    }

// take user's presents from database
    useEffect(() => {   
        getPresents();
    }, [])

// display given amount of presents in list 
    var displayed_presents_amount = 5

// scrolling through presents list
    function change_top_present_index(direction)
    {
        setTopPresentIndex((prevIndex) =>
            {
                const index = prevIndex + direction
                if(index>=0 && index <= presents.length - displayed_presents_amount) return(index)
                else return(prevIndex)
            })
    } 

// close / open database table window
    function change_state(message)
    {
        const [visibility, opacity] = message ? ['visible','1']: ['hidden','0']
        $(document.querySelector('.pop_window')).css('opacity', opacity)
        $(document.querySelector('.pop_window')).css('visibility',visibility)
        $(document.querySelector('.window_container')).css('opacity', opacity)
        $(document.querySelector('.window_container')).css('visibility',visibility)
        localStorage.setItem('editing-present-database',true)  
    }

// delete given present
    const deletePresent = async (present_to_delete) => {

        try {        
            const body = new_presents_obj(presents.filter((present) => 
                present!==present_to_delete),false);

            const response = await fetch(`http://localhost:5000`+presents_path,
            {
                method:"PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
            pop_info("present-removed")
            window.location = "/"
        } 
        catch (error) {console.log(error)}} 

// update present's delivery status
    const updateDelivery = async (delivery) => {
        setDelivery(delivery)
        try {        
            let new_presents = new_presents_obj(presents,false);
            new_presents["0"] = delivery
            const body = new_presents

            const response = await fetch(`http://localhost:5000`+presents_path,
            {
                method:"PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
            pop_info("delivery updated")
            window.location = "/"
        } 
        catch (error) {console.log(error)}} 

    return(
        <div>
            {!state  && <div 
                className="profile-window-button-container" 
                style={{'marginTop':'calc('+props.marginTop+' * 0.1)'}}>
                <button
                    id="present-database-button"     
                    style={{'top':'0'}}
                    onClick={()=>
                    {
                        change_state(true)
                        setState(true)
                        localStorage.setItem('editing-present-database',true)
                    }}
                    type="button">
                    <img 
                        style={{'marginTop':25}}
                        alt = "gift_img" 
                        src={require("../../images/gift_img.png")}/>        
                </button>
                <header style={{'marginTop':105}} >Presents</header>
            </div>}
            {(state && JSON.parse(editing_present_database)) && <div className="shadow-background">  
                    <div id="mail-box-content">
                        <div id="presents-database-container" className="profile-window-container"> 
                            <button type="button"
                                id = "close-message-box-button"
                                className="icon-button"
                                onClick={()=>
                                    {
                                        setState(false)
                                        change_state(false)
                                        localStorage.setItem('editing-present-database',false)
                                    }}>
                                <img alt="x_button" src={require("../../images/x.png")}/>
                            </button>
                            <td id='new-presents-adder'>
                                <AddPresent 
                                    user_presents = {presents}
                                    presents_path = {presents_path}
                                    user_id = {user_id}
                                    marginTop = {props.marginTop}
                                />
                            </td>
                            
                            {user_account_type === 'Child' && <div
                            id="delivery-status-container">
                                {delivery ==='-1' && <>
                                    <img
                                        alt = "status-img" 
                                        src={require("../../images/packing_present.png")}
                                    /> 
                                    <header>
                                        Waiting for Santa's review...
                                    </header>           
                                </>}
                                {delivery ==='0' && <>
                                    <img
                                        alt = "status-img" 
                                        src={require("../../images/packing_present.png")}
                                    /> 
                                    <header>
                                        Elves are collecting Your's present...
                                    </header>      
                                </>}
                                {delivery ==='1' && <>
                                    <img
                                        alt = "status-img" 
                                        src={require("../../images/present_sent.png")}
                                    /> 
                                    <header>
                                        Your's presents successfully sent!
                                    </header>      
                                </>}                  
                            </div>}

                            {user_account_type === 'Santa' && <div
                            id="accept-child-presents">
                                {delivery ==='-1' && <>
                                <button
                                    id='accept-presents-button'
                                    className="btn btn-success"
                                    type='button'
                                    style={{'marginLeft':50}}
                                    onClick={() => {
                                        updateDelivery("0")   
                                    }}        
                                    >
                                    Send presents list to Elves
                                </button>
                                </>}
                                {(delivery === '0' || delivery === '1') && <>
                                    <div
                                        className= "presents-list-completed">
                                        <p style={{color:"black"}}>x</p>                                       
                                    </div>       
                                    <header
                                        id="presents-list-sent-header">
                                        Presents list sent to Elves!
                                    </header>                            
                                </>}
                            </div>}

                            <h1 className="text-center mt-5" style={{color:"white"}}>{main_header}</h1>
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={() => {change_top_present_index(-1)}}
                                >
                                Scroll up
                            </button>  
                                <Fragment>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary"
                                        onClick={() => {change_top_present_index(1)}}
                                        >
                                        Scroll down
                                    </button>                       
                                    <table id= "all-presents-table" className="table text-center" >
                                        <thead>
                                            <tr>
                                            <th scope="col">Present name</th>
                                            <th scope="col">Edit present</th>
                                            <th scope="col">Delete present</th>
                                            </tr>
                                        </thead>
                                        <tbody>                        
                                        {presents.slice(
                                           top_present_index,
                                            top_present_index + displayed_presents_amount
                                        )
                                            .map(present => {    
                                                if(present !=="-1" 
                                                    && present !=="1" 
                                                        && present !=="0")                                
                                            return(
                                            <tr key={`#id${present}`}>
                                                <td>{present}</td>
                                                <td>          
                                                    <EditPresent 
                                                        present_to_edit={present}
                                                        user_presents = {presents}
                                                        user_id = {user_id} />
                                                </td>
                                                <td>          
                                                    <button
                                                        onClick={() => deletePresent(present)}
                                                        className='btn btn-danger'>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>)
                                        })}
                                        </tbody>                        
                                    </table>
                                </Fragment>          
                            </div>
                            <div>
                        </div>             
                    </div>          
            </div>}
        </div>
    )
}
export default ListAllPresents