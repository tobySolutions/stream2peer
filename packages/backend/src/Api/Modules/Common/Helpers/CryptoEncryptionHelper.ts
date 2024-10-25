import CryptoJS, { AES } from 'crypto-js';
import { encryptionConfig } from "Config/index";

export class EncryptionService {
    public static encryptData(data: string) {
        const encryptedData = AES.encrypt(JSON.stringify(data), encryptionConfig.customEncryptionKey).toString();
        return encryptedData;
    }

    public static decryptData(encryptedData: string) {
        const decryptedData = AES.decrypt(encryptedData, encryptionConfig.customEncryptionKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    }
}
