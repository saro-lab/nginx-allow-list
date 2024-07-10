import {WhitelistsGetter} from "../misc/WhitelistsGetter";
import {Whitelist} from "../misc/Whitelist";
import Util from "../misc/util";

class Cloudflare extends WhitelistsGetter {
    getWhitelists(): Promise<Whitelist[]> {
        return Promise.all([
            Util.https('www.cloudflare.com', '/ips-v4/'),
            Util.https('www.cloudflare.com', '/ips-v6/')
        ])
            .then(e => e.join('\n'))
            .then(e => e.split(/\s+/))
            .then(e => [new Whitelist('cloudflare', e)])
    }
}
export default new Cloudflare();
