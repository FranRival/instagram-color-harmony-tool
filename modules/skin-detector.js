export function detectSkinTone(image){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 50
canvas.height = 50

ctx.drawImage(image,0,0,50,50)

const data = ctx.getImageData(0,0,50,50).data

let skinPixels = []

for(let i=0;i<data.length;i+=12){

const r = data[i]
const g = data[i+1]
const b = data[i+2]

/* regla simple de piel */

if(
r > 95 &&
g > 40 &&
b > 20 &&
r > g &&
r > b &&
Math.abs(r-g) > 15
){

skinPixels.push({r,g,b})

}

}

if(skinPixels.length < 20){
return null
}

/* promedio */

let r=0,g=0,b=0

skinPixels.forEach(p=>{
r+=p.r
g+=p.g
b+=p.b
})

const n = skinPixels.length

return {
r:Math.floor(r/n),
g:Math.floor(g/n),
b:Math.floor(b/n)
}

}
