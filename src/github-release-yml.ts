import * as fs from "fs/promises";
import path from "path";

export const writeGitHubReleaseYaml = async (outputFilePath: string) => {
    const relaseYaml = await fs.readFile(path.join(__dirname, "../.github/release.yml"));
    await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
    await fs.writeFile(outputFilePath, relaseYaml, "utf-8");
}
