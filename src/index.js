const express = require('express')
const PORT = process.env.PORT || 3000
const path = require('path')
const public = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const hbs = require('hbs')
const auth = require('./middleware/authenticate.js')
const User = require('./models/user.js')
const Idea = require('./models/idea.js')
require('./db/mongoose.js')
const cookieParser = require('cookie-parser')
var app = express()


app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use(express.static(public))
app.set('view engine','hbs')
app.set('views',viewsPath)


app.get('/',(req,res)=>{
    res.render('home')
})

// app.get('/register',(req,res)=>{
//     res.render('register')
// })
// app.post('/register',async (req,res)=>{
//     console.log(req.body)
//     const user = new User(req.body)
//     console.log(user)
//     try{
//         await user.save()
//         console.log('Registered')
//         res.send('registered')
//     }
//     catch(e){
//         res.send('not registered')
//     }
// })

app.get('/login',(req,res)=>{
    res.redirect('/')
})


app.get('/dashboard',auth,(req,res)=>{
   res.render('dashboard',{user : req.user.username.split(" ")[0]})
})


app.post('/login', async (req,res)=>{
    try{
            //console.log(req.body)
            const user = await User.findByCredentials(req.body.username,req.body.password)
            //console.log(user)
            const token = await user.generateAuthToken()
            res.cookie('accesstoken',token)
            //console.log(token)
            //console.log('password and username correct, redirecting to dashboard')
            //res.cookie('accesstoken',token)
            res.redirect('/dashboard')
    }
    catch(e){
        res.render('home',{
            alert : "<script>alert('Authentication Failed! Wrong username/password')</script>"
        })
    }
    })
app.post('/submitIdea',async (req,res)=>{
    console.log(req.body)
    const idea = new Idea(req.body)
    try{
        await idea.save()
        res.render('dashboard',{
            alert:"<script> alert('Idea submitted successfully')</script>"
        })
    }catch(e){
        res.render('dashboard',{
            alert:"<script> alert('Idea not submitted!')</script>"
        })
    }
    
})

app.get('/fetchIdeas',auth,async(req,res)=>{
    try{
        const ideas = await Idea.find()
        res.send(ideas)
    }
    catch(e){
        res.send('failed')
    }
})
app.listen(PORT, ()=>{
    console.log("Server is up and running at "+PORT)
})
