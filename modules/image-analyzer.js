import {extractDominantColor} from "./palette-extractor.js"

export function analyzeImages(gridContainer){

const images = gridContainer.querySelectorAll("img")

const results = []

images.forEach((img,index)=>{

const dominant = extractDominantColor(img)

results.push({

index:index,
dominant:dominant

})

})

return results

}
