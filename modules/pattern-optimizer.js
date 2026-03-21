export function optimizeByPattern(analysis,pattern,columns=3){

const items = [...analysis]

if(pattern === "checkerboard"){

/* ordenar por color (simple) */

items.sort((a,b)=>a.dominant.localeCompare(b.dominant))

const result = new Array(items.length)

let even = 0
let odd = Math.ceil(items.length/2)

for(let i=0;i<items.length;i++){

const row = Math.floor(i/columns)
const col = i%columns

if((row+col)%2===0){
result[i] = items[even++]
}else{
result[i] = items[odd++]
}

}

return result

}

/* ===== column pattern ===== */

if(pattern === "column"){

items.sort((a,b)=>a.dominant.localeCompare(b.dominant))

const result = new Array(items.length)

let index = 0

for(let col=0;col<columns;col++){

for(let i=col;i<items.length;i+=columns){

result[i] = items[index++]

}

}

return result

}

/* ===== fallback ===== */

return items

}
