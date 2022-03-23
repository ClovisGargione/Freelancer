const multer = require('multer');
const multerConfig = require('../config/multer');

module.exports	=	(app)	=>	{
    const	{	uploadFileController	}	=	app.controllers;
    app.post('/uploadImage', multer(multerConfig).single('file'), uploadFileController.uploadImage);
    app.get('/images', uploadFileController.images);
    app.delete('/imageRemove/:id', uploadFileController.remove);
  };
  