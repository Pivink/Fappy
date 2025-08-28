# Fappy Drive

Fappy Drive is a cloud storage application (inspired by Google Drive) built with the MERN stack (MongoDB, Express, React, Node)[mongodb.com](https://www.mongodb.com/resources/languages/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,based%20web%20and%20mobile%20applications). It allows users to sign up, log in, and manage files in a hierarchical folder system. By storing files in the cloud, Fappy Drive lets you access your data *anywhere, anytime* with an internet connection[recordnations.com](https://www.recordnations.com/blog/pros-and-cons-of-personal-cloud-storage/#:~:text=One%20of%20the%20primary%20advantages,it%E2%80%99s%20for%20work%2C%20school%20projects). The interface uses a modern purple-and-white theme and is fully responsive, adapting to different screen sizes[interaction-design.org](https://www.interaction-design.org/literature/topics/responsive-design?srsltid=AfmBOor1BqTgS-FafnoadfOLXbzXxw_ogbYrsxSuGs99zffmIhmWlJRb#:~:text=Responsive%20design%20is%20an%20approach,sized%20in%20relative%20units). The login/signup page and the drive interface both work seamlessly on desktop and mobile devices, providing a consistent user experience.

## Key Features

* **Secure Authentication (JWT)** – Users can register and log in securely using JSON Web Tokens. Valid sessions are maintained without storing sensitive credentials, enabling stateless, secure access to private resources.
* **Folder & File Management** – Create, rename, and delete nested folders. Upload and organize files within folders. Folders and files are displayed in a clear grid or list layout (folders first, then files) with icons and sizes. Clicking a folder fetches and displays its contents.
* **Cloud File Uploads** – Files are uploaded via multipart upload and stored using Cloudinary’s cloud storage. This offloads storage from the server and provides fast, reliable file delivery.
* **Responsive Design** – The UI adapts to any device. Tailwind CSS utility classes and responsive variants are used to build a fluid layout that works on phones, tablets, and desktops[tailwindcss.com](https://tailwindcss.com/docs/styling-with-utility-classes#:~:text=,build%20fully%20responsive%20interfaces%20easily)[interaction-design.org](https://www.interaction-design.org/literature/topics/responsive-design?srsltid=AfmBOor1BqTgS-FafnoadfOLXbzXxw_ogbYrsxSuGs99zffmIhmWlJRb#:~:text=Responsive%20design%20is%20an%20approach,sized%20in%20relative%20units). For example, elements resize and stack at different breakpoints to ensure usability on mobile screens.
* **Modern UI Elements** – A top navbar shows the app logo and name, and a right-side button to toggle the login/signup form. After login, a sidebar displays the user’s name, plan (Free), and storage usage (e.g. “Used 1.2 GB of 2 GB”). The main section shows a **+ New** button for creating folders or uploading files, followed by the folder/file grid. Smooth transitions and a clean color scheme provide a polished UX.
* **“Developed by” Credit** – The login/signup page includes an introduction section about the project and a footer line “Developed by Fappy Pivink” to credit the author.

*Example of a cloud storage dashboard layout. Folders and files are shown in a main section, with a sidebar containing user profile and storage info. This Fappy Drive interface is fully responsive – it reflows and resizes for mobile devices[interaction-design.org](https://www.interaction-design.org/literature/topics/responsive-design?srsltid=AfmBOor1BqTgS-FafnoadfOLXbzXxw_ogbYrsxSuGs99zffmIhmWlJRb#:~:text=Responsive%20design%20is%20an%20approach,sized%20in%20relative%20units)[tailwindcss.com](https://tailwindcss.com/docs/styling-with-utility-classes#:~:text=,build%20fully%20responsive%20interfaces%20easily).*

## Tech Stack

* **Frontend:** React 18 (Vite + JSX/TSX) for a dynamic, component-based UI; Tailwind CSS for utility-first styling and responsive design[tailwindcss.com](https://tailwindcss.com/docs/styling-with-utility-classes#:~:text=,build%20fully%20responsive%20interfaces%20easily). React Router manages navigation between pages. Axios handles API calls (with interceptors for auth tokens).
* **Backend:** Node.js with Express.js to serve RESTful APIs. MongoDB (via Mongoose) stores user data, folders, and file metadata. JSON Web Tokens (JWT) provide stateless authentication. Cloudinary handles file storage and retrieval.
* **Authentication:** JWT-based login/signup with secure password hashing (bcrypt) and protected routes (`authUser` middleware).
* **Deployment:** The frontend is deployed on Vercel (e.g. fappy.vercel.app), and the backend can be run locally (by default on port 4000).

## Installation

1. **Clone the repository:**

   <pre class="overflow-visible!" data-start="3663" data-end="3709"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> <repository-url>
   </span></span></code></div></div></pre>
2. **Start the backend server:**

   <pre class="overflow-visible!" data-start="3748" data-end="3818"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> Fappy-main/server
   npm install
   npm run dev
   </span></span></code></div></div></pre>

   This launches the Express server (by default at `http://localhost:4000`). The server requires environment variables in a `.env` file (see below).
3. **Start the frontend:**

   <pre class="overflow-visible!" data-start="4002" data-end="4072"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> Fappy-main/client
   npm install
   npm run dev
   </span></span></code></div></div></pre>

   This starts the Vite development server (usually at `http://localhost:5173`). The React app will proxy API requests to the backend.
4. **Environment Variables:** Create a `.env` file in the `server/` folder with the following keys:

   * `MONGO_DB_URL` – MongoDB connection string
   * `JWT_SECRET` – Secret key for signing JWT tokens
   * `CLOUD_NAME`, `API_KEY`, `API_SECRET` – Credentials for your Cloudinary account
     These allow the server to connect to the database, issue tokens, and upload files.

## Usage

### Authentication Flow

* **Landing Page:** When visiting `/`, the app checks login status. If  **not logged in** , it displays the **Login/Signup** page. If  **logged in** , it redirects to `/drive`.
* **Login/Signup Page:** The page has a top navigation bar with the app logo/name on the left and a **Login / Sign Up** button on the right. Clicking that button toggles the form between **Login** and **Signup** modes.
* **Forms:** The **Login** form asks for email and password. The **Signup** form asks for username, email, and password. Form submission triggers calls to the backend API:
  * `POST /api/f1/auth/login` – validates credentials and returns a JWT.
  * `POST /api/f1/auth/signup` – registers a new user.
* **Intro Section:** Below the form, a brief introduction explains the project’s purpose (convenient personal cloud drive). A line “Developed by Fappy Pivink” appears at the bottom.
* **Validation:** Simple frontend validation ensures required fields are filled. On success, the user is redirected to the **Drive** page.

### Drive Page

After logging in, users land on `/drive`, which provides a Google Drive–like interface for managing files and folders:

* **Sidebar (Left):** Displays the logged-in user’s  **username** , **plan** (e.g. “FREE”), and **storage info** (e.g. “Used 1.2 GB of 2 GB”).
* **Top Bar:** A **+ New** button lets the user create a new folder or upload a file. (Clicking **New** reveals options for folder creation or file upload.)
* **Main Section:** Folders are listed first (showing folder name and icon). Below folders, files are shown as cards or rows with the filename, file-type icon, and file size. The layout can switch between a grid and list view for convenience.
* **Navigation:** Clicking a folder fetches its contents via `GET /api/f1/folder/getfolderid/:id` and displays its subfolders/files. Files can be clicked/downloaded.
* **File Operations:** Users can rename files (`PUT /api/f1/file/update/:id`) or delete them (`DELETE /api/f1/file/delete/:id`). Similarly, folders can be renamed (`PUT /api/f1/folder/update/:id`) or deleted recursively (`DELETE /api/f1/folder/delete/:id`).
* **Responsive:** The interface rearranges itself on smaller screens[interaction-design.org](https://www.interaction-design.org/literature/topics/responsive-design?srsltid=AfmBOor1BqTgS-FafnoadfOLXbzXxw_ogbYrsxSuGs99zffmIhmWlJRb#:~:text=Responsive%20design%20is%20an%20approach,sized%20in%20relative%20units)[tailwindcss.com](https://tailwindcss.com/docs/styling-with-utility-classes#:~:text=,build%20fully%20responsive%20interfaces%20easily). For example, menu items stack vertically, and grid columns adjust at different breakpoints, ensuring usability on phones.

*Example of a mobile-friendly interface for a file manager app. The layout adapts to smaller screens, ensuring buttons and folders remain accessible. Tailwind’s responsive variants make it easy to build such fluid designs[tailwindcss.com](https://tailwindcss.com/docs/styling-with-utility-classes#:~:text=,build%20fully%20responsive%20interfaces%20easily).*

## API Endpoints

The backend exposes the following REST APIs under the base path `/api/f1`:

* **Authentication**
  * `POST /api/f1/auth/signup` – Register a new user. Expects `{ username, email, password }`.
  * `POST /api/f1/auth/login` – Log in an existing user. Expects `{ email, password }`, returns a JWT.
* **Folder Management**
  * `POST /api/f1/folder/create` – Create a new folder (supply folder name and optional parent ID).
  * `GET /api/f1/folder/getfolder/:id` – Get a folder’s details (subfolders and files in it) by folder ID.
  * `PUT /api/f1/folder/update/:id` – Rename a folder by ID (provide new name).
  * `DELETE /api/f1/folder/delete/:id` – Delete a folder (and all its subfolders/files) recursively.
* **File Management**
  * `POST /api/f1/file/upload` – Upload a file. (Use a multipart form with field `file` and include target folder ID in the body.)
  * `GET /api/f1/file/:id` – List files created by user ID `:id` (or files in a folder, depending on implementation).
  * `PUT /api/f1/file/update/:id` – Rename a file by ID (provide new name).
  * `DELETE /api/f1/file/delete/:id` – Delete a file by ID.

All protected routes require a valid JWT token in the `Authorization` header (Bearer scheme). For example:

<pre class="overflow-visible!" data-start="8595" data-end="8638"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>Authorization: Bearer <JWT_TOKEN></span><span>
</span></span></code></div></div></pre>

## Project Structure

<pre class="overflow-visible!" data-start="8662" data-end="8923"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>Fappy-main/
├── client/        # React frontend (Vite + Tailwind CSS)
│   ├── src/
│   ├── </span><span>public</span><span>/
│   └── package.json
└── </span><span>server</span><span>/        # Node/Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── config/
    └── package.json
</span></span></code></div></div></pre>

This separation keeps frontend and backend code organized. Use `npm run dev` in each folder to start the servers concurrently.

## Environment Variables

The server requires the following variables (in `server/.env`):

* `MONGO_DB_URL` – MongoDB connection string (e.g. from Mongo Atlas).
* `JWT_SECRET` – A secret key for signing JWT tokens.
* `CLOUD_NAME`, `API_KEY`, `API_SECRET` – Your Cloudinary account credentials (for file uploads).

Without these, the server cannot connect to the database or Cloudinary. Ensure you set them before running the backend.

## References

* MERN stands for MongoDB, Express.js, React.js, and Node.js[mongodb.com](https://www.mongodb.com/resources/languages/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,based%20web%20and%20mobile%20applications), a full-stack JavaScript framework for web apps.
* The app uses responsive design, an approach where the UI adapts to different screen sizes for better usability[interaction-design.org](https://www.interaction-design.org/literature/topics/responsive-design?srsltid=AfmBOor1BqTgS-FafnoadfOLXbzXxw_ogbYrsxSuGs99zffmIhmWlJRb#:~:text=Responsive%20design%20is%20an%20approach,sized%20in%20relative%20units). Tailwind CSS’s responsive utilities make it easy to build such adaptable interfaces[tailwindcss.com](https://tailwindcss.com/docs/styling-with-utility-classes#:~:text=,build%20fully%20responsive%20interfaces%20easily).
* Personal cloud storage provides **accessibility and convenience** – you can reach your files “anytime, anywhere” with an internet connection[recordnations.com](https://www.recordnations.com/blog/pros-and-cons-of-personal-cloud-storage/#:~:text=One%20of%20the%20primary%20advantages,it%E2%80%99s%20for%20work%2C%20school%20projects). It also often includes automatic backups to prevent data loss[recordnations.com](https://www.recordnations.com/blog/pros-and-cons-of-personal-cloud-storage/#:~:text=Many%20personal%20cloud%20storage%20services,device%20failure%20or%20accidental%20deletion), giving users confidence that their data is safe.

Citations

[![](https://www.google.com/s2/favicons?domain=https://www.mongodb.com&sz=32)MERN Stack Explained | MongoDBhttps://www.mongodb.com/resources/languages/mern-stack](https://www.mongodb.com/resources/languages/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,based%20web%20and%20mobile%20applications)[![](https://www.google.com/s2/favicons?domain=https://www.recordnations.com&sz=32)The Pros and Cons of Personal Cloud Storage Record Nationshttps://www.recordnations.com/blog/pros-and-cons-of-personal-cloud-storage/](https://www.recordnations.com/blog/pros-and-cons-of-personal-cloud-storage/#:~:text=One%20of%20the%20primary%20advantages,it%E2%80%99s%20for%20work%2C%20school%20projects)[![](https://www.google.com/s2/favicons?domain=https://www.interaction-design.org&sz=32)What is Responsive Design? — updated 2025 | IxDFhttps://www.interaction-design.org/literature/topics/responsive-design?srsltid=AfmBOor1BqTgS-FafnoadfOLXbzXxw_ogbYrsxSuGs99zffmIhmWlJRb](https://www.interaction-design.org/literature/topics/responsive-design?srsltid=AfmBOor1BqTgS-FafnoadfOLXbzXxw_ogbYrsxSuGs99zffmIhmWlJRb#:~:text=Responsive%20design%20is%20an%20approach,sized%20in%20relative%20units)[![](https://www.google.com/s2/favicons?domain=https://tailwindcss.com&sz=32)Styling with utility classes - Core concepts - Tailwind CSShttps://tailwindcss.com/docs/styling-with-utility-classes](https://tailwindcss.com/docs/styling-with-utility-classes#:~:text=,build%20fully%20responsive%20interfaces%20easily)[![](https://www.google.com/s2/favicons?domain=https://www.recordnations.com&sz=32)The Pros and Cons of Personal Cloud Storage Record Nationshttps://www.recordnations.com/blog/pros-and-cons-of-personal-cloud-storage/](https://www.recordnations.com/blog/pros-and-cons-of-personal-cloud-storage/#:~:text=Many%20personal%20cloud%20storage%20services,device%20failure%20or%20accidental%20deletion)

All Sources

[![](https://www.google.com/s2/favicons?domain=https://www.mongodb.com&sz=32)mongodb](https://www.mongodb.com/resources/languages/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,based%20web%20and%20mobile%20applications)[![](https://www.google.com/s2/favicons?domain=https://www.recordnations.com&sz=32)recordnations](https://www.recordnations.com/blog/pros-and-cons-of-personal-cloud-storage/#:~:text=One%20of%20the%20primary%20advantages,it%E2%80%99s%20for%20work%2C%20school%20projects)[![](https://www.google.com/s2/favicons?domain=https://www.interaction-design.org&sz=32)interaction-design](https://www.interaction-design.org/literature/topics/responsive-design?srsltid=AfmBOor1BqTgS-FafnoadfOLXbzXxw_ogbYrsxSuGs99zffmIhmWlJRb#:~:text=Responsive%20design%20is%20an%20approach,sized%20in%20relative%20units)[![](https://www.google.com/s2/favicons?domain=https://tailwindcss.com&sz=32)tailwindcss](https://tailwindcss.com/docs/styling-with-utility-classes#:~:text=,build%20fully%20responsive%20interfaces%20easily)
