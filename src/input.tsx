import React from "react"
import * as render from "./render"
import { math } from "./math"
export const Input = (p:{text: string, change:(text: string)=>void})=>{
    return <textarea value={p.text} onChange={(v)=>{
        p.change(v.target.value)
    }}></textarea>
}

export class Main extends React.Component<{
    lattice:number
},{
    pins:{
        pins: render.pin[]
        lines: render.line[]
        angles: render.angle[]
    }
    text: string
}>{
    state={
        pins:{
            pins:[],
            lines:[],
            angles:[]
        },
        text:""
    }
    name: string[] = []
    InputChange?: (text: string)=>void
    private onRenderClick = (x: number, y: number)=>{
        this.setState({
            text: this.state.text+="\n"+`A : ( ${x} , ${y} )`
        })
        this.run()
    }
    private run = ()=>{
        const state:{
            pins: render.pin[]
            lines: render.line[]
            angles: render.angle[]
        } = {
            pins: [],
            lines: [],
            angles: []
        }
        for(const i of new math(this.state.text).build()){
            if(i.t == "l")state.lines.push(i.m)
            else if(i.t == "p")state.pins.push(i.m)
            else if(i.t == "a")state.angles.push(i.m)
        }
        this.setState({pins: state})
    }

    render(): React.ReactNode {
        return <div className="main">
            <render.Render
                lattice={this.props.lattice}
                pins={this.state.pins.pins}
                lines={this.state.pins.lines}
                angles={this.state.pins.angles}
                onClickPoint={this.onRenderClick}
                />
            <Input text={this.state.text} change={(text)=>{
                this.setState({text: text})
                this.run()
            }}/>
        </div>
    }
}