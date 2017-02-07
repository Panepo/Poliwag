import * as types from '../constants/constActionTypes'

export function modifyInput(modelId, modelValue) {
	return {
		type: types.MODIFY_INPUT,
		modelId,
		modelValue
	}
}
