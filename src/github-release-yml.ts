import * as fs from "node:fs/promises";
import url from "node:url";
import path from "node:path";

const __filename__ = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename__);

export const writeGitHubReleaseYaml = async (outputFilePath: string) => {
    const releaseYaml = await fs.readFile(path.join(__dirname, "../.github/release.yml"));
    await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
    await fs.writeFile(outputFilePath, releaseYaml, "utf-8");
}
