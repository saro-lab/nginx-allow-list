# NGINX whitelist

## Requirement
- [node.js](https://nodejs.org/)

## Usage
```
Usage:
npx nginx-whitelist <service> <save path>

Example:
npx nginx-whitelist github /save/path/dir
```

## Support
### GitHub
```
github_actions.conf
github_actions_macos.conf
github_api.conf
github_dependabot.conf
github_git.conf
github_github_enterprise_importer.conf
github_hooks.conf
github_importer.conf
github_packages.conf
github_pages.conf
github_web.conf
```
### Cloudflare
```
cloudflare.conf
```


### nginx.conf example
```
server {
    ...
    location / {
        ...
        include /save/path/example/github_actions.txt;
        deny all;
    }
    ...
}
```
