const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const neat = require('neat-csv');

//const site = require("./package.json");

app.set("view engine", "pug");

app.use(express.static("public"));

app.get('/', (req, res) => res.render('index'))

app.get('/success', (req, res) => {
// handle validation
if (req.query.first_name ==="" || req.query.last_name === "" || req.query.twitter_handle === "") {
res.render('index', { message: 'All fields are required. Try again.' })
}
else {
const entry = req.query.first_name + ',' + req.query.last_name + ',' + req.query.twitter_handle + '\n';
fs.appendFile('members.csv', entry, 'utf8', function(err) {
  if (err) throw err;
});

fs.readFile('members.csv', async (err, data) => {
  if (err) throw err;
  // wait until info converted to an array of objects
  const members = await neat(data);
  // pass the array of objects to success template
  res.render('success', {memberList: members})
});
}

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
