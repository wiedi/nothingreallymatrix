"use strict"

var BitBuffer = require('bitbuffer').BitBuffer


function BooleanMatrix(rows, cols) {
	this.rows = rows
	this.cols = cols
	this.data = new BitBuffer(rows * cols)
}

BooleanMatrix.prototype.get = function(row, col) {
	return this.data.get(this.rows * row + col)
}

BooleanMatrix.prototype.set = function(row, col, value) {
	return this.data.set(this.rows * row + col, value)
}

module.exports = BooleanMatrix
