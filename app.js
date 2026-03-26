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
let isAnalyzing = false

let gridState = []



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

if(isAnalyzing) return
isAnalyzing = true

if(!gridState.length){
isAnalyzing = false
return
}


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
isAnalyzing = false

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

if(hasBridge) return

gridState.splice(index,0,{
type: "bridge",
color: color
})

gridState = gridState.slice(0,21)

hasBridge = true

renderGrid()

}

/* =========================
   CLEAN GRID
========================= */

function cleanGrid(){

/* eliminar bridges del estado */

gridState = gridState.filter(item => item.type === "image")

hasBridge = false

renderGrid()

}



/* =========================
   UPLOAD
========================= */

uploadInput.addEventListener("change",(e)=>{

const files = e.target.files

const images = handleUpload(files)

/* guardar estado */

gridState = images.map(src => ({
type: "image",
src: src
}))

renderGrid()


enableDrag(gridContainer)

setTimeout(()=>{
runHarmonyAnalysis()
},200)

})





/* =========================
   OPTIMIZE (botón externo)
========================= */

const analysis = analyzeImages(gridContainer)

const pattern = detectPattern(analysis,3)

let optimized

if(pattern === "random"){
optimized = optimizeGrid(analysis)
}else{
optimized = optimizeByPattern(analysis,pattern,3)
}

/* reconstruir estado */

gridState = optimized.map(item => ({
type: "image",
src: gridState[item.index].src
}))

renderGrid()


/* =========================
   UTIL
========================= */

function rgbToHex(r,g,b){
return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)
}








function renderGrid(){

const cells = gridContainer.querySelectorAll(".grid-cell")

cells.forEach((cell,i)=>{

cell.innerHTML = ""
cell.style.background = ""
cell.classList.remove("bridge")

const item = gridState[i]

if(!item) return

if(item.type === "image"){

const img = document.createElement("img")
img.src = item.src
img.draggable = true

cell.appendChild(img)

}

if(item.type === "bridge"){

cell.style.background = item.color
cell.classList.add("bridge")
cell.textContent = "bridge"

}

})

}
