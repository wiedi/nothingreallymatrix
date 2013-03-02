"use strict"
var assert = require("assert")
var matrix = require('./index')

suite('Boolean')

test('#set_and_get', function() {
	var m = new matrix.BooleanMatrix(2,2)
	m.set(0, 0, true)
	assert.equal(m.get(0, 0), true)
	m.set(0, 1, false)
	assert.equal(m.get(0, 1), false)
	m.set(1, 0, true)
	assert.equal(m.get(1, 0), true)
	m.set(1, 1, false)
	assert.equal(m.get(1, 1), false)
})

suite("Typed")

test('#set_all_and_get', function() {
	var m = new matrix.TypedMatrix(2,2)
	m.setAll(42)
	assert.equal(m.get(0, 0), 42)
	assert.equal(m.get(0, 1), 42)
	assert.equal(m.get(1, 0), 42)
	assert.equal(m.get(1, 1), 42)
})

test('#set_all_function', function() {
	var m = new matrix.TypedMatrix(3, 5)
	m.setAll(function() {
		return 42
	})
	assert.equal(m.get(0, 0), 42)
	assert.equal(m.get(0, 4), 42)
	assert.equal(m.get(2, 0), 42)
	assert.equal(m.get(2, 4), 42)
})

test('#row_scalar_product', function() {
	var a = new matrix.TypedMatrix(2, 2)
	a.set(0, 0, 2)
	a.set(0, 1, 3)
	a.set(1, 0, 5)
	a.set(1, 1, 7)

	assert.equal(a.rowScalarProduct(0, a, 0), 13)
	assert.equal(a.rowScalarProduct(0, a, 1), 31)
	assert.equal(a.rowScalarProduct(1, a, 0), 31)
	assert.equal(a.rowScalarProduct(1, a, 1), 74)
	
	var b = new matrix.TypedMatrix(5, 2)
	b.setAll(11)
	assert.equal(a.rowScalarProduct(0, b, 0), 55)
})

test('#row_scalar_product_with_row_difference', function() {
	var a = new matrix.TypedMatrix(2, 2)
	a.set(0, 0, 2)
	a.set(0, 1, 3)
	a.set(1, 0, 5)
	a.set(1, 1, 7)
	
	var b = new matrix.TypedMatrix(5, 2)
	b.setAll(11)
	assert.equal(a.rowScalarProductWithRowDifference(0, a, 0, b, 0), -42)
})

suite("SparseBoolean")

test('#set_and_get', function() {
	var m = new matrix.SparseBooleanMatrix()
	
	assert.equal(m.get(0, 0), false)
	m.set(0, 0, true)
	assert.equal(m.get(0, 0), true)
	m.set(0, 0, false)
	assert.equal(m.get(0, 0), false)
	
	m.set(5, 7, true)
	assert.equal(m.get(5, 7), true)
	assert.equal(m.get(5, 0), false)
	assert.equal(m.get(5, 8), false)
	assert.equal(m.get(0, 7), false)
})

test('#get_sparse_rows_and_cols', function() {
	var m = new matrix.SparseBooleanMatrix()
	m.set(2, 3, true)
	m.set(5, 7, true)
	m.set(1, 11, true)
	m.set(5, 11, true)
	
	assert.deepEqual(m.getColumn(3), [2])
	assert.deepEqual(m.getColumn(11), [1, 5])
	assert.deepEqual(m.getRow(5), [7, 11])
})
