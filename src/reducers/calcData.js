export function calcRawData(state) {
	const range = Math.floor(state.speedFactor / state.reportFactor)
	let output = state.output
	let rawData = []
	let noiseData = []
	let noiseX, noiseY

	for (let i = 0; i < state.point; i++) {
		rawData[i] = {}
		rawData[i].x = i*range;
		rawData[i].y = state.sourceFactor.a * i * range * i * range + state.sourceFactor.b * i * range + state.sourceFactor.c
	}

	if ( state.noiseFactor ) {
		for ( var i=0; i<state.point; i++ ) {
			noiseX = Math.floor( state.noiseFactor * Math.random() * 2 )
			noiseY = Math.floor( state.noiseFactor * Math.random() * 2 )
			noiseData[i] = {}
			noiseData[i].x = rawData[i].x - state.noiseFactor + noiseX
			noiseData[i].y = rawData[i].y - state.noiseFactor + noiseY
		}
	}

	output[0].values = rawData
	output[1].values = noiseData

	return output
}


export function calcOutData(state){
	
	

}