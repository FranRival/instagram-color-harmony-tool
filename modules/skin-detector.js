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

/* ===== HSV (para HUE) ===== */

const {h} = rgbToHsv(r,g,b)

/* piel está entre rojo-naranja */

const isSkinHue = h >= 0 && h <= 50

/* ===== YCbCr ===== */

const cb = 128 - 0.168736*r - 0.331364*g + 0.5*b
const cr = 128 + 0.5*r - 0.418688*g - 0.081312*b

const isSkinYCbCr =
cb >= 77 && cb <= 127 &&
cr >= 133 && cr <= 173

/* ===== RGB ===== */

const isSkinRGB =
r > 60 &&
g > 40 &&
b > 20 &&
r > g &&
g > b

/* ===== filtro final ===== */

if(isSkinHue && isSkinYCbCr && isSkinRGB){
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

/* ========================= */

function rgbToHsv(r,g,b){

r /= 255
g /= 255
b /= 255

const max = Math.max(r,g,b)
const min = Math.min(r,g,b)
const d = max - min

let h = 0

if(d !== 0){

if(max === r){
h = ((g - b) / d) % 6
}else if(max === g){
h = (b - r) / d + 2
}else{
h = (r - g) / d + 4
}

h *= 60

if(h < 0) h += 360
}

return {h}
}
