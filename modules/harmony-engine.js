
export function detectHarmonyIssues(analysis){

if(analysis.length === 0) return null

const colors = analysis.map(a => hexToRgb(a.dominant))

const avg = averageColor(colors)

let worstIndex = -1
let worstDistance = 0

colors.forEach((c,i)=>{

const dist = colorDistance(c,avg)

if(dist > worstDistance){

worstDistance = dist
worstIndex = i

}

})

return {
problemIndex: worstIndex,
distance: worstDistance,
average: avg
}

}

function hexToRgb(hex){

const bigint = parseInt(hex.slice(1),16)

return {
r:(bigint>>16)&255,
g:(bigint>>8)&255,
b:bigint&255
}

}

function averageColor(colors){

let r=0
let g=0
let b=0

colors.forEach(c=>{
r+=c.r
g+=c.g
b+=c.b
})

const total = colors.length

return {
r:Math.floor(r/total),
g:Math.floor(g/total),
b:Math.floor(b/total)
}

}

function colorDistance(c1,c2){

return Math.sqrt(
Math.pow(c1.r-c2.r,2)+
Math.pow(c1.g-c2.g,2)+
Math.pow(c1.b-c2.b,2)
)

}

