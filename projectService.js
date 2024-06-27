const { MongoClient, ObjectId } = require("mongodb");
const connectToDatabase = require("./db");

async function getProjects() {
  const db = await connectToDatabase();
  const collection = db.collection("project_sondhana");
  const projects = await collection
    .find({}, { projection: { project_id: 1, project_name: 1, _id: 1 } })
    .toArray();
  console.log(projects);
  return projects;
}

async function getProjectById(id) {
  const db = await connectToDatabase();
  const collection = db.collection("project_sondhana");
  const project = await collection.findOne({ _id: new ObjectId(id) });
  const commentCollection = db.collection(project?.relate_document);
  comments = await commentCollection.find().toArray();
  project.comments = comments;
  return project;
}

async function getProjectsManavis() {
  const db = await connectToDatabase();
  const collection = db.collection("project_manavis");
  const projects = await collection
    .find({}, { projection: { project_id: 1, project_name: 1, _id: 1 } })
    .toArray();
  console.log(projects);
  return projects;
}

async function getProjectsManavisById(id) {
  const db = await connectToDatabase();
  const collection = db.collection("project_manavis");
  const project = await collection.findOne({ _id: new ObjectId(id) });
  console.log(project);
  return project;
}

module.exports = { getProjects, getProjectById, getProjectsManavis, getProjectsManavisById };
