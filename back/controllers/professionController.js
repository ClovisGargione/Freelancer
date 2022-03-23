const categories = require('../dto/categories');


module.exports = (app) => {
    const Profession = app.models.profession;
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
    const professionController	= {
        count: async(req, res) => {
            let totalRecords = 0;
            if(req.query.searchText){
                let search = req.query.searchText;
                let regex = new RegExp([search].join(""), "i");
                totalRecords = await Profession.find({name: regex}).count();
            }else{
                totalRecords = await Profession.countDocuments({});
            }
            return res.send({totalRecords});
        },
        find: async(req, res) => {
            try {
                const profession = await Profession.findById(req.params.professionId);
                if(!profession) {
                    return res.status(204).send({error: 'Não foi possível localizar a profissão.'});
                }
                return res.send({profession});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Não foi possível carregar a profissão.'});
            }
        },
        search: async(req, res) => {
            try {
                let page = req.query.page;
                let limit = parseInt(req.query.limit);
                let skip = limit * (page - 1);
                let search = req.query.searchText;
                let regex = new RegExp([search].join(""), "i");
                const professions = await Profession.find({name: regex}).collation({locale: "en" }).skip(skip).limit(limit).populate('category').sort( { name: 1 } );
                return res.send({professions});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error loading professions.'});
            }
        },
        remove: async (req, res) => {
            try {
                const personals = await Personal.find({professions: req.params.professionId});
                if(personals.length) {
                    return res.status(409).send({error: 'A profissão está sendo utilizada por um trabalhador.'});
                }
                await Profession.findByIdAndRemove(req.params.professionId);
                return res.send();
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Não foi possível remover a profissão.'});
            }
        },
        create: async (req, res) => {
            try{
                const {name, category} = req.body
                const profession_ = await Profession.find({name, category});
                if(profession_.length) {
                    return res.status(409).send({error: 'A profissão já foi cadastrada.'});
                }
                const profession = await Profession.create({name, category});
                return res.send({profession});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Não foi possível adicionar uma nova profissão.'});
            }
        },
        all: async (req, res) => {
            try {
                let professions = [];
                let page = req.query.page;
                if(page) {
                    let limit = parseInt(req.query.limit);
                    let skip = limit * (page - 1);
                    professions = await Profession.find().collation({locale: "en" }).skip(skip).limit(limit).populate('category').sort( { name: 1 } );
                } else {
                    professions = await Profession.find().collation({locale: "en" }).populate('category').sort( { name: 1 } );
                }
                return res.send({professions});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error loading professions.'});
            }
        },
        update: async (req, res) => {
            try {
                const {_id, name, category} = req.body
                const personals = await Personal.find({professions: _id});
                if(personals.length) {
                    return res.status(409).send({error: 'A profissão está sendo utilizada por um trabalhador.'});
                }
                const profession = await Profession.findByIdAndUpdate(_id, {name, category}, {new: true});
                return res.send({profession});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error updating professions.'});
            }
        }

    }
    return professionController;
}