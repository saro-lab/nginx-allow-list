import {WhitelistsGetter} from "../misc/WhitelistsGetter";
import {Whitelist} from "../misc/Whitelist";

class Github extends WhitelistsGetter {
    getWhitelists(callback: (whitelist: Whitelist[]) => void): void {
        let https = require('node:https');
        const options = {
            hostname: 'api.github.com',
            port: 443,
            path: '/meta',
            method: 'GET',
            headers: {
                'User-Agent': 'nginx-whitelist'
            }
        };
        https.get(options, (res: any) => {
            let data = '';
            res.on('data', (chunk: any) =>  data += chunk);
            res.on('end', () => {
                const jd = JSON.parse(data);
                callback(([
                    'actions', 'actions_macos', 'api', 'dependabot', 'git', 'github_enterprise_importer',
                    'hooks', 'importer', 'packages', 'pages', 'web'
                ]).map(name => new Whitelist(`github_${name}`, jd[name])));
            });
        }).on('error', (err: any) => {
            console.error('network error:', err);
        });
    }
}
export default new Github();
