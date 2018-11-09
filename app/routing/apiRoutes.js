const lovers = require('../data/lovers');

function compatibilityTest(newLover) {
	let lowestDifference = null;
	let bestMatch = null;
	lovers.forEach(lover => {
		let totalDifference = 0;
		lover.scores.forEach((score, index) => {
			let difference = score - newLover.scores[index];
			totalDifference += Math.abs(difference);
		});

		if (totalDifference < lowestDifference || lowestDifference == null) {
			lowestDifference = totalDifference;
			bestMatch = lover;
		}
	});
	return bestMatch;
}

module.exports = function (app) {
	// Displays all lovers
	app.get("/api/lovers", function (req, res) {
		return res.json(lovers);
	});

	// Create New Lover - takes in JSON input
	app.post("/api/lovers", function (req, res) {
		// req.body hosts is equal to the JSON post sent from the user
		const newLover = req.body;
		const bestMatch = compatibilityTest(newLover);
		lovers.push(newLover);
		res.send(bestMatch);
	});

	app.post("/api/clear", function (req, res) {
		lovers.length = 0;
		waitlist.length = 0;
		res.json({ success: "Cleared", status: 200 })
	});
};

