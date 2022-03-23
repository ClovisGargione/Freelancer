const authMiddleware = require('../middlewares/auth');
const multerConfig = require('../config/multer');
const multer = require('multer');

module.exports	=	(app)	=>	{
    const	{	personalController	}	=	app.controllers;
    app.post('/personal', authMiddleware, personalController.create);
    app.get('/personal', authMiddleware, personalController.all);
    app.post('/personal-image/:personalId', authMiddleware, multer(multerConfig).single('file'), personalController.images);
    app.delete('/personal-image/:personalId/:imageId', authMiddleware, personalController.removeImage);
    app.put('/personal/:personalId', authMiddleware, personalController.update);
    app.delete('/personal/:personalId', authMiddleware, personalController.remove);
    app.get('/personal/:personalId', authMiddleware, personalController.find);
    app.get('/personal/user/all', authMiddleware, personalController.findByUser);
    app.get('/personal/records/total', authMiddleware, personalController.count);
    app.get('/personal/search/text', authMiddleware, personalController.search);
};
  