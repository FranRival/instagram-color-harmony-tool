export function createGrid(container,columns=3,rows=7){

container.innerHTML=""

for(let i=0;i<columns*rows;i++){

const cell=document.createElement("div")
cell.className="grid-cell"

container.appendChild(cell)

}

}

function runHarmonyAnalysis(){

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

}



export function insertImages(container,images){

const cells = container.querySelectorAll(".grid-cell")

images.forEach((src,index)=>{

if(cells[index]){

const img=document.createElement("img")
img.src=src
img.draggable=true

cells[index].appendChild(img)

}

})

}

export function reorderGrid(container,newOrder){

const cells = container.querySelectorAll(".grid-cell")

const images = []

cells.forEach(cell=>{
const img = cell.querySelector("img")
if(img) images.push(img.src)
})

newOrder.forEach((item,index)=>{

if(cells[index] && images[item.index]){

cells[index].innerHTML=""

const img = document.createElement("img")

img.src = images[item.index]
img.draggable=true

cells[index].appendChild(img)

}

})

}





