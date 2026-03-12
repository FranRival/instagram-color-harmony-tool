
import {createGrid, insertImages} from "./modules/grid.js"
import {handleUpload} from "./modules/uploader.js"
import {enableDrag} from "./modules/drag-system.js"
import {analyzeImages} from "./modules/image-analyzer.js"

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

},200)

})

