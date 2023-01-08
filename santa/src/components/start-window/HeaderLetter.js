import React from "react"
import $ from 'jquery'
import {useRef, useEffect} from 'react';

export default function HeaderLetter(props)
{
    const christmas_colors = ['#F5624D', '#CC231E', '#34A65F', '#0F8A5F', '#235E6F']
    const letter = props.letter
    const ref = useRef(null);

    function getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    }

    // code below add bouncing ball effect to header letters
    useEffect(() => {
        const element = ref.current;
        element.addEventListener("mouseover", (element) =>
        {
            const random_color = christmas_colors[getRandomInt(0,christmas_colors.length)]  
            $(element.target).css('cursor','default')
            $(element.target).css('color', random_color)
            $(element.target).css('animation','ball_effect 1s ease-in-out forwards 1 alternate')
        })

        element.addEventListener("mouseleave", (element) =>
        {
            $(element.target).css('color','white')
            $(element.target).css('animation','small_ball_effect 1s ease-in-out forwards 1 alternate')   
        })

        return () => {};
    }, []);

    return(
        <div>
            <span
            ref={ref} 
            className = "letter">{letter}</span>
        </div>
    )
}


