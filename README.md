# HRMS (Human Resource Management System)

## Project Overview

The HRMS (Human Resource Management System) is a web application designed to streamline and manage various HR tasks such as employee management, designation handling, and user authentication. The system includes both a backend API built with Flask and a frontend application developed with React, Vite, and Redux Toolkit.

### Features

* User Registration and Authentication: Secure user registration and login functionality.
    ### Employee Management:
        * View a list of employees.
        * Add new employees.
        * Edit employee details.
        * Delete employees.
        * Add leaves 
    ### Designation Management:
        * View a list of designations.
        * Add new designations.
        * Edit designation details.
        * Delete designations.


### Project Structure
   ### Backend (flask_hrmsworks)
    * app.py: Main application file.
    * models.py: Contains the database models for employees and designations
    * tests_app.py: Contains unit tests for the backend application.

   ### Frontend (React, Vite, Redux Toolkit) : react_hrmsproject
        * pages/: Contains the main pages for the application (Home, EmployeeListing, DesignationListing, Login, etc.).
        * store/: Contains Redux slices and store configuration.
        * App.js: Main application component with route definitions.
        * index.js: Entry point for the React application.
        
### Installation

`git clone https://github.com/ReshmaMariamLibu/HRMS_project.git`

  ### Create new database 

     set databse name on the models.py and app.py

     `postgresql://flask_user:12345@localhost:5432/testhrms`

  ### Backend

    `cd HRMS_project/flask_hrmsworks`

    `Create virtual env`

    `pip install -r requirements.txt`

    `flask --app app run

  ### Frontend

    `cd HRMS_project/react_hrmsproject`

    `npm install`

    `npm run dev`

  ### Testing

  `coverage run -m unittest discover`

  `coverage report`

  `coverage html`
`





