import { EncryptUtils } from "./encrypt_utils";

class Pn2Request {


    /**
     * 
     * @param {string} url 
     * @param {{method: string?, headers: object, body: string?}} param1 
     * @returns 
     */
    static async fetch(url, { method, headers, body } = {}) {
        const encryptData = EncryptUtils.getInstance().encrypt(body ?? '');
        const response = await fetch(url, {
            method: method ?? 'GET',
            headers: {
                'X-PN2-KEYS': encryptData.key,
                ...headers
            },
            body: body ? encryptData.data : undefined
        });

        let responseBody = (await response.json()).result;

        return {
            status: response.status,
            ok: response.ok,
            headers: response.headers,
            body: EncryptUtils.getInstance().decrypt(responseBody, encryptData.aesKey, encryptData.iv)
        };
    }

}

export { Pn2Request };