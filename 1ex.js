const express = require("express");
const app = express();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8080;

app.get("/daniele", (req, res) => {
  res.status(200).send("ciao daniele come va");
});

app.get("/saluta/:nome", (req, res) => {
  const nome1 = req.params.nome;
  const nome = nome1.slice(0, nome1.lenght)
  res.status(200).send(`ciao ${nome} come va`);
});

app.get("/info", (req, res) => {
  const json = {
  	name : "S",
  	surname : "S"
  }
  res.status(200).json({
	name: "Matteo",
 	age: 16,
 	json: json
 });
});

app.get("/richiesta", (req, res) => {
	fetch("https://api.paninidellospalla.it/info", {
		method: "GET"
})
	.then(res => res.json())
	.then((data) => {
		res.status(200).json(data);	
		})
	.catch(err => console.log(err));
});

app.get("/promise/:num", (req, res) => {
  const num = req.params.num;
  const promise = new Promise((resolve, reject) => {
    if (!isNaN(parseInt(num))) {
      if (num % 2 === 0){
        resolve("Numero pari")
      } else {
      resolve("Numero dispari");
      }
    } else {
      reject("Non è un numero");
    }
  });

  promise.then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.get("/function/:num", (req, res) => {
  const num = req.params.num;
  const funct = (arg) => {
    return new Promise((resolve, reject) => {
      if (!isNaN(parseInt(num))) {
        if (arg % 2 === 0) {
          resolve("il numero è pari")
        } else {
          resolve("il numero è dispari")
        }
      } else {
        reject("non è un numero")
      };
    });
  };

  funct(num).then((data) => {
    res.status(200).send(data)
  }).catch((err) => {
    res.status(404).send(err)
  });
});

app.all("*", (req, res) => {
	res.status(404).send("PAGE NOT FOUND")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});