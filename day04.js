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

const reqFieldsArePresent = (passport) => {
	// Capture groups do not work with global matches. Remove colon manually two lines later
	let presentFields = passport.match(/\b\w+:/gm);
	if (!presentFields) return false;
	presentFields = presentFields.map((f) => f.replace(":", ""));
	return containsAll(presentFields, reqFields);
};

const valids1 = rows.filter((row) => reqFieldsArePresent(row)).length;
console.log(`Valid passports: ${valids1}/${rows.length} `);

console.log("## PART 2 ##");
// VALIDATION RULES
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const isValidYear = (year, lower, upper) => {
	const yr = parseInt(year);
	if (isNaN(yr)) return false;
	return yr >= lower && yr <= upper;
};

const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const validations = {
	byr: (byr) => {
		return isValidYear(byr, 1920, 2002);
	},
	iyr: (iyr) => {
		return isValidYear(iyr, 2010, 2020);
	},
	eyr: (eyr) => {
		return isValidYear(eyr, 2020, 2030);
	},
	hgt: (hgt) => {
		const isValidSyntax = !!hgt.match(/\d+[(cm)|(in)]/);
		if (!isValidSyntax) return false;
		const matches = hgt.match(/(\d+)((cm)|(in))/);
		const unit = matches[2];
		const value = parseInt(matches[1]);
		if (unit === "cm") {
			return value >= 150 && value <= 193;
		} else {
			return value >= 59 && value <= 76;
		}
	},
	hcl: (hcl) => {
		return !!hcl.match(/#[0-9a-f]{6}/);
	},
	ecl: (ecl) => {
		return validEyeColors.includes(ecl);
	},
	pid: (pid) => {
		return !!pid.match(/\d{9}/);
	},
};

const validateFields = (mappedFields, validations) => {
	// const results = Object.keys(mappedFields).map((f) => validations[f]());
	const results = Object.entries(mappedFields).map(([field, value]) => {
		if (validations[field]) {
			return validations[field](value);
		}
		return true;
	});
	return !results.includes(false);
};

const fieldsAreValid = (passport) => {
	const hasReqFields = reqFieldsArePresent(passport);
	if (!hasReqFields) return false;

	let presentFields = passport.match(/\b\w+:\w+\b/gm);
	if (!presentFields) return false;

	const mappedFields = {};
	presentFields.forEach((f) => {
		const tuple = f.split(":"); // split into key/value tuple
		mappedFields[tuple[0]] = tuple[1];
	});

	return validateFields(mappedFields, validations);
};

const valids2 = rows.filter((row) => fieldsAreValid(row)).length;
console.log(`Valid passports: ${valids2}/${rows.length} `);
