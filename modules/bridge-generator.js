export function generateBridgeColor(colorA,colorB){

const rgbA = hexToRgb(colorA)
const rgbB = hexToRgb(colorB)

const r = Math.floor((rgbA.r + rgbB.r)/2)
const g = Math.floor((rgbA.g + rgbB.g)/2)
const b = Math.floor((rgbA.b + rgbB.b)/2)

return rgbToHex(r,g,b)

}

export function generateBridgeImage(color){

const canvas = document.createElement("canvas")

canvas.width = 1080
canvas.height = 1080

const ctx = canvas.getContext("2d")

ctx.fillStyle = color
ctx.fillRect(0,0,canvas.width,canvas.height)

return canvas.toDataURL()

}

function hexToRgb(hex){

const bigint = parseInt(hex.slice(1),16)

return{
r:(bigint>>16)&255,
g:(bigint>>8)&255,
b:bigint&255
}

}

function rgbToHex(r,g,b){

return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)

}

