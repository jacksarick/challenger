function main(word) {
	word = word[0]
	return word == word.split("").reverse().join("");
}