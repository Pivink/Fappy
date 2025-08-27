# Fappy - Cloud Storage Frontend

A modern, Google Drive-like file storage interface built with React, Vite, and TailwindCSS.

## Features

- 🔐 **JWT Authentication** - Secure login/signup with persistent sessions
- 📁 **Hierarchical Folder Structure** - Nested folders with tree navigation
- 📄 **File Upload & Management** - Drag-and-drop file uploads with Cloudinary integration
- 🎨 **Modern Dark UI** - Sleek dark theme with smooth animations
- 🔍 **Real-time Search** - Instant file and folder searching
- 📱 **Responsive Design** - Works perfectly on desktop and mobile

## Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ 
- Backend server running on `http://localhost:4000`

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd fappy-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## API Integration

The frontend connects to your backend API at `http://localhost:4000/api/f1/`:

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Folder Management
- `POST /folder/create/:id` - Create new folder
- `GET /folder/getfolder/:id` - Get user folders
- `GET /folder/getfolderid/:id` - Get specific folder
- `PUT /folder/update/:id` - Rename folder
- `DELETE /folder/delete/:id` - Delete folder recursively

### File Management
- `POST /file/upload` - Upload file to Cloudinary
- `GET /file/` - Get user files
- `PUT /file/update/:id` - Rename file
- `DELETE /file/delete/:id` - Delete file

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthForm.jsx     # Login/signup form
│   ├── FolderGrid.jsx   # File and folder display
│   ├── FolderTree.jsx   # Recursive sidebar navigation
│   ├── Navbar.jsx       # Top navigation
│   ├── PrivateRoute.jsx # Route protection
│   ├── Sidebar.jsx      # Left navigation panel
│   ├── Topbar.jsx       # Drive page header
│   └── UploadModal.jsx  # File upload dialog
├── contexts/
│   └── AuthContext.jsx  # Authentication state
├── pages/
│   ├── AuthPage.jsx     # Login/signup page
│   └── DrivePage.jsx    # Main drive interface
├── services/            # API integration
│   ├── api.js          # Axios configuration
│   ├── auth.js         # Authentication APIs
│   ├── file.js         # File management APIs
│   └── folder.js       # Folder management APIs
└── utils/
    └── storage.js      # localStorage helpers
```

## Key Features Implementation

### Authentication Flow
- JWT tokens stored in localStorage
- Automatic token attachment via Axios interceptors
- Auto-logout on 401 responses
- Protected route components

### File Upload
- Drag-and-drop interface
- FormData for multipart uploads
- Cloudinary integration via backend
- Progress feedback (coming soon)

### Folder Navigation
- Recursive tree component for nested folders
- Breadcrumb navigation
- Real-time folder expansion/collapse
- Context-aware file operations

### Search Functionality
- Real-time filtering of files and folders
- Case-insensitive search
- Visual feedback for empty results

## Testing Checklist

### Authentication
- [ ] User can sign up with name, email, password
- [ ] User can log in with email, password
- [ ] Token persists across browser sessions
- [ ] User is redirected on logout/token expiry

### Folder Operations
- [ ] Create root-level folder
- [ ] Create nested subfolder
- [ ] Navigate folder tree in sidebar
- [ ] Rename folder
- [ ] Delete folder (recursive)

### File Operations
- [ ] Upload file via drag-and-drop
- [ ] Upload file via file picker
- [ ] View files in grid layout
- [ ] Download/preview files
- [ ] Delete files

### UI/UX
- [ ] Dark theme consistency
- [ ] Responsive design (mobile/desktop)
- [ ] Smooth animations and transitions
- [ ] Loading states and error handling
- [ ] Search functionality

## Environment Variables

The frontend automatically connects to `http://localhost:4000/api/f1/`. If your backend runs on a different port, update the `API_URL` in `src/services/api.js`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.