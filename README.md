# AI Knowledge Base - Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Development server

To start a local development server, run:

```bash
npm run dev
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project for production:

```bash
npm run build
```

To build for GitHub Pages deployment:

```bash
npm run build:gh-pages
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps

1. **Enable GitHub Pages** in your repository settings:
   - Go to `Settings` > `Pages`
   - Under "Source", select `GitHub Actions`

2. **Push your code** to the `master` branch:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

3. **Automatic deployment** will trigger on every push to `master`
   - The workflow builds the app with the correct base href
   - Deploys to GitHub Pages automatically
   - Your app will be available at: `https://[your-username].github.io/ai-knowledge-base-FE/`

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build:gh-pages
# Then deploy the contents of dist/web/browser/ to your hosting service
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
