var friendsData = require("../data/friends");

// function getBestMatchFriend(friends) {
//   var randomIndex = Math.floor(Math.random() * friends.length)
//   return friends[randomIndex];
// }
module.exports = function (app) {


  app.get("/api/friends", function (req, res) {
    for (var i = 0; i < friendsData.length; i++) {
     // console.log(friendsData[i].scores)

    }
    res.json(friendsData);

  });

  app.post("/api/friends", function (req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 100
    }

    var newUser = req.body;
    //console.log(newUser.scores);
    var userScores = newUser.scores;
    //console.log(userScores);
    // res.json(getBestMatchFriend(friendsData));
    var totalDifference = 0;
    // I have used a nested loop to get the difference between the new user score
    // and the friends in our friendsData array.
    for (var i = 0; i < friendsData.length; i++) {
      //console.log(friendsData[i]);
      totalDifference = 0;

      for (var j = 0; j < friendsData[i].scores[j]; j++) {
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friendsData[i].name;
          bestMatch.photo = friendsData[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }
    console.log(bestMatch);
    friendsData.push(newUser);
    res.json(bestMatch);

  });

};