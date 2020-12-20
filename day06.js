// --- Day 6: Custom Customs ---
// https://adventofcode.com/2020/day/6

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day05.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const data = raw.split(/\n/);
// ---------------------------------
console.log(data);
