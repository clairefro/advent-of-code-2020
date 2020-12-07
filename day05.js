// DAY 05
// https://adventofcode.com/2020/day/5

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day05.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const data = raw.split(/\n/);
// ---------------------------------

const bifurcate = (lowerBound, upperBound, positions, currIndex, lowerKey) => {
	if (currIndex === positions.length - 1) {
		return positions[currIndex] === lowerKey ? lowerBound : upperBound;
	}

	let nextIndex = currIndex + 1;
	let newLowerBound = lowerBound;
	let newUpperBound = upperBound;

	const midway = Math.floor((upperBound - lowerBound) / 2);
	if (positions[currIndex] === lowerKey) {
		newUpperBound = lowerBound + midway;
	} else {
		newLowerBound = lowerBound + midway + 1;
	}
	return bifurcate(newLowerBound, newUpperBound, positions, nextIndex, lowerKey);
};

const getBinaryMax = (length) => {
	return Math.pow(2, length) - 1;
};

// ex: FBFBBFF => 44
const getSeatRow = (seatRowBinary) => {
	const positions = seatRowBinary.split("");
	const max = getBinaryMax(positions.length);
	return bifurcate(0, max, positions, 0, "F");
};

// ex: RLR => 6
const getSeatColumn = (seatColumnBinary) => {
	const positions = seatColumnBinary.split("");
	const max = getBinaryMax(positions.length);
	return bifurcate(0, max, positions, 0, "L");
};

const calculateSeatId = (row, column) => {
	return row * 8 + column;
};

const getSeatId = (binaryString) => {
	const matches = binaryString.match(/(\w{7})(\w{3})/);
	const rows = matches[1];
	const cols = matches[2];
	const row = getSeatRow(rows);
	const col = getSeatColumn(cols);
	const seatId = calculateSeatId(row, col);
	return seatId;
};

console.log("## PART 1 ##");
// Find highest seatId
const descSeatids = data.map((line) => getSeatId(line)).sort((a, b) => b - a);
console.log("Highest Seat ID: ", descSeatids[0]);

console.log("## PART 2 ##");
// Find missing seat
const min = descSeatids[descSeatids.length - 1];
const max = descSeatids[1];

for (let i = min; i <= max; i++) {
	if (!descSeatids.includes(i)) {
		console.log("Your seat may be: ", i);
	}
}
