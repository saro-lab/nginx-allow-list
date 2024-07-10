let https = require('node:https');

class Util {
    https(host: string, path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: host,
                port: 443,
                path: path,
                method: 'GET',
                headers: {'User-Agent': 'nginx-whitelist'}
            };
            https.get(options, (res: any) => {
                let data = '';
                res.on('data', (chunk: any) =>  data += chunk);
                res.on('end', () => resolve(data));
            }).on('error', (err: any) => {
                console.log(`network error: ${err}`)
                reject(err);
            });
        });
    }
}

export default new Util();
