//! Users
// Collection
const Users = [
  {
    id: 1,
    username: "User1",
    password: "User1",
    likedCats: [
      {
        id: 1,
        name: "Tabbie",
        imgUrl: ["url1", "url2"],
      },
    ],
    dislikedCats: [
      {
        id: 2,
        name: "Mindy",
        imgUrl: ["url1", "url2", "url3"],
        age: 10,
        gender: "female",
        breed: "Tabbie",
      },
    ],
    points: 100,
  },
  {
    id: 2,
    username: "User2",
    password: "User2",
    likedCats: [],
    dislikedCats: [],
    points: 200,
  },
];

//! Cats
// Collection
const Cats = [
  {
    id: 1,
    name: "Tabbie",
    imgUrl: ["url1", "url2"],
    age: 10,
    gender: "male",
    breed: "Tabbie",
  },
  {
    id: 2,
    name: "Mindy",
    imgUrl: ["url1", "url2", "url3"],
    age: 10,
    gender: "female",
    breed: "Tabbie",
  },
];
