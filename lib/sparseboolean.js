"use strict"

function SparseBooleanMatrix(rows, cols) {
	this.data = {}
}

SparseBooleanMatrix.prototype.get = function(row, col) {
	if(!(row in this.data)) {
		return false
	}
	if(!(col in this.data[row])) {
		return false
	}
	return true
}

SparseBooleanMatrix.prototype.set = function(row, col, value) {
	if(!(row in this.data)) {
		this.data[row] = {}
	}
	if(value) {
		this.data[row][col] = true
	} else {
		delete this.data[row][col]
	}
}


SparseBooleanMatrix.prototype.getRow = function(row) {
	if(!(row in this.data)) {
		return []
	}
	return Object.keys(this.data[row]).map(function(e) { return Number(e)})
}

SparseBooleanMatrix.prototype.getColumn = function(col) {
	var result = []
	for(var row in this.data) {
		if(col in this.data[row]) {
			result.push(Number(row))
		}
	}
	return result
}


module.exports = SparseBooleanMatrix
