#!/usr/bin/env node
'use strict';
const meow = require("meow");
const setup = require("../lib/github-label-setup");

const cli = meow(`
    Usage
      $ echo "text" | add-text-to-markdown README.md --section "section name"

    Options

      -h, --help                  output usage information
      -V, --version               output the version number
      --token <token>  a GitHub access token (also settable with a GITHUB_ACCESS_TOKEN environment variable)
      -d, --dry-run               calculate the required label changes but do not apply them

`, {
    alias: {
        d: 'dry-run',
    }
});
/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */

setup(cli.flags);