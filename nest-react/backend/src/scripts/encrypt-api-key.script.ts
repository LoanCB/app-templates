import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { encryptApiKey, generateApiKey } from '../users/helpers/users-service.helper';

config();

const passwordApiEncryption = process.env.APP_SECRET;

if (!passwordApiEncryption) {
  Logger.error('Please set APP_SECRET as an environment variable.');
  process.exit(1);
}

const apiKey = process.argv[2] || generateApiKey();
Logger.log(`API key: ${apiKey}`);

const encryptedApiKey = encryptApiKey(apiKey, passwordApiEncryption);
Logger.log(`Encrypted API key: ${encryptedApiKey}`);
