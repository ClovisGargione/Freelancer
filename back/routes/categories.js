module.exports	=	(app)	=>	{
    const	{	categoriesController	}	=	app.controllers;
    app.get('/categories', categoriesController.all);
    app.post('/categories', categoriesController.create);
    app.get('/categories/:categoryId', categoriesController.find);
    app.delete('/categories/:categoryId', categoriesController.remove);
    app.put('/categories', categoriesController.update);
  };
  