const authMiddleware = require('../middlewares/auth');

module.exports	=	(app)	=>	{
    const	{	projectController	}	=	app.controllers;
    app.get('/project', authMiddleware, projectController.list);
    app.get('/project/:projectId', authMiddleware, projectController.find);
    app.put('/project/:projectId', authMiddleware, projectController.update);
    app.post('/project', authMiddleware, projectController.create);
    app.delete('/project/:projectId', authMiddleware, projectController.delete);
  };
  