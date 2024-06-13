const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// const expressSession=require("express-session");
// const flash=require('connect-flash');
mongoose.connect('mongodb://localhost:27017/todolistDB');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressSession({
//     resave:false,
//     saveuninitialized:false,
//     secret:"haluluaya"
// }));
// app.use(flash());
// let tasks=[];
const data = mongoose.Schema({
    task: 'string'
})

const tododata = mongoose.model('tododata', data);

app.get('/', async function (req, res) {
    try{
    const founddata= await tododata.find({});
     res.render('index', { newdata: founddata });
        }
    

catch(error){
    console.log(error);
    res.status(500).send('fetching error');
}
   }   // console.log(tasks)
    // res.render('index',{tasks:tasks})
);

app.post('/', async function (req, res) {
    const dataname = req.body.task;
    const item = new tododata({
        task: dataname
    });
  try{
   await item.save();
    res.redirect('/');
  }
  catch(error){
    console.log(error);
    res.status(500).send('adding to list');
}

})
// app.post('/create',function(req,res){
// //    let task=req.body.task;
// //    if(tasks){
// //     tasks.push(task);
// //    }
//     res.redirect('/')

// })
app.post('/del',async function(req,res){
    const delitem = req.body.taskid;
    try{await tododata.findByIdAndDelete(delitem);
        res.redirect('/');
    }
    catch(error){
        console.log(error);
    }
})


app.listen(8000, function () {
    console.log('running');
})