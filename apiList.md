## authRoute
post - /signup
post - /login
post - /logout

## profile
GET- /profile
PATCH- /edit
PATCH- /password

## connections
POST- /tinder/pass/:userId
POST- /tinder/interested/:userId
POST- /tinder/profile

## userRouter
GET - /tinder/connections(matches)
GET - /tinder/likes
GET - /tinder/feed











app.get("/getUser", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length < 1) {
      res.send("no user found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.get("/getAll", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

app.get("/getId/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send("not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await User.findOneAndDelete(req.params.id);
    res.send("deleted successfully");
  } catch (err) {
    res.send(err.message);
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let AllowedUpdates = ["skills", "photoUrl", "gender", "age", "password"];
    let isAllowed = Object.keys(body).every((k) => AllowedUpdates.includes(k));

    if (!isAllowed) {
      throw new Error("update not allowed");
    }

    if (body.skills.length > 5) {
      throw new Error("only 5 skills are allowed");
    }

    let updated = await User.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send({ status: "updated Successfully", updated });
  } catch (error) {
    res.send(error.message);
  }
});
