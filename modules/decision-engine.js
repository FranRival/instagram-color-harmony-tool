export function analyzeDecision(analysis, harmony){

if(!analysis.length || !harmony){
return null
}

const index = harmony.problemIndex

if(!analysis[index]) return null

const problemColor = hexToRgb(analysis[index].dominant)
const avgColor = harmony.average

/* calcular distancia real */

const distance = colorDistance(problemColor, avgColor)

/* calcular distancia promedio del feed */

let total = 0

analysis.forEach(item=>{
const c = hexToRgb(item.dominant)
total += colorDistance(c, avgColor)
})

const avgDistance = total / analysis.length

/* ===== confianza ===== */

let confidence = 0

if(distance > avgDistance * 1.4){
confidence = 0.9
}else if(distance > avgDistance * 1.2){
confidence = 0.7
}else if(distance > avgDistance){
confidence = 0.5
}else{
confidence = 0.2
}

/* ===== decisión ===== */

let action = "ignore"

if(confidence > 0.8){
action = "fix"
}else if(confidence > 0.6){
action = "suggest"
}

/* ===== tipo ===== */

let severity = "low"

if(confidence > 0.8){
severity = "high"
}else if(confidence > 0.6){
severity = "medium"
}

/* ===== output ===== */

return {
problemIndex: index,
confidence,
severity,
action,
distance,
avgDistance
}

}

/* ========================= */

function hexToRgb(hex){

const bigint = parseInt(hex.slice(1),16)

return {
r:(bigint>>16)&255,
g:(bigint>>8)&255,
b:bigint&255
}

}

function colorDistance(a,b){

return Math.sqrt(
Math.pow(a.r-b.r,2)+
Math.pow(a.g-b.g,2)+
Math.pow(a.b-b.b,2)
)

}
