import $ from 'jquery'
import React, { useState, Fragment, useEffect } from "react";
import AddPresent from './AddPresent';
import EditPresent from './EditPresent';
import new_presents_obj from '../../useful_functions/new_presents_obj';


const ListAllPresents = (props) => {
    
   
    let user_id = props.id
    let main_header = "Your presents"
    let presents_path = "/santa_users/" + user_id + '/user_presents'

    // check if user is editing present database
    let editing_present_database 

    if(localStorage.getItem('editing-present-database')!=null)
        editing_present_database = JSON.parse(localStorage.getItem('editing-present-database'))
    

   // states
   const [state, setState] = React.useState(editing_present_database);
   const [top_present_index, setTopPresentIndex] = React.useState(0)
   const [presents, setPresents] = React.useState([])
   



    const getPresents = async() =>{
        try {
            const response = await fetch("http://localhost:5000"+presents_path)
            const jsonData = await response.json()   
            const keys = Object.keys(jsonData.user_presents)
            const user_presents = keys.map((key)=>{return jsonData.user_presents[key]})
            setPresents(user_presents)
           
        } catch (error) {console.log(error)}
    }
    
    useEffect(() => {   
        getPresents();
    }, [])


    // for scrolling presents in table
    var displayed_presents_amount = 5
    function change_top_present_index(direction)
    {
        setTopPresentIndex((prevIndex) =>
            {
                const index = prevIndex + direction
                if(index>=0 && index <= presents.length - displayed_presents_amount) return(index)
                else return(prevIndex)
            })
    }

    // get presents from database
    

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
            window.location = "/"
           
        } 
        catch (error) {console.log(error)}} 
    
    return(
        <div>
            {!state  && <div className="profile-window-button-container" >
                <button
                    id="present-database-button"     
                    onClick={()=>
                    {
                        change_state(true)
                        setState(true)
                        localStorage.setItem('editing-present-database',true)
                    }}
                    type="button">
                    <img alt = "mail_img" src={require("../../images/gift_img.png")}/>        
                </button>
                <header >Presents</header>
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
                                />
                            </td>
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