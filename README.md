# Software Systems Student Society Website

|     | Version | Release Date      | Main Developer |
| --- | ------- | ----------------- | -------------- |
| ✅  | v3.0    | August 17, 2021   | Kiaan Castillo |
|     | v2.0    | November 17, 2020 | Andy Wang      |
|     | v1.0    | January 27, 2020  | Amos Ko        |

View the live site here: https://ssss-sfu.github.io/

## Getting Started Contributing

- Clone the repository locally in a folder of your choice:
`git clone https://github.com/ssss-sfu/ssss-sfu.github.io.git`
- If you have issues with github authentication, contact the website team on our [Software Systems Discord](https://discord.gg/XZUd7amxPq)
- Ste up a local server to test changes locally
    - On mac open a terminal, navigate to the root folder of your repository clone and enter the following commands:
    `sudo npm install http-server -g`
    `http-server `
    You should now have the site running locally, and be able to view any code changes locally at http://localhost:8080/
- Please create a branch name based on your contribution, e.g.
    **task/yourName/coolFeatureName**
- Once you have written code locally that you are happy with, push the new branch to github:
    - on Mac:
    `git push -u origin task/yourName/coolFeatureName`
- Then, create a pull request  in github pointing your new feature at the develop branch
- An Executive will review your feature and ensure it is included or changes are requested.
Thanks for contributing!

## General Structure

- `assets`: Anything that is put on the site that is not code
- `pages`: HTML files of all the pages that the site has
- `styles`: All CSS files go in here (more [in depth explanation can be read here](#file-structure))
- `index.html`: Landing page of the site

```
.
├── assets/
│   └── ...
├── pages/
│   └── ...
├── styles/
│   ├── sass/
│   │   └── ...
│   └── main.min.css
├── .gitignore
├── favicon.ico
├── index.html
└── README.md
```

## CSS

SASS, more specifically SCSS, is used as the CSS pre-compiler for this project for its easy modularization capabilities. Everything was made from scratch and according to the SSSS brand guidelines and design system (Figma file coming soon).

### File Structure

- `components`: Styles for components
- `layouts`: Styles for things like wrapper classes that dictate layouts and page structure
- `utilities`: Styles for buttons, fonts, and colours that are used globally
- `main.scss`: Main SCSS file that brings everything together. Whenever a new stylesheet is added to the `components` folder, it should be linked in here using the `@use` rule.

```
styles/
└── sass/
    ├── components/
    │   └── ...
    ├── layouts/
    │   └── ...
    ├── utilities/
    │   └── ...
    └── main.scss
```

### SCSS to CSS

Run this command in the `/sass` directory to automatically compile `main.scss` into a compressed `main.min.css` file whenever you modify any of the `.scss` files.

```
sass --no-source-map --style=compressed --watch main.scss:../main.min.css
```

This produces one CSS file that is a compressed, compilation of all of the SCSS files. All HTML files then link to this compressed CSS file.
