const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

// SANTA USERS 

//get all users
app.get("/santa_users", async(req, res) => {
  try
  {
    const allUsers = await pool.query("SELECT * FROM santa_users");
    res.json(allUsers.rows);
    
  } 
  catch (err) 
  {
    console.error(err.message);
  }
})

//get a user of given id
app.get("/santa_users/:id", async(req, res) => {
  try
  {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM santa_users WHERE id = $1", 
    [id]);
  
    res.json(user.rows[0])
  } 
  catch (err) 
  {
    console.error(err.message);
  }
})

// put user in database
// INSERT INTO santa_users (user_data,user_presents,user_messages) VALUES('{"h1":"q1","w1":"r1"}', '{"h2":"q2","w2":"r2"}', '{"h3":"q3","w3":"r3"}');
app.post("/santa_users", async (req, res) => {
  try {
    const { user_data } = req.body
    const { user_presents } = req.body
    const { user_messages } = req.body
    const newUser = await pool.query(
      "INSERT INTO santa_users (user_data, user_presents, user_messages) VALUES($1,$2,$3) RETURNING *",
      [user_data, user_presents, user_messages]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// delete user with given id 
app.delete("/santa_users/:id", async (req, res) =>
{
  try
  {
    const { id } = req.params;
    
    const deleteUser = await pool.query("DELETE FROM santa_users WHERE id = $1",
    [id])

    res.json("user was deleted")
  }

  catch(err)
  {
    console.log(err.message)
  }
})


// USER PRESENTS
// update user's presents into user of given id
app.put("/santa_users/:id/user_presents", async (req, res) =>
{
  try
  {
    const { id } = req.params;
    const user_presents  = req.body;
    const updatePresent = await pool.query(
      "UPDATE santa_users SET user_presents = $1 WHERE id = $2",
      [user_presents, id])
      
    res.json("present was updated")
  }

  catch(err)
  {
    console.log(err.message)
  }
})

//get all presents of user with given id 
// SELECT user_presents FROM santa_users WHERE id = 3;
app.get("/santa_users/:id/user_presents", async(req, res) => {
  try
  {
    const { id } = req.params;
    const user = await pool.query("SELECT user_presents FROM santa_users WHERE id = $1", 
    [id]);
  
    res.json(user.rows[0])
  } 
  catch (err) 
  {
    console.error(err.message);
  }
})


//USER MESSAGES

//get all messages of user with given id 
// SELECT user_messages FROM santa_users WHERE id = 3;
app.get("/santa_users/:id/user_messages", async(req, res) => {
  try
  {
    const { id } = req.params;
    const user = await pool.query("SELECT user_messages FROM santa_users WHERE id = $1", 
    [id]);
  
    res.json(user.rows[0])
  } 
  catch (err) 
  {
    console.error(err.message);
  }
})

//update messages for user
app.put("/santa_users/:id/user_messages", async (req, res) =>
{
  try
  {
    const { id } = req.params;
    const user_messages  = req.body;
    const updateMessages = await pool.query(
      "UPDATE santa_users SET user_messages = $1 WHERE id = $2",
      [user_messages, id])
      
    res.json("user messages was updated")
  }

  catch(err)
  {
    console.log(err.message)
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
});