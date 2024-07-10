import {Whitelist} from "./Whitelist";

export abstract class WhitelistsGetter {
    abstract getWhitelists(): Promise<Whitelist[]>;

    public save(path: string) {
        this.getWhitelists().then(list => list.forEach(e => e.save(path)));
    }
}
