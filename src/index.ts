#!/usr/bin/env ts-node
import github from "./services/github";
import cloudflare from "./services/cloudflare";
import {WhitelistsGetter} from "./misc/WhitelistsGetter";
import * as process from "node:process";

let services = {
    github, cloudflare
};

const argv = process.argv;
const len = argv.length;
let pass = false;

if (len > 3) {
    // @ts-ignore
    const service: WhitelistsGetter = services[argv[len - 2].toLowerCase()];
    const path = argv[len - 1];

    if (service) {
        const fs = require('fs');
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        } else if (!fs.statSync(path).isDirectory()) {
            console.error('path is not directory');
            process.exit(1);
        }
        service.save(path);
        pass = true;
    }
}

if (!pass) {
    console.log('NGINX Whitelist Generator');
    console.log();
    console.log('Usage:');
    console.log(`npx nginx-whitelist <service> <save path>`);
    console.log();
    console.log('Example:');
    console.log(`npx nginx-whitelist github /save/path/dir`);
    console.log();
    console.log('Services:');
    console.log(`github`);
    console.log(`cloudflare`);
    console.log();
    console.log('See:');
    console.log('https://github.com/saro-lab/nginx-whitelist');
    process.exit(1);
}
