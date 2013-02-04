"use strict"

function TypedMatrix(rows, cols, type) {
	this.rows = rows
	this.cols = cols
	this.type = type || Float32Array
	this.data = new this.type(rows * cols)
}

TypedMatrix.prototype.get = function(row, col) {
	return this.data.get(this.rows * row + col)
}

TypedMatrix.prototype.set = function(row, col, value) {
	return this.data.set(this.rows * row + col, value)
}

TypedMatrix.prototype.setAll = function(value) {
	for(var i = 0; i < this.data.length; i++) {
		if(value instanceof Function) {
			this.data.set(i, value())
		} else {
			this.data.set(i, value)
		}
	}
}

TypedMatrix.prototype.getRow = function(row) {
	/* this should be better with .slice - but node gives us just a new reference */
	var v = new this.type(this.cols)
	for(var i = 0; i < this.cols; i++) {
		v[i] = this.data[this.rows * row + i]
	}
	return v
}

TypedMatrix.prototype.getColumn = function(col) {
	var v = new this.type(this.rows)
	for(var i = 0; i < this.rows; i++) {
		v[i] = this.data[this.rows * i + col]
	}
	return v
}

TypedMatrix.prototype.rowScalarProduct = function(row, matrix2, row2) {
	if(row > this.rows || row2 > matrix2.rows || this.cols != matrix2.cols) {
		throw new Error("invalid dimension")
	}
	
	var result = 0
	var offset1 = row  * this.rows
	var offset2 = row2 * matrix2.rows
	for(var i = 0; i < this.cols; i++) {
		result += this.data[offset1 + i] * matrix2.data[offset2 + i]
	}
	return result
}

module.exports = TypedMatrix

