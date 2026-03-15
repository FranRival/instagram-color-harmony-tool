
export function renderColorStrip(container,analysis){

let strip = document.querySelector("#color-strip")

if(!strip){

strip = document.createElement("div")
strip.id = "color-strip"

container.parentNode.insertBefore(strip,container)

}

strip.innerHTML = ""

analysis.forEach(item=>{

const swatch = document.createElement("div")

swatch.className = "color-swatch"
swatch.style.background = item.dominant

strip.appendChild(swatch)

})

}
