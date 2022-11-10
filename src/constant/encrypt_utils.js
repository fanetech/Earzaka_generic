import CryptoJs from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

class EncryptUtils {

    constructor() {
        this.rsaEncrypter = new JSEncrypt();
        this.rsaEncrypter.setPublicKey(process.env.REACT_APP_PUBLIC_KEY.replace(/\\n/g, '\n'));
    }

    static getInstance() {
        if (!EncryptUtils.instance)
            EncryptUtils.instance = new EncryptUtils();
        return EncryptUtils.instance;
    }

    generateAesKeys() {
        const salt = CryptoJs.lib.WordArray.random(128 / 8);
        const key = CryptoJs.PBKDF2('X-PN2-KEYS', salt, { keySize: 256 / 32 });
        return {
            key,
            iv: CryptoJs.lib.WordArray.random(16)
        };
    }

    encrypt(data) {
        const keys = this.generateAesKeys();
        const encryptedData = CryptoJs.AES.encrypt(data, keys.key, {
            iv: keys.iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        });

        const key = this.rsaEncrypter.encrypt(`${keys.key.toString(CryptoJs.enc.Base64)}:${keys.iv.toString(CryptoJs.enc.Base64)}`);

        return {
            data: encryptedData.toString(),
            key,
            aesKey: keys.key, // Pour le retour
            iv: keys.iv // Pour le retour
        };
    }

    decrypt(data, key, iv) {
        return CryptoJs.AES.decrypt(data, key, {
            iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        }).toString(CryptoJs.enc.Utf8);
    }

}

export { EncryptUtils };