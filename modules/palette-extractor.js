export function extractDominantColor(image){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 50
canvas.height = 50

ctx.drawImage(image,0,0,50,50)

const data = ctx.getImageData(0,0,50,50).data

let r=0
let g=0
let b=0
let count=0

for(let i=0;i<data.length;i+=16){

r+=data[i]
g+=data[i+1]
b+=data[i+2]

count++

}

r=Math.floor(r/count)
g=Math.floor(g/count)
b=Math.floor(b/count)

return rgbToHex(r,g,b)

}

function rgbToHex(r,g,b){

return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)

}

