import {
	SWITCH_MODE,
	MODIFY_SPEED_FACTOR,
	MODIFY_REPORT_FACTOR,
	MODIFY_SOURCE_FACTOR,
	MODIFY_NOISE_FACTOR,
	MODIFY_LINEAR_FACTOR,
	MODIFY_JITTER_FACTOR
} from '../constants/constActionTypes'

import { calcRawData } from './calcData'

const initialState = {
	speedFactor: 1000,
	reportFactor: 150,
	sourceFactor: { a: 1, b: 1, c: 1 },
	noiseFactor: 40,
	linearFactor: 80,
	jitterFactor: 20,
	mode: 1,
	point: 10,
	output: [
		{
			name: 'raw data',
			values: [],
			strokeWidth: 1,
			strokeDashArray: '3,3'
		},
		{
			name: 'noised data',
			values: [],
			strokeWidth: 1,
			strokeDashArray: '5,5'
		},
		{
			name: 'compensated data',
			values: [],
			strokeWidth: 3
		}
	]
}

export default function reducerCalc(state = initialState, action) {
	switch (action.type) {
	case SWITCH_MODE:
		return state
	case MODIFY_SPEED_FACTOR:
		return state
	case MODIFY_REPORT_FACTOR:
		return state
	case MODIFY_SOURCE_FACTOR:
		return state
	case MODIFY_NOISE_FACTOR:
		return state
	case MODIFY_LINEAR_FACTOR:
		return state
	case MODIFY_JITTER_FACTOR:
		return state
	default:
		return Object.assign({}, state, {
			output: calcRawData(state)
		})
	}
}



