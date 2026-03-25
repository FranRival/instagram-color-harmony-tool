import {createGrid, insertImages, reorderGrid} from "./modules/grid.js"
import {generateBridgeColor} from "./modules/bridge-generator.js"
import {optimizeGrid} from "./modules/grid-optimizer.js"
import {handleUpload} from "./modules/uploader.js"
import {enableDrag} from "./modules/drag-system.js"
import {analyzeImages} from "./modules/image-analyzer.js"
import {detectHarmonyIssues} from "./modules/harmony-engine.js"
import {renderColorStrip} from "./modules/ui-feedback.js"
import {calculateHarmonyScore} from "./modules/harmony-score.js"
import {renderColorMap} from "./modules/color-map.js"
import {detectPattern} from "./modules/pattern-detector.js"
import {optimizeByPattern} from "./modules/pattern-optimizer.js"
import {analyzeDecision} from "./modules/decision-engine.js"
import {renderUI} from "./modules/ui-feedback.js"

/* =========================
   GLOBAL STATE
========================= */

let currentDecision = null
let currentAnalysis = null
let currentHarmony = null

let hasBridge = false


/* =========================
   DOM
========================= */

const gridContainer = document.querySelector("#grid")
const uploadInput = document.querySelector("#upload")
const optimizeBtn = document.querySelector("#optimize")

createGrid(gridContainer,3,7)

/* score UI */

const scoreDisplay = document.createElement("div")
scoreDisplay.id = "harmony-score"
scoreDisplay.innerText = "Feed Harmony: --%"

gridContainer.parentNode.insertBefore(scoreDisplay,gridContainer)

/* =========================
   ANALYZE
========================= */

function runHarmonyAnalysis(){
   hasBridge = false

const analysis = analyzeImages(gridContainer)
const harmony = detectHarmonyIssues(analysis)
const decision = analyzeDecision(analysis, harmony)
const pattern = detectPattern(analysis,3)
const score = calculateHarmonyScore(analysis)

/* guardar estado */

currentDecision = decision
currentAnalysis = analysis
currentHarmony = harmony

/* visualizaciones */

renderColorMap(gridContainer,analysis)
renderColorStrip(gridContainer,analysis)

/* limpiar marcas */

document.querySelectorAll(".problem").forEach(el=>{
el.classList.remove("problem")
})

/* marcar problema */

if(harmony){

const cells = gridContainer.querySelectorAll(".grid-cell")

if(cells[harmony.problemIndex]){
cells[harmony.problemIndex].classList.add("problem")
}

}

/* score */

scoreDisplay.innerText = "Feed Harmony: " + score + "%"

/* UI */

renderUI(gridContainer,{
score,
pattern,
decision
})

/* eventos UI */

attachUIEvents()

}

/* =========================
   UI EVENTS
========================= */

function attachUIEvents(){

setTimeout(()=>{

const analyzeBtn = document.getElementById("analyzeBtn")
if(analyzeBtn){
analyzeBtn.onclick = ()=>{
runHarmonyAnalysis()
}
}

const optimizeBtnUI = document.getElementById("optimizeBtn")
if(optimizeBtnUI){
optimizeBtnUI.onclick = ()=>{

cleanGrid()

const analysis = analyzeImages(gridContainer)
const pattern = detectPattern(analysis,3)

let optimized

if(pattern === "random"){
optimized = optimizeGrid(analysis)
}else{
optimized = optimizeByPattern(analysis,pattern,3)
}

reorderGrid(gridContainer,optimized)

setTimeout(()=>{
runHarmonyAnalysis()
},100)

}
}









const bridgeBtn = document.getElementById("bridgeBtn")
if(bridgeBtn){
bridgeBtn.onclick = ()=>{

if(hasBridge) return

if(!currentDecision || currentDecision.action === "ignore") return

const index = currentDecision.problemIndex

const problemColor = currentAnalysis[index].dominant

const avgColor = rgbToHex(
currentHarmony.average.r,
currentHarmony.average.g,
currentHarmony.average.b
)

const bridgeColor = generateBridgeColor(problemColor,avgColor)

insertBridge(index,bridgeColor)

hasBridge = true

}



}

const ignoreBtn = document.getElementById("ignoreBtn")
if(ignoreBtn){
ignoreBtn.onclick = ()=>{
console.log("Ignored")
}
}

},0)




const resetBtn = document.getElementById("resetBtn")

if(resetBtn){
resetBtn.onclick = ()=>{
cleanGrid()
runHarmonyAnalysis()
}
}


}


/* =========================
   INSERT BRIDGE
========================= */

function insertBridge(index,color){

const cells = gridContainer.querySelectorAll(".grid-cell")

const images = []

cells.forEach(cell=>{
const img = cell.querySelector("img")
images.push(img ? img.src : null)
})

images.splice(index,0,"BRIDGE")
images.length = cells.length

cells.forEach(cell=>{
cell.innerHTML = ""
cell.style.background = ""
cell.classList.remove("bridge")
})

images.forEach((src,i)=>{

if(src === "BRIDGE"){

cells[i].style.background = color
cells[i].classList.add("bridge")
cells[i].textContent = "bridge"

}else if(src){

const img = document.createElement("img")
img.src = src
img.draggable = true

cells[i].appendChild(img)

}

})

}

/* =========================
   CLEAN GRID
========================= */

function cleanGrid(){

const cells = gridContainer.querySelectorAll(".grid-cell")

cells.forEach(cell=>{

/* eliminar estilos */

cell.style.background = ""
cell.classList.remove("bridge")

/* eliminar texto */

if(!cell.querySelector("img")){
cell.innerHTML = ""
}

})

hasBridge = false

}


/* =========================
   UPLOAD
========================= */

uploadInput.addEventListener("change",(e)=>{

const files = e.target.files

const images = handleUpload(files)

insertImages(gridContainer,images)

enableDrag(gridContainer)

setTimeout(()=>{
runHarmonyAnalysis()
},200)

})

/* =========================
   OPTIMIZE (botón externo)
========================= */

optimizeBtn.addEventListener("click",()=>{

cleanGrid()

const analysis = analyzeImages(gridContainer)
const pattern = detectPattern(analysis,3)

let optimized

if(pattern === "random"){
optimized = optimizeGrid(analysis)
}else{
optimized = optimizeByPattern(analysis,pattern,3)
}

reorderGrid(gridContainer,optimized)

setTimeout(()=>{
runHarmonyAnalysis()
},100)

})

/* =========================
   UTIL
========================= */

function rgbToHex(r,g,b){
return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)
}
