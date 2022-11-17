# Software Systems Student Society Website
## Welcome
Welcome to the Software Systems Student Society (SSSS) website repo. This project is maintained by the website committee.

To join the committee, go to the [SSSS Discord server](https://discord.gg/XZUd7amxPq), find the `#what-are-committees`, and claim the `@website` role.

> **We hold meetings every 1st and 3rd Wednesday of the month at 7:30pm in the `#website` channel, feel free to join when you're available!**

View the live site here: https://ssss-sfu.github.io/


## Getting Started Contributing
### Contribute by reporting a bug/suggesting an enhancement
1. Join our [Trello workspace](https://trello.com/invite/b/Qt4lRLAO/de5aad51b8e3ce5222c795090ab638e4/website-committee-summer-term)
2. Add a new item to the `Backlog` board and give it a clear and concise title and description. Include any other information, images, etc. that may be needed.
3. Give it an appropriate label
4. Thank you for your contribution! Before your item is moved to the `Todo` board, the committee will first take a look.
### Contribute as a developer
1. Get access to the repository as a contributor by contacting the website committee on our [our Discord server](https://discord.gg/XZUd7amxPq)
2. Join our [Trello workspace](https://trello.com/invite/b/Qt4lRLAO/de5aad51b8e3ce5222c795090ab638e4/website-committee-summer-term)
3. Claim a free task from the `Todo` board
4. Set up your development environment (terminal instructions):

    a. Clone the repository locally in a folder of your choice
    ```
    git clone https://github.com/ssss-sfu/ssss-sfu.github.io.git
    ```
    b. Change directories into the newly cloned project folder
    ```
    cd ssss-sfu.github.io
    ```
    c. Install node modules
    ```
    npm i
    ```
    d. Switch to the `develop` branch (this is where we'll be doing most of our work so we need to branch off from here)
    ```
    git checkout develop
    git pull
    ```
    e. Create a new branch in this format:
    ```
    [computing ID or GitHub username]/[task-name-concise]
    ```

    e.g. `kiaanc/read-me-update`
    ```
    git checkout -b kiaanc/read-me-update
    ```
    f. Run the server locally
    ```
    npm run dev
    ```
    g. View the project in your browser
    ```
    localhost:3000
    ```
    
5. Start coding!
6. Commit and push your changes
7. Create a pull request with the following format:
    ```
    Target Branch: develop 

    Title: Clear and descriptive title relevant to the issue

    Description: Any relevant information about the changes made

    Reviewers:
    - megarage90000 (John)
    - artymiz (Art)
    - bendjukastein (Ben)
    - KiaanCastillo (Kiaan)
    ```
8. Wait for one of the reviewers to take a look and make changes or merge accordingly.

Thanks for contributing!

## Past Developers
|     | Version | Release Date      | Contributors |
| --- | ------- | ----------------- | -------------- |
| ✅  | v3.0    | August 17, 2021   | Kiaan Castillo |
|     | v2.0    | November 17, 2020 | Andy Wang      |
|     | v1.0    | January 27, 2020  | Amos Ko        |



