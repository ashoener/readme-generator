function renderLicenseBadge(license) {
  if (license)
    return `![License Badge](https://img.shields.io/badge/license-${license}-green)`;
  return "";
}

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

function renderLicenseLink(license, text) {
  if (license) return `[${text}](/LICENSE)`;
  return "";
}

function generateMarkdown(data) {
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
