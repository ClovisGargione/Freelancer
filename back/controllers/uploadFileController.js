module.exports = (app) => {
    const Upload = app.models.upload;
    const uploadFileController	= {
        uploadImage: async (req, res) => {
            try {

                const { originalname: name, size, key, location: url = ''} = req.file;
                const upload = await Upload.create({
                    name,
                    size,
                    key,
                    url
                });
                console.log(req.file);
                return res.send(upload);
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error upload image.'});
            }
        },
        images: async (req, res) => {
            try {
                const imagesList = await Upload.find();
                return res.send(imagesList);
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error loading images list.'});
            }
        },
        remove: async (req, res) => {
            try {
                const project = await Upload.findById(req.params.id);
                await project.remove();
                return res.send();
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error on remove image.'});
            }
        }
    }
    return uploadFileController;
}