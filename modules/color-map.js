export function renderColorMap(container,analysis){

let map = document.getElementById("color-map")

if(!map){

map = document.createElement("div")
map.id = "color-map"

container.parentNode.insertBefore(map,container)

}

map.innerHTML = ""

analysis.forEach(item=>{

const swatch = document.createElement("div")

swatch.className = "color-swatch"
swatch.style.background = item.dominant

map.appendChild(swatch)

})

}
