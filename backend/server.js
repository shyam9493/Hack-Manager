const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { clerkMiddleware, clerkClient, requireAuth, getAuth } = require("@clerk/express");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());


app.get('/protected/test', requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    const {id} = await clerkClient.users.getUser(userId);
    // console.log(user.id);

    if (!id) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ id });
  } catch (error) {
    console.error('Error in /protected/test:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', async (req, res) => {
  try {
    const userList = await clerkClient.users.getUserList();
    res.send(`Total users: ${userList.totalCount}`);
  } catch (error) {
    console.error('Error fetching user list:', error);
    res.status(500).send('Failed to fetch user list');
  }
});

app.listen(3000, () => {
  console.log("running..\nLink: http://localhost:3000");
});
