# Welcome to the SSSS Website Contributing Guide
Thank you for your interest in contributing to the Software Systems Student Society (SSSS) website! 

This guide will help you through the process of contributing, whether it’s your first time contributing to any open source project or if you’re already part of the SSSS website committee! 

P.S. Interested in joining the website committee? Reach out to one of the SSSS executives on our Discord Server to learn more.

## Table of Contents
- [New Contributor Guide](#New-Contributor-Guide)
- [How to Contribute](#How-to-Contribute)
  - [Creating Issues](#Creating-Issues)
  - [Claiming Issues](#Claiming-Issues)

## New Contributor Guide
Are you new to web development?
- [Getting Started with the Web (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
- [Introduction to HTML (MDN)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
- [Introduction to CSS (MDN)](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps)
- [Introduction to JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
- [Introduction to Git (GitHub)](https://docs.github.com/en/get-started/using-git/about-git)

Are you new to the SSSS Web Committee?
- [Check out the website](https://ssss-sfu.github.io/)
- Learn more about the website by reading our [README](https://github.com/ssss-sfu/ssss-sfu.github.io/blob/master/README.md)
- Join our [Discord server](https://discord.com/invite/hY7WjXt)

Are you new to open source contribution?
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) on how to collaborate on projects
- [Collaborating with pull requests (GitHub)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)

## How to Contribute
There are two ways for you to contribute:
1. [Creating issues](#Creating-Issues)
    1. [Reporting a bug](#Reporting-a-Bug)
    2. [Suggesting an enhancement](#Suggesting-an-Enhancement)
2. [Claiming issues](#Claiming-Issues)

### Creating Issues
If you spot a problem or think something can be improved, [search if an issue for that bug or enhancement](https://github.com/ssss-sfu/ssss-sfu.github.io/issues) already exists. 

If a related issue doesn’t exist, you can [open a new issue here](https://github.com/ssss-sfu/ssss-sfu.github.io/issues/new). 

In order to submit a good issue, please consider the following:
- Use a clear and descriptive title
- For bugs
  - Describe the exact steps to reproduce the problem
  - What behaviour did you expect? What behaviour actually happened?
  - Include screenshots, animated GIFs, etc. that clearly demonstrate the problem
  - Include as many details as possible
- For enhancements
  - What do you want to see improved on the website? 
  - Why do you think this would be a good addition?
  - Include as many details as possible

Once your issue has been submitted, a member of the website committee chair will look it over and give it the “ready to be claimed” label. This is to ensure that contributors do not end up claiming an issue that may be irrelevant.

### Claiming Issues
Look over [our issues board for issues with the “ready to be claimed” label](https://github.com/ssss-sfu/ssss-sfu.github.io/labels/ready%20to%20be%20claimed). These have been reviewed by a committee chairperson and are ready to be worked on. You can also filter by other labels to narrow down your search. 

If you see that someone else has already claimed an issue that you want to work on, reach out to them and see if they’d like some extra hands.

Once you have found an issue to work on, follow the steps below:

1. Set up your development environment [(see set up guide)](https://github.com/ssss-sfu/ssss-sfu.github.io/blob/master/README.md)
2. Claim the issue on our GitHub issues board by assigning it to yourself so we know that you’re going to work on it
3. Write a comment stating your Discord handle. This is so we know how to easily contact you if necessary. 
    
    Don’t have a Discord account? Turn on notifications for the issue and look out for any mentions you may be tagged in. This can be done by going to the right-side panel of the issue’s page and clicking “Subscribe”.

4. Does the issue need a mockup? (You can check to see if the issue has the “needs mockup” label.)
  1. Duplicate our mockup builder on Figma
  2. Create the page(s)/component(s) using our design system and guidelines
  3. Link the Figma document as a new comment in the issue
  4. Wait for approval from one of the website committee members
5. Create a new branch with this naming convention:

    `<Computing ID>/<Issue Number>-<Short Descriptive Name>`

    Example:
    `kiaanc/5-contribution-guide`

6. Start coding!
7. Commit and push your changes and create a pull request with the following format:
    ```
    Title
    -----
    Clear and descriptive title relevant to the issue

    Description
    -----------
    Closes issue link

    Any relevant information about the changes made

    Reviewers
    ---------
    Request a review from all committee chair members
    
    - megarage90000 (John)
    - artymiz (Art)
    - bendjukastein (Ben)
    - ransurf (John)
    - KiaanCastillo (Kiaan)
    ```
      
8. If changes are requested, resolve them and then commit and push to the same branch
9. After all change requests have been resolved, wait for approval from one of the committee chair members
10. Merge your PR!

And that's it! Thank you for taking the time to contribute to making the SSSS website a better resource for our community!

P.P.S Did you spot a mistake or an enhancement needed to be made in this contributing guide? Create an issue!
