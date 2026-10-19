#!/usr/bin/env node
'use strict';
import { parseArgs } from "node:util";
import { createRequire } from "node:module";
import path from "node:path";
import { setupLabels } from "../lib/github-label-setup.js";
import { writeGitHubReleaseYaml } from "../lib/github-release-yml.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");
const helpText = `
    Usage
      $ github-label-setup --token xxx

    Options

      -h, --help                  [Boolean] output usage information
      --version                   [Boolean] output the version number
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

`;
const showHelp = (exitCode = 2) => {
    console.log(helpText);
    process.exit(exitCode);
};

// meow accepted camelCase flags too. Normalize them to dashed names so the last one wins.
const camelCaseFlags = {
    dryRun: "dry-run",
    allowAddedLabels: "allow-added-labels"
};
const terminatorIndex = process.argv.indexOf("--", 2);
const args = process.argv.slice(2).map((arg, index) => {
    if (terminatorIndex !== -1 && index + 2 >= terminatorIndex) {
        return arg;
    }
    const match = arg.match(/^--(no-)?([^=]+)(=.*)?$/);
    if (!match || !Object.hasOwn(camelCaseFlags, match[2])) {
        return arg;
    }
    return `--${match[1] ?? ""}${camelCaseFlags[match[2]]}${match[3] ?? ""}`;
});
let values;
try {
    ({ values } = parseArgs({
        args,
        allowNegative: true,
        options: {
            help: { type: "boolean", short: "h" },
            version: { type: "boolean" },
            "dry-run": { type: "boolean", short: "d" },
            token: { type: "string" },
            labels: { type: "string", short: "l" },
            "allow-added-labels": { type: "boolean", short: "A" },
            addReleaseYml: { type: "boolean", default: false },
            addReleaseYmlOutputPath: { type: "string", default: path.join(process.cwd(), ".github/release.yml") }
        }
    }));
} catch (error) {
    console.error(error.message);
    showHelp();
}
if (values.help) {
    showHelp(0);
}
if (values.version) {
    console.log(pkg.version);
    process.exit(0);
}
const flags = {
    dryRun: values["dry-run"],
    token: values.token,
    labels: values.labels,
    allowAddedLabels: values["allow-added-labels"],
    addReleaseYml: values.addReleaseYml,
    addReleaseYmlOutputPath: values.addReleaseYmlOutputPath
};

if (flags.addReleaseYml) {
    const outputPath = flags.addReleaseYmlOutputPath;
    if (!outputPath) {
        throw new Error("addReleaseYmlOutputPath must not be empty");
    }
    writeGitHubReleaseYaml(outputPath).catch(function (error) {
        console.error(error);
        showHelp();
    });
} else {
    setupLabels(flags).catch(function (error) {
        console.error(error);
        showHelp();
    });
}
