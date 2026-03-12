
import {createGrid, insertImages} from "./modules/grid.js"
import {handleUpload} from "./modules/uploader.js"
import {enableDrag} from "./modules/drag-system.js"
import {analyzeImages} from "./modules/image-analyzer.js"
import {detectHarmonyIssues} from "./modules/harmony-engine.js"

const gridContainer = document.querySelector("#grid")
const uploadInput = document.querySelector("#upload")

createGrid(gridContainer,3,7)

uploadInput.addEventListener("change",(e)=>{

const files = e.target.files

const images = handleUpload(files)

insertImages(gridContainer,images)

enableDrag(gridContainer)

setTimeout(()=>{

const analysis = analyzeImages(gridContainer)

console.log("Color analysis:",analysis)

const harmony = detectHarmonyIssues(analysis)

console.log("Harmony result:",harmony)

/* limpiar problemas anteriores */

document.querySelectorAll(".problem").forEach(el=>{
el.classList.remove("problem")
})

/* marcar imagen problemática */

if(harmony){

const cells = gridContainer.querySelectorAll(".grid-cell")

cells[harmony.problemIndex].classList.add("problem")

}

},200)

})

