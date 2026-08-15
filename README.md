# Software Systems Student Society Website

<div align="center">
    <a href="https://github.com/ssss-sfu/ssss-sfu.github.io/stargazers"><img src="https://img.shields.io/github/stars/ssss-sfu/ssss-sfu.github.io" alt="Stars Badge"/></a>
    <a href="https://github.com/ssss-sfu/ssss-sfu.github.io/network/members"><img src="https://img.shields.io/github/forks/ssss-sfu/ssss-sfu.github.io" alt="Forks Badge"/></a>
    <a href="https://github.com/ssss-sfu/ssss-sfu.github.io/pulls"><img src="https://img.shields.io/github/issues-pr/ssss-sfu/ssss-sfu.github.io" alt="Pull Requests Badge"/></a>
    <a href="https://github.com/ssss-sfu/ssss-sfu.github.io/issues"><img src="https://img.shields.io/github/issues/ssss-sfu/ssss-sfu.github.io" alt="Issues Badge"/></a>
    <a href="https://github.com/ssss-sfu/ssss-sfu.github.io/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/ssss-sfu/ssss-sfu.github.io?color=2b9348"></a>
    <a href="https://github.com/ssss-sfu/ssss-sfu.github.io/blob/master/LICENSE"><img src="https://img.shields.io/github/license/ssss-sfu/ssss-sfu.github.io?color=2b9348" alt="License Badge"/></a>
</div>

## Welcome

Welcome to the Software Systems Student Society (SSSS) website repo. This project is maintained by the website committee.

To join the committee, go to the [SSSS Discord server](https://discord.gg/XZUd7amxPq), find the `#what-are-committees`, and claim the `@website` role.

View the live site here: https://sfussss.org/

## Getting Started Contributing

### Contribute by reporting a bug/suggesting an enhancement

1. Navigate to the [issues](https://github.com/ssss-sfu/ssss-sfu.github.io/issues) page in this repository
2. Add a new `Issue` and give it a clear and concise title and description. Include any other information, images, etc. that may be needed.
3. Give it an appropriate label
4. Thank you for your contribution! The committee may assign the issue as appropriate.

### Contribute as a developer

1. Get access to the repository as a contributor by contacting the website committee on our [our Discord server](https://discord.gg/XZUd7amxPq)
2. Claim a free task from the open issues or suggest a new issue
3. Set up your development environment (terminal instructions):

   Quick context:
   - Bun is the package manager/runtime used in this repo. You can think of it like npm, but faster.
   - Husky runs automatic checks when you commit (for example formatting checks) so bad commits are caught early.

   Prerequisites:
   - Install Node.js 20+ (recommended LTS)
   - Install Bun from [bun.sh](https://bun.sh)

   a. Clone the repository locally in a folder of your choice

   ```
   git clone https://github.com/ssss-sfu/ssss-sfu.github.io.git
   ```

   b. Change directories into the newly cloned project folder

   ```
   cd ssss-sfu.github.io
   ```

   c. Install dependencies

   ```
   bun install
   ```

   Husky hooks are set up automatically after install. If they do not run on commit, run:

   ```
   bunx husky
   ```

   d. Set up environment variables

   Copy the example file and fill in the values:

   | Variable                              | Effect                           |
   | ------------------------------------- | -------------------------------- |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID`       | Blog posts (Sanity CMS)          |
   | `NEXT_PUBLIC_SANITY_DATASET`          | Blog posts (Sanity CMS)          |
   | `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY` | The events calendar on `/events` |
   | `SANITY_API_READ_TOKEN`               | Optional, Server-only            |
   - Ask the website committee lead for the values.

   - The site runs fine without them, but you just get an empty blog and an empty events calendar. If you are not touching either of those, you can skip this step.

   - Quick Reminder: Anything prefixed with `NEXT_PUBLIC_` is compiled into the JavaScript that ships to browsers, so never put a secret behind that prefix.

   e. Create a new branch from Github Issue UI

   ![image](https://github.com/ssss-sfu/ssss-sfu.github.io/assets/70176191/db541fce-a664-4c5a-832a-6158dbd7fabe)

   ```
   [issue-number]-[issue-name]
   ```

   e.g. `121-poc-implement-course-explorer`

   ```
   git checkout -b 121-poc-implement-course-explorer
   ```

   This will create a new branch and check out instantly to that branch. Equivalent with:

   ```
   git branch kiaanc/read-me-update
   git checkout kiaanc/read-me-update
   ```

   f. Run the server locally

   ```
   bun run dev
   ```

   g. View the project in your browser

   ```
   localhost:3000
   ```

4. Start coding!
5. Commit and push your changes
6. Create a pull request with the following format:

```
 Target Branch: master

 Title: Clear and descriptive title relevant to the issue

 Description: Any relevant information about the changes made

 Reviewers:
 - smehars (Mehar)
```

7. Wait for one of the reviewers to take a look and make changes or merge accordingly.

Thanks for contributing!

## More commands:

| Command                | Effect                                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `bun run dev`          | Starts the dev server on `localhost:3000`                                                                  |
| `bun run build`        | Creates a Production build. Regenerates `public/sitemap.xml` first, then exports the static site to `out/` |
| `bun run lint`         | ESLint                                                                                                     |
| `bun run typecheck`    | TypeScript, no emit                                                                                        |
| `bun run format:write` | Format everything with Prettier                                                                            |
| `bun run format:check` | Check formatting without changing files                                                                    |

- CI runs `format:check`, `lint`, `typecheck`, and `build` on every pull request. All four have to pass before a PR can merge.

### Adding images

`public/` is easy to bloat. Make sure to keep it small:

1. Place the file into the right folder: under `public/images/`.
2. Optimise the image from the repo root using:

```
 `node scripts/optimize-images.mjs`
```

- This resizes and re-encodes anything over 250KB in place and skips a file if the result would be larger.
- It cannot tell an original from a file it has already processed, so a second pass re-compresses everything and compounds the artifacts. Currently: If you need to redo an image, recover the original from git history first.
- Rough targets: exec headshots ~70KB, full-width hero images ~200–800KB.

- TODO: add image path as an arugment to only optimize a specific image.

## Past Developers

|     | Version | Release Date      | Contributors   |
| --- | ------- | ----------------- | -------------- |
| ✅  | v6.0    | August 15, 2026   | Mehar Saini    |
|     | v5.0    | March 20, 2026    | Anderson Tseng |
|     | v4.0    | September 9, 2023 | Brian Rahadi   |
|     | v3.0    | August 17, 2021   | Kiaan Castillo |
|     | v2.0    | November 17, 2020 | Andy Wang      |
|     | v1.0    | January 27, 2020  | Amos Ko        |
