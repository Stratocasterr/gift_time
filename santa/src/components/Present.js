import React from "react";

export default function Present(props)
{
    
    return(
        <div id='present-container'>
            <header id='present-name'>{props.name}</header>
            <button 
            id='remove-present-button'
            onClick={()=>{props.remove_present(props.id)}}
            className="icon-button"
           
            >
            <img 
                alt="x_button" 
                src={require("../images/x.png")} 
                style={{position:"absolute",top:-1,left:0, width:20, height:20}}
            />
            </button>
        </div>
    )
}