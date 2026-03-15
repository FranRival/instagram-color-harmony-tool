export function enableDrag(gridContainer){

let dragged = null

gridContainer.querySelectorAll(".grid-cell").forEach(cell => {

cell.addEventListener("dragstart", (e)=>{
dragged = e.target
})

cell.addEventListener("dragover",(e)=>{
e.preventDefault()
})

cell.addEventListener("drop",(e)=>{

e.preventDefault()

const target = cell.querySelector("img")

if(!dragged || !target) return

const draggedSrc = dragged.src
const targetSrc = target.src

dragged.src = targetSrc
target.src = draggedSrc

})

})

}

