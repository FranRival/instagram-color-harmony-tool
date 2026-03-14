export function optimizeGrid(analysis){

const avg = averageColor(
analysis.map(a => hexToRgb(a.dominant))
)

const scored = analysis.map(item =>{

const rgb = hexToRgb(item.dominant)

return{
...item,
distance: colorDistance(rgb,avg)
}

})

scored.sort((a,b)=>a.distance-b.distance)

return scored

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

let r=0
let g=0
let b=0

colors.forEach(c=>{
r+=c.r
g+=c.g
b+=c.b
})

const total = colors.length

return{
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

