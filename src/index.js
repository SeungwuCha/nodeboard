// index.js

var express    = require("express");
var mongoose   = require("mongoose");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var flash     = require("connect-flash"); // 1
var session    = require("express-session"); // 1
var app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB); // 1
var db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash()); // 2
app.use(session({secret:"MySecret"})); // 3

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts")); // 1
app.use("/users", require("./routes/users")); // 1

app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts")); //

// Port setting
app.listen(4000, function(){
 console.log("server on!");
});
