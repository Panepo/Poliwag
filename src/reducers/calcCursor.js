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
	let p0
	let p1
	let p2
	let p3

	for (let j = 0; j < 3; j += 1) {
		output[j] = {}
		output[j].x = input[j].x
		output[j].y = input[j].y
		xTemp[j] = input[j].x
		yTemp[j] = input[j].y
	}

	for (let i = 3; i < point; i += 1) {
		xTemp[i % 4] = input[i].x
		yTemp[i % 4] = input[i].y

		switch (i % 4) {
		case 0:
			p0 = 1
			p1 = 2
			p2 = 3
			p3 = 0
			break
		case 1:
			p0 = 2
			p1 = 3
			p2 = 0
			p3 = 1
			break
		case 2:
			p0 = 3
			p1 = 0
			p2 = 1
			p3 = 2
			break
		case 3:
			p0 = 0
			p1 = 1
			p2 = 2
			p3 = 3
			break
		default:
			p0 = 0
			p1 = 1
			p2 = 2
			p3 = 3
			break
		}

		output[i] = {}
		output[i].x = (factor[0] * xTemp[p0] + factor[1] * xTemp[p1] + factor[2] * xTemp[p2] + factor[3] * xTemp[p3]) / factor[4]
		output[i].y = (factor[0] * yTemp[p0] + factor[1] * yTemp[p1] + factor[2] * yTemp[p2] + factor[3] * yTemp[p3]) / factor[4]
	}

	return output
}
