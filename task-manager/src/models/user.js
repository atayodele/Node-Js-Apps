const mongoose = require("../db/mongoose")

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});
const me = new User({
  name: "Andrew",
  age: 24,
});

me.save()
  .then((result) => {
    console.log(me);
  })
  .catch((error) => {
    console.log(error);
  });