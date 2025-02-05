
# PostPad - An Interactive Online Discussion Platform  

## Project Purpose  
This project is a fully responsive and interactive forum built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The platform allows users to post, comment, vote, and share content in real-time. Admins can manage users, announcements, and reported activities. The purpose of this project is to create a scalable web application that focuses on user experience, performance, and security.

---

## Live URL  
[Forum Live Link](https://post-pad.web.app/)

## Requirements Docs
- Required PDF Link:   [https://drive.google.com/file/d/1xzrLiUste_hlF584wAB7w6lP2DM7GJ3h/view?usp=sharing) 

## 🔑 Admin Login Credentials

- **Email:** `post@gmail.com`
- **Password:** `1234Aa!`


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



## 📷 Project Images Highlights

### 📷 Home Page `"/"` Image

![Home Page](https://i.ibb.co.com/rKZHMYkg/Postpad-Home.png)

### 📷 Post Details Page `"/Post Details"` Image

![post Details](https://i.ibb.co.com/ZkGBM5P/post-Pad-post-details.png)

### 📷 Admin Dashboard `"/dashboard"` Image

![Admin Dashboard](https://i.ibb.co.com/zVCVD72k/Post-Pad-admin-home.png)

### 📷 User Dashboard `"/dashboard"` Image

![User Dashboard](https://i.ibb.co.com/jZ4Rgq8p/Post-Pad-User-Profile.png)

### 📷 User add post `"/add-post"` Image

![User add Post](https://i.ibb.co.com/WpYNDyWR/Post-Pad-User-Add-Post.png)

### 📷 Member Payment Page `"/payment"` Image

![Payment Section](https://i.ibb.co.com/pBGgJ9HC/Post-Pad-member-payment.png)

---

## ⚙️ Installation & Setup

### Client Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sayed725/PostPad-Client.git
   cd PostPad-Client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables in a `.env.local` file:

   ```env
   VITE_apiKey=your_firebase_apiKey
   VITE_authDomain=your_firebase_authDomain
   VITE_projectId=your_firebase_projectId
   VITE_storageBucket=your_firebase_storageBucket
   VITE_messagingSenderId=your_firebase_messagingSenderId
   VITE_appId=your_firebase_appId

   VITE_API_URL=your_server_api_link
   VITE_STRIPE_PUBLIC_KEY=your_stripe_Publishable_Key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Server Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sayed725/PostPad-Server.git
   cd PostPad-Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables in a `.env` file:
   ```env
   DB_USER=your_db_user_name
   DB_PASS=your_db_user_password
   JWT_SECRET=jwt_secret_code
   STRIPE_SECRET_KEY=your_stripe_Secret _Key
   ```
4. Run the development server:
   ```bash
   npm start
   ```

---
