const express = require("express");
require("dotenv").config();
const {
  getProjects,
  getProjectById,
  getProjectsManavis,
  getProjectsManavisById,
} = require("./projectService");
const app = express();
const port = process.env.PORT || 5005;

app.get("/", async (req, res) => {
  try {
    res.send("Health check successful!");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get(`${process.env.SONDHANA_API_ENDPOINT}/projects`, async (req, res) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get(
  `${process.env.SONDHANA_API_ENDPOINT}/projects/:id`,
  async (req, res) => {
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
  }
);

app.get(`${process.env.MANAVIS_API_ENDPOINT}/projects`, async (req, res) => {
  try {
    const projects = await getProjectsManavis();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get(
  `${process.env.MANAVIS_API_ENDPOINT}/projects/:id`,
  async (req, res) => {
    try {
      console.log("req.params.id", req.params.id);
      const id = req.params.id;
      const project = await getProjectsManavisById(id);
      if (project) {
        res.json(project);
      } else {
        res.status(404).send("Project not found");
      }
    } catch (error) {
      console.error("Error fetching project by id:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
