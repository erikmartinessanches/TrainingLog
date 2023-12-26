[![Deployment to staging on PR](https://github.com/erikmartinessanches/TrainingLog/actions/workflows/firebase-hosting-pull-request.yml/badge.svg)](https://github.com/erikmartinessanches/TrainingLog/actions/workflows/firebase-hosting-pull-request.yml)[![Deploy to production on merge](https://github.com/erikmartinessanches/TrainingLog/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/erikmartinessanches/TrainingLog/actions/workflows/firebase-hosting-merge.yml)

# Log for Training

This is the code for my training log software. It can register and sign in users. Users are able to create exercises and save their training activity, which are persisted in the database for each user. The application uses roughly an MVP architecture (Model-View-Presenter) with persistence. It also features live-update of training data between multiple logged-in windows, offline functionality and password reset via email.

## Commands

In the project directory, you can run:

### Run in development mode

`yarn start`
Runs at [http://localhost:3000](http://localhost:3000) The page will reload when you make changes. You may also see any lint errors in the console.

<!-- ### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. !-->

### Build for production

`yarn build`
Builds the app for production to the `dist` folder.

### Launch vite preview

`yarn preview`

### Build with a staging environment

`yarn build:staging`

### Build and deploy staging

```
node_modules/.bin//firebase use miniproject-90787
yarn build:staging
node_modules/.bin//firebase deploy --only hosting
```

## Official plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
