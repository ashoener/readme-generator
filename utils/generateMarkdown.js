// Generate the text for the license badge
function renderLicenseBadge(license) {
  if (license)
    return `![License Badge](https://img.shields.io/badge/license-${license}-green)`;
  return "";
}

// Generate the text for the license section
function renderLicenseSection(license) {
  if (license)
    return `## License

This project is covered under the ${license} license. You may view it ${renderLicenseLink(
      license,
      "here"
    )}.
`;
  return "";
}

// Generate the link to the license file
function renderLicenseLink(license, text) {
  if (license) return `[${text}](/LICENSE)`;
  return "";
}

// Generate the markdown for the README.md
function generateMarkdown(data) {
  // Used to create the Table of Contents section
  const sections = [
    "Description",
    "Installation",
    "Usage",
    "How to Contribute",
    "Tests",
    "Questions",
    "License",
  ];
  return `# ${data.title}
${renderLicenseBadge(data.license)}  

## Description

${data.description}

## Table of Contents

${sections
  .map((s) => `- [${s}](#${s.toLowerCase().split(" ").join("-")})`)
  .join("\n")}

## Installation

${data.installation}

## Usage

${data.usage}

## How to Contribute

${data.contributing}

## Tests

${data.tests}

## Questions

If you have any questions, you may contact me via [GitHub](${
    data.githubName
  }) or by [email](mailto:${data.email}).

${renderLicenseSection(data.license)}
`;
}

export default generateMarkdown;
