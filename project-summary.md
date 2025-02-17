#region Project summary

**Project Name**: MC Booking Platform (MBP)

**Technology Stack**:

-   **Backend**: ASP.NET Web API with Clean Architecture, using .net 8.0
-   **Frontend**: Vue.js: Vue 3 with the Composition API, when writing vue code, remember to write in vue 3 composition api style. I use PrimeVue as an ui library. with pinia, I prefer option store style
-   **Object Storage**: Google Cloud Platform
-   **Authentication**: JWT combined with Google login
-   **Database**: MySQL

**Current Task**: Develop an MVP web-based app for master of ceremonies (MCs) and clients to find and book MCs in Vietnam, primarily in Hanoi and Ho Chi Minh City. The app includes:

-   Finding MCs
-   Checking bank transactions between clients and MCs to finalize deals
-   JWT authentication combined with Google login
-   Identity verification (users provide identity card images, and the backend calls an external AI service to verify the identity)

**Requirements and Questions**:

-   Google Login Combined with JWT Authentication:
    -   Implement Google login combined with JWT authentication in ASP.NET Web API.
    -   Configure Google and JWT authentication in `Startup.cs`.
    -   Create a token service to generate JWT tokens.
    -   Implement authentication endpoints in the `AuthController`.
-   Form Validation with PrimeVue:
    -   Use PrimeVue components to perform various form validation tasks.
    -   Ensure fields like `fullName` are filled before allowing input in fields like `email`.
-   Profile Updating Feature:
    -   Implement a single API endpoint to update both personal information (e.g., `fullName`, `email`) and files (e.g., images, videos).
    -   Use multipart form data to handle both text data and file uploads.
-   Clean Architecture:
    -   Scaffold a project using Clean Architecture principles.
    -   Create layers: Presentation, Application, Domain, and Infrastructure.
    -   Use dependency injection to manage dependencies.
-   Logging and Error Tracing:
    -   Store and retrieve logs to trace errors and exceptions when the app is running.
    -   Use Google Cloud Platform (GCP) Logging for centralized logging.
-   Paging Solution:
    -   Design a dynamic base paging API endpoint that can handle paging for every entity.
    -   Ensure the API endpoint is flexible in terms of fields data.
    -   Allow fetching master-detail data based on a mode parameter from the frontend.
    -   Enable sorting data based on multiple field names.
    -   Implement search functionality using AND and OR operations with multiple fields.

#endregion

#backend:

##

next time, only show me method having code changes, don't show everything of every file, it is lengthy

Notes for front-end:
When creating new components, prefix the name of component with M letter. for example MImageViewer, MMcItem,.. to differentiate between components from MBP and other libraries.
This app is MBP (MC Booking Platform) running mostly in browser of mobile devices (iphone, android phones), so the UI should be mobile user-friendly with actions like touch, swipe up, swipe down, scroll,..
Most of the users (80%) use iphone, so the ux should be mobile-friendly for iphone users.

The front-end use vue.js 3 with composition style, with vite build tool.
Use pinia as state management tool. with pinia, write code in option api style.

Notes for back-end:
the back-end uses .net 8, with asp.net web api technology.
using clean architecture with the following already created projects: Api, Application, Domain, Infrastructure.
Api project contains mainly controllers.
Application project contains business logic and related components for it: Interfaces, Dtos, Services, Hubs, Mapper
Domain project contains core entities of app (mapping with tables in database) with folders: Entities, Enums, Extensions, Attributes.
Infrastructure project contains components to interact with outer systems, services such as databases, log services: Repositories, Logging.
when adding new classes, add brief comment in this form, this is an example:
`entity for user of the system
created by: tqcong <<current date. eg: 16/02/2025>>
`

Notes for database:
the database is mysql version 8.0.41.
naming convention for table is snake case with singular form. eg: 'school_student' is table for student of school, 'home_pet' is table for pet information.
naming convention for table's fields are the same as naming convention for table.
when creating new tables, try to add comment for table and its fields if there is information to infer from to generate the comments.
