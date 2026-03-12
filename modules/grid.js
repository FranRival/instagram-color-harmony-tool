export function createGrid(container,columns=3,rows=7){

container.innerHTML=""

for(let i=0;i<columns*rows;i++){

const cell=document.createElement("div")
cell.className="grid-cell"

container.appendChild(cell)

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



