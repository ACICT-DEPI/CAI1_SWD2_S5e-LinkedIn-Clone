# LinkedIn Clone

## Links 
- [Power Point](https://docs.google.com/presentation/d/13r656DaZeqE7zmsxTH0VOlO1nSuBDpFwAU04WDZU_ZQ/edit#slide=id.p1)
- [Doc](https://docs.google.com/document/d/1gwz5A2mod_O4o18sR-xuqEAteF1NftavCIQgFqthcFw/edit?tab=t.0)
  
## Contributors
- [Mohamed Essam Elramah](https://www.linkedin.com/in/mohamed-essam-elramah)
- [Haneen Akram](https://www.linkedin.com/in/haneen-akram)
- [Amera Saad](https://www.linkedin.com/in/amera-saad)
- [Karim Akl](https://www.linkedin.com/in/karim-akl)
  

## Project Overview
**Title:** LinkedIn Clone  
**Description:** This project aims to create a comprehensive LinkedIn clone, leveraging cutting-edge technologies to provide a seamless and engaging user experience for professional networking and career development.

**Motivation:** 
- Practice React
- Practice Express and Node.js
- Improve hands-on experience 

## Key Features
- **User Authentication:** Users can sign up, log in, and manage their profiles with verification code during signup (notification via email).
- **Profile Management:** Users can update personal details, add work experience, education, and skills.
- **Networking:** Connect with other users, send connection requests, and accept them.
- **Feed & Posts:** Users can create posts, like, comment, share posts, and interact with others' content.
- **Messaging:** Direct messaging between users.
- **Notifications:** Real-time notifications for connection requests, connection responses, messages, and post interactions.
- **Admin Features:** 
  - Ability to view all users, posts, comments
  - Manage all interactions and content

## Tech Stack
- **Frontend:**
  - React (with hooks)
  - Tailwind CSS / Bootstrap for UI design
  - Redux for state management
  - Axios for API requests
  - Material UI for design components
- **Backend:**
  - Node.js with Express for handling API requests
  - MongoDB (NoSQL) for the database
  - JWT for user authentication
  - Pug for server-side rendering pages
  - Cloudinary for managing and optimizing assets
- **Version Control:** Git, GitHub
- **Project Management Tools:**
  - ClickUp
  - Google Docs
  - Miro

## Usage
1. Sign up for a new account.
2. Sign in to your account.
3. Add your personal information.
4. Find new connections and connect with them.
5. Start creating posts.
6. Like, comment, and share content from others.

## Database Schema
### User Schema
- `firstName`
- `lastName`
- `Username`
- `Email`
- `Password`
- `profilePicture`
- `Headline`
- `Location`
- `Skills`
- `Experience` (point to Connection Schema)
- `Education`
- `Connections` (point to Connection Schema)
- `connectedUsers` (point to Connection Schema)
- `Notifications` (point to Notification Schema)
- `Posts` (point to Post Schema)
- `Comments` (point to Comment Schema)
- `isAdmin`
- `isVerified`
- `resetPasswordToken`
- `resetPasswordExpiresAt`
- `verificationToken`
- `verificationTokenExpiresAt`

### Post Schema
- `authorId` (point to User Schema)
- `Content`
- `Images`
- `Videos`
- `Likes`
- `Shares` (point to Post Schema)
- `Comments` (point to Comment Schema)

### Notification Schema
- `Type` [can be -> {post, comment, connection}]
- `Message`
- `relatedId` (point to Type Schema)
- `isRead`
- `Date`

### Message Schema
- `senderId` (point to User Schema)
- `receiverId` (point to User Schema)
- `Content`

### Conversation Schema
- `Participants` (point to User Schema)
- `Messages`

### Connection Schema
- `senderId` (point to User Schema)
- `receiverId` (point to User Schema)
- `status`

### Comment Schema
- `postId` (point to Post Schema)
- `userId` (point to User Schema)
- `Content`
- `Videos`
- `Images`
- `Likes` (point to User Schema)
- `Replies` (point to Comment Schema)

## APIs
### Users
- `GET /users/:id`: Get user by ID
- `GET /users`: Get all users
- `GET /users/suggestions`: Get suggestions
- `GET /users/:id/posts`: Get user posts
- `PUT /users/:id`: Update user
- `GET /users/:id/comments`: Get user comments
- `POST /users/:id/experience`: Add user experience
- `POST /users/:id/skills`: Add user skill
- `POST /users/:id/education`: Add user education
- `POST /users/:id/section`: Add user section
- `POST /users/:id/notifications`: Add notification
- `GET /users/:id/notifications`: Get user notifications
- `GET /users/:id/connections`: Get user connections

### Posts
- `GET /posts`: Get all feed posts
- `POST /posts`: Create post
- `DELETE /posts/:id`: Delete post
- `GET /posts/:id`: Get post by ID
- `POST /posts/:id/share`: Share post
- `GET /posts/:id/comments`: Get all post comments

### Comments
- `GET /comments/:id`: Get comment by ID
- `POST /comments`: Add comment
- `POST /comments/:id/reply`: Add reply
- `PUT /comments/:id`: Edit comment
- `DELETE /comments/:id/reply/:replyId`: Delete reply
- `DELETE /comments/:id`: Delete comment

### Notifications
- `GET /notifications/:id`: Get notification by ID
- `GET /notifications`: Get all notifications

### Connections
- `POST /connections`: Send connection request
- `PUT /connections/:id/status`: Change connection status
- `GET /connections/pending`: Get all pending connections

### Likes
- `POST /likes`: Add like
- `DELETE /likes/:id`: Delete like

### Auth
- `POST /auth/signup`: Signup
- `POST /auth/login`: Login
- `POST /auth/logout`: Logout
- `POST /auth/verify`: Verify email
- `POST /auth/forgot-password`: Forgot password
- `POST /auth/reset-password`: Reset password

### Admin
- `GET /admin/users`: Render users view
- `GET /admin/users/:id`: Render a user view
- `GET /admin/users/:id/posts`: Render all user posts
- `GET /admin/users/:id/comments`: Render all user comments
- `GET /admin/users/:id/connections`: Render all user connections
- `GET /admin/posts`: Render all posts
- `GET /admin/comments`: Render all comments
- `GET /admin/comments/:id`: Render a comment
- `GET /admin/search`: Search

## Challenges & Solutions
- Choosing the right tools to use.
- Handling real-time messaging (Socket.io).
- Implementing a proper authentication and authorization system.

## What You Learned
- Improved knowledge of React.
- Improved knowledge of Node.js.
- Worked on a full-stack project.
- Gained experience with JWT authentication.
- Learned new topics, including:
  - JWT
  - Cloudinary
  - Socket.io
  - Refactoring techniques
  - New hooks and events

## Future Improvements
- Advanced search functionality (e.g., by skills, location).
- Job section.
- Integration with external APIs (LinkedIn, Google Jobs).
- Integration with AI models.
