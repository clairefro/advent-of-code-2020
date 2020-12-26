// TODO: did not complete this challenge
// --- Day 7: Handy Haversacks ---
// https://adventofcode.com/2020/day/7

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day07.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const data = raw.split(/\n/);
// ---------------------------------

// ex: 'muted salmon bags contain 4 faded lavender bags, 4 posh magenta bags.'
// => { 'muted salmon': { 'faded lavender': '4', 'posh magenta': '4' } }
const parseRules = (rulesStrings) => {
	const ruleObj = {};
	rulesStrings.forEach((rule) => {
		const split = rule.split("bags contain");
		const parent = split.shift().trim();
		const children = {};
		childStrings = split[0].split(",").map((s) => s.trim().replace(/\./, ""));
		childStrings.forEach((bagStr) => {
			if (bagStr.match("no other bags")) return;
			const matches = bagStr.match(/(\d+)\s(\w+\s\w+)/);
			const qty = matches[1];
			const bag = matches[2];
			children[bag] = qty;
		});
		ruleObj[parent] = children;
	});
	return ruleObj;
};

const parentChild = parseRules(data);
// console.log(parentChild);

// Return object where children point to all their parents
const inverseObj = (parentChild) => {
	console.log({ parentLength: Object.keys(parentChild).length });
	const childParent = {};
	Object.keys(parentChild).forEach((key) => {
		const children = Object.keys(parentChild[key]);
		children.forEach((child) => {
			if (childParent[child]) {
				childParent[child].push(key);
				return;
			} else {
				childParent[child] = [key];
			}
		});
	});
	return childParent;
};

// const getOuterBags = (parentChild) => {
// 	const childParent = inverseObj(parentChild);
// 	const directlyHadGold = childParent["shiny gold"];

// 	const containsShinyGold = [];

// 	const findParents = (child) => {
// 		const parents = childParent[child];
// 		if (!parents) return;
// 		parents.forEach((p) => {
// 			containsShinyGold.push(p);
// 			return findParents(p);
// 		});
// 	};

// 	directlyHadGold.forEach((child) => findParents(child, 0));
// 	console.log({ containsShinyGold });
// 	const uniqueParents = [...new Set(containsShinyGold)];
// 	return uniqueParents;
// };

const getOuterBags = (parentChild) => {
	const containsShinyGold = [];

	const digForGold = (parent) => {
		console.log({ parent });
		// console.log(ruleObj[parent]);
		const content = parentChild[parent];
		console.log({ content });
		const children = Object.keys(content);
		console.log({ children });
		if (!children.length) return;
		if (content["shiny gold"]) {
			containsShinyGold.push(parent);
			// return;
		}
		children.forEach((child) => {
			return digForGold(child);
		});
	};
	const bags = Object.keys(parentChild);
	bags.forEach((b) => digForGold(b));
	const uniqueParents = [...new Set(containsShinyGold)];
	return uniqueParents;
};

console.log("## PART 1 ##");
// const outerBags = getOuterBags(parentChild);
// console.log("Outerbags: ", outerBags, `(${outerBags.length})`);
const childParent = inverseObj(parentChild);
parentLength = Object.keys(parentChild).length;
childLength = Object.keys(childParent).length;
console.log({ parentLength });
console.log({ childLength });
console.log(parentLength - childLength);
