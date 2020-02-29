# Client Overview

* A React project w/ TS as a day-one priority
* Bootstrapped w/ `create-react-app` - webpack remains un-ejected
* `material-ui` is the UI component framework being used

## Project Startup

* `$ npm ci`
* `$ npm start`

## TODO

* Research better Router structure
  * I dislike having nested Route Switches in different components, e.g. Terminology.tsx
* Research better API request class structure (since Axios seems to be dead? 😭) and `fetch` can be fairly basic / boilerplate heavy at times
* Move over to Sass (long term goal - Sass for global styles, and `styled components` or some similar implementation for individual component styles / reusability)
* Determine width breakpoints for app (does material-ui have these built in, like Bootstrap did?)
* Work on separate Production build status, which only builds `project.json -> dependencies`
* Add in git commit hooks for type checking
* PropTypes && TS Interface validations
