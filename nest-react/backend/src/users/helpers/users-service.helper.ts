import * as crypto from 'crypto';

export const generateApiKey = (nbRandomBytes = 20) => {
  return crypto.randomBytes(nbRandomBytes).toString('hex');
};

export const encryptApiKey = (apiKey: string, encryptionPassword: string) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionPassword, iv);
  const encryptedApiKey = Buffer.concat([cipher.update(apiKey, 'hex'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return encryptedApiKey.toString('hex') + '$$' + tag.toString('hex') + '$$' + iv.toString('hex');
};

export const decryptApiKey = (apiKey: string, encryptionPassword: string) => {
  const cipherSplit = apiKey.split('$$');

  try {
    const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionPassword, Buffer.from(cipherSplit[2], 'hex'));
    decipher.setAuthTag(Buffer.from(cipherSplit[1], 'hex'));
    return Buffer.concat([decipher.update(cipherSplit[0], 'hex'), decipher.final()]).toString('hex');
  } catch (error) {
    throw new Error(`Verify you use the same APP_SECRET for encryption and decryption users API keys !\n${error}`);
  }
};
