"use strict"
var assert = require("assert")
var matrix = require('./index')

suite('Boolean')

test('#set_and_get', function(){
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

test('#set_all_and_get', function(){
	var m = new matrix.TypedMatrix(2,2)
	m.setAll(42)
	assert.equal(m.get(0, 0), 42)
	assert.equal(m.get(0, 1), 42)
	assert.equal(m.get(1, 0), 42)
	assert.equal(m.get(1, 1), 42)
})