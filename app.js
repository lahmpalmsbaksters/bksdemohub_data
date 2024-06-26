const express = require("express");
const { getProjects, getProjectById } = require("./projectService");
const app = express();
const port = 5005;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/projects/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await getProjectById(id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.error("Error fetching project by id:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
