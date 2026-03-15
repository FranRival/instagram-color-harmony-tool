export function extractDominantColor(image){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 80
canvas.height = 80

ctx.drawImage(image,0,0,80,80)

const data = ctx.getImageData(0,0,80,80).data

const buckets = {}

for(let i=0;i<data.length;i+=16){

const r = data[i]
const g = data[i+1]
const b = data[i+2]

/* ignorar blancos */

if(r>240 && g>240 && b>240) continue

/* ignorar negros */

if(r<30 && g<30 && b<30) continue

/* saturación */

const max = Math.max(r,g,b)
const min = Math.min(r,g,b)

const saturation = max - min

/* ignorar gris */

if(saturation < 25) continue

/* reducir precisión para agrupar */

const rr = Math.floor(r/32)*32
const gg = Math.floor(g/32)*32
const bb = Math.floor(b/32)*32

const key = `${rr},${gg},${bb}`

buckets[key] = (buckets[key] || 0) + 1

}

let dominant = null
let maxCount = 0

for(const key in buckets){

if(buckets[key] > maxCount){

maxCount = buckets[key]
dominant = key

}

}

if(!dominant){

return "#888888"

}

const [r,g,b] = dominant.split(",")

return rgbToHex(Number(r),Number(g),Number(b))

}

function rgbToHex(r,g,b){
return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)
}


//filtramos colores problematicos: blanco, negro, gris
//ahora, detectamos la ruptura. Pero no podemos decidir que tan armonico es el feed completo
//Hay que construir Harmony Score