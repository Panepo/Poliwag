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
	let noiseData = []
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
	} else {
		noiseData = rawData
	}

	return noiseData
}

export function calcOutData(noiseData, linearFactor, jitterFactor, mode, point) {
	let outData1 = []
	let outData2 = []
	let xLinear
	let yLinear
	let xJitter
	let yJitter

	switch (mode) {
	case 1:
		if (jitterFactor) {
			xJitter = noiseData[0].x
			yJitter = noiseData[0].y
			outData1[0] = {}
			outData1[0].x = noiseData[0].x
			outData1[0].y = noiseData[0].y

			for (let i = 1; i < point; i++) {
				outData1[i] = {}
				if (Math.abs(noiseData[i].x - xJitter) < jitterFactor) {
					outData1[i].x = xJitter
				} else {
					outData1[i].x = noiseData[i].x
				}

				if (Math.abs(noiseData[i].y - yJitter) < jitterFactor) {
					outData1[i].y = yJitter
				} else {
					outData1[i].y = noiseData[i].y
				}

				xJitter = outData1[i].x
				yJitter = outData1[i].y
			}
		} else {
			outData1 = outData1
		}

		if (linearFactor) {
			xLinear = outData1[0].x
			yLinear = outData1[0].y
			outData2[0] = {}
			outData2[0].x = outData1[0].x
			outData2[0].y = outData1[0].y

			for (let i = 1; i < point; i++) {
				outData2[i] = {}
				outData2[i].x = (xLinear * linearFactor + outData1[i].x * (100 - linearFactor)) / 100;
				outData2[i].y = (yLinear * linearFactor + outData1[i].y * (100 - linearFactor)) / 100;
				xLinear = outData2[i].x
				yLinear = outData2[i].y
			}
		} else {
			outData2 = outData1
		}
		
	case 2:
		if (linearFactor) {
			xLinear = noiseData[0].x
			yLinear = noiseData[0].y
			outData1[0] = {}
			outData1[0].x = noiseData[0].x
			outData1[0].y = noiseData[0].y

			for (let i = 1; i < point; i++) {
				outData1[i] = {}
				outData1[i].x = (xLinear * linearFactor + noiseData[i].x * (100 - linearFactor)) / 100;
				outData1[i].y = (yLinear * linearFactor + noiseData[i].y * (100 - linearFactor)) / 100;
				xLinear = outData1[i].x
				yLinear = outData1[i].y
			}
		} else {
			outData1 = noiseData
		}

		if (jitterFactor) {
			xJitter = outData1[0].x
			yJitter = outData1[0].y
			outData2[0] = {}
			outData2[0].x = outData1[0].x
			outData2[0].y = outData1[0].y

			for (let i = 1; i < point; i++) {
				outData2[i] = {}
				if (Math.abs(outData1[i].x - xJitter) < jitterFactor) {
					outData2[i].x = xJitter
				} else {
					outData2[i].x = outData1[i].x
				}

				if (Math.abs(outData1[i].y - yJitter) < jitterFactor) {
					outData2[i].y = yJitter
				} else {
					outData2[i].y = outData1[i].y
				}

				xJitter = outData2[i].x
				yJitter = outData2[i].y
			}
		} else {
			outData2 = outData1
		}
		break
	default:
		outData2 = noiseData
	}

	return outData2
}
