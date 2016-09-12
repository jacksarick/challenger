function main(n) {
	// Find n factorial
	if (n <= 0) {
		return 1;
	}

	console.log("Currently finding factorial " + n);
	return n * main(n-1);
}