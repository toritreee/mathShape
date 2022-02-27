import * as render from "./render"
export type stmt = {
    type: "newPin",
    left: string,
    right: enm
}|{
    type: "S",
    left: string,
    right: [string,string,string]
}|{
    type: "line",
    mode: "straight" | "segment" | "half",
    from: string,
    to: string,
    name: string
}
export type enm = {
    type: "pin",
    x: number,
    y: number
}
type low = (
    {t:"p",m:render.pin}
    |{t:"l",m:render.line}
    |{t:"a",m:render.angle}
)[]

export class math{
    constructor(private text: string){}
    public build = ()=>{
        const low:low = []
        for(let i of this.text.split("\n")){
            //a : (2,4)
            let t = i.match(/^(\w\d*'*)\s*:\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/)
            if(t !== null){
                low.push({t:"p",m:{
                    x: Number(t[2]),
                    y: Number(t[3]),
                    name: t[1]
                }})
            }
            //s~ABC
            t = i.match(/^(S|s)~(\w\d*'*)(\w\d*'*)(\w\d*'*)/)
            if(t !== null){
                low.push({t:"l",m:{from: t[2], to: t[3], type: "half"}})
                low.push({t:"l",m:{from: t[3], to: t[4], type: "half"}})
                low.push({t:"l",m:{from: t[4], to: t[2], type: "half"}})
            }
            //l : ~AB~
            t = i.match(/^(\w+\d*'*)\s*:\s*(~|\|)(\w\d*'*)(\w\d*'*)(~|\|)/)
            if(t !== null){
                if(t[2] == "~" && t[5] == "|")
                    low.push({t:"l",m:{from:t[3],to:t[4],type:"segment"}})
                else if(t[2] == "|" && t[5] == "~")
                    low.push({t:"l",m:{from:t[4],to:t[3],type:"segment"}})
                else
                    low.push({t:"l",m:{from:t[3],to:t[4],type:t[2]=="~"?"straight":"half"}})
            }
            //<ABC
            t = i.match(/^<(\w\d*'*)(\w\d*'*)(\w\d*'*)/)
            if(t !== null){
                low.push({t:"a",m:{from:t[1],to:t[3],point:t[2]}})
            }
        }
        return low
    }
}