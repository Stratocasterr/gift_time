import React, { Fragment, useState } from "react";
import new_presents_obj from '../../useful_functions/new_presents_obj';

export default function EditPresent(props)
{
    const [name, setName] = useState(props.present_to_edit)
   
    const updateName = async() => 
    {
        let new_presents = props.user_presents.map((present) => {
            if(present === props.present_to_edit) return name
            else return present
        })
        
        new_presents = new_presents_obj(new_presents)
        try {
           
            const body = new_presents;
            const response = await fetch(`http://localhost:5000/santa_users/`+props.user_id+`/user_presents`,
            {
                method:"PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/"
        } 
        catch (error) {console.log(error)}} 
    console.log(name)
    return(
        <div id="edit-present-name-container"> 
            <Fragment>
                <button 
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                data-target={`#${name}`}>
                Edit
                </button>

                <div 
                    className="modal fade" 
                    id={name} 
                    tabindex="-1"
                    role="dialog" 
                    aria-labelledby="exampleModalLabel" 
                    aria-hidden="true">

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 style={{"color":"black"}} className="modal-title" id="exampleModalLabel">Edit present</h5>
                        <button 
                            type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            data-dismiss="modal">
                            Close
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={e => updateName(e)}>
                            Save
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </Fragment>
        </div>
    )
}