#!/usr/bin/env node
'use strict';
import meow from "meow";
import path from "path";
import { setupLabels } from "../lib/github-label-setup.js";
import { writeGitHubReleaseYaml } from "../lib/github-release-yml.js";

/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */
const cli = meow(`
    Usage
      $ github-label-setup --token xxx

    Options

      -h, --help                  [Boolean] output usage information
      -l, --labels <path>         [Path:String] the path to look for the label configuration in. Default: labels.json
      --token <token>             [String] a GitHub access token (also settable with a GITHUB_TOKEN or GITHUB_ACCESS_TOKEN environment variable)
      -d, --dry-run               [Boolean] calculate the required label changes but do not apply them
      -A, --allow-added-labels    [Boolean] allow additional labels in the repo, and don't delete them
      
    GitHub Release Options
      
      --addReleaseYml             [Boolean] add a .github/release.yml file
      --addReleaseYmlOutputPath   [Path:String] the path to write the .github/release.yml file to. Default: .github/release.yml

    Examples
        # Overwrite labels in the current repository
        $ github-label-setup --token "$GITHUB_TOKEN"
        # Add labels to the current repository
        $ github-label-setup --token "$GITHUB_TOKEN" --allow-added-labels
        # Add .github/release.yml to integrate with GitHub Releases
        $ github-label-setup --addReleaseYml

`, {
    
    importMeta: import.meta,
    flags: {
        dryRun: {
            type: 'boolean',
            alias: 'd'
        },
        token: {
            type: "string",
        },
        labels: {
            type: 'string',
            alias: 'l'
        },
        allowAddedLabels: {
            type: 'boolean',
            alias: 'A'
        },
        addReleaseYml: {
            type: "boolean",
            default: false
        },
        addReleaseYmlOutputPath: {
            type: "string",
            default: path.join(process.cwd(), ".github/release.yml")
        }
    }
});

if (cli.flags.addReleaseYml) {
    const outputPath = cli.flags.addReleaseYmlOutputPath;
    if (!outputPath) {
        throw new Error("addReleaseYmlOutputPath must not be empty");
    }
    writeGitHubReleaseYaml(outputPath).catch(function (error) {
        console.error(error);
        cli.showHelp();
    });
} else {
    setupLabels(cli.flags).catch(function (error) {
        console.error(error);
        cli.showHelp();
    });
}
