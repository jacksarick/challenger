challenges = {
	"test": {
		"name": "Test",
		"desc": "Write a very basic program to simply return the input",
		"sample": ["'hello'", "'hello'"],
		"tests": [
			[378, 378],
			[Infinity, Infinity],
			[-9.78, -9.78]
		]
	},

	"exp": {
		"name": "Exponents",
		"desc": "Take the first number and put it to the power of the second. Arguments passed as array [base, power].",
		"sample": ["[5, 6]", "15625"],
		"tests": [
			[[2,2], 4],
			[[12, 4], 20736],
			[[3, 5], 243]
		]
	},

	"fib": {
		"name": "Fibonacci",
		"desc": "Find the n-th number of the Fibonacci sequence.",
		"sample": ["7", "13"],
		"tests": [
			[10, 55],
			[15, 610],
			[34, 5702887],
		]
	}
}