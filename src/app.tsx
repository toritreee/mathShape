import React from "react";
import ReactDOM from "react-dom";
import {Render} from "./render"

ReactDOM.render(
    <Render onClickPoint={(x,y)=>{console.log(x,y)}} lattice={100}/>,
    document.getElementById("root")
)