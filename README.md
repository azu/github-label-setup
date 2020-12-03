# @azu/github-label-setup

Opinionated GitHub label setup tool.

[![demo](./img/demo.png)](https://github.com/azu/github-label-setup/issues/1)

- Create starter GitHub labels
- Migrate existing labels
- No configuration - It is opinionated

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @azu/github-label-setup -g

## Usage

This tool works without any configuration.

    Usage
      $ github-label-setup --token xxx

    Options

      -h, --help                  [Boolean] output usage information
      -l, --labels <path>         [Path:String] the path to look for the label configuration in. Default: labels.json
      --token <token>             [String] a GitHub access token (also settable with a GITHUB_ACCESS_TOKEN environment variable)
      -d, --dry-run               [Boolean] calculate the required label changes but do not apply them
      -A, --allow-added-labels    [Boolean] allow additional labels in the repo, and don't delete them


You'll also need a GitHub access token ready so that the the tool will have access to your repositories.
You can [generate an access token here](https://github.com/settings/tokens), be sure to allow the `"repo"` scope.

This tool is a wrapper of `github-label-sync`.

- [Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible](https://github.com/Financial-Times/github-label-sync "Financial-Times/github-label-sync: Synchronise your GitHub labels with as few destructive operations as possible")

### Npm packages for labels

labels can be set `require`able path like npm packages.

    $ github-label-setup --token xxx --labels @owner/github-label-presets

See [Label JSON](https://github.com/Financial-Times/github-label-sync#label-json "Label JSON") format.

## Default Labels

These are opinionated labels.

[![demo](./img/demo.png)](https://github.com/azu/github-label-setup/issues/1)

- ![#ededed](https://placehold.it/15/ededed/000000?text=+) duplicate - This issue or Pull Request already exists
- ![#e99695](https://placehold.it/15/e99695/000000?text=+) help wanted - Extra attention is needed
- ![#7057ff](https://placehold.it/15/7057ff/000000?text=+) good first issue - Good for newcomers
- ![#ee0701](https://placehold.it/15/ee0701/000000?text=+) Priority: Critical
- ![#d93f0b](https://placehold.it/15/d93f0b/000000?text=+) Priority: High
- ![#fbca04](https://placehold.it/15/fbca04/000000?text=+) Priority: Medium
- ![#0e8a16](https://placehold.it/15/0e8a16/000000?text=+) Priority: Low
- ![#000000](https://placehold.it/15/000000/000000?text=+) Status: Abandoned - The issue or Pull Request is wontfix
- ![#ee0701](https://placehold.it/15/ee0701/000000?text=+) Status: Blocked - Progress on the issue is Blocked
- ![#cccccc](https://placehold.it/15/cccccc/000000?text=+) Status: In Progress - Work in Progress
- ![#d4c5f9](https://placehold.it/15/d4c5f9/000000?text=+) Status: Proposal - Request for comments
- ![#2E7733](https://placehold.it/15/2E7733/000000?text=+) Status: PR Welcome - Welcome to Pull Request
- ![#fbca04](https://placehold.it/15/fbca04/000000?text=+) Status: Review Needed - Request for review comments
- ![#F9C90A](https://placehold.it/15/F9C90A/000000?text=+) Status: Need More Info - Lacks enough info to make progress
- ![#b60205](https://placehold.it/15/b60205/000000?text=+) Type: Breaking Change - Includes breaking changes
- ![#ee0701](https://placehold.it/15/ee0701/000000?text=+) Type: Bug - Bug or Bug fixes
- ![#0e8a16](https://placehold.it/15/0e8a16/000000?text=+) Type: Documentation - Documentation only changes
- ![#1d76db](https://placehold.it/15/1d76db/000000?text=+) Type: Feature - New Feature
- ![#fbca04](https://placehold.it/15/fbca04/000000?text=+) Type: Refactoring - A code change that neither fixes a bug nor adds a feature
- ![#257759](https://placehold.it/15/257759/000000?text=+) Type: Testing - Adding missing tests or correcting existing tests
- ![#abd406](https://placehold.it/15/abd406/000000?text=+) Type: Maintenance - Repository Maintenance
- ![#ffd412](https://placehold.it/15/ffd412/000000?text=+) Type: CI - Changes to CI configuration files and scripts
- ![#cc317c](https://placehold.it/15/cc317c/000000?text=+) Type: Question - Further information is requested
- ![#ee0701](https://placehold.it/15/ee0701/000000?text=+) Type: Security - Vulnerability disclosure or Fixing security issue

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
