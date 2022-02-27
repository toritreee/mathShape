import React from "react";
import ReactDOM from "react-dom";
import {Render} from "./render"

ReactDOM.render(
    <Render onClickPoint={(x,y)=>{console.log(x,y)}} lattice={50} pins={[
        {x:2,y:2,name:"A"},
        {x:4,y:5,name:"B"},
        {x:5,y:2,name:"C"}
    ]} lines={[
        {from:"A",to:"B",type:"segment"}
    ]}/>,
    document.getElementById("root")
)