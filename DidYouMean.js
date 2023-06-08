function Dictionary(words) {
	this.words = words;
}


function range(word1, word2) {
	var ranges = [Math.max(word1.length, word2.length)];
	for (var i = 0, j = -1; i < word1.length; i++) {
		while ((j = word2.indexOf(word1[i], j + 1)) >= 0) {
			ranges.push(Math.max(i, j) + range(word1.substr(i + 1), word2.substr(j + 1)));
		}
	}
	return Math.min(...ranges);
}


Dictionary.prototype.findMostSimilar = function (term) {
	return this.words.map(word => ({ word: word, range: range(term, word) })).sort((x, y) => x.range - y.range)[0].word;
}
