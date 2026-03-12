export function handleUpload(files){

const images=[]

for(const file of files){

const url = URL.createObjectURL(file)

images.push(url)

}

return images

}

