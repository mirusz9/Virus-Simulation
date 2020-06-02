const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const splitRootDir = __dirname.split("\\");
splitRootDir.pop();
const rootDir = splitRootDir.join("\\");

app.set("view engine", "ejs");

app.set("views", rootDir);
app.use(express.static(rootDir));

app.get("/", (req: any, res: any) => {
	res.render("index.ejs");
});

app.use("*", (req: any, res: any) => {
	res.redirect("/");
});

app.listen(port, (err: any) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Listening on " + port);
	}
});
