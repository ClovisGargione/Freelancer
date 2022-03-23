module.exports = (app) => {
    const States = app.models.states;
    const Cities = app.models.cities;
    function compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
    }
    const statesController = {
        all: async (req, res) => {
            try {
                const states = await States.find();
                states.sort(compare);
                return res.send({ states });
            } catch (error) {
                console.log(err);
                return res.status(400).send({error: 'Error on get all states.'});
            }
        },
        create: async (req, res) => {
            try{
                const { states } = req.body;
                states.map( async state => {
                    let newState = await States.create({acronym: state.acronym, name: state.name});
                    state.cities.map( async city => {
                        await Cities.create({name: city, state: newState});
                    });
                });
                return res.send();
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error creating new state.'});
            }
        }
    }

    return statesController;
}