import React from "react";

interface renderProps{
    onClickPoint: (x: number, y: number)=>void
    lattice: number
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

    componentDidMount = ()=>{
        this.line()
    }

    render(): React.ReactNode {
        return <canvas
            width={1000}
            height={1000}
            ref={this.canvas}
            onClick={this.click}/>
    }
}