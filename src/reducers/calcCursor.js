export function cursorMovingAverage(input, point, factor) {
	let output = []
	let xTemp
	let yTemp
	let aveFactor = factor

	if (aveFactor > 100) {
		aveFactor = 100
	}

	if (aveFactor) {
		xTemp = input[0].x
		yTemp = input[0].y
		output[0] = {}
		output[0].x = input[0].x
		output[0].y = input[0].y

		for (let i = 1; i < point; i += 1) {
			output[i] = {}
			output[i].x = Math.floor((xTemp * aveFactor + input[i].x * (100 - aveFactor)) / 100)
			output[i].y = Math.floor((yTemp * aveFactor + input[i].y * (100 - aveFactor)) / 100)
			xTemp = output[i].x
			yTemp = output[i].y
		}
	} else {
		output = input
	}

	return output
}

export function cursorLimitation(input, point, factor) {
	let output = []
	let xTemp
	let yTemp

	if (factor) {
		xTemp = input[0].x
		yTemp = input[0].y
		output[0] = {}
		output[0].x = input[0].x
		output[0].y = input[0].y

		for (let i = 1; i < point; i += 1) {
			output[i] = {}
			if (Math.abs(input[i].x - xTemp) < factor) {
				output[i].x = xTemp
			} else {
				output[i].x = input[i].x
			}

			if (Math.abs(input[i].y - yTemp) < factor) {
				output[i].y = yTemp
			} else {
				output[i].y = input[i].y
			}

			xTemp = output[i].x
			yTemp = output[i].y
		}
	} else {
		output = input
	}

	return output
}

export function cursorBeizer(input, point) {
	const factor = [27, 27, 9, 1, 64]
	const output = []
	const xTemp = []
	const yTemp = []

	output[0] = {}
	output[0].x = input[0].x
	output[0].y = input[0].y
	for (let i = 0; i < 3; i += 1) {
		xTemp[i] = input[i].x
		yTemp[i] = input[i].y
	}

	for (let i = 1; i < point; i += 1) {
		output[i] = {}
		output[i].x = (factor[0] * xTemp[0] + factor[1] * xTemp[1] + factor[2] * xTemp[2] + factor[3] * input[i].x) / factor[4]
		output[i].y = (factor[0] * yTemp[0] + factor[1] * yTemp[1] + factor[2] * yTemp[2] + factor[3] * input[i].y) / factor[4]

		xTemp[0] = xTemp[1]
		xTemp[1] = xTemp[2]
		xTemp[2] = output[i].x

		yTemp[0] = yTemp[1]
		yTemp[1] = yTemp[2]
		yTemp[2] = output[i].y
	}

	return output
}
