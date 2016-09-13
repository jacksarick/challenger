function main(n) {
	// Find the n-th number of the Fibonacci sequence
	if (n <= 2) {
		return 1;
	}

	return main(n-1) + main(n-2);
}