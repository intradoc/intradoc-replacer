<!-- Logo -->
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/zengulp/intradoc-template-replacer/assets/header.svg" alt="@zengulp/intradoc-template-replacer logo" />
</p>

<!-- Branded divider -->
<img src="https://cdn.jsdelivr.net/npm/@zengulp/assets/brand/media/github/divider.min.svg" alt="divider" />

<!-- Badges - 1st row -->
<p align="center">
  <!-- NPM badge -->
  <a href="https://www.npmjs.com/package/@zengulp/intradoc-template-replacer"><img src="https://img.shields.io/npm/v/@zengulp/intradoc-template-replacer?color=brightgreen&style=flat-square" alt="release-badge"></a>
  <!-- CI badge -->
  <a href="https://github.com/zengulp/intradoc-template-replacer/actions?query=workflow%3Aci"><img src="https://github.com/zengulp/intradoc-template-replacer/workflows/ci/badge.svg?style=flat-square" alt="ci-badge"></a>
  <!-- Coverage badge -->
  <a href="https://codecov.io/gh/zengulp/intradoc-template-replacer"><img src="https://img.shields.io/codecov/c/github/zengulp/intradoc-template-replacer?style=flat-square" alt="coverage-badge"></a>
  <!-- Dependency badge -->
  <a href="https://libraries.io/github/zengulp/intradoc-template-replacer"><img src="https://img.shields.io/badge/dependabot-enabled-brightgreen.svg?style=flat-square" alt="dependency-badge"></a>
  <!-- Documentation badge -->
  <a href="https://github.com/zengulp/intradoc-template-replacer/blob/master/doc/API.md"><img src="https://inch-ci.org/github/zengulp/intradoc-template-replacer.svg?branch=master&style=flat-square" alt="documentation-badge"></a>
</p>

<!-- Badges - 2nd row -->
<p align="center">
  <!-- Code style badge -->
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/style-standardjs-f1d300.svg?style=flat-square" alt="code-style-badge"></a>
  <!-- Commit style badge -->
  <a href="https://commitizen.github.io/cz-cli"><img src="https://img.shields.io/badge/commit-commitizen-fe7d37.svg?style=flat-square" alt="commit-style-badge"></a>
  <!-- Release workflow badge -->
  <a href="https://semantic-release.gitbook.io/semantic-release"><img src="https://img.shields.io/badge/release-semantic--release-e10079.svg?style=flat-square" alt="release-workflow-badge"></a>
  <!-- License badge -->
  <a href="https://github.com/zengulp/intradoc-template-replacer/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square" alt="license-badge"></a>
  <!-- Contribution badge -->
  <a href="https://github.com/zengulp/intradoc-template-replacer/blob/master/.github/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="contribution-badge"></a>
</p>

---

<h3 align="center">
  Replace API, changelog, and other data within markdown files, in place.
</h3>

<p align="center">
  A Gulp plugin to replace intradoc template placeholders within markdown files
  (<b><a href="https://lodash.com/docs/#template">lodash-like template placeholders</a></b>
  as <b><i>markdown comments</i></b>) without temporary or additional files, <b>on the spot</b>,
  <b><i>in a reusable way</i></b>.
</p>

---

## :thinking: Why?

- In place/on the spot replacement without temporary / additional files

- Reusability

- Simplicity

- **1.:** It's **more intuitive** for everyday use, when dealing with durations :heart::

  ```javascript    
  // general job cycle
  const cycle = duration('36 hours') // === 129600000 in milliseconds

  // movie playtime
  const length = duration('2h 41m') // === 9660000 in milliseconds

  // will log out "It is time!" in ~60,000 milliseconds
  setTimeout(() => console.log('It is time!'), duration('1 min'))

  // delays the execution for ~15,000 milliseconds
  await delay(duration('15 seconds'))
  ```

- **2.:** It's easier, when **handling larger or more complex durations** :muscle::
  
  ```javascript
  // custom notification set manually by a user
  const notifyIn = duration('24 hours 36 minutes 49 seconds') // === 88609000  

  // cookie will expire in 7776000000 milliseconds from now
  const date = new Date(Date.now() + duration('90 days'))
  document.cookie = 'value=42;expires=' + date.toUTCString() + ';path=/')  

  // 24192000000 milliseconds from now
  User.update(
    { logged_out_warn_time: Date.now() + duration('280 days'), },
    { where: { id } }
  )
  ```

- **3.:** It's **highly configurable** and the inputs are **cached** :godmode::

  ```javascript
  // custom return unit with a default fallback
  duration('42 hours', '1 hour', { unit: 'seconds' }) // === 151200 in seconds

  // create a custom duration function with predefined arguments
  const custom = createCustom(0, '1 day', { unit: 'seconds' })

  // will return the given duration in seconds ({ unit: 'seconds' })
  custom('1 hour') // === 3600 in seconds
  ```

## :package: Installation

- **NPM:**

  ```bash
  npm install @zengulp/intradoc-template-replacer --save-dev
  ```

- **Yarn:**

  ```bash
  yarn add @zengulp/intradoc-template-replacer --dev
  ```

## :coffee: Usage

Intradoc placeholders are **markdown comments** with similar syntax to 
[**lodash templates**](https://lodash.com/docs/#template).

**Notice the 2 markdown comments** under the **Usage and API** section below.
After you ran your Gulp script, the given **`API`** data will be placed
**inside** these 2 placeholders **without removing them** from the file.

Since intradoc placeholders **are meant to be reusable**, after processing, 
these intradoc placeholders **will be still present in the markdown file**
for later reusability, but they will be invisible, when displaying / rendering
the markdown file.

Only the **content of these placeholders will be visible**, as they are
essentially just markdown comments.

In your markdown file (e.g.: **`README.md`**):

```markdown
# Example Markdown File Title

This is an example `.md` file with 3 sections and an intradoc placeholder.

## Install

...

## Usage and API

<!--- <% API --->
old API documentation...
<!--- API %> --->

## License

...
```

In your Gulp script (e.g.: **`gulpfile.js`**):

```javascript
const gulp = require('gulp')
const replacer = require('@zengulp/intradoc-template-replacer')

gulp.task('build:readme', async () => {
  gulp
    .src('./README.md')
    .pipe(replacer({ API: 'new API documentation...' }))
    .pipe(gulp.dest('./README.md'))
})
```

The processed markdown file after running the **`build:readme`** Gulp task:

**Notice the 2 intradoc placeholders are still present** in the file for later
reusability. When displaying the markdown file, **only their content will be visible**, as these 2 **placeholders are just markdown comments**.

```markdown
# Example Markdown File Title

This is an example `.md` file with 3 sections and an intradoc placeholder.

## Install

...

## Usage and API

<!--- <% API --->
new API documentation...
<!--- API %> --->

## License

...
```

## :computer: API

<!--- <% __API --->
<!--- __API %> --->

---

## :star: Related

Check out the [official website][url-website] for more tools, utilities, and packages.

Find more **@zengulp** packages on [NPM][url-npm] and [GitHub][url-github].

## :beers: Contribution

**Any contribution is ***highly*** appreciated**. To get going, check out the [**contribution guidelines**][url-contrib-doc].

***Thank you and have fun!***

## :copyright: License

[ISC][url-license-doc] @ [Richard King](https://www.richrdkng.com)

  <!--- References ============================================================================ -->

  <!--- URLs -->
  [url-website]:     https://zengulp.github.io
  [url-github]:      https://github.com/zengulp
  [url-npm]:         https://www.npmjs.com/search?q=keywords:zengulp
  [url-contrib-doc]: https://github.com/zengulp/intradoc-template-replacer/blob/master/.github/CONTRIBUTING.md
  [url-license-doc]: https://github.com/zengulp/intradoc-template-replacer/blob/master/LICENSE.md
