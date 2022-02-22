import crypto from 'crypto'

export const generateSalt = () => {
    return crypto.randomBytes(4).toString('base64')
}

export const cryptoPassword = (password: string, salt: string) => {
    const tempSalt = Buffer.from(salt, 'base64');
    return crypto
        .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
        .toString('base64');
}