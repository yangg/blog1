---
title: 11 Simple npm Tricks That Will Knock Your Wombat Socks Off
date: 2016-09-15 14:18:33
link: https://nodesource.com/blog/eleven-npm-tricks-that-will-knock-your-wombat-socks-off/
tags: [npm, nodesource.com]
---
11 个有用的 npm 小技巧
## Developing packages
```bash
# create a symlink to the global folder
/projects/hexo-postscript $ npm link

# link hexo-postscript to the current node_modules
/projects/blog $ npm link hexo-postscript
```
<!--more-->
## No devDepenendencies in production
To install production dependencies only, run this:
```bash
$ npm install --production
```
Alternatively, you can set the `NODE_ENV` environment variable to production:
```bash
$ NODE_ENV=production npm install
```
## Automate `npm init` with defaults
```
npm config set init.author.name YOUR_NAME
npm config set init.author.email YOUR_EMAIL
npm init --yes
```
## Investigate npm packages
```bash
# Open the homepage of the module from the cli
$ npm home request

# To check open issues or the publicly available roadmap (if there’s any)
$ npm bugs request

#  Alternatively, if you'd just like to check a module's git repository, type this:
$ npm repo request
```

## Update outdated dependencies
```bash
# check outedated packages before update
$ npm outdated
# update outdated dependencies
$ npm update
```

## Lock down dependencies
Run: `npm shrinkwrap`

This allows you to pin the dependencies of your project to the specific version you’re currently using within your `node_modules` directory. When you run `npm install` and there is a `npm-shrinkwrap.json` present, it will override the listed dependencies and any semver ranges in package.json.
## References
* https://blog.risingstack.com/nodejs-at-scale-npm-best-practices/
* https://nodesource.com/blog/seven-more-npm-tricks-to-knock-your-wombat-socks-off
* https://nodesource.com/blog/configuring-your-npmrc-for-an-optimal-node-js-environment
