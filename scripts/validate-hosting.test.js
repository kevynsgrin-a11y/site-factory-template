const { execSync } = require('child_process');
const path = require('path');

function runTest(fixtureName, expectedExitCode, expectedOutputContains) {
  const fixturePath = path.join(__dirname, 'fixtures', fixtureName);
  const scriptPath = path.join(__dirname, 'validate-hosting.js');

  let exitCode = 0;
  let output = '';

  try {
    output = execSync(`node ${scriptPath} ${fixturePath}`, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    exitCode = error.status;
    output = error.stderr || error.stdout || error.message;
  }

  if (exitCode !== expectedExitCode) {
    console.error(`Test failed for ${fixtureName}: Expected exit code ${expectedExitCode}, got ${exitCode}`);
    console.error(`Output: ${output}`);
    process.exit(1);
  }

  if (!output.includes(expectedOutputContains)) {
    console.error(`Test failed for ${fixtureName}: Expected output to contain "${expectedOutputContains}"`);
    console.error(`Output: ${output}`);
    process.exit(1);
  }

  console.log(`Test passed: ${fixtureName}`);
}

runTest('valid-pages', 0, 'Validation passed: Valid Pages mode configuration.');
runTest('valid-worker', 0, 'Validation passed: Valid Worker mode configuration.');
runTest('missing-entrypoint', 1, 'Error: Missing Worker entrypoint file: src/index.js');
runTest('conflicting-settings', 1, 'Error: Conflicting mode settings. Found both pages_build_output_dir and main in wrangler.toml.');
runTest('wrong-deploy-command', 1, 'Error: Package scripts inconsistent with Wrangler configuration. Worker mode requires "wrangler dev" and "wrangler deploy".');

console.log('All tests passed.');
