import {
	SWITCH_MODE,
	MODIFY_INPUT
} from '../constants/constActionTypes'

import { calcRawData, calcNoiseData, calcOutData } from './calcData'

const initialState = {
	speedFactor: 1000,
	reportFactor: 150,
	sourceFactor: { a: 1000, b: 10, c: 1500 },
	noiseFactor: 40,
	linearFactor: 50,
	jitterFactor: 20,
	mode: 1,
	point: 200,
	output: [
		{
			name: 'raw',
			values: [],
			strokeWidth: 1,
			strokeDashArray: '1,1'
		},
		{
			name: 'noised',
			values: [],
			strokeWidth: 1,
			strokeDashArray: '1,1'
		},
		{
			name: 'output',
			values: [],
			strokeWidth: 3
		}
	]
}
let outputTemp = []

export default function reducerCalc(state = initialState, action) {
	switch (action.type) {
	case SWITCH_MODE:
		return state
	case MODIFY_INPUT:
		switch (action.modelId) {
		case 'speedFactor':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(action.modelValue, state.reportFactor, state.sourceFactor, state.point)
			outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, state.point)
			return Object.assign({}, state, {
				speedFactor: action.modelValue,
				output: outputTemp
			})
		case 'reportFactor':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(state.speedFactor, action.modelValue, state.sourceFactor, state.point)
			outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, state.point)
			return Object.assign({}, state, {
				reportFactor: action.modelValue,
				output: outputTemp
			})
		case 'noiseFactor':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
			outputTemp[1].values = calcNoiseData(action.modelValue, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, state.point)
			return Object.assign({}, state, {
				noiseFactor: action.modelValue,
				output: outputTemp
			})
		case 'point':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, action.modelValue)
			outputTemp[1].values = calcNoiseData(state.noiseFactor, action.modelValue, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, action.modelValue)
			return Object.assign({}, state, {
				point: action.modelValue,
				output: outputTemp
			})
		case 'linearFactor':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
			outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, action.modelValue, state.jitterFactor, state.mode, state.point)
			return Object.assign({}, state, {
				linearFactor: action.modelValue,
				output: outputTemp
			})
		case 'jitterFactor':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
			outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, action.modelValue, state.mode, state.point)
			return Object.assign({}, state, {
				jitterFactor: action.modelValue,
				output: outputTemp
			})
		default:
			break
		}
		return state
	default:
		outputTemp = state.output
		outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
		outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
		outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, state.point)
		return Object.assign({}, state, {
			output: outputTemp
		})
	}
}
