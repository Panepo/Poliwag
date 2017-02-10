import {
	SWITCH_MODE,
	MODIFY_SOURCE,
	MODIFY_FACTOR,
	MODIFY_PARAMETER,
	MODIFY_OPTION
} from '../constants/constActionTypes'

import { calcRawData, calcNoiseData, calcOutData, calcQuantData, calcDispData } from './calcData'

const initialState = {
	dispOption: 1 | 2 | 4,
	speedFactor: 3000,
	reportFactor: 150,
	sourceFactor: { a: 1000, b: 10, c: 1500 },
	noiseFactor: 40,
	linearFactor: 50,
	jitterFactor: 20,
	mode: 1,
	point: 200,
	quantLevel: 20,
	output: [
		{
			name: 'Raw',
			values: [],
			strokeWidth: 1
		},
		{
			name: 'Noised',
			values: [],
			strokeWidth: 1
		},
		{
			name: 'Output',
			values: [],
			strokeWidth: 1
		}
	]
}
let outputTemp = []
let stateTemp

export default function reducerCalc(state = initialState, action) {
	switch (action.type) {
	case SWITCH_MODE:
		switch (action.modelId) {
		default:
			return state
		}
	case MODIFY_SOURCE:
		switch (action.modelId) {
		default:
			return state
		}
	case MODIFY_OPTION:
		switch (action.modelId) {
		case 'dispOption1':
			stateTemp = state.dispOption
			if (stateTemp & 1) {
				stateTemp ^= 1
			} else {
				stateTemp |= 1
			}
			outputTemp = state.output
			outputTemp = calcDispData(outputTemp, stateTemp)
			return Object.assign({}, state, {
				dispOption: stateTemp,
				output: outputTemp
			})
		case 'dispOption2':
			stateTemp = state.dispOption
			if (stateTemp & 2) {
				stateTemp ^= 2
			} else {
				stateTemp |= 2
			}
			outputTemp = state.output
			outputTemp = calcDispData(outputTemp, stateTemp)
			return Object.assign({}, state, {
				dispOption: stateTemp,
				output: outputTemp
			})
		case 'dispOption4':
			stateTemp = state.dispOption
			if (stateTemp & 4) {
				stateTemp ^= 4
			} else {
				stateTemp |= 4
			}
			outputTemp = state.output
			outputTemp = calcDispData(outputTemp, stateTemp)
			return Object.assign({}, state, {
				dispOption: stateTemp,
				output: outputTemp
			})
		default:
			return state
		}
	case MODIFY_FACTOR:
		switch (action.modelId) {
		case 'speedFactor':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(action.modelValue, state.reportFactor, state.sourceFactor, state.point)
			outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, state.point)
			//outputTemp = calcQuantData(outputTemp, state.point, state.quantLevel)
			outputTemp = calcDispData(outputTemp, state.dispOption)
			return Object.assign({}, state, {
				speedFactor: action.modelValue,
				output: outputTemp
			})
		case 'reportFactor':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(state.speedFactor, action.modelValue, state.sourceFactor, state.point)
			outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, state.point)
			//outputTemp = calcQuantData(outputTemp, state.point, state.quantLevel)
			outputTemp = calcDispData(outputTemp, state.dispOption)
			return Object.assign({}, state, {
				reportFactor: action.modelValue,
				output: outputTemp
			})
		case 'noiseFactor':
			outputTemp = state.output
			//outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
			outputTemp[1].values = calcNoiseData(action.modelValue, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, state.point)
			//outputTemp = calcQuantData(outputTemp, state.point, state.quantLevel)
			outputTemp = calcDispData(outputTemp, state.dispOption)
			return Object.assign({}, state, {
				noiseFactor: action.modelValue,
				output: outputTemp
			})
		default:
			return state
		}
	case MODIFY_PARAMETER:
		switch (action.modelId) {
		case 'linearFactor':
			outputTemp = state.output
			//outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
			//outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, action.modelValue, state.jitterFactor, state.mode, state.point)
			//outputTemp = calcQuantData(outputTemp, state.point, state.quantLevel)
			outputTemp = calcDispData(outputTemp, state.dispOption)
			return Object.assign({}, state, {
				linearFactor: action.modelValue,
				output: outputTemp
			})
		case 'jitterFactor':
			outputTemp = state.output
			//outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
			//outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, action.modelValue, state.mode, state.point)
			//outputTemp = calcQuantData(outputTemp, state.point, state.quantLevel)
			outputTemp = calcDispData(outputTemp, state.dispOption)
			return Object.assign({}, state, {
				jitterFactor: action.modelValue,
				output: outputTemp
			})
		case 'point':
			outputTemp = state.output
			outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, action.modelValue)
			outputTemp[1].values = calcNoiseData(state.noiseFactor, action.modelValue, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, action.modelValue)
			//outputTemp = calcQuantData(outputTemp, action.modelValue, state.quantLevel)
			outputTemp = calcDispData(outputTemp, state.dispOption)
			return Object.assign({}, state, {
				point: action.modelValue,
				output: outputTemp
			})
		case 'mode':
			outputTemp = state.output
			//outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
			//outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
			outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, action.modelValue, state.point)
			//outputTemp = calcQuantData(outputTemp, state.point, state.quantLevel)
			outputTemp = calcDispData(outputTemp, state.dispOption)
			return Object.assign({}, state, {
				mode: action.modelValue,
				output: outputTemp
			})
		default:
			return state
		}
	default:
		outputTemp = state.output
		outputTemp[0].values = calcRawData(state.speedFactor, state.reportFactor, state.sourceFactor, state.point)
		outputTemp[1].values = calcNoiseData(state.noiseFactor, state.point, outputTemp[0].values)
		outputTemp[2].values = calcOutData(outputTemp[1].values, state.linearFactor, state.jitterFactor, state.mode, state.point)
		//outputTemp = calcQuantData(outputTemp, state.point, state.quantLevel)
		outputTemp = calcDispData(outputTemp, state.dispOption)
		return Object.assign({}, state, {
			output: outputTemp
		})
	}
}
