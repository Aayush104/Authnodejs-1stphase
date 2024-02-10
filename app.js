const express = require ("express")
const { users } = require('./model/index')
const app = express()
const bcrypt = require('bcrypt')

require('./model/index') // database lai node ma connect garya 

app.set("view engine", "ejs") 

//form bata aako data ujh vanu paryo node lai hamiley

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//datbase ma data halna ko lagi
app.post ('/register', async (req,res)=>{
  

    
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    console.log(req.body)

     

    if( !email || !username || !password){
        res.send("Please fillUp all details")
    }


   await users.create({
        UserName : username,
        Email: email,
        Password: bcrypt.hashSync(password, 10)
    })

    res.redirect('/Login')
})

app.get('/register',(req,res)=>{
    res.render("register.ejs")


})

app.get('/Login',(req,res)=>{
    res.render('Login.ejs')
})


app.post('/Login', async (req,res)=>{

    const email = req.body.email
    const Password = req.body.password
    console.log(req.body)
// 1st Tyo email password xa ki nai check garney
const check = await users.findAll({
    where :{
Email : email
    }
})

//   console.log(check)

if(check.length > 0){
// 2ns password check garney

const isPassword = bcrypt.compareSync(Password, check[0].Password)
console.log(isPassword)
 if (isPassword){

    res.send('log in successfull')
 }else{
    res.send('Invalid pAssword')

 }

}else{
    res.send('iNVALID EMAIL Or password')
}
})
app.listen(3000,()=>{
    console.log("App is runnnin gon port 3000")
})