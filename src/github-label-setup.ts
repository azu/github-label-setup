import assert from "assert";
import githubLabelSync, { LabelInfo } from "github-label-sync";
import getRemoteOriginUrl from "git-remote-origin-url";

import url from "node:url";
import path from "node:path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);

const tryResolve = (id: string): string | null => {
    try {
        return require.resolve(id);
    } catch {
        return null;
    }
};

/**
 * Parse "owner/repo" from GitHub remote URL
 * e.g. git@github.com:owner/repo.git, https://github.com/owner/repo, ssh://git@github.com:22/owner/repo.git
 */
export const parseGitHubRepository = (remoteUrl: string): string | undefined => {
    const trimmed = remoteUrl.trim();
    // SCP-like syntax: git@github.com:owner/repo.git
    const scpLike = trimmed.match(/^(?:[^@/]+@)?(?:www\.)?github\.com:(?!\/)(.*)$/);
    const pathname = scpLike ? scpLike[1].split(/[?#]/)[0] : (() => {
        try {
            const parsed = new URL(trimmed);
            return ["github.com", "www.github.com"].includes(parsed.hostname) ? parsed.pathname : undefined;
        } catch {
            return;
        }
    })();
    const match = pathname?.match(/^\/?([^/]+)\/([^/]+?)(?:\.git)?\/?$/);
    if (!match) {
        return;
    }
    return `${match[1]}/${match[2]}`;
};

/**
 * @returns {Promise.<string|undefined>} "owner/repo"
 */
const getRepositoryInfo = () => {
    return getRemoteOriginUrl().then(url => {
        return parseGitHubRepository(url);
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
export async function setupLabels({
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
    const repoPath = await (repo ? Promise.resolve(repo) : getRepositoryInfo());
    assert(repoPath, "repo should be needed.");
    const labelFilePath = tryResolve(labels) || tryResolve(path.resolve(process.cwd(), labels));
    if (!labelFilePath) {
        throw new Error(`Not found label file: ${labels}`);
    }
    const labelJSON: LabelInfo[] = require(labelFilePath);
    const accessToken = token ?? process.env.GITHUB_TOKEN ?? process.env.GITHUB_ACCESS_TOKEN;
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
}
