const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//turn on routes
app.use(routes);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//turn on connection to db and server
//when updating the relationships between the tables, we need to use sequelize.sync({ force: true })to drop the tables and recreate them!
//change sequelize.sync to false after the tables are updated
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});
