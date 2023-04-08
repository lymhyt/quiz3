const express = require('express');
const app = express();
const port = 3000;

let dbUsers = [
  {
      username :"yat",
      password:"pass",
      name: "yat",
      email:"email"
  },
  //setiap user kene ade lain username
  {
      username :"aya",
      password:"passw",
      name: "aya",
      email:"email"
  }
]
//enable json body parsing
app.use (express.json());

app.post('/login',(req,res)=>{
  let data =req.body
  res.send(
    login (
      data.username,
      data.password
    )
  )
})

app.post('/register',(req,res)=>{
  let data =req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  )
})

app.listen(port,()=>{
  console.log('Example app lstening at http://localhost:${port}')
})

function login(username,password){
  console.log ("someone try to login with", username, password)
  let matched =dbUsers.find(element =>{
      element.username==username
  })
      //console.log(matched)
      if (matched)
      {
          if (matched.password == password){
              return matched
          }else{
              return "Password Not matched"
          }
      }
      else {
          return "username not found"
      }  
  }

function register (
  newusername, 
  newpassword, 
  newname, 
  newemail
  ){

    dbUsers.find(element=>{
      console.log(element)
    })
    //to do :check if username exist

    dbUsers.push({
        username: newusername,
        password: newpassword,
        name: newname,
        email:newemail,
    })
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/',(req,res)=>{
  let data=req.body
  res.send('post request'+JSON.stringidy(data))
})


//create a POST route for user to login
//app.post('/login',(req,res)=>{
  //get username &passw from req body
  //const {username,password}= req.body;
  //find user n database
  //const user=dbUsers.find(user=> user.username ===username && user.password=== password);

  //if (user){
    //user found then return the user object
   // res.send(user);
  //}else{
    //if user not found display
    //res.send({error:"USER NOT FOUND"})
  //}
//}
//)


//app.listen(port, () => {
  //console.log(`Example app listening on port ${port}`)
//})