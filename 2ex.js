const express = require("express");
const app = express();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8080;

app.get("/home", (req, res) => {
	res.status(200).send("home")
})

app.get("/json", (req,res) => {
	const user = {
		name: "Luca",
		age: 31,
		email: "luca31@email.it"
	}
	res.status(200).send(`${user.name} ha ${user.age} anni e la sua email è ${user.email}`)
})

app.get("/request", (req, res) => {
	fetch("https://jsonplaceholder.typicode.com/todos/1")
	.then(res => res.json())
	.then((data) => {
		res.status(200).json(data.title);	
		})
	.catch(err => console.log(err));	
});

app.get("/promise/:password", (req, res) => {
	const promise = new Promise((resolve, reject) => {
		if (req.params.password === "admin") {
			resolve("sei un admin")
		} else {
			reject("non sei un admin, password errata")
		}
	});
	promise.then(data => res.status(200).send(data))
	.catch(err => res.status(401).send(err))
})

app.all("*", (req, res) => {
	res.status(404).send("PAGE NOT FOUND")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});