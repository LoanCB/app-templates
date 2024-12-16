import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { decryptApiKey } from '../users/helpers/users-service.helper';

config();

const encryptedApiKey = process.argv[2];
const passwordApiEncryption = process.env.APP_SECRET;

if (!encryptedApiKey || !passwordApiEncryption) {
  Logger.error('APP_SECRET environment variable and encrypted API key as an argument are required.');
  process.exit(1);
}

try {
  const decryptedApiKey = decryptApiKey(encryptedApiKey, passwordApiEncryption);
  Logger.log(`Decrypted API key: ${decryptedApiKey}`);
} catch (error) {
  Logger.error(`Failed to decrypt API key: ${error.message}`);
  Logger.error(`[REMINDER] use npm run decrypt-api-key 'encryptedApiKey'`);
  Logger.error(`[REMINDER] On linux use simple quotes ' instead of double quotes "`);
  process.exit(1);
}
