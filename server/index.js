const port = 4000;
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const jsonParser = express.json();

function readFile(path, data) {
  return new Promise((resolve, reject) =>
    fs.readFile(path, data, (err, usersRaw) => {
      if (err) {
        reject(err);
      }
      resolve(usersRaw);
    })
  );
}

function writeFile(path, arr) {
  return new Promise((resolve, reject) =>
    fs.writeFile(path, arr, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    })
  );
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/walking", async function (request, response) {
  const state = await readFile("file_JSON/store.json", "utf8");
  response.send(JSON.parse(state)).status(200);
});

app.delete("/walking/:id", async function (request, response) {
  const id = request.params.id;
  const store = await readFile("file_JSON/store.json", "utf8");
  const objJson = JSON.parse(store);

  const newStore = [...objJson.walking];
  let el;

  for (let i = 0; i < newStore.length; i++) {
    if (newStore[i].id == id) {
      el = newStore[i];
    }
  }

  newStore.splice(newStore.indexOf(el), 1);
  await writeFile(
    "file_JSON/store.json",
    JSON.stringify({ walking: newStore })
  );
  response.send({ walking: newStore });
});

app.put("/walking/:id", jsonParser, async function (request, response) {
  try {
    const id = request.params.id;
    const store = await readFile("file_JSON/store.json", "utf8");
    const objJson = JSON.parse(store);
    const obj = request.body;

    const newStore = [...objJson.walking];
    let el;

    for (let i = 0; i < newStore.length; i++) {
      if (newStore[i].id == id) {
        el = newStore[i];
      }
    }

    newStore.splice(newStore.indexOf(el), 1, {
      id: +id,
      date: `${obj.date}T09:25:44.252Z`,
      distance: +obj.distance,
    });

    await writeFile(
      "file_JSON/store.json",
      JSON.stringify({ walking: newStore })
    );
    response.send({ walking: newStore });
  } catch {}
});

app.post("/walking/", jsonParser, async function (request, response) {
  const obj = request.body;
  const store = await readFile("file_JSON/store.json", "utf8");
  const objJson = JSON.parse(store);

  let elId = 0;

  for (let i = 0; i < objJson.walking.length; i++) {
    if (objJson.walking[i].id > elId) {
      elId = objJson.walking[i].id;
    }
  }

  const newStore = [
    ...objJson.walking,
    {
      id: +elId + 1,
      date: `${obj.date}T09:25:44.252Z`,
      distance: +obj.distance,
    },
  ];

  await writeFile(
    "file_JSON/store.json",
    JSON.stringify({ walking: newStore })
  );
  response.send({ walking: newStore });
});

app.listen(port, () => {
  console.log("сервер начал прослушивание");
});
