# SPG PediaMatch Web App
This project contains the all the source code to work with the PediaMatch software stack.

# Start project locally for development

## Frontend
Run the following steps to start the frontend [VueJS](https://vuejs.org/) project locally.
```bash
npm install && npm run serve
```

## Backend
Run the following steps to start the backend [Python Django](https://www.djangoproject.com/) project locally.
```bash
python3 manage.py runserver
```

## Things to Note
**Note: This is just for local development.**

### Updating Python Django Database Post Model Updates
When you make changes to the Django data model, you will need to run the following steps to properly update the Django Database.

**Note**: More in depth explanation outlined below:
```Text
Django represents data for a database in Python classes called models. Django models are similar to the form classes that we saw in the last article. A Django model declares the data that you want to store in the database as class level attributes, just like a form class.
```

Resetting the entire database and starting it again involves a few steps. Below is a generalized process. Note that these actions will cause data loss, so always ensure you have reliable backups before proceeding.

#### Step 1: Backup Your Data
Before doing anything, make sure you backup your data to avoid unintentional data loss.

To backup data using Django’s `dumpdata`:

```bash
python manage.py dumpdata > backup.json
```

#### Step 2: Flush the Database
Flushing the database will remove all data from the database, reset primary keys, and leave the tables in place.

Run the following command and follow the prompts:

```bash
python manage.py flush
```

#### Step 3: Apply Migrations
After flushing the database, apply migrations to ensure that the schema is in the correct state.

```bash
python manage.py migrate
```

# Vue Project Structure

This document provides an overview of the directory structure in a Vue project generated using Vue CLI.

## Directory Structure

- **`node_modules/`**: Contains all npm dependencies and packages.
- **`public/`**: Holds static assets like `index.html` and favicons.
- **`src/`**: The source code of the Vue application:
  - **`assets/`**: Houses uncompiled/raw assets like SCSS, LESS, or images.
  - **`components/`**: Contains reusable Vue components.
  - **`views/`**: (If using Vue Router) Stores "page-level" components for different routes.
  - **`App.vue`**: The root component.
  - **`main.js`**: Entry point to the app, creates the Vue instance and mounts the app.
- **`.gitignore`**: Lists files and directories ignored by Git.
- **`babel.config.js`**: Configuration for Babel.
- **`package.json`**: Metadata, dependencies, scripts, etc.
- **`package-lock.json`** or **`yarn.lock`**: Ensures consistent versions of dependencies.

### Optional Directories & Files:

- **`router/`**: For organizing route definitions if using Vue Router.
- **`store/`**: For organizing the Vuex store if using Vuex.
- **`plugins/`**: For Vue plugins or libraries.
- **`mixins/`**: For reusable functionalities using Vue mixins.

## Where to Start:

1. **`src/main.js`**: Understand the Vue instance and app bootstrapping.
2. **`src/App.vue`**: Dive into the root component.
3. **`src/components/`**: Explore individual components.
4. (If present) **`router/`** and **`store/`**: Understand routing and state management respectively.

> Note: Vue is flexible regarding directory structure. This structure is a recommendation based on Vue CLI's default scaffolding and common community practices.
