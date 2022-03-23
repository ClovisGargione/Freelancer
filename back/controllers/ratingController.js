module.exports = (app) => {
    const Rating = app.models.rating;
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
    const ratingController	= {
        create: async (req, res) => {
            try{
                const { personal, score, activityId} = req.body;
                const rating = await Rating.create({ user: req.userId, personal, score});
                const rated = await Rating.find({personal});
                let scores = 0;
                rated.map( r => {
                    scores += r.score;
                });
                const scoreTotal = Math.floor(scores/rated.length);
                await Personal.findByIdAndUpdate(personal, { score: scoreTotal });
                await Activity.findByIdAndUpdate(activityId, { isRated: true });
                return res.send({rating});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error create new rating.'});
            }
        }
    }
    return ratingController;
}