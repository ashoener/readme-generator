// TODO: Include packages needed for this application
import inquirer from "inquirer";
import fuzzyPath from "inquirer-fuzzy-path";
import autocompletePrompt from "inquirer-autocomplete-prompt";
import fs from "fs/promises";
import generateMarkdown from "./utils/generateMarkdown";
import path from "path";

inquirer.registerPrompt("fuzzypath", fuzzyPath);
inquirer.registerPrompt("autocomplete", autocompletePrompt);

// TODO: Create an array of questions for user input
/**
 * @type {import("inquirer").QuestionCollection<import("inquirer").Answers>}
 */
const questions = [
  { name: "title", message: "What is the title of your project?" },
  { name: "description", message: "Enter a description for your project" },
  { name: "usage", message: "Enter usage information for your project" },
  {
    name: "contributing",
    message: "Enter information about how to contribute to your project",
  },
  {
    name: "tests",
    message: "Enter information about how to run tests for your project",
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
    name: "github-name",
    message: "What is your GitHub username?",
  },
  {
    name: "email",
    message: "What is your email address?",
  },
  {
    name: "save-location",
    message: "Finally, where should I save the README to?",
    type: "fuzzypath",
    itemType: "directory",
    rootPath: "./",
    default: "examples",
    excludePath: (nodePath) =>
      nodePath.startsWith("node_modules") || nodePath.startsWith(".git"),
  },
];

// TODO: Create a function to write README file
async function writeToFile(fileName, data) {
  fs.writeFile("");
}

async function getInformation() {
  if (process.env.USE_DEBUG_DATA === "true")
    return {
      title: process.env.TITLE,
      description: process.env.DESCRIPTION,
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

// TODO: Create a function to initialize app
async function init() {
  const answers = await getInformation();
  const readmeData = generateMarkdown(answers);
  await fs.writeFile(
    path.resolve(import.meta.dir, answers.saveLocation, "README.md"),
    readmeData
  );
  console.log("Success! Your README.md has been generated.");
}

// Function call to initialize app
init();
