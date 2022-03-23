module.exports	=	(app)	=>	{
    const	{	professionController	}	=	app.controllers;
    app.post('/profession', professionController.create);
    app.get('/profession', professionController.all);
    app.delete('/profession/:professionId', professionController.remove);
    app.put('/profession', professionController.update);
    app.get('/profession/:professionId', professionController.find);
    app.get('/profession/records/total', professionController.count);
    app.get('/profession/search/text', professionController.search);
  };
  