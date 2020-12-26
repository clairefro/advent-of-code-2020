// --- Day 8: Handheld Halting ---
// https://adventofcode.com/2020/day/8

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day08.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const data = raw.split(/\n/);
// ---------------------------------

const parseInstructions = (data) => {
	const parsed = data.map((d) => {
		const parts = d.split(/\s/);
		const action = parts[0];
		const arg = parseInt(parts[1].replace("+", ""));
		return {
			action,
			arg,
			visited: false,
		};
	});
	return parsed; //=> { index: 0, action: 'acc', arg: 48, visited: false }
};

const instructions = parseInstructions(data);

const accumulate = (curPos = 0, sum = 0) => {
	const { visited, action, arg } = instructions[curPos];
	console.log({ curPos });
	console.log({ action, arg });
	if (visited) return sum; // bail on second visit

	instructions[curPos].visited = true; // mark as visited

	const actions = {
		acc: () => {
			const nextSum = sum + arg;
			const nextPos = (curPos += 1);
			return accumulate(nextPos, nextSum);
		},
		jmp: () => {
			nextPos = curPos + arg;
			return accumulate(nextPos, sum);
		},
		nop: () => {
			const nextPos = (curPos += 1);
			return accumulate(nextPos, sum);
		},
	};

	return actions[action]();
};

console.log("## PART 1 ##");
const accSum = accumulate();
console.log("Accumulative sum at time of loop re-start: ", accSum);
