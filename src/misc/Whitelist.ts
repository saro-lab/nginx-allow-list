import fs from "fs";

export class Whitelist {
    constructor(name: string, whitelist: string[]) {
        this.name = name;
        this.whitelist = whitelist;
    }
    public readonly name: string;
    public readonly whitelist: string[];

    public save(path: string = './') {
        const allowList = this.whitelist.filter(e => e.trim()).map(e => `allow ${e.trim()};`).join('\n');
        fs.writeFile(`${path}/${this.name}.conf`, allowList, (err: any) => err && console.error('file save error', err));
    }
}