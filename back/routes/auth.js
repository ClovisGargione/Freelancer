module.exports	=	(app)	=>	{
  const	{	authController	}	=	app.controllers;
  app.post('/register', authController.create);
  app.post('/authenticate', authController.auth);
  app.post('/forgot_password', authController.forgotPassword);
  app.post('/reset_password', authController.resetPassword);
};
