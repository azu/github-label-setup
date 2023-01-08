# @azu/github-label-setup

Opinionated GitHub label setup tool.

[![demo](./img/demo.png)](https://github.com/azu/github-label-setup/issues/1)

- Create starter GitHub labels
- Migrate existing labels
- No configuration - It is opinionated

## Install

Install with [npm](https://www.npmjs.com/):

    npm install --global @azu/github-label-setup

## Usage

This tool works without any configuration.

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


You will need to get a GitHub Personal Accesses token to update labels of your repository.
You need to generate [GitHub Personal Accesses token](https://github.com/settings/tokens/new?scopes=repo) with `"repo"` scope.

- Generate Link: <https://github.com/settings/tokens/new?scopes=repo>

This tool is a wrapper of `github-label-sync`.

- [Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible](https://github.com/Financial-Times/github-label-sync "Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible")

### Npm packages for labels

labels can be set `require`able path like npm packages.

    $ github-label-setup --token xxx --labels @owner/github-label-presets

See [Label JSON](https://github.com/Financial-Times/github-label-sync#label-json "Label JSON") format.

## Default Labels

These are opinionated labels.

[![demo](./img/demo.png)](https://github.com/azu/github-label-setup/issues/1)

- ![#ededed](https://placehold.co/15x15/ededed/ededed.png) duplicate - This issue or Pull Request already exists
- ![#e99695](https://placehold.co/15x15/e99695/e99695.png) help wanted - Extra attention is needed
- ![#7057ff](https://placehold.co/15x15/7057ff/7057ff.png) good first issue - Good for newcomers
- ![#ee0701](https://placehold.co/15x15/ee0701/ee0701.png) Priority: Critical
- ![#d93f0b](https://placehold.co/15x15/d93f0b/d93f0b.png) Priority: High
- ![#fbca04](https://placehold.co/15x15/fbca04/fbca04.png) Priority: Medium
- ![#0e8a16](https://placehold.co/15x15/0e8a16/0e8a16.png) Priority: Low
- ![#000000](https://placehold.co/15x15/000000/000000.png) Status: Abandoned - The issue or Pull Request is wontfix
- ![#ee0701](https://placehold.co/15x15/ee0701/ee0701.png) Status: Blocked - Progress on the issue is Blocked
- ![#cccccc](https://placehold.co/15x15/cccccc/cccccc.png) Status: In Progress - Work in Progress
- ![#d4c5f9](https://placehold.co/15x15/d4c5f9/d4c5f9.png) Status: Proposal - Request for comments
- ![#2E7733](https://placehold.co/15x15/2E7733/2E7733.png) Status: PR Welcome - Welcome to Pull Request
- ![#fbca04](https://placehold.co/15x15/fbca04/fbca04.png) Status: Review Needed - Request for review comments
- ![#F9C90A](https://placehold.co/15x15/F9C90A/F9C90A.png) Status: Need More Info - Lacks enough info to make progress
- ![#b60205](https://placehold.co/15x15/b60205/b60205.png) Type: Breaking Change - Includes breaking changes
- ![#ee0701](https://placehold.co/15x15/ee0701/ee0701.png) Type: Bug - Bug or Bug fixes
- ![#0e8a16](https://placehold.co/15x15/0e8a16/0e8a16.png) Type: Documentation - Documentation only changes
- ![#1d76db](https://placehold.co/15x15/1d76db/1d76db.png) Type: Feature - New Feature
- ![#fbca04](https://placehold.co/15x15/fbca04/fbca04.png) Type: Refactoring - A code change that neither fixes a bug nor adds a feature
- ![#257759](https://placehold.co/15x15/257759/257759.png) Type: Testing - Adding missing tests or correcting existing tests
- ![#abd406](https://placehold.co/15x15/abd406/abd406.png) Type: Maintenance - Repository Maintenance
- ![#ffd412](https://placehold.co/15x15/ffd412/ffd412.png) Type: CI - Changes to CI configuration files and scripts
- ![#cc317c](https://placehold.co/15x15/cc317c/cc317c.png) Type: Question - Further information is requested
- ![#ee0701](https://placehold.co/15x15/ee0701/ee0701.png) Type: Security - Vulnerability disclosure or Fixing security issue
- ![#0366d6](https://placehold.co/15x15/0366d6/0366d6.png) Type: Dependencies - Dependency issues or Changes to dependency files
- ![#0366d6](https://placehold.co/15x15/BFD4F2/BFD4F2.png) Type: Meta - Related repository itself

## Integration with GitHub Releases

GitHub Releases support automatically generate release notes using labels.
`--addReleaseYml` option will add `.github/release.yml` file to your repository.

```bash
# Add .github/release.yml to integrate with GitHub Releases
$ github-label-setup --addReleaseYml
```

For more details, see GitHub Releases document.

- [Configuring automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes#configuring-automatically-generated-release-notes)

## Related

- [Conventional Commits](https://conventionalcommits.org/ "Conventional Commits")
- [yoshuawuyts/github-standard-labels: Create a standard set of issue labels for a GitHub project](https://github.com/yoshuawuyts/github-standard-labels "yoshuawuyts/github-standard-labels: Create a standard set of issue labels for a GitHub project")
- [Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible](https://github.com/Financial-Times/github-label-sync "Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible")
- [MunGell/awesome-for-beginners: A list of awesome beginners-friendly projects.](https://github.com/MunGell/awesome-for-beginners "MunGell/awesome-for-beginners: A list of awesome beginners-friendly projects.")
- [himynameisdave/git-labelmaker: Manage your GitHub labels from the command line!](https://github.com/himynameisdave/git-labelmaker "himynameisdave/git-labelmaker: Manage your GitHub labels from the command line!")
- [Sane GitHub Labels – Dave Lunny – Medium](https://medium.com/@dave_lunny/sane-github-labels-c5d2e6004b63 "Sane GitHub Labels – Dave Lunny – Medium")

## Changelog

See [Releases page](https://github.com/azu/github-label-setup/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/github-label-setup/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
