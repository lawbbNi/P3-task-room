const pino = require('pino');
const ProjectModel = require('../models/project.model');
const NotFoundError = require('../errors/not.found');

const logger = pino();

const postProject = async (req, res, next) => {
  try {
    const { name,profile,created_by} = req.body;
    const project = new ProjectModel({
      name,
      profile,
      created_by
    })
    await project.save();
    res.status(201).json({
      message: `${project.id} created successfully!` 
    });
    logger.info(`Project ${project.id} created sufccessfully`)
  } catch (error) {
    next(error);
    logger.error(`Error while creating project: ${error.message}`)
  }
}

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
    logger.info(`Retrieved ${projects.length} projects`)
  } catch (error) {
    next(error)
    logger.error(`Error while fetching projects: ${error.message}`)
  }
}

const getProjectById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id);
    if (!project) {
      throw new NotFoundError(`Project ${id} not found`)
    }
    res.json(project)
    logger.info(`Project ${id} retrieved successfully`)
  } catch (error) {
    next(error);
    logger.error(`Error while fetching project ${id}: ${error.message}`)
  }
}

const updateProject = async (req, res, next) => {
  const { id } = req.params
  const {name,profile,created_by,members,columns} = req.body

  try {
    await ProjectModel.findByIdAndUpdate(
      id,
      {
        name,
        profile,
        created_by,
        members,
        columns
      }
            
    ).exec();
    res.status(204).send()
    logger.info(`Project ${id} updated successfully`)
  } catch (error) {
    next(error);
    logger.error(`Error while updating project ${id}: ${error.message}`)
  }
}

const deleteProjectById = async (req, res, next) => {
  const { id } = req.params
  try {
    const project = await ProjectModel.findByIdAndDelete(id).exec()
    if (!project) {
      throw new NotFoundError(`Project ${id} not found`)
    }
    res.json({message: 'Project deleted successfully'})
    logger.info(`Project ${id} deleted successfully`)
  } catch (error) {
    next(error)
    logger.info(`Error while deleting project ${id}: ${error.message}`)
  }
}
module.exports = {
  postProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProjectById
}