// DAY 02
// How many passwords are valid according to their policies?
// Policy: Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day02.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

let data = raw.split(/\n/);
// nums = nums.map((n) => parseInt(n));
// ---------------------------------
