export function analyzeDecision(analysis, harmony){

if(!analysis.length || !harmony){
return null
}

const index = harmony.problemIndex

if(!analysis[index]) return null

const problemColor = hexToRgb(analysis[index].dominant)
const avgColor = harmony.average

/* ===== distancia principal ===== */

const distance = colorDistance(problemColor, avgColor)

/* ===== distancia promedio ===== */

let total = 0

analysis.forEach(item=>{
const c = hexToRgb(item.dominant)
total += colorDistance(c, avgColor)
})

const avgDistance = total / analysis.length

/* ===== confianza base ===== */

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

/* ===== CLUSTER DE PIEL ===== */

const skinSamples = analysis
  .map(a => a.skin)
  .filter(Boolean)

let skinCluster = null

if(skinSamples.length >= 3){

let r=0,g=0,b=0

skinSamples.forEach(s=>{
r+=s.r
g+=s.g
b+=s.b
})

const n = skinSamples.length

skinCluster = {
r: Math.floor(r/n),
g: Math.floor(g/n),
b: Math.floor(b/n)
}

}

/* ===== AJUSTE POR PIEL ===== */

if(skinCluster && analysis[index].skin){

const skinDistance = colorDistance(
analysis[index].skin,
skinCluster
)

/* misma persona → bajar confianza */

if(skinDistance < 35){
confidence *= 0.4
}

/* muy diferente → subir confianza */

if(skinDistance > 80){
confidence *= 1.2
}

}

/* ===== decisión ===== */

let action = "ignore"

if(confidence > 0.8){
action = "fix"
}else if(confidence > 0.6){
action = "suggest"
}

/* ===== severidad ===== */

let severity = "low"

if(confidence > 0.8){
severity = "high"
}else if(confidence > 0.6){
severity = "medium"
}

/* ===== output ===== */

return {
problemIndex: index,
confidence: Number(confidence.toFixed(2)),
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
