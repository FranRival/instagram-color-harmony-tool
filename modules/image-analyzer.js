import {extractDominantColor} from "./palette-extractor.js"
import {detectSkinTone} from "./skin-detector.js"

export function analyzeImages(gridContainer){

const images = gridContainer.querySelectorAll("img")

const results = []

images.forEach((img,index)=>{

const dominant = extractDominantColor(img)

/* detectar tono de piel */

const skin = detectSkinTone(img)

results.push({

index:index,
dominant:dominant,
skin:skin

})

})

return results

}
