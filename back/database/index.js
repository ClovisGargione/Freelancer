const  mongoose = require('mongoose');
const	bluebird	=	require('bluebird');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false});
mongoose.Promise	=	bluebird;
module.exports = mongoose; 