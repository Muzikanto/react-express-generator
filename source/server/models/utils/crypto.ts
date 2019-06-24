const crypto = require('crypto');
const config = require('../../../config.json');
const secret = config.crypto.secret;
const iv = config.crypto.iv;
const key = crypto.createHash("sha256").update(secret, "ascii").digest();

function encriptString(str: string) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    cipher.update(str, "ascii");
    return cipher.final("base64");
}

function decriptString(str: string) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    decipher.update(str, "base64");
    return decipher.final("ascii");
}

export {encriptString, decriptString};
