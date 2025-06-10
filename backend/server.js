const express = require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const { clerkMiddleware,clerkClient, requireAuth, getAuth,createClerkClient  } =require("@clerk/express");
dotenv.config()


const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

const app=express();


app.use(clerkMiddleware())
app.use(express.json());


app.get('/protected', requireAuth(), async (req, res) => {

  const { userId } = getAuth(req)

  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})

app.get('/',async (req,res)=>{
    const userList = (await clerk.users.getUserList()).totalCount;

res.send(userList);
});

app.listen(3000,()=>{
    console.log("running.. \nLink: http://localhost:3000");
}
)