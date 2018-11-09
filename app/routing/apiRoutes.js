const lovers = require('./../data/lovers');
// const waitlist = require('./../data/waitlist');

module.exports = function (app) {
    // Displays all lovers
    app.get("/api/lovers", function (req, res) {
        return res.json(lovers);
    });

    // Displays waitlist
    // app.get("/api/waitlist", function (req, res) {
    //     return res.json(waitlist);
    // });

    // Create New Table - takes in JSON input
    app.post("/api/lovers", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newLover = req.body;
        
        //if lovers is under 5 add to lovers, else add to waitlist
            res.statusCode = 200;
            lovers.push(newLover);
    });

    app.post("/api/clear",function(req,res){

        lovers.length = 0;
        waitlist.length = 0;
        res.json({success: "Cleared", status:200})
    });
};