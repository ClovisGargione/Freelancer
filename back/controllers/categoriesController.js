module.exports = (app) => {
    const Categories = app.models.categories;
    function compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
    }
    const categoriesController	= {
        find: async(req, res) => {
            try {
                const category = await Categories.findById(req.params.categoryId);
                return res.send({category});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error loading category.'});
            }
        },
        create: async (req, res) => {
            try{
                const { key, name } = req.body;
                const category = await Categories.create({ key, name});
                return res.send({category});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error creating new category.'});
            }
        },
        update: async (req, res) => {
            try {
                const { _id, key, name } = req.body;
                const category_ = await Categories.findByIdAndUpdate(_id, { key, name }, { new: true });
                return res.send({category_});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error updating category.'});
            }
        },
        remove: async (req, res) => {
            try {
                const category = await Categories.findById(req.params.categoryId);
                await category.remove();
                return res.send();
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error on remove category.'});
            }
        },
        all: async (req, res) => {
            try {
                const categories = await Categories.find();
                categories.sort(compare);
                return res.send({ categories });
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error on get all category.'});
            }
        }
    }
    return categoriesController;
}