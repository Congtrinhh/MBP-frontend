## I'm starting to develop a new project, there requirements are as this md file below:

;don't do anything oke, just remember the information to provide me good response when I ask future questions.
when showing me response, only show code snippets and changes that is new, not regenerate everything for every files.

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
Notes for front-end:
When creating new components, prefix the name of component with M letter. for example MImageViewer, MMcItem,.. to differentiate between components from MBP and other libraries.

##

next time, only show me method having code changes, don't show everything of every file, it is lengthy

backend prod:
http://production.eba-nbh3jtv6.ap-southeast-1.elasticbeanstalk.com/api

frontend prod:
https://main.d3vt4ohfxm0zrb.amplifyapp.com
