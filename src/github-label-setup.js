// MIT © 2017 azu
"use strict";
const assert = require("assert");
const githubLabelSync = require("github-label-sync");
const getRemoteOriginUrl = require("git-remote-origin-url");
const path = require("path");
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
/**
 * @param token
 * @param repo
 * @param labels
 * @param dryRun
 * @returns {Promise}
 */
module.exports = function({
                              token,
                              repo,
                              labels = path.join(__dirname, "default-labels.json"),
                              dryRun
                          }) {
    const repoPromise = repo ? Promise.resolve(repo) : getRepositoryInfo();
    return repoPromise.then(repoPath => {
        assert(repoPath, "repo should be needed.");
        const labelJSON = require(labels);
        return githubLabelSync({
            accessToken: token || process.env.GITHUB_ACCESS_TOKEN,
            repo: repoPath,
            labels: labelJSON,
            dryRun,
        });
    });
};