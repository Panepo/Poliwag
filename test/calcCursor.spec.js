import 'babel-polyfill'
import should from 'should'
import * as calcCursor from '../src/reducers/calcCursor'

describe('#cursorMovingAverage', () => {
	it('should return the average locus of cursor', done => {
		let input = []
		input[0] = {}
		input[0].x = 100
		input[0].y = 100
		input[1] = {}
		input[1].x = 200
		input[1].y = 150
		input[2] = {}
		input[2].x = 300
		input[2].y = 175

		var test = calcCursor.cursorMovingAverage(input, 3, 50)

		test[1].x.should.equal(150)
		test[1].y.should.equal(125)
		test[2].x.should.equal(225)
		test[2].y.should.equal(150)
		done()
	})
})

describe('#cursorLimitation', () => {
	it('should return the limited locus of cursor', done => {
		let input = []
		input[0] = {}
		input[0].x = 100
		input[0].y = 100
		input[1] = {}
		input[1].x = 200
		input[1].y = 125
		input[2] = {}
		input[2].x = 300
		input[2].y = 150

		var test = calcCursor.cursorLimitation(input, 3, 50)

		test[1].x.should.equal(150)
		test[1].y.should.equal(125)
		test[2].x.should.equal(200)
		test[2].y.should.equal(150)
		done()
	})
})