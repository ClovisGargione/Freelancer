const authMiddleware = require('../middlewares/auth');

module.exports	=	(app)	=>	{
    const	{	ratingController	}	=	app.controllers;
    app.post('/rating', authMiddleware, ratingController.create);
};