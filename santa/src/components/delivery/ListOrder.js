import React,{useState} from 'react'

export default function ListOrder (props)
{
    const presents_list = props.presents_list
    const presents_list_keys = Object.keys(presents_list)

// states
    const [state, setState] = useState(false)
    const [presentSent, setPresentSent] = useState(presents_list["0"]==="0"?false:true)
    
    const presents_list_to_display = presents_list_keys.map((present_key,index) => 
    {
        if(presents_list[present_key] !=="0" && presents_list[present_key] !=="1")
        {
            return(
                <p 
                    className='ordered-present'> 
                    {index + '. '  +presents_list[present_key]} 
                </p>
            )
        }})

    const completeOrder = async() => 
    {
        setPresentSent(true)
        const child_id = props.child_id
        let new_presents = presents_list
        new_presents["0"] = "1"
        console.log(new_presents)
        try {
            const body = new_presents;
            const response = await fetch(`http://localhost:5000/santa_users/`+child_id+`/user_presents`,
            {
                method:"PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
            
            window.location = "/"
        } 
        catch (error) {console.log(error)}
    }     
   
    return(
        <>
            {!state &&
                <button 
                    type="button" 
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {setState(prev => !prev)}}>
                    Details
                </button>}
            {state && 
                <div 
                    id='order-full-view'
                    className = "message">
                    <button 
                        type="button"
                        id = "close-message-box-button"
                        className="icon-button"
                        onClick={() => {setState(prev => !prev)}}
                        style ={{ position: "absolute",right: "0",top:"0"}}>
                        <img 
                            alt="x_button" 
                            src={require("../../images/x.png")} 
                            style={{width:"4vh", height:"4vh",}}
                        />
                    </button>
                    
                    <div id='order-fullview-container'>
                        <div
                            id='name-img-btn-container'
                            >
                            <div id="child-img-name">
                                <img 
                                    alt='elf_img' 
                                    src={require('../../images/Child.png')}
                                />
                                <header 
                                    id='child-name'
                                    >{props.child_name}
                                </header>
                            </div>

                            {!presentSent && <button 
                                type="button" 
                                className="btn btn-primary"
                                data-dismiss="modal"
                                id='order-completed-btn'
                                onClick={() => {completeOrder()}}>
                                Mark as completed
                            </button>}
                            {presentSent && 
                            <>
                                <div
                                    className = "presents-list-completed">
                                    <p style={{color:"black"}}>x</p>                                       
                                </div>       
                                <header
                                    id="presents-list-sent-header"
                                    style={{}}>
                                    This order is completed!
                                </header>   
                            </>}                         
                        </div>

                        <div
                            id="present-list-container">
                                <header>Ordered presents list</header>
                            {presents_list_to_display}
                        </div>
                    </div>
                </div>}
        </> 
    )
}