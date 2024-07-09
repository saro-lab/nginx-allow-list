import {WhitelistsGetter} from "../misc/WhitelistsGetter";
import {Whitelist} from "../misc/Whitelist";
import https from "https";

class Github extends WhitelistsGetter {
    getWhitelists(callback: (whitelist: Whitelist[]) => void): void {
        https.get(`https://api.github.com/meta`, {}, (res: any) => {
            let data = '';
            res.on('data', (chunk: any) =>  data += chunk);
            res.on('end', () => {
                const jd = JSON.parse(data);
                return ([
                    'actions', 'actions_macos', 'api', 'dependabot', 'domains', 'git', 'github_enterprise_importer',
                    'hooks', 'importer', 'packages', 'pages', 'web'
                ]).map(name => new Whitelist(`github_${name}`, jd[name]));
            });
        }).on('error', (err: any) => {
            console.error('network error:', err);
        });
    }
}
export default new Github();
