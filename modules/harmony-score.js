export function calculateHarmonyScore(analysis){

if(!analysis.length) return 0

const colors = analysis.map(a=>hexToRgb(a.dominant))

const avg = averageColor(colors)

let totalDistance = 0

colors.forEach(c=>{
totalDistance += colorDistance(c,avg)
})

const avgDistance = totalDistance / colors.length

/* convertir distancia a score */

const maxDistance = 441

const score = 100 - (avgDistance/maxDistance)*100

return Math.round(score)

}

function hexToRgb(hex){

const bigint = parseInt(hex.slice(1),16)

return{
r:(bigint>>16)&255,
g:(bigint>>8)&255,
b:bigint&255
}

}

function averageColor(colors){

let r=0,g=0,b=0

colors.forEach(c=>{
r+=c.r
g+=c.g
b+=c.b
})

const n = colors.length

return{
r:Math.floor(r/n),
g:Math.floor(g/n),
b:Math.floor(b/n)
}

}

function colorDistance(a,b){

return Math.sqrt(
Math.pow(a.r-b.r,2)+
Math.pow(a.g-b.g,2)+
Math.pow(a.b-b.b,2)
)

}
