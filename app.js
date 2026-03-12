
import {createGrid, insertImages} from "./modules/grid.js"
import {handleUpload} from "./modules/uploader.js"

const gridContainer = document.querySelector("#grid")
const uploadInput = document.querySelector("#upload")

createGrid(gridContainer,3,7)

uploadInput.addEventListener("change",(e)=>{

const files = e.target.files

const images = handleUpload(files)

insertImages(gridContainer,images)

})

