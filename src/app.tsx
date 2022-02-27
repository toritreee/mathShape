import React from "react";
import ReactDOM from "react-dom";
import {Render} from "./render"

ReactDOM.render(
    <Render onClickPoint={(x,y)=>{console.log(x,y)}} lattice={50} pins={[
        {x:3,y:2,name:"A"},
        {x:2,y:4,name:"B"},
        {x:4,y:4,name:"C"}
    ]} lines={[
        {from:"B",to:"A",type:"segment"}
    ]} angles={[
        {from:"C",to:"A",point:"B"}
    ]}
    />,
    document.getElementById("root")
)