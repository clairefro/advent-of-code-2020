// DAY 01
// Part 1: find the two entries that sum to 2020 and then then find their product.
// Part 2: find the three entries that sum to 2020 and then find their product.

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day01.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const nums = raw.split(/\n/).map((n) => parseInt(n));
// ---------------------------------

console.log("## PART 1 ##");
for (let i = 0; i < nums.length; i++) {
	for (let k = i + 1; k < nums.length; k++) {
		const sum = nums[i] + nums[k];

		if (sum == 2020) {
			console.log("Found: ", nums[i], nums[k]);
			console.log("product: ", nums[i] * nums[k]);
		}
	}
}

console.log("## PART 2 ##");
for (let i = 0; i < nums.length; i++) {
	for (let j = i + 1; j < nums.length; j++) {
		for (let k = j + 1; k < nums.length; k++) {
			const sum = nums[i] + nums[j] + nums[k];

			if (sum == 2020) {
				console.log("Found: ", nums[i], nums[j], nums[k]);
				console.log("product: ", nums[i] * nums[j] * nums[k]);
			}
		}
	}
}
