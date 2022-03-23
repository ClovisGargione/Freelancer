const authMiddleware = require('../middlewares/auth');

module.exports	=	(app)	=>	{
    const	{	activityController	}	=	app.controllers;
    app.get('/activity', authMiddleware, activityController.all);
    app.post('/activity', authMiddleware, activityController.create);
    app.get('/activity/:activityId', authMiddleware, activityController.find);
    app.get('/activity/personal/user', authMiddleware, activityController.findByPersonalUser);
    app.get('/activity/user/find', authMiddleware, activityController.findByUser);
    app.get('/activity/pending/find', authMiddleware, activityController.findPendingByPersonalUser);
    app.delete('/activity/:activityId', authMiddleware, activityController.remove);
    app.put('/activity', authMiddleware, activityController.update);
  };