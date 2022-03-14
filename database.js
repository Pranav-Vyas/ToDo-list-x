const mongoose = require('mongoose');


const url = process.env.DATABASE;

mongoose.connect(url,{useNewUrlParser: true}).then( () => {
    console.log('Database connected');
} ).catch( (err) => {
    console.log(err);
} )