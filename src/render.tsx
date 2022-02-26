import React from "react";

interface renderProps{
    onClickPoint: (x: number, y: number)=>void
    lattice: number
}

export class Render extends React.Component<renderProps>{
    private canvas: React.RefObject<HTMLCanvasElement>
    constructor(props: renderProps){
        super(props)
        this.canvas = React.createRef()
    }

    private click = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>)=>{
        const lattice = (v:number) => v % this.props.lattice < this.props.lattice
            ? v % this.props.lattice
            : v % this.props.lattice + 1
        this.props.onClickPoint(
            lattice(event.nativeEvent.offsetX),
            lattice(event.nativeEvent.offsetY)
        )
    }

    render(): React.ReactNode {
        this.props
        return <canvas
            width={1000}
            height={1000}
            ref={this.canvas}
            onClick={this.click}/>
    }
}