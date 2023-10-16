// TODO: Include packages needed for this application
import inquirer from "inquirer";

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
    choices: ["MIT", "ISC"], // TODO: Add more common license types
    type: "list",
  },
  {
    name: "github-name",
    message: "What is your GitHub username?",
  },
  {
    name: "email",
    message: "What is your email address?",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
