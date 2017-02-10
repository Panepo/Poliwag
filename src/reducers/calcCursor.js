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
