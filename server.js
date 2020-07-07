const express = require('express');
const nunjucks = require('nunjucks');
const receitas = require('./data');

const server = express();

server.use(express.static('public'))
server.set('view engine', 'njk')
nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', (req,res)=>{
    return res.render('index',  { items: receitas})
})

server.get('/about', (req,res)=>{
    return res.render('about')
})

server.get('/receitas', (req,res)=>{
    return res.render('receitas', { items: receitas})
})


server.get("/receita", function (req, res) {
   
    const id = req.query.id
    const receita = receitas.find(function(receita){
       if (receita.id == id) {
           return true;
       }
    })
    if (!receita){
        
        res.status(404).render("notfound");
    }
   
    return res.render('receita', {item: receita})

})



server.listen(5000, ()=>{
    console.log('server is runing');
})