const fs = require('fs');
const path = require('path');

function validateHosting(dir) {
  const packageJsonPath = path.join(dir, 'package.json');
  const wranglerTomlPath = path.join(dir, 'wrangler.toml');

  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json not found in ' + dir);
    process.exit(1);
  }
  if (!fs.existsSync(wranglerTomlPath)) {
    console.error('Error: wrangler.toml not found in ' + dir);
    process.exit(1);
  }

  const packageJsonStr = fs.readFileSync(packageJsonPath, 'utf8');
  const wranglerTomlStr = fs.readFileSync(wranglerTomlPath, 'utf8');

  let packageJson;
  try {
    packageJson = JSON.parse(packageJsonStr);
  } catch (e) {
    console.error('Error parsing package.json');
    process.exit(1);
  }

  const hasPagesDir = wranglerTomlStr.includes('pages_build_output_dir');
  const hasMain = wranglerTomlStr.includes('main =') || wranglerTomlStr.includes('main=') || wranglerTomlStr.includes('main  =');

  if (hasPagesDir && hasMain) {
    console.error('Error: Conflicting mode settings. Found both pages_build_output_dir and main in wrangler.toml.');
    process.exit(1);
  }

  if (!hasPagesDir && !hasMain) {
    console.error('Error: Missing or ambiguous mode settings. Need either pages_build_output_dir (Pages) or main (Worker).');
    process.exit(1);
  }

  const scripts = packageJson.scripts || {};
  const previewScript = scripts.preview || '';
  const deployScript = scripts.deploy || '';

  if (hasPagesDir) {
    // Pages mode
    if (!previewScript.includes('wrangler pages dev') || !deployScript.includes('wrangler pages deploy')) {
      console.error('Error: Package scripts inconsistent with Wrangler configuration. Pages mode requires "wrangler pages dev" and "wrangler pages deploy".');
      process.exit(1);
    }
    console.log('Validation passed: Valid Pages mode configuration.');
  } else {
    // Worker mode
    const mainMatch = wranglerTomlStr.match(/main\s*=\s*['"]([^'"]+)['"]/);
    if (!mainMatch) {
      console.error('Error: Could not extract main entrypoint from wrangler.toml.');
      process.exit(1);
    }
    const entrypoint = mainMatch[1];
    const entrypointPath = path.join(dir, entrypoint);

    if (!fs.existsSync(entrypointPath)) {
      console.error(`Error: Missing Worker entrypoint file: ${entrypoint}`);
      process.exit(1);
    }

    // Check for [assets] binding in wrangler.toml
    if (!wranglerTomlStr.includes('[assets]')) {
      console.error('Error: Missing [assets] binding for Worker with static assets.');
      process.exit(1);
    }

    if (previewScript.includes('wrangler pages dev') || deployScript.includes('wrangler pages deploy')) {
      console.error('Error: Package scripts inconsistent with Wrangler configuration. Worker mode requires "wrangler dev" and "wrangler deploy".');
      process.exit(1);
    }

    if (!previewScript.includes('wrangler dev') || !deployScript.includes('wrangler deploy')) {
        console.error('Error: Package scripts inconsistent with Wrangler configuration. Worker mode requires "wrangler dev" and "wrangler deploy".');
        process.exit(1);
    }

    console.log('Validation passed: Valid Worker mode configuration.');
  }
}

if (require.main === module) {
  const targetDir = process.argv[2] || process.cwd();
  validateHosting(targetDir);
}

module.exports = { validateHosting };
