export function calcRawData(speedFactor, reportFactor, sourceFactor, point) {
	const range = Math.floor(speedFactor / reportFactor)
	const factorA = sourceFactor.a
	const factorB = sourceFactor.b
	const factorC = sourceFactor.c
	const rawData = []

	for (let i = 0; i < point; i++) {
		rawData[i] = {}
		rawData[i].x = i * range
		rawData[i].y = Math.floor(factorA * (i / point) * Math.sin(i / factorB)) + factorC
	}

	return rawData
}

export function calcNoiseData(noiseFactor, point, rawData) {
	const noiseData = []
	let noiseX
	let noiseY

	if (noiseFactor) {
		for (let i = 0; i < point; i++) {
			noiseX = Math.floor(noiseFactor * Math.random() * 2)
			noiseY = Math.floor(noiseFactor * Math.random() * 2)
			noiseData[i] = {}
			noiseData[i].x = rawData[i].x - noiseFactor + noiseX
			noiseData[i].y = rawData[i].y - noiseFactor + noiseY
		}
	}

	return noiseData
}
