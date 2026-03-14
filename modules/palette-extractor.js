export function extractDominantColor(image){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 60
canvas.height = 60

ctx.drawImage(image,0,0,60,60)

const data = ctx.getImageData(0,0,60,60).data

let bestColor = {r:0,g:0,b:0}
let bestScore = 0

for(let i=0;i<data.length;i+=12){

const r = data[i]
const g = data[i+1]
const b = data[i+2]

const max = Math.max(r,g,b)
const min = Math.min(r,g,b)

const saturation = max - min

if(saturation > bestScore){

bestScore = saturation
bestColor = {r,g,b}

}

}

return rgbToHex(bestColor.r,bestColor.g,bestColor.b)

}

function rgbToHex(r,g,b){
return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)
}
