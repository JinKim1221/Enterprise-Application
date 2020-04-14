/* MongoDB - mongoose */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/enterprise-app',
{
  useNewUrlParser : true,
  useUnifiedTopology : true
}, (err, client)=>{
    if(!err){
        
        console.log("MongoDB Connection Succeeded");
    }
    else{
        console.log("Error in DB connection : "+ err);
    }
});



require('./users.model');
module.exports = mongoose;