const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const Project = app.models.project;
    const Task = app.models.task;
    const ProjectController	= {
        list: async (req, res) => {
            try {
                const projects = await Project.find().populate(['user', 'tasks']);
                return res.send({projects});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error loading projects.'});
            }
        },
        update: async (req, res) => {
            try{
                const {title, description, tasks} = req.body
                const project = await Project.findByIdAndUpdate(req.params.projectId, {title, description, user: req.userId}, {new: true});
                project.tasks = [];
                await Task.deleteOne({project: project.id});
                await Promise.all(tasks.map(async task => {
                    const projectTask = new Task({...task, project: project.id});
                    await projectTask.save();
                    project.tasks.push(projectTask);
                }));

                await project.save();
                return res.send({project});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error updating new project.'});
            }
        },
        create: async (req, res) => {
            try{
                const {title, description, tasks} = req.body
                const project = await Project.create({title, description, user: req.userId});
                await Promise.all(tasks.map(async task => {
                    const projectTask = new Task({...task, project: project.id});
                    await projectTask.save();
                    project.tasks.push(projectTask);
                }));

                await project.save();
                return res.send({project});
            } catch(err) {
                console.log(err);
                return res.status(400).send({error: 'Error creating new project.'});
            }
        },
        delete: async (req, res) => {
            try {
                await Project.findByIdAndRemove(req.params.projectId);
                return res.send();
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error removing project.'});
            }
        },
        find: async (req, res) => {
            try {
                const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);
                return res.send({project});
            } catch(err){
                console.log(err);
                return res.status(400).send({error: 'Error loading project.'});
            }
        }
    };
    return ProjectController;
}