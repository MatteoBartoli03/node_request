'use strict'
// non accetta variabili senza var, let, const

//nodemon serve per evitare di riavviare da terminale il server quando faccio modifiche
const express = require("express")
const app = express()

const data = [
  {
    "name": "Luca",
    "age": 34,
    "email": "luca34@gmail.com"
  },
  {
    "name": "Marco",
    "age": 4,
    "email": "marco4@gmail.com"
  }
];



const checkUser = (user) => {
  const {name, age, email} = user
  return new Promise((resolve, reject) => {
    if (name === "Luca" && age === 34) {
      resolve("user exist")
    } else {
      reject("user doesn't exist")
    }
  });
};

const getUser = (name) => {
  return new Promise ((resolve, reject) => {
    for (let o in data) {
      if (data[o].name === name) {
        resolve(data[o]);
      }
    }
    reject("nothing found");
  });
};

const getAdults = () => {
  return data.filter((user) => {
    return user.age >= 18
  });
};

app.get("/check/:user", (req, res) => {
  let { user } = req.params;
  //JSON.parse converte stringa in json (da errore se la stringa non può essere convertita)
  //mentre 'operazione opposta è eseguita da JSON.stringify'
  user = JSON.parse(user);
  checkUser(user).then((r) => {
    res.send(r);
  }).catch((err) => {
    res.send(err);
  });
});

app.get("/getUsers/:name", (req, res) => {
  let { name } = req.params
   getUser(name).then((r) => {
    res.send(r);
   }).catch((err) => {
    res.send(err)
   });
});

app.get("/gatAdult", (req, res) => {
  res.status(200).json(getAdults());
});

app.get("/info", (req, res) => {
  res.status(200).json(data);
});

app.listen(8080, (req, res) => {
  console.log("porta 8080")
})