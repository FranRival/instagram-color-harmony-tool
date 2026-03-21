export function detectSkinTone(image){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 60
canvas.height = 60

ctx.drawImage(image,0,0,60,60)

const data = ctx.getImageData(0,0,60,60).data

let skinPixels = []

for(let i=0;i<data.length;i+=12){

const r = data[i]
const g = data[i+1]
const b = data[i+2]

/* convertir a YCbCr */

const y  =  0.299*r + 0.587*g + 0.114*b
const cb = 128 - 0.168736*r - 0.331364*g + 0.5*b
const cr = 128 + 0.5*r - 0.418688*g - 0.081312*b

/* rango típico de piel */

const isSkinYCbCr =
cb >= 77 && cb <= 127 &&
cr >= 133 && cr <= 173

/* filtro adicional RGB */

const isSkinRGB =
r > 60 &&
g > 40 &&
b > 20 &&
r > g &&
Math.abs(r - g) > 10

if(isSkinYCbCr && isSkinRGB){
skinPixels.push({r,g,b})
}

}

/* no suficiente piel */

if(skinPixels.length < 30){
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
