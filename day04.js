// DAY 04
// Part 1: How many valid passports according to policy?
// Policy (Part 1): Passport must contain fields byr, iyr, eyr, hgt, hcl, ecl, pid. Optionally contains cid

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day04.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const rows = raw.split(/\n\n/).map((row) => row.replace("\n", " "));
// ---------------------------------

const containsAll = (available, required) => {
	for (let i = 0; i < required.length; i++) {
		if (!available.includes(required[i])) return false;
	}
	return true;
};

console.log("## PART 1 ##");

const reqFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
// const optionalFields = ["cid"];

const isValid1 = (passport) => {
	// Capture groups do not work with global matches. Remove colon manually two lines later
	let presentFields = passport.match(/\b\w+:/gm);
	if (!presentFields) return false;
	presentFields = presentFields.map((f) => f.replace(":", ""));
	return containsAll(presentFields, reqFields);
};

const valids1 = rows.filter((row) => isValid1(row)).length;
console.log(`Valid passports: ${valids1}/${rows.length} `);
