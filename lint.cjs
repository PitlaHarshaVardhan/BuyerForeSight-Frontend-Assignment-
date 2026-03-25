const { execSync } = require('child_process');
const fs = require('fs');
try {
  execSync('npx eslint --format json .', { encoding: 'utf8', stdio: 'pipe' });
} catch (err) {
  fs.writeFileSync('lint_output.json', err.stdout);
}
