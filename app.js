import {createGrid, insertImages, reorderGrid} from "./modules/grid.js"
import {generateBridgeColor} from "./modules/bridge-generator.js"
import {optimizeGrid} from "./modules/grid-optimizer.js"
import {handleUpload} from "./modules/uploader.js"
import {enableDrag} from "./modules/drag-system.js"
import {analyzeImages} from "./modules/image-analyzer.js"
import {detectHarmonyIssues} from "./modules/harmony-engine.js"

const gridContainer = document.querySelector("#grid")
const uploadInput = document.querySelector("#upload")
const optimizeBtn = document.querySelector("#optimize")

createGrid(gridContainer,3,7)

/* =========================
   ANALYZE HARMONY
========================= */

function runHarmonyAnalysis(){

const analysis = analyzeImages(gridContainer)

console.log("Color analysis:",analysis)

const harmony = detectHarmonyIssues(analysis)

console.log("Harmony result:",harmony)

/* limpiar marcas anteriores */

document.querySelectorAll(".problem").forEach(el=>{
el.classList.remove("problem")
})

if(!harmony) return

const cells = gridContainer.querySelectorAll(".grid-cell")

const index = harmony.problemIndex

if(!cells[index]) return

cells[index].classList.add("problem")

/* calcular bridge color */

const problemColor = analysis[index].dominant

const avgColor = rgbToHex(
harmony.average.r,
harmony.average.g,
harmony.average.b
)

const bridgeColor = generateBridgeColor(problemColor,avgColor)

console.log("Bridge color:",bridgeColor)

/* insertar bridge */

insertBridge(index,bridgeColor)

}

/* =========================
   INSERT BRIDGE
========================= */

function insertBridge(index,color){

const cells = gridContainer.querySelectorAll(".grid-cell")

if(!cells[index] || !cells[index+1]) return

const img = cells[index].querySelector("img")

if(!img) return

/* mover imagen conflictiva */

cells[index+1].appendChild(img)

/* limpiar celda */

cells[index].innerHTML = ""

/* pintar color puente */

cells[index].style.backgroundColor = color
cells[index].style.backgroundImage = "none"

/* marcar como bridge */

cells[index].classList.add("bridge")

/* texto opcional */

cells[index].textContent = "bridge"

}


/* =========================
   IMAGE UPLOAD
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
   OPTIMIZE FEED
========================= */

optimizeBtn.addEventListener("click",()=>{

const analysis = analyzeImages(gridContainer)

const optimized = optimizeGrid(analysis)

console.log("Optimized order:",optimized)

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

