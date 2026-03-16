export function detectPattern(analysis,columns=3){

if(!analysis.length) return "random"

const colors = analysis.map(a=>a.dominant)

/* ===== checkerboard test ===== */ 

let checker = true

for(let i=0;i<colors.length;i++){

const row = Math.floor(i/columns)
const col = i%columns

const expected = (row+col)%2

if(expected===0 && colors[i]===colors[i+1]){
checker=false
break
}

}

if(checker) return "checkerboard"

/* ===== column theme test ===== */

let columnMatch = true

for(let c=0;c<columns;c++){

let base = colors[c]

for(let i=c;i<colors.length;i+=columns){

if(colors[i]!==base){
columnMatch=false
break
}

}

}

if(columnMatch) return "column"

/* ===== diagonal test ===== */

let diagonalMatch = true

for(let i=0;i<colors.length-columns-1;i++){

if(colors[i]!==colors[i+columns+1]){
diagonalMatch=false
break
}

}

if(diagonalMatch) return "diagonal"

return "random"

}
