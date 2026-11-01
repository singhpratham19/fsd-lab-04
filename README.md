# FSD Lab Assignment 4: Task Manager with Routing

Name: Pratham Singh  
PRN: 1032211384

The Assignment 3 Task Manager, enhanced with multiple pages using React Router.

## Run

Start MySQL and create the database (only needed once):

```bash
brew services run mysql
mysql -u root < server/database.sql
```

Install the packages:

```bash
npm install
```

Start the server in one terminal:

```bash
npm run server
```

Start the React app in a second terminal:

```bash
npm run dev
```

Then open the link shown in the terminal.

## Concepts used

- Router: `/` shows the tasks, `/about` shows the About page and other links show Page not found
- Lists and keys: `TaskList` renders each task with a unique `key`
- Portal: `ConfirmModal` opens in `#modal-root`
- Error handling: `ErrorBoundary`, plus a message when tasks cannot load
- Styling: `src/index.css` and the CSS Module `ConfirmModal.module.css`
- Responsive design: media queries for PC, tablet and mobile phone
