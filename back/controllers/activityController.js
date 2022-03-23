module.exports = (app) => {
    const Activity = app.models.activity;
    const Personal = app.models.personal;
    function compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
    }
    const activityController	= {
        find: async(req, res) => {
            try {
                const activity = await Activity.findById(req.params.activityId);
                return res.send({activity});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error loading activity.'});
            }
        },
        findPendingByPersonalUser: async(req, res) => {
            try {
                const personal = await Personal.find({user: req.userId}).select('_id');
                let personalId = [];
                personal.map(p => { personalId.push(p._id); });
                const isCanceled = false;
                const activity = await Activity.find({ isCanceled, personal: { $in : personalId}}).populate(['user', 'personal']).sort('finishAt');
                return res.send({activity});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error loading activity.'});
            }
        },
        findByPersonalUser: async(req, res) => {
            try {
                const { isStarted, isConfirmed, isFinished, isRated } = req.query;
                const personal = await Personal.find({user: req.userId}).select('_id');
                let personalId = [];
                personal.map(p => { personalId.push(p._id); });
                const activity = await Activity.find({ personal: { $in : personalId} , isStarted, isConfirmed, isFinished, isRated }).populate(['user', 'personal']);
                return res.send({activity});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error loading activity.'});
            }
        },
        findByUser: async(req, res) => {
            try {
                const { isStarted, isConfirmed, isFinished, isRated } = req.query;
                const activity = await Activity.find({user: req.userId, isStarted, isConfirmed, isFinished, isRated }).populate(['user', {path: 'personal', populate: [{path: 'professions'}, {path: 'user'}]}]).sort('finishAt');
                return res.send({activity});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error loading activity.'});
            }
        },
        create: async (req, res) => {
            try{
                const { personal, isStarted} = req.body;
                const activity = await Activity.create({ user: req.userId, personal, isStarted});
                return res.send({activity});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error starting new activity.'});
            }
        },
        update: async (req, res) => {
            try {
                const { _id, isStarted, isConfirmed, isFinished, finishAt, isCanceled } = req.body;
                const activity = await Activity.findByIdAndUpdate(_id, { isStarted, isConfirmed, isFinished, finishAt, isCanceled }, { new: true });
                return res.send({activity});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error updating activity.'});
            }
        },
        remove: async (req, res) => {
            try {
                const activity = await Activity.findById(req.params.activityId);
                await activity.remove();
                return res.send();
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error on remove activity.'});
            }
        },
        all: async (req, res) => {
            try {
                const activities = await Activity.find();
                activities.sort(compare);
                return res.send({ activities });
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error on get all activity.'});
            }
        }
    }
    return activityController;
}