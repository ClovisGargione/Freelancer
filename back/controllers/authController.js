
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const crypto = require('crypto');
const mailer = require('../modules/mailer');
const { urlencoded } = require('body-parser');

module.exports = (app) => {
    const User	=	app.models.user;

    function generateToken(params = {}){
        return jwt.sign(params, authConfig.secret,  {
            expiresIn: 86400
        });
    }

    const AuthController	=	{
        create: async (req, res) => {
            try {
                const {email} = req.body;
                if(await User.findOne({email})){
                    return res.status(400).send({error: 'User already exists.'});
                }
                const user = await User.create(req.body);
                user.password = undefined;


                return res.send({user, token: generateToken({id: user.id})});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Registration failed.'});
            }
        },
        auth: async(req, res) => {
            try {
                const {email, password} = req.body;
                const user = await User.findOne({email}).select('+password');
                if(!user){
                    return res.status(400).send({error: 'User not found.'});
                }

                if(!await bcrypt.compare(password, user.password)){
                    return res.status(400).send({error: 'Invalid password.'});
                }
                user.password = undefined;
                console.log("Gerando token para Usuário ID: " + user.id);

                res.send({user, token: generateToken({id: user.id})});

            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Authentication failed.'});
            }
        },
        forgotPassword: async(req, res) => {
            const {email} = req.body;
            try{
                const user = await User.findOne({email});
                if(!user){
                    return res.status(400).send({error: 'User not found.'});
                }

                const token = crypto.randomBytes(20).toString('hex');
                const now = new Date();
                now.setHours(now.getHours() + 1 );
                await User.findByIdAndUpdate(user.id, {
                    '$set': {
                        passwordResetToken: token,
                        passwordResetExpires: now
                    }
                });

                mailer.sendMail({
                    to: email,
                    from: 'clovis.gargione@gmail.com',
                    template: 'forgot_password',
                    context: {token}
                }, (err) => {
                    if(err){
                        console.log(err);
                        return res.status(400).send({error: 'Cannot send forgot password email.'});
                    }
                    res.send();
                });
                
            }catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error on forgot password, try again'});
            }
        },
        resetPassword: async(req, res) => {
            const {email, token, password} = req.body;
            try {
                const user = await User.findOne({email}).select('+passwordResetToken passwordResetExpires');
                if(!user){
                    return res.status(400).send({error: 'User not found.'});
                }

                if(token !== user.passwordResetToken){
                    return res.status(400).send({error: 'Token invalid.'});
                }

                const now = new Date();

                if(now > user.passwordResetExpires){
                    return res.status(400).send({error: 'Token expired, generate a new one.'});
                }

                user.password = password;

                await user.save();

                return res.send();

            } catch(err) {
                return res.status(400).send({error: 'Cannot reset password, try again.'});
            }

        }
    };
    return	AuthController;
};

