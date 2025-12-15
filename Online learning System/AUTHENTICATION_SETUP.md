# Authentication System Setup Guide

## Overview
The authentication system is now fully implemented with:
- User registration and login
- Password hashing with Werkzeug
- JWT token-based authentication
- Persistent login state
- UI that hides login/signup buttons when user is logged in

## Backend Features
- **Secure Password Storage**: Passwords are hashed using Werkzeug
- **JWT Tokens**: 30-day expiration tokens for authentication
- **User Sessions**: Token-based session management
- **Input Validation**: Server-side validation for all inputs

## Frontend Features
- **Modal-based UI**: Clean login/signup modals
- **Persistent State**: Login state persists across page refreshes
- **Dynamic UI**: Login/signup buttons hide when user is authenticated
- **Profile Menu**: Shows user info when logged in

## Setup Instructions

### 1. Start the Backend
```bash
# Option 1: Use the batch file (Windows)
double-click start-backend.bat

# Option 2: Manual setup
cd backend
pip install -r requirements.txt
python app.py
```

### 2. Open the Frontend
- Open `index.html` in your web browser
- The backend must be running on `http://localhost:5000`

### 3. Test Authentication
1. Click "Sign Up" to create a new account
2. Fill in the form and submit
3. Notice the login/signup buttons disappear
4. Profile menu appears in the top right
5. Refresh the page - you should stay logged in
6. Click logout to test logout functionality

## API Endpoints

### POST /api/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### POST /api/login
Login existing user
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### GET /api/profile
Get user profile (requires Authorization header)
```
Authorization: Bearer <jwt_token>
```

## Files Modified/Created

### New Files:
- `auth.js` - Authentication JavaScript module
- `AUTHENTICATION_SETUP.md` - This setup guide

### Modified Files:
- `backend/app.py` - Added password hashing and JWT authentication
- `backend/requirements.txt` - Added PyJWT and Werkzeug dependencies
- `style-dark.css` - Added profile menu hidden by default
- `index.html` - Added auth script
- `timetable-planner.html` - Added auth script and fixed signup form

## Security Features
- Passwords are hashed using Werkzeug's secure hash functions
- JWT tokens have expiration dates
- Input validation on both client and server side
- CORS protection configured

## User Experience
- Seamless login/signup experience
- Persistent authentication across page reloads
- Clean UI that adapts based on authentication state
- Profile dropdown with user information

## Testing
1. Register a new user
2. Verify login works
3. Check that UI updates correctly
4. Test logout functionality
5. Verify persistence across page refreshes