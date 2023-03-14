
var express = require('express');
var app = express();

// Sequelize로 DB생성.
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Define
const Comments = sequelize.define('Comments', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {

  });
  
(async() => {
    await Comments.sync();
    console.log("The table for the User model was just (re)created!");
})();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');

// index page
app.get('/', async function(req, res) {
    const comments = await Comments.findAll();
    res.render('index', { comments : comments});
});

app.post('/create', async function(req, res) {
   console.log(req.body)
   const { content } = req.body
    jane = await Comments.create({ content : content });
    res.redirect('/')
 });

 app.post('/update/:id', async function(req, res) {
    console.log(req.params)
     console.log(req.body)

    const { content } = req.body
    const { id } = req.params
     
    await Comments.update({ content : content }, {
        where: {
            id : id
        }
    });


     res.redirect('/')
  });

  app.post('/delete/:id', async function(req, res) {
    console.log(req.params)
    

    const { content } = req.body
    const { id } = req.params
    
    await Comments.destroy({
        where: {
            id : id
        }
    });

     res.redirect('/')
  });

app.listen(3000);
console.log('Server is listening on port 8080');