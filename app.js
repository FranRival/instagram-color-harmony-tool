
import {createGrid, insertImages, reorderGrid} from "./modules/grid.js"
import {optimizeGrid} from "./modules/grid-optimizer.js"
import {handleUpload} from "./modules/uploader.js"
import {enableDrag} from "./modules/drag-system.js"
import {analyzeImages} from "./modules/image-analyzer.js"
import {detectHarmonyIssues} from "./modules/harmony-engine.js"



const gridContainer = document.querySelector("#grid")
const uploadInput = document.querySelector("#upload")

createGrid(gridContainer,3,7)

/* función central de análisis */

function runHarmonyAnalysis(){

const analysis = analyzeImages(gridContainer)

console.log("Color analysis:",analysis)

const harmony = detectHarmonyIssues(analysis)

console.log("Harmony result:",harmony)

document.querySelectorAll(".problem").forEach(el=>{
el.classList.remove("problem")
})

if(harmony){

const cells = gridContainer.querySelectorAll(".grid-cell")

cells[harmony.problemIndex].classList.add("problem")

}

}

uploadInput.addEventListener("change",(e)=>{

const files = e.target.files

const images = handleUpload(files)

insertImages(gridContainer,images)

enableDrag(gridContainer)

setTimeout(()=>{

runHarmonyAnalysis()

},200)

})

const optimizeBtn = document.querySelector("#optimize")

optimizeBtn.addEventListener("click",()=>{

const analysis = analyzeImages(gridContainer)

const optimized = optimizeGrid(analysis)

reorderGrid(gridContainer,optimized)

runHarmonyAnalysis()

})


