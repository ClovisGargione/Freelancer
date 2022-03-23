module.exports	=	(app)	=>	{
    const	{	citiesController	}	=	app.controllers;
    app.get('/cities', citiesController.all);
    app.get('/cities/:stateId', citiesController.find);
  };
  