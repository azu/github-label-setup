// MIT © 2017 azu
"use strict";
const assert = require("assert");
const githubLabelSync = require("github-label-sync");
const getRemoteOriginUrl = require("git-remote-origin-url");
const path = require("path");
const tryResolve = require("try-resolve");
const chalk = require('chalk');
const fromUrl = require("hosted-git-info").fromUrl;
/**
 * @returns {Promise.<{ owner: string|null, repo: string|null}>}
 */
const getRepositoryInfo = () => {
    return getRemoteOriginUrl().then(url => {
        return fromUrl(url);
    }).then(result => {
        if (!result) {
            return;
        }
        return `${result.user}/${result.project}`;
    });
};

// Apply some log formatting
const format = {
    diff: (message) => {
        return chalk.cyan(' > ') + message;
    },
    success: (message) => {
        return chalk.green(message);
    },
    warning: (message) => {
        return chalk.black.bgYellow(message);
    }
};
/**
 * @param token
 * @param repo
 * @param labels
 * @param dryRun
 * @param allowAddedLabels
 * @returns {Promise}
 */
module.exports = function({
                              token,
                              repo,
                              labels = path.join(__dirname, "..", "labels.json"),
                              dryRun,
                              allowAddedLabels
                          }) {
    const repoPromise = repo ? Promise.resolve(repo) : getRepositoryInfo();
    return repoPromise.then(repoPath => {
        assert(repoPath, "repo should be needed.");
        const labelFilePath = tryResolve(labels);
        if (!labelFilePath) {
            throw new Error(`Not found label: ${labels}`);
        }
        const labelJSON = require(labelFilePath);
        return githubLabelSync({
            accessToken: token || process.env.GITHUB_ACCESS_TOKEN,
            repo: repoPath,
            labels: labelJSON,
            dryRun,
            allowAddedLabels,
            log: console,
        });
    });
};
