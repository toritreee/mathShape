import React from "react";
import ReactDOM from "react-dom";
import {Render} from "./render"
import {Main} from "./input"
import "./style"
ReactDOM.render(
    <Main lattice={50}/>,
    document.getElementById("root")
)