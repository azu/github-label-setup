import assert from "assert";
import githubLabelSync, { LabelInfo } from "github-label-sync";
import getRemoteOriginUrl from "git-remote-origin-url";
import path from "path";
// @ts-expect-error - no type
import tryResolve from "try-resolve";
import { fromUrl } from "hosted-git-info";

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
 * @param allowAddedLabels
 * @returns {Promise}
 */
export function setupLabels({
                               token,
                               repo,
                               labels = path.join(__dirname, "..", "labels.json"),
                               dryRun,
                               allowAddedLabels
                           }: {
    token: string;
    repo: string;
    labels: string
    dryRun: boolean;
    allowAddedLabels: boolean
}) {
    const repoPromise = repo ? Promise.resolve(repo) : getRepositoryInfo();
    return repoPromise.then(repoPath => {
        assert(repoPath, "repo should be needed.");
        const labelFilePath = tryResolve(labels) || tryResolve(path.resolve(process.cwd(), labels));
        if (!labelFilePath) {
            throw new Error(`Not found label file: ${labels}`);
        }
        const labelJSON: LabelInfo[] = require(labelFilePath);
        const accessToken = token || process.env.GITHUB_ACCESS_TOKEN;
        if (!accessToken) {
            throw new Error("GitHub Access Token is not defined");
        }
        return githubLabelSync({
            accessToken: accessToken,
            repo: repoPath,
            labels: labelJSON,
            dryRun,
            allowAddedLabels,
            log: console,
        });
    });
}
