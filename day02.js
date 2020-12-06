// DAY 02
// Part 1: How many passwords are valid according to their policies?
// Policy (Part 1): Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.
// Policy (Part 2): Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

// Load data and parse data --------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day02.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const rows = raw.split(/\n/);
// ---------------------------------

console.log("## PART 1 ##");
const parseRow = (row) => {
	const matches = row.match(/^(\d+)-(\d+)\s(\w):\s(\w+)$/);
	if (!matches || matches.length !== 5) return undefined; // case: policy not formatted as expected
	return {
		min: matches[1],
		max: matches[2],
		char: matches[3],
		password: matches[4],
	};
};

const isValid1 = (row) => {
	const parsed = parseRow(row);
	if (!parsed) return false;
	const { min, max, char, password } = parsed;
	const pattern = new RegExp(char, "g");
	const occurences = password.match(pattern);
	if (!occurences) return false;
	return occurences.length >= min && occurences.length <= max;
};

const valids1 = rows.filter((row) => isValid1(row)).length;
console.log(`Valid passwords: ${valids1}/${rows.length}`);

console.log("## PART 2 ##");
const isValid2 = (row) => {
	const parsed = parseRow(row);
	if (!parsed) return false;
	const { min: index1, max: index2, char, password } = parsed;
	const pair = [password[index1 - 1], password[index2 - 1]];
	return pair.includes(char) && pair[0] !== pair[1];
};

const valids2 = rows.filter((row) => isValid2(row)).length;
console.log(`Valid passwords: ${valids2}/${rows.length} `);
