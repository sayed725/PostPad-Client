
# PostPad - An Interactive Online Discussion Platform  

## Project Purpose  
This project is a fully responsive and interactive forum built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The platform allows users to post, comment, vote, and share content in real-time. Admins can manage users, announcements, and reported activities. The purpose of this project is to create a scalable web application that focuses on user experience, performance, and security.

---

## Live URL  
[Forum Live Link](https://your-live-url.com)

---

## Key Features  
### Public Features:  
- **Homepage**:  
  - Displays posts from newest to oldest.  
  - Search functionality based on post tags.  
  - Sort by Popularity (based on Upvote-Downvote difference).  
  - Pagination with 5 posts per page.  
  - Announcement section with live notification count.
  - Advertisement section to show add.  

- **Post Details**:  
  - Displays post details such as title, author information, tags, description, and comments.  
  - Comment, Upvote, Downvote, and Share functionality.
  - Any Logged in user can vote , comment , share on the post here.  

- **Membership Page**:  
  - Allows users to pay to become members and post more than 5 posts.
  - Added Stripe Payment Method to make user become member.  

- **Authentication**:  
  - Social and Email/Password login using Firebase.  
    

---

### Private User Features:  
- **User Dashboard**:  
  - My Profile: Displays user's name, email, badges, and 3 recent posts.  
  - Add Post: Post content with tags, upvotes, and downvotes.  
  - My Posts: View and manage (delete, comment, report) user posts.  

- **Membership Perks**:  
  - Gold Badge for members with increased more than 5 posting capacity.  

---

### Admin Features:  
- **Admin Dashboard**:  
  - **Admin Profile**:  
    - Displays site stats (posts, users, comments) and a pie chart.  
    - Add new tags for post categorization.  

  - **Manage Users**:  
    - View all users with search functionality.  
    - Make users admins and view subscription status.
    - Added Admin can make any user or member to admin functionality.  

  - **Reported Comments**:  
    - View and manage reported comments.  
    - Take appropriate actions (delete that comment , delete that specific user).  

  - **Announcements**:  
    - Create and manage announcements visible to all users.  

---

## Challenges Tasks Implemented  
- Admin profile page with stats and a pie chart.  
- JWT for secure login and role-based access.  
- Firebase and MongoDB credentials secured with environment variables.  
- Tanstack Query for efficient data fetching.  
- Pagination in all tables and posts.  

---

## Tech Stack  
### Frontend:  
- React.js with React Router  
- Tailwind CSS  
- React-hook-form  
- React-select  
- React-share  

### Backend:  
- Node.js with Express.js  
- MongoDB 
- JWT for authentication  

### Deployment:  
- Frontend: Firebase  
- Backend: Vercel 

---

## NPM Packages Used  
1. **Frontend**:  
   - `react-router-dom`  
   - `@tanstack/react-query`  
   - `react-hook-form`  
   - `react-select`  
   - `react-share`  
   - `react charts`  
   - `react-icons`  
   - `lotte-react`  
   - `react-modal`  
   - `react-hot-toast`  
   - `sweetAleart2`  
   - `react-stripejs`  
   - `react-helmet`  
   - `axios`  
   - `axios`  

2. **Backend**:  
   - `express`    
   - `dotenv`  
   - `jsonwebtoken`  
   - `bcryptjs`  
   - `cors`  

---

## Environment Variables  
### Frontend:  
- Firebase Config Keys (stored in `.env` file)  

### Backend:  
- MongoDB URI  
- JWT Secret  

---

## How to Run Locally  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/forum.git
   cd forum

