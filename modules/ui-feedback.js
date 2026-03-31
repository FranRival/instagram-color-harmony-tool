
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




export function renderUI(container, data){

let panel = document.getElementById("ui-panel")

if(!panel){

panel = document.createElement("div")
panel.id = "ui-panel"

container.parentNode.insertBefore(panel,container)

}

/* limpiar */

panel.innerHTML = ""

/* ===== info general ===== */

const info = document.createElement("div")

info.innerHTML = `
<div><strong>Feed Harmony:</strong> ${data.score}%</div>
<div><strong>Pattern:</strong> ${data.pattern}</div>
`

panel.appendChild(info)

/* ===== decisión ===== */

if(data.decision){

const d = data.decision

const decisionBox = document.createElement("div")

decisionBox.innerHTML = `
<hr>
<div>⚠ Imagen ${d.problemIndex}</div>
<div>Confianza: ${Math.round(d.confidence*100)}%</div>
<div>Acción: ${d.action}</div>
`

panel.appendChild(decisionBox)

}

/* ===== botones ===== */

const actions = document.createElement("div")

actions.innerHTML = `
<hr>
<button id="analyzeBtn">Analyze</button>
<button id="optimizeBtn">Optimize</button>
<button id="bridgeBtn">Insert Bridge</button>
<button id="ignoreBtn">Ignore</button>
<button id="resetBtn">Reset</button>
<button id="applyBridgeBtn">Apply</button>
`

panel.appendChild(actions)

}

