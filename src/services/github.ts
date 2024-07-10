import {WhitelistsGetter} from "../misc/WhitelistsGetter";
import {Whitelist} from "../misc/Whitelist";
import Util from "../misc/util";

class Github extends WhitelistsGetter {
    getWhitelists(): Promise<Whitelist[]> {
        return Util.https('api.github.com', '/meta')
            .then(e => JSON.parse(e))
            .then(e => ([
                'actions', 'actions_macos', 'api', 'dependabot', 'git', 'github_enterprise_importer',
                'hooks', 'importer', 'packages', 'pages', 'web'
            ]).map(name => new Whitelist(`github_${name}`, e[name])))
    }

}
export default new Github();
