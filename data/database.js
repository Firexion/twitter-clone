class User {
  constructor(id, name, username) {
    this.id = id;
    this.name = name;
    this.username = username;
  }
}


const Sasha = new User(0, "Sasha", "firexion");
const Aiden = new User(1, "Aiden", "babyBoy");
const Kai = new User(2, "Kai", "bee");
const Meara = new User(3, "Meara", "babyGirl");
const Jack = new User(4, "Jack", "jackAttack");

const users = [Sasha, Aiden, Kai, Meara, Jack];

function getUsers() {
  return users;
}

export {User, getUsers};
