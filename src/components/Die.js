import React from "react";

export default function Die(props){
    const name = props.freeze ? "die freeze" : "die"
    return(
    <div className={name} onClick={(event) => props.freezeDie(props.id)}>
        {props.value}
    </div>
    )   
}