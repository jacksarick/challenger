function main(votes) {
	console.log(votes);
	votes = votes.split("");

	const isA = function(x) { return x == 'a'}
	const isB = function(x) { return x == 'b'}
	sum = function(arr) {
		return arr.reduce(function(a, b) { return a + b; }, 0);
	}

	a = sum(votes.map(isA));
	b = sum(votes.map(isB));

	if (a > b) {
		return 1;
	}
	
	if (a < b){
		return -1;
	}

	else {
		return 0;
	}
}