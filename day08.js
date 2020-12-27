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

const parseData = (data) => {
	const parsed = data.map((item, i) => {
		const parts = item.split(/\s/);
		const action = parts[0];
		const arg = parseInt(parts[1]);
		return { action, arg, visited: false };
	});
	return parsed; //=>  [{ action: 'jmp', arg: -63, visited: false },..]
};

const instructions = parseData(data);

const deepClone = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};

// Where "end" means last entry before termination or re-starting loop
const findEndState = (instructions) => {
	const copy = deepClone(instructions);
	let iterations = 0;
	let pos = 0;
	let sum = 0;
	let isFinite = true;
	while (true) {
		const current = copy[pos];
		if (!current) {
			// instructions terminated
			break;
		} else if (current.visited) {
			// instructions looped
			isFinite = false;
			break;
		} else {
			copy[pos].visited = true;
			switch (current.action) {
				case "acc":
					sum += current.arg;
					pos += 1;
					break;
				case "nop":
					pos += 1;
					break;
				case "jmp":
					pos += current.arg;
					break;
			}
		}
		iterations += 1;
	}
	return { iterations, pos, sum, isFinite };
};

console.log("## PART 1 ##");
const part1EndState = findEndState(instructions);
console.log("End state: ", part1EndState);

console.log("## PART 2 ##");

const flipAction = (action) => {
	return action === "jmp" ? "nop" : "jmp";
};

const modInstructions = (instructions, pos) => {
	const copy = deepClone(instructions);
	const instruction = copy[pos];
	if (instruction.action.match(/(jmp|nop)/)) {
		copy[pos].action = flipAction(instruction.action);
	}
	return copy;
};

const fixCorruptLine = (instrs) => {
	let pos = 0;
	let result;
	while (pos < instrs.length) {
		const curInstruction = instrs[pos];
		if (curInstruction === undefined) {
			console.log("Reached end of instruction tweak attempts");
			break;
		} else if (curInstruction.action === "acc") {
			pos += 1; // skip acc tests
		} else {
			const modifiedInstructions = modInstructions(instrs, pos);
			result = findEndState(modifiedInstructions);
			if (result.isFinite) {
				console.log("Fix found!");
				break;
			} else {
				pos += 1;
			}
		}
	}
	return result;
};

const part2EndState = fixCorruptLine(instructions);
console.log("End state: ", part2EndState);
