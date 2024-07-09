import {Whitelist} from "./Whitelist";

export abstract class WhitelistsGetter {
    abstract getWhitelists(callback: (whitelist: Whitelist[]) => void): void;

    public save(path: string) {
        this.getWhitelists(list => list.forEach(e => e.save(path)))
        this.getWhitelists(list => list.forEach(e => e.save(path)))
    }
}
