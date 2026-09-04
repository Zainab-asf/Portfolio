// Generates a bcrypt hash for ADMIN_PASSWORD_HASH in server/.env.
// Usage: node hash-password.js "your-new-password"
const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node hash-password.js "your-password"');
  process.exit(1);
}

bcrypt.hash(password, 12).then(hash => {
  console.log('\nAdd this to server/.env:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
});
