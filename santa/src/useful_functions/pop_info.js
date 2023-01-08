import $ from 'jquery'

export default function pop_info_window(message)
{
    const info_window = document.getElementById('info_window')
   

    if (message === "correct-login-password")
    {
        info_window.innerHTML = "Welcome again!"
        $('#info_window').css('background-color','green')
    }
    
    else if (message === "invalid-username")
    {
        info_window.innerHTML = "Invalid username!"
        $('#info_window').css('background-color','red')
    }

    else if (message === "invalid-password")
    {
        info_window.innerHTML = "Invalid password!"
        $('#info_window').css('background-color','red')
    }

    else if (message === "username-exist")
    {
        info_window.innerHTML = "Username already exist! Please choose another one"
        $('#info_window').css('background-color','red')
    }

    else if (message === "invalid-retype-password")
    {
        info_window.innerHTML = "Retyped password is incorrect!"
        $('#info_window').css('background-color','red')
    }

    else if (message === "correct-retype-password")
    {
        info_window.innerHTML = "Retyped password is correct!"
        $('#info_window').css('background-color','green')
    }

    else if (message === "correct-username")
    {
        info_window.innerHTML = "Username available!"
        $('#info_window').css('background-color','green')
    }
    
    setTimeout(function(){info_window.innerHTML = ""}, 3000)
}
