// DAY 02
// Part 1: How many passwords are valid according to their policies?
// Policy: Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

// Load data and parse data --------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day02.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const rows = raw.split(/\n/);
// ---------------------------------

console.log("## PART 1 ##");

const isValid = (row) => {
	const matches = row.match(/^(\d+)-(\d+)\s(\w):\s(\w+)$/);
	if (!matches || matches.length !== 5) return false; // case: policy not formatted as expected
	const parsed = {
		min: matches[1],
		max: matches[2],
		char: matches[3],
		password: matches[4],
	};
	const { min, max, char, password } = parsed;

	const pattern = new RegExp(char, "g");
	const occurences = password.match(pattern);
	if (!occurences) return false;
	return occurences.length >= min && occurences.length <= max;
};

const valids1 = rows.filter((row) => isValid(row)).length;
const percentValid = ((valids1 / rows.length) * 100.0).toFixed(2);
console.log(`Valid passwords: ${valids1}/${rows.length} (%${percentValid})`);
