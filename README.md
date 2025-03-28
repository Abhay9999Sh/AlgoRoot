# User Authentication & Dashboard App

A **Next.js** application with user authentication and a data table dashboard. The app includes login/signup functionality and a details page displaying a sortable, filterable, and paginated data table.

## 🚀 Live Demo
[Hosted Link](https://algo-root-assignment-two.vercel.app/) 

## 📂 Repository Link
[GitHub Repository](https://github.com/Abhay9999Sh/AlgoRoot)

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Abhay9999Sh/AlgoRoot
cd AlgoRoot
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the Development Server
```sh
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 📌 Features

### 1️⃣ User Authentication (Login/Signup)
- Users can sign up and log in using **email & password**.
- Input fields are validated with proper error messages.
- User session details are stored in **local storage**.
- After login, users are redirected to the **Dashboard**.
- After signing up, users need to log in again (local storage session management).

### 2️⃣ Dashboard Page (After Login)
- **Navbar**: 
  - Logo (left)
  - User Icon (right) with dropdown:
    - Display logged-in user details (name/email)
    - **Logout** (clears local storage and redirects to login)
    - **Delete Account** (removes user data from local storage)
- **Sidebar**:
  - Highlights the current page (**Details** page)

### 3️⃣ Details Page (Data Table)
- Fetches user data from `https://dummyjson.com/users`
- **Table Features**:
  - Sorting (Ascending/Descending)
  - Searching (Filter data based on user input)
  - Pagination (Limited rows per page)

### 4️⃣ General Features
- Uses **local storage** for authentication/session management.
- **Responsive Design** (works on both desktop & mobile).
- **State Management** with `useContext` or `useReducer`.
- Built using **Next.js** and **ShadCN UI Components**.

---

## 📌 Navigation Routes

| Route       | Description                                   |
|------------|-----------------------------------------------|
| `/`        | Home Page (Login/Signup)                     |
| `/dashboard` | Dashboard with Sidebar & Data Table (After Login) |


---

## 🎉 Thank You!
If you have any questions or issues, feel free to reach out. Happy coding! 🚀
