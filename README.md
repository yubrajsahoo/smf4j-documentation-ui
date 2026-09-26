# SMF4J Documentation UI

This is the interactive documentation user interface for **SMF4J** (Simple Metrics Facade for Java). It is built using **React**, **Vite**, and **Tailwind CSS**.

## Running Locally

To run the documentation site on your local machine for development or preview:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   This will start a local server, typically available at `http://localhost:5173`. Any changes you make will instantly reload in the browser.

## Deploying to GitHub Pages

This project is fully configured to be hosted on GitHub Pages. 

When you are ready to publish your latest changes to the live site, simply run:

```bash
npm run deploy
```

**What this does:**
1. Runs `npm run build` to compile the optimized production files into the `dist` directory.
2. Uses the `gh-pages` library to automatically push the contents of the `dist` folder to a branch named `gh-pages` in your remote repository.
3. GitHub Pages will then automatically detect the update and deploy the site!

*(Note: Ensure your GitHub repository settings under **Settings > Pages** are configured to serve from the `gh-pages` branch).*
