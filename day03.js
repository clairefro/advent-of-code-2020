// DAY 03
// Part 1: How many trees do you hit?

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day03.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const rows = raw.split(/\n/);
// ---------------------------------

// 32 * 324

const isTree = (arr, x, y) => {
	return arr[y][x] === "#";
};

const getTreesHit = (slopes, incX, incY) => {
	const tileWidth = slopes[0].length; // assume all slope rows are same width
	let hits = 0;
	let curX = 0;
	let curY = 0;
	for (let i = incY; i < slopes.length; i += incY) {
		curY = i;
		// increment slope
		let nextX = curX + incX;
		curX = nextX > tileWidth - 1 ? nextX - tileWidth : nextX;

		// check for tree, add hit if tree
		if (isTree(slopes, curX, curY)) hits++;
	}
	return hits;
};

console.log("## PART 1 ##");
console.log(getTreesHit(rows, 3, 1));

console.log("## PART 2 ##");
const s1 = getTreesHit(rows, 1, 1);
const s2 = getTreesHit(rows, 3, 1);
const s3 = getTreesHit(rows, 5, 1);
const s4 = getTreesHit(rows, 7, 1);
const s5 = getTreesHit(rows, 1, 2);

console.log(s1 * s2 * s3 * s4 * s5);
