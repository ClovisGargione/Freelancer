module.exports = (app) => {
    const Personal = app.models.personal;
    const Upload = app.models.upload;
    const User = app.models.user;
    const Profession = app.models.profession;
    const personalController	= {
        count: async(req, res) => {
            let totalRecords = 0;
            if(req.query.searchText){
                let search = req.query.searchText;
                let regex = new RegExp([search].join(""), "i");
                const users = await User.find({name: regex}).select('_id');
                const professions = await Profession.find({name: regex}).select('_id');
                let usersId = [];
                let professionsId = [];
                users.map(u => { usersId.push(u._id); });
                professions.map(p => { professionsId.push(p._id); });
                totalRecords = await Personal.find({ $or: [{professions: { $in:  professionsId}}, {user: { $in:  usersId}}, {description: regex}]}).count();
            }else{
                totalRecords = await Personal.countDocuments({});
            }
            return res.send({totalRecords});
        },
        search: async(req, res) => {
            try {
                let page = req.query.page;
                let limit = parseInt(req.query.limit);
                let skip = limit * (page - 1);
                let search = req.query.searchText;
                let regex = new RegExp([search].join(""), "i");
                const users = await User.find({name: regex}).select('_id');
                const professions = await Profession.find({name: regex}).select('_id');
                let usersId = [];
                let professionsId = [];
                users.map(u => { usersId.push(u._id); });
                professions.map(p => { professionsId.push(p._id); });
                const personals = await Personal.find({ $or: [{professions: { $in:  professionsId}}, {user: { $in:  usersId}}, {description: regex}]}).collation({locale: "en" }).skip(skip).limit(limit).populate(['user', 'professions', 'images', 'state', 'city']).sort( { score: -1 } );
                return res.send({personals});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error loading personals.'});
            }
        },
        findByUser: async(req, res) => {
            try{
                const personals = await Personal.find({user: req.userId}).populate(['user', 'professions', 'images', 'state', 'city']);
                return res.send({personals});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error loading personal.'});
            }
        },
        find: async(req, res) => {
            try {
                const personal = await Personal.findById(req.params.personalId).populate(['user', {path: 'professions', populate: {path: 'category'}}, 'images', 'state', 'city']);
                return res.send({personal});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error loading personal.'});
            }
        },
        remove: async (req, res) => {
            try {
                const personal = await Personal.findById(req.params.personalId);
                personal.images.map(async (image) => {
                    await Upload.findByIdAndRemove(image);
                });
                await personal.remove();
                return res.send();
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error removing personal.'});
            }
        },
        create: async (req, res) => {
            try{
                const { address, professions, description, contacts, state, city} = req.body;
                const personal = new Personal({ address, user: req.userId, description, contacts, state, city});
                professions.map(async profession => {
                    personal.professions.push(profession);
                });
                await personal.save();
                return res.send({personal});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Não foi possível criar uma nova atividade.'});
            }
        },
        all: async (req, res) => {
            let personals = [];
            let page = req.query.page;
            try {
                if(page) {
                    let limit = parseInt(req.query.limit);
                    let skip = limit * (page - 1);
                    personals = await Personal.find().collation({locale: "en" }).skip(skip).limit(limit).populate(['user', 'professions', 'images', 'state', 'city']).sort( { score: -1 } );
                } else {
                    personals = await Personal.find().collation({locale: "en" }).populate(['user', 'professions', 'images', 'state', 'city']).sort( { score: -1 } );
                }
                return res.send({personals});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error loading personals.'});
            }
        },
        images: async (req, res) => {
            try {
                 const { originalname: name, size, key, location: url = ''} = req.file;
                const upload = await Upload.create({
                    name,
                    size,
                    key,
                    url
                });
                const personal = await Personal.findById(req.params.personalId).populate(['user', 'professions', 'images']);
                personal.images.push(upload);
                await personal.save();
                return res.send({personal});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error creating image.'});
            }
        },
        removeImage: async (req, res) => {
            try {
            const personal = await Personal.findById(req.params.personalId);
            const image = await Upload.findById(req.params.imageId);
            personal.images.map((image_, index) => {
                if(image_ == image.id){
                    personal.images.splice(index, 1);
                }
            });
            await personal.save();
            await image.remove();
            return res.send({personal});
        } catch(err){
            console.log(err);
            return res.status(400).send({error: 'Error removing image.'});
        }

        },
        update: async (req, res) => {
            try {
                const { address, professions, description, contacts} = req.body;
                const personal = await Personal.findByIdAndUpdate(req.params.personalId, { address, description, contacts}, {new: true});
                personal.professions = [];
                professions.map(profession => {
                    personal.professions.push(profession);
                });
                await personal.save();
                return res.send({personal});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error updating personal.'});
            }
        }
    }
    return personalController;
}