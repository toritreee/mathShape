export type vector = {x:number, y:number}
export type point = vector
export const angle = (a: vector, b: vector)=>{
    const dot = (a: vector, b: vector) => a.x * b.x + a.y * b.y
    const normalize = (x:number, y:number)=>{
        const vLen = Math.hypot(x, y)
        return { x: x / vLen, y: y / vLen }
    }
    const dotVal = dot(normalize(a.x, a.y), normalize(b.x, b.y))
    return Math.acos(dotVal)
}

export const vector = (a: point, b: point):vector=>{return{x: a.x - b.x, y: a.y - b.y}}