const db = [
  { username: "admin", pass: "admin", name: "Andrei", lastName: "Cacio" },
];

async function getUser(username, password) {
  return new Promise((res, rej) => {
    const userFound = db.find(
      (userEntry) =>
        userEntry.username === username && userEntry.pass === password,
    );

    if (!!userFound) {
      return res({
        name: userFound.name,
        lastName: userFound.lastName,
        username: userFound.username,
      });
    }

    return rej(new Error("Not found"));
  });
}

exports.getUser = getUser;
