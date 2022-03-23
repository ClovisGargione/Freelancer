module.exports = (app) => {
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
    const citiesController = {
        all: async (req, res) => {
            try {
                const cities = await Cities.find();
                cities.sort(compare);
                return res.send({ cities });
            } catch (error) {
                console.log(err);
                return res.status(400).send({error: 'Error on get all cities.'});
            }
        },
        find: async(req, res) => {
            try {
                const cities = await Cities.find({state: req.params.stateId});
                return res.send({cities});
            } catch(err) {
                return res.status(400).send({error: 'Não foi possível carregar a profissão.'});
            }
        }
    }

    return citiesController;
}