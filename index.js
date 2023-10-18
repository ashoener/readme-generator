#!/usr/bin/env node
import inquirer from "inquirer";
import fuzzyPath from "inquirer-fuzzy-path";
import autocompletePrompt from "inquirer-autocomplete-prompt";
import fs from "fs/promises";
import generateMarkdown from "./utils/generateMarkdown.js";
import { fileURLToPath } from "url";
import path from "path";

inquirer.registerPrompt("fuzzypath", fuzzyPath);
inquirer.registerPrompt("autocomplete", autocompletePrompt);

// TODO: Create an array of questions for user input
/**
 * @type {import("inquirer").QuestionCollection<import("inquirer").Answers>}
 */
const questions = [
  { name: "title", message: "What is the title of your project?" },
  {
    name: "description",
    message: "Enter a description for your project",
    type: "editor",
  },
  {
    name: "installation",
    message: "Enter installation information for your project",
    type: "editor",
  },
  {
    name: "usage",
    message: "Enter usage information for your project",
    type: "editor",
  },
  {
    name: "contributing",
    message: "Enter information about how to contribute to your project",
    type: "editor",
  },
  {
    name: "tests",
    message: "Enter information about how to run tests for your project",
    type: "editor",
  },
  {
    name: "license",
    message: "What license would you like to use?",
    async source(answers, input) {
      const choices = [
        "MIT",
        "ISC",
        "GNU AGPLv3",
        "GNU GPLv3",
        "GNU LGPLv3",
        "Mozilla Public License 2.0",
        "Apache License 2.0",
      ];
      if (!input) return choices;
      return choices.filter((c) => c.includes(input.toUpperCase()));
    }, // TODO: Add more common license types
    type: "autocomplete",
  },
  {
    name: "githubName",
    message: "What is your GitHub username?",
  },
  {
    name: "email",
    message: "What is your email address?",
  },
  {
    name: "saveLocation",
    message: "Finally, where should I save the README to?",
    type: "fuzzypath",
    itemType: "directory",
    rootPath: "./",
    excludePath: (nodePath) =>
      nodePath.startsWith("node_modules") || nodePath.startsWith(".git"),
  },
];

async function getInformation() {
  if (process.env.USE_DEBUG_DATA === "true")
    return {
      title: process.env.TITLE,
      description: process.env.DESCRIPTION,
      installation: process.env.INSTALLATION,
      usage: process.env.USAGE,
      contributing: process.env.CONTRIBUTING,
      tests: process.env.TESTS,
      license: process.env.LICENSE,
      githubName: process.env.GITHUB_NAME,
      email: process.env.EMAIL,
      saveLocation: process.env.SAVE_LOCATION,
    };
  return await inquirer.prompt(questions);
}

async function init() {
  const answers = await getInformation();
  const readmeData = generateMarkdown(answers);
  await fs.writeFile(
    path.resolve(process.cwd(), answers.saveLocation, "README.md"),
    readmeData
  );
  console.log("Success! Your README.md has been generated.");
}

// Function call to initialize app
init();
