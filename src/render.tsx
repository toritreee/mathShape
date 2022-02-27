import React from "react";
import * as vector from "./vector"

export type pin = {x: number, y: number, name: string}
export type line = {from: string, to: string, name?: string, type: "straight" | "segment" | "half"}
export type angle = {from: string, point: string, to:string}
interface renderProps{
    onClickPoint: (x: number, y: number)=>void
    lattice: number
    pins: pin[]
    lines: line[]
    angles: angle[]
}

function color(text: string){
    const n = Array.from(text).map(ch => ch.charCodeAt(0)).reduce((a, b) => a+b)
    return `hsl(${(n*n) % 360}, 80%, 64%)`
}

export class Render extends React.Component<renderProps>{
    private canvas: React.RefObject<HTMLCanvasElement>
    private ctx?: CanvasRenderingContext2D
    constructor(props: renderProps){
        super(props)
        this.canvas = React.createRef()
        this.ctx = undefined
    }

    private click = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>)=>{
        const lattice = (v:number) => v % this.props.lattice < this.props.lattice
            ? Math.round(v / this.props.lattice)
            : Math.round(v / this.props.lattice + 1)
        this.props.onClickPoint(
            lattice(event.nativeEvent.offsetX),
            lattice(event.nativeEvent.offsetY)
        )
    }

    //set ctx
    private setCtx = ()=>{
        const ctx = this.canvas.current?.getContext("2d")
        if(ctx == null) return
        this.ctx = ctx
    }

    //grid
    private grid = ()=>{
        //type test
        this.setCtx()
        const lattice = this.props.lattice
        if(typeof this.ctx == "undefined" || this.canvas.current == null) return
        const cv = this.canvas.current
        //main code
        this.ctx.strokeStyle = "gray"
        this.ctx.lineWidth = 1
        this.ctx.clearRect(0,0,cv.width,cv.height)
        for(let i = 0; i!=Math.floor(cv.width / lattice);i++){
            this.ctx.strokeRect(i*lattice, 0, lattice, cv.width)
        }
        for(let i = 0; i!=Math.floor(cv.height / lattice);i++){
            this.ctx.strokeRect(0, i*lattice, cv.width, lattice)
        }
    }

    //x,y
    private pin = (pin: pin)=>{
        //type test
        this.setCtx()
        const lattice = this.props.lattice
        if(typeof this.ctx == "undefined") return
        //main code
        this.ctx.strokeStyle = color(pin.name)
        this.ctx.fillStyle = color(pin.name)
        this.ctx.lineWidth = 1
        this.ctx.beginPath()
        this.ctx.arc(
            pin.x*this.props.lattice,
            pin.y*this.props.lattice,
            lattice/5,
            0,
            2*Math.PI
        )
        this.ctx.fill()
        this.ctx.font = `${lattice/2}px serif`
        this.ctx.fillText(
            pin.name,
            pin.x*this.props.lattice+lattice/3,
            pin.y*this.props.lattice+lattice/3)
    }
    private renderPins = ()=>{
        for(let pin of this.props.pins){
            this.pin(pin)
        }
    }

    private line = (line: line)=>{
        //type test
        this.setCtx()
        const lattice = this.props.lattice
        const get = (name: string)=> this.props.pins.find(v=>v.name == name)
        const [from,to] = [get(line.from),get(line.to)]
        if(from == undefined || to == undefined || this.ctx == undefined || this.canvas.current == undefined)return
        //main code
        this.ctx.strokeStyle = "black"
        this.ctx.lineWidth = 4
        this.ctx.beginPath();
        if(line.type == "half"){
            this.ctx.moveTo(from.x*lattice, from.y*lattice)
            this.ctx.lineTo(to.x*lattice, to.y*lattice)
        }else if(line.type == "straight"){
            const a = (from.y - to.y)/(from.x - to.x)
            const b = -(a*to.x -to.y)
            const x = b/-a + lattice/a
            this.ctx.moveTo(0, b*lattice)
            this.ctx.lineTo(x * lattice, lattice*lattice)
        }else if(line.type == "segment"){
            const a = (from.y - to.y)/(from.x - to.x)
            const b = -(a*to.x -to.y)
            const x = b/-a + lattice/a
            this.ctx.moveTo(0, b*lattice)
            this.ctx.lineTo(to.x*lattice, to.y * lattice)
        }
        this.ctx.stroke();
    }
    private lines = ()=>{
        for(let line of this.props.lines){
            this.line(line)
        }
    }

    private angle = (angle: angle)=>{
        //type test
        this.setCtx()
        const lattice = this.props.lattice
        const get = (name: string)=> this.props.pins.find(v=>v.name == name)
        const [from,to,point] = [get(angle.from),get(angle.to), get(angle.point)]
        if(from == undefined || to == undefined || point == undefined || this.ctx == undefined || this.canvas.current == undefined)return
        //main code
        const a = vector.vector(from, point)
        const b = vector.vector(to, point)
        //painting
        this.ctx.strokeStyle = "black"
        this.ctx.lineWidth = 4
        this.ctx.beginPath()
        this.ctx.arc(
            point.x*lattice,
            point.y*lattice,
            lattice/2,
            -vector.angle(a,{x:1,y:0}),
            -vector.angle(a,b),
            true
        )
        this.ctx.stroke()
    }
    private angles = ()=>{
        for(let angle of this.props.angles){
            this.angle(angle)
        }
    }

    componentDidUpdate = ()=>{
        this.grid()
        this.lines()
        this.renderPins()
        this.angles()
    }

    componentDidMount = ()=>{
        this.componentDidUpdate()
    }

    render(): React.ReactNode {
        return <canvas
            width={1000}
            height={1000}
            ref={this.canvas}
            onClick={this.click}/>
    }
}