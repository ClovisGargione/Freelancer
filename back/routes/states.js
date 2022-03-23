module.exports	=	(app)	=>	{
    const	{	statesController	}	=	app.controllers;
    app.get('/states', statesController.all);
    app.post('/states', statesController.create);
  };
  