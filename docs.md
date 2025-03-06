## 1. Setup project structure
### Create two folders after creating repo Discography
```
Discography/
│── backend/   # Django backend
│   ├── manage.py
│   ├── backend/  # Django settings and main project folder
│   ├── api/  # Django app
│   ├── requirements.txt  # Backend dependencies
│   ├── .env  # Environment variables
│   └── ...
│
│── frontend/   # React frontend
│   ├── package.json
│   ├── src/
│   ├── public/
│   ├── .env  # Frontend environment variables
│   ├── node_modules/
│   └── ...
│
│── .gitignore
│── README.md

```


### Setup backend
#### Initial setup
```
python venv .venv
cd backend
django-admin startproject backend .
django-admin startapp api
```
#### Configure backend/settings.py
- Update the INSTALLED APPS
- Enable CORS for frontend connection (Add the middleware and the CORS_ALLOWED_ORIGINS field)
#### Configure secret variables
- Best time to use python decouple to hide your SECRET_KEY, DEBUG, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS, DATABASE_URL,
#### Create the api
- Create models
- Add models to admins.py
- Create serializers.py and serialize the models
- Create views
- Create the endpoints (urls) and add them to the base project (backend)
- Run migrations and the server
#### Create dummy data in django admin site
- Create users, albums, and photos
- Get photo urls to load images from: [Lorem Picsum](https://picsum.photos/200/300)
#### Install flake8
- Checks for linting issues in Python
  ```
  pip install flake8
  ```
- Add a .flake8 file
  ```
  [flake8]
  max-line-length = 88
  ignore = E203, W503
  exclude = venv, migrations, settings.py
  ```
- Run flake8
  ```
  flake8 .
  ```

### Setup frontend
#### Initial setup
- Installation
  ```
  npm create vite@latest frontend -- --template react
  ```
- Ensure package.json has vite
  ```
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```
- Delete package.json and package-lock.json from root Discography directory.

- Run installation
  ```
  cd frontend
  npm install # Install dependencies
  npm run dev
  ```

#### Create src/pages/LandingPage.jsx
- Create the base html to be returned for the Landing Page.
- Install bootstrap
    ```
    npm install bootstrap
    ```
- Import bootstrap in src/main.jsx
#### Setup Firebase
- Go to Firebase Console. Get a guide on YT.
- Install Firebase

    ```
    npm install firebase
    ```
- Get the configuration from the Firebase Console and create src/firebase.js.
- I added a Signin with popup instead of the page redirecting for login.
- Hide sensitive information using import.meta.env and add the secret info on .env file.
- Add the handlelogin function to the LandingPage and add it to onclick.
- Remember to use useNavigate() to redirect after login.
#### Create the src/pages/Home.jsx
- List all users and count of albums per user.
- You can use a useState also for loading (did not add it) when data is still being fetched especially since you are using a slow database.
#### Create the src/pages/UserPage.jsx
- Lists details of a user.
- Lists the albums of the user.
- Set loading to show loading before the albums are listed.
#### Create the src/pages/AlbumPage.jsx
- Shows photos of a particular album.
- Shows total count of the photos in the album.
#### Create the src/pages/PhotoPage.jsx
- Shows details of a Photo.
- Shows a link to edit the photo title.
- Create a function to edit the photo title after clicking an edit button.
#### Routing
- Add routing to all these pages to src/App.jsx
#### Create the AuthContext.jsx and PrivateRoute
- 
- 
- 
#### AuthContext Issues
- You may run into issues like this when running ESLint:
  ```
  'children' is missing in props validation 
  ```
- You have to explicitly define PropTypes for children in your AuthProvider component.
  ```
  npm install prop-types --save-dev
  ```
- Then add this to your AuthContext.jsx file
  ```
  // **Add PropTypes validation for `children`**
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  ```
#### Create NavbarComponent
- Add two buttons: Home and Logout.
- Add the component to src/App.jsx.
#### Add toasts
- Install react toast
  ```
  npm install react-toastify
  ```
- Add the redirction flag in localstorage to handle redirection toast in PrivateRoute.jsx
- Add the loggedOut flag in localstorage to handle logged out toast in AuthContext.jsx
- Add toast container in src/App.jsx
#### Create a BackButton component
- This is for the UserPage, AlbumPage and PhotoPage.
- Adds a button to go back the previous page.


### Setup Linting and Tests
#### Setup up ESLint and Prettier
- Install
  ```
  npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier

  ```
- Configure eslint on eslint.config.js (create file). This also ensures eslint detects the React version and also to ignore unnecessary files not needed. For additional info check: [How to ignore files](https://eslint.org/docs/latest/use/configure/migration-guide#ignoring-files)
  ```
  import globals from 'globals';
  import pluginJs from '@eslint/js';
  import pluginReact from 'eslint-plugin-react';

  /** @type {import('eslint').Linter.Config[]} */
  export default [
    { files: ['**/*.{js,mjs,cjs,jsx}'] },
    {
      ignores: ['dist/', 'node_modules/', 'public/', 'coverage/']
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
      ...pluginReact.configs.flat.recommended,
      settings: {
        react: {
          version: 'detect', // Auto-detect React version
        },
      },
    },
  ];
  ```
- Create a .prettierrc file in your root directory and add:
  ```
  {
  "singleQuote": true,
  "trailingComma": "es5"
  }
  ```
- Modify EsLint on package.json
  ```
  "scripts": {
    ...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    ...
  ```
- Run the linter and if there are issues run the fix command. Some issues will require you to manually fix them.
  ```
  npm run lint
  npm run lint:fix
  ```


### Setup tests
- Install vitest and necessary packages:
  ```
  npm install --save-dev vitest
  npm install --save-dev jsdom
  npm install @testing-library/jest-dom --save-dev
  ```
- Add vitest to package.json
  ```
  "scripts": {
    ...
    "test": "vitest"
  }
  ```
- Add this to your vite.config.js
  ```
  /// vite.config.js
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',  // Needed for React components
      setupFiles: './setupTests.js', // If you have setup files
    },
  });
  ```
- Run either of these two commands:
  ```
  npm test
  npx vitest
  ```
- Create tests for the pages, components and other files in src.

### Create the CICD pipeline and deploy
- Create the GitHub actions for both frontend and backend.
- Ensure no errors found when pushing code to both develop and main branches.
- Before pushing to main, ensure you have setup the projects on:
  - Render for backend
  - Vercel for frontend
- Add vercel.json file for frontend
- Get the VERCEL_DEPLOY_HOOK and RENDER_DEPLOY_HOOK on each site to add in the ci-cd.yml file so that the project can deploy automatically when there are new commit changes.