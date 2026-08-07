// Orchestrator script for Cline Automation Framework
// Handles high-level requests such as generating features or exploring a page and automating interactions.
// Includes human‑approval checkpoints after each major step.

const { execSync } = require('child_process');
const readline = require('readline');

function askApproval(message) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

async function main() {
  const request = process.argv.slice(2).join(' ');
  if (!request) {
    console.error('No request provided.');
    process.exit(1);
  }

  console.log('Orchestrator received request:', request);

  // ---------- 1️⃣ Feature generation pattern ----------
  const featureRegex = /generate feature (\w+) for (https?:\/\/[^\s]+)(?: with credentials (\S+) \/(\s*\S+))?/i;
  const featMatch = request.match(featureRegex);

  // ---------- 2️⃣ Explore & automate page pattern ----------
  const exploreRegex = /explore the page (https?:\/\/[^\s]+) and fill the form and click the Sign up button/i;
  const exploreMatch = request.match(exploreRegex);

  if (featMatch) {
    // Existing feature generation workflow
    const [, featureName, url, email, password] = featMatch;
    console.log('Parsed feature generation request:', { featureName, url, email, password });

    // Step 1: Generate Feature file
    const featureCmd = `npx cline generate feature --name ${featureName} --url ${url}`;
    console.log('Running:', featureCmd);
    execSync(featureCmd, { stdio: 'inherit' });
    if (!(await askApproval('Approve generated feature file?'))) {
      console.log('Feature generation rejected. Stopping.');
      process.exit(0);
    }

    // Step 2: Generate Scenario (placeholder)
    const scenarioTitle = `Default scenario for ${featureName}`;
    const scenarioCmd = `npx cline generate scenario --feature ${featureName} --title "${scenarioTitle}"`;
    console.log('Running:', scenarioCmd);
    execSync(scenarioCmd, { stdio: 'inherit' });
    if (!(await askApproval('Approve generated scenario?'))) {
      console.log('Scenario rejected. Stopping.');
      process.exit(0);
    }

    // Step 3: Generate Step Definitions
    // Step 3: Generate Step Definitions
    let stepCmd = `npx cline generate step --scenario ${featureName} --given "I navigate to \"${url}\""`;
    if (email && password) {
      stepCmd += ` --when "I fill email \"${email}\" and password \"${password}\""`;
    }
    stepCmd += ' --then "I should see the page"';
    console.log('Running:', stepCmd);
    execSync(stepCmd, { stdio: 'inherit' });
    if (!(await askApproval('Approve generated step definitions?'))) {
      console.log('Step definitions rejected. Stopping.');
      process.exit(0);
    }

    // Step 4: Generate Page Object
    const pageCmd = `npx cline generate page --url ${url} --name ${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Page`;
    console.log('Running:', pageCmd);
    execSync(pageCmd, { stdio: 'inherit' });
    if (!(await askApproval('Approve generated page object?'))) {
      console.log('Page object rejected. Stopping.');
      process.exit(0);
    }

    console.log('Feature‑generation workflow completed successfully.');
    return;
  }

  if (exploreMatch) {
    // Exploration & automation workflow
    const [, url] = exploreMatch;
    console.log('Parsed explore request for URL:', url);

    if (!(await askApproval(`Proceed to explore ${url}, fill the form and submit?`))) {
      console.log('User declined automation. Stopping.');
      process.exit(0);
    }

    const automationCmd = `node registration_form_automation.js`;
    console.log('Running automation script:', automationCmd);
    try {
      execSync(automationCmd, { stdio: 'inherit' });
    } catch (err) {
      console.error('Automation script failed.', err);
      process.exit(1);
    }
    console.log('Exploration and form submission completed successfully.');
    return;
  }

  console.error('Unable to parse request. Supported patterns:');
  console.error('- generate feature <name> for <url> [with credentials <email> / <password>]');
  console.error('- explore the page <url> and fill the form and click the Sign up button');
  process.exit(1);
}

main().catch(err => { console.error('Orchestrator error:', err); process.exit(1); });
