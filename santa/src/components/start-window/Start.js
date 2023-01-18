import React from 'react';
import AccountWindow from './AccountWindow';

import HeaderLetter from './HeaderLetter'

export default function Start()
{

// letters for main header
    const letters = ['G', 'I', 'F', 'T', 'T', 'I' ,'M', 'E']
    const signed_user = JSON.parse(localStorage.getItem('signed_user'));

    const HeaderLetters = letters.map(letter =>
        {
            return(
                <HeaderLetter 
                    letter = {letter}
                />)
        })
    
        return(
            <div id = "start-container">   
                <div id = "main-header" style={{opacity:1}}>
                    <div className = "main-header" id = "gift-header">
                        {HeaderLetters}
                    </div>
                </div>       
                <img 
                    alt='gift' 
                    style={{width:400, height:400, position:'absolute', top:350}}
                    src={require('../../images/gift_img.png')} />
                <div id = "account-container">
                    <AccountWindow 
                    login = {signed_user !== null}
                    username ={signed_user}
                     />
                </div>                    
            </div>
        )
}
