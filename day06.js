// --- Day 6: Custom Customs ---
// https://adventofcode.com/2020/day/6

// Load data -----------------------
const fs = require("fs");

const raw = fs.readFileSync("./inputs/day06.txt", "utf8", function (err, data) {
	if (err) throw err;
	return data.toString();
});

const data = raw.split(/\n/);
// ---------------------------------

const GROUP_DELIMITER = "%";
const MEMBER_DELIMITER = "0";

// get the letters in groups delimited by "%"
const delimited = data
	.map((row) => {
		if (row === "") {
			return GROUP_DELIMITER;
		}
		return row;
	})
	.join("");

// split each group into an array item
const grouped = delimited.split(GROUP_DELIMITER);

const countYes = (arr) => {
	const unique = new Set(arr);
	return unique.size;
};

console.log("## PART 1 ##");
// Sum all the unqiue yes's from the groups
const yes = grouped.map((g) => countYes(g)).reduce((a, b) => a + b);
console.log("Yeses: ", yes);

console.log("## PART 2 ##");
// Sum of all questions where everyone in group answered yes

// separate group members by zero ("0")
const memberDelimited = data
	.map((row) => {
		if (row === "") {
			return GROUP_DELIMITER;
		}
		return row + MEMBER_DELIMITER;
	})
	.join("");

// split each group into an array item
const groupedMembers = memberDelimited.split(GROUP_DELIMITER);

// ex: 'nefaym0eynamf0eafnmy0afnmey0' => { members: 4, string: 'aaaaeeeeffffmmmmnnnnyyyy', unique: [ 'a', 'e', 'f', 'm', 'n', 'y' ] }
const membersToObj = (row) => {
	const memberRegex = new RegExp(MEMBER_DELIMITER, "g");
	const members = row.match(memberRegex).length;
	const rawStr = row.replace(memberRegex, "");
	const sortedString = rawStr.split("").sort().join("");
	return {
		members,
		string: sortedString,
		unique: [...new Set(sortedString)],
	};
};

const getUnanimousYes = (membersObj) => {
	const { members, string, unique } = membersObj;
	let yes = 0;
	unique.forEach((letter) => {
		const isUnanimous = string.match(new RegExp(letter, "g")).length == members;
		if (isUnanimous) {
			yes++;
		}
	});
	return yes;
};
const memberObjects = groupedMembers.map((m) => membersToObj(m));

const yesArr = memberObjects.map((mo) => getUnanimousYes(mo));

console.log(
	"Unanimous Yeses: ",
	yesArr.reduce((a, b) => a + b)
);
