# Instagram Color Harmony Tool

Webtool para analizar la armonía de color de un feed de Instagram, ordenar automáticamente imágenes y sugerir imágenes puente cuando una imagen rompe la continuidad cromática del grid.

---

# Arquitectura del proyecto

instagram-color-harmony-tool/

index.html
style.css
app.js

/modules
grid.js
uploader.js
image-analyzer.js
palette-extractor.js
harmony-engine.js
grid-optimizer.js
bridge-generator.js
ui-feedback.js

Todo el sistema funciona **client-side (JavaScript)** sin backend.

---

# Fase 1 — Base visual

## Módulo 1 — Grid de Instagram

Archivo:

grid.js

Responsabilidades:

- Generar grid **3x7 (21 slots)**
- Permitir insertar imágenes
- Permitir reordenar imágenes
- Preview tipo feed de Instagram

Funciones principales:

createGrid()
insertImage(slot, image)
swapImages(slotA, slotB)


Resultado esperado:
	•	Grid visual tipo Instagram
	•	Soporte drag & drop



# Módulo 2 — Subida de imágenes

Archivo:

uploader.js

Responsabilidades:
	•	Subir imágenes
	•	Arrastrar y soltar
	•	Convertir imágenes a canvas
	•	Enviar imagen al analizador

Funciones:

handleUpload()
handleDragDrop()
readImageFile()


Fase 2 — Análisis de color

Módulo 3 — Extracción de paleta

Archivo:

palette-extractor.js

Librerías recomendadas:
	•	color-thief
	•	vibrant.js

Funciones:

extractPalette(image)
getDominantColor()
getTopColors()

Resultado esperado:

[
  "#E3A3A3",
  "#D47C7C",
  "#8F3F3F"
]

Módulo 4 — Análisis de imagen

Archivo:

image-analyzer.js

Cada imagen se guarda como objeto:

{
 id,
 position,
 palette,
 dominantColor,
 avgColor,
 saturation,
 brightness
}

Esto permite comparar imágenes entre sí.

⸻

Fase 3 — Motor de armonía

Módulo 5 — Motor de armonía de color

Archivo:

harmony-engine.js

Funciones principales:

colorDistance(colorA, colorB)
evaluateNeighborHarmony(imageA, imageB)
evaluateGridHarmony()

Espacio de color recomendado:

LAB color space

Ventaja:
	•	Mejores comparaciones perceptuales que RGB.

El motor analiza:
	•	Continuidad de color
	•	Saturación
	•	Saltos bruscos

⸻

Fase 4 — Orden automático del grid

Módulo 6 — Optimización del grid

Archivo:

grid-optimizer.js

Entrada:

21 imágenes

Salida:

orden optimizado del feed

Proceso:
	1.	Comparar colores de todas las imágenes
	2.	Agrupar colores similares
	3.	Generar flujo cromático

Funciones:

sortImagesByColor()
optimizeGrid()
generateGradientFlow()


Resultado:
	•	Feed con degradado natural
	•	Transiciones suaves entre imágenes

⸻

Fase 5 — Detector de ruptura cromática

Archivo:

harmony-engine.js

Funciones nuevas:

detectColorBreak()
flagProblemImages()

Resultado:

Image 12 breaks color harmony with neighbors

La interfaz mostrará advertencias visuales.

⸻

Fase 6 — Generador de puente cromático

Archivo:

bridge-generator.js

Responsabilidades:

Analizar una imagen conflictiva y calcular un color de transición entre:

color vecino
+
color conflictivo

Funciones:

analyzeConflict(image, neighbors)
calculateBridgeColor()
generateBridgePalette()

Resultado:

Suggested bridge palette:

#E95A5A
#D63B3B
#F18A8A



