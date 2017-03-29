import * as math from 'mathjs'
import { cursorMovingAverage, cursorLimitation, cursorBeizerE, cursorBeizerS } from './calcCursor'

export function calcRawData(speedFactor, reportFactor, sourceFactor, point) {
	const range = Math.floor(speedFactor / reportFactor)
	const factorA = sourceFactor.a
	const factorB = sourceFactor.b
	const factorC = sourceFactor.c
	const rawData = []
	let r

	for (let i = 0; i < point; i += 1) {
		rawData[i] = {}
		rawData[i].x = i * range
		rawData[i].y = Math.floor(factorA * (i * range / point) * Math.sin(i / factorB)) + factorC
		//r = math.sec(0.4 * math.acos(Math.cos(2.5 * i)))
		//rawData[i].x = r * Math.cos(i) * range * 50
		//rawData[i].y = r * Math.sin(i) * range * 50
	}

	return rawData
}

export function calcNoiseData(noiseFactor, point, rawData) {
	let noiseData = []
	let noiseX
	let noiseY

	if (noiseFactor) {
		for (let i = 0; i < point; i += 1) {
			noiseX = Math.floor(noiseFactor * Math.random())
			noiseY = Math.floor(noiseFactor * Math.random())
			noiseData[i] = {}
			noiseData[i].x = rawData[i].x - Math.floor(noiseFactor / 2) + noiseX
			noiseData[i].y = rawData[i].y - Math.floor(noiseFactor / 2) + noiseY
		}
	} else {
		noiseData = rawData
	}

	return noiseData
}

export function calcOutData(noiseData, aveFactor, limFactor, mode, point) {
	let dataLoopInp = noiseData
	let dataLoopOut = noiseData
	const modString = mode.toString()

	for (let i = 0; i < modString.length; i += 1) {
		switch (modString.charAt(i)) {
		case '1':
			dataLoopOut = cursorLimitation(dataLoopInp, point, limFactor)
			break
		case '2':
			dataLoopOut = cursorMovingAverage(dataLoopInp, point, aveFactor)
			break
		case '3':
			dataLoopOut = cursorBeizerE(dataLoopInp, point)
			break
		case '4':
			dataLoopOut = cursorBeizerS(dataLoopInp, point)
			break
		default:
			dataLoopOut = dataLoopInp
		}

		dataLoopInp = dataLoopOut
	}

	return dataLoopOut
}

export function calcQuantData(input, point, level) {
	const output = input

	for (let i = 0; i < point; i += 1) {
		output[0].values[i].x = Math.floor(output[0].values[i].x / level)
		output[0].values[i].y = Math.floor(output[0].values[i].y / level)
		output[1].values[i].x = Math.floor(output[1].values[i].x / level)
		output[1].values[i].y = Math.floor(output[1].values[i].y / level)
		output[2].values[i].x = Math.floor(output[2].values[i].x / level)
		output[2].values[i].y = Math.floor(output[2].values[i].y / level)
	}

	return output
}

export function calcDispData(input, options) {
	const output = input

	if ((options & 1)) {
		output[0].strokeWidth = 1
	} else {
		output[0].strokeWidth = 0
	}
	if ((options & 2)) {
		output[1].strokeWidth = 1
	} else {
		output[1].strokeWidth = 0
	}
	if ((options & 4)) {
		output[2].strokeWidth = 1
	} else {
		output[2].strokeWidth = 0
	}

	return output
}
