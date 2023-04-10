// import express
const express = require('express');
// import JWT tokens
const jwt = require('jsonwebtoken');
// start listening on port 3000
const app = express();
const port = 4000;

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

  //enable json parsing
app.use(express.json());

app.get('/', verifyToken,(req, res) => {
  //console.log(req.user)
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    res.send(req.body);
});

app.post('/login', (req, res) => {
    let data = req.body
    
    const user=login(data.username, data.password);
    /*res.send(
        login(
            data.username,
            data.password
        )
    );*/
    res.send(generatetoken(user))
  });

app.post('/register', (req, res) => {
    let data = req.body
    res.send(
        register(
            data.username,
            data.password,
            data.name,
            data.email
        )
    );
});

app.listen(port, () => {
    console.log('example app listening on port ${port}')
});

function login(username, password){
      console.log("Someone try to login with ", username, password) //apa yg user akan masukkan
      let matched = dbUsers.find(element => 
          element.username == username  
      )// find element
      if(matched) {
          if (matched.password == password){
              return matched
          } else {
              return "Password not matched"
          }
      } else {
          return "Username not found"
      }
  }


function register(newusername, newpassword, newname, newemail){
    dbUsers.find(element => {
        console.log(element) 
      })//check if username exists
    dbUsers.push({
          username : newusername,
          password : newpassword,
          name : newname,
          email : newemail
      })
      return "New acc has been created"
}

//to generate JWT tokens
function generatetoken(userprofile){
  return jwt.sign({
    //data: 'foobar',
    userprofile,
  }, 'secret', 
  { expiresIn: 60 * 60 });
}

function verifyToken(req,res,next){
  // verify a token symmetric
  let header =req.header.authorization
  console.log(header)

  let token=header.split(' ')[1]
  jwt.verify(token, 'secret', function(err, decoded) {
    //if(err){
     // res.send("Invalid Token")
    //}

    req.user=decoded
  //console.log(decoded.foo) // bar
  next()
});
}