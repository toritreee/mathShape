import React from "react";

export type pin = {x: number, y: number, name: string}

interface renderProps{
    onClickPoint: (x: number, y: number)=>void
    lattice: number
    pins: pin[]
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
    private line = ()=>{
        //type test
        this.setCtx()
        const lattice = this.props.lattice
        if(typeof this.ctx == "undefined" || this.canvas.current == null) return
        const cv = this.canvas.current
        //main code
        this.ctx.strokeStyle = "gray"
        this.ctx.lineWidth = 1
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

    componentDidMount = ()=>{
        this.line()
        this.renderPins()
    }

    render(): React.ReactNode {
        return <canvas
            width={1000}
            height={1000}
            ref={this.canvas}
            onClick={this.click}/>
    }
}