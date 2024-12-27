# Backend File Structure
Root Directory:
* `node_modules/`: Contains all the dependencies installed via npm.
* `public/`: Stores static files (e.g., images, CSS, JS for frontend, etc.).
* `src/`: Main application source folder.
    * db/: Manages database connection and configurations. Mongo, MySQl, Postgres, Sqlite, DB Frameworks- ORM, ODM
    * models/: Defines the data models/schema (e.g., using Mongoose or Sequelize).
    * controllers/: Handles business logic for each route.
    * middlewares/: Contains middleware functions for authentication, logging, etc.
    * routes/: Defines API route endpoints.
    * utils/: Utility/helper functions used across the app.
    * `app.js`: Main application configuration and Express setup. app.js ya main.js
    * `constants.js`: Stores constant values (e.g., API keys, URLs).
    * `index.js`: Entry point of the application. usually DB bi connect kar dete yaha per
* `env:` Stores environment variables (e.g., database URI, API keys).
* `gitignore`: Specifies files and folders to be ignored by Git.
* `prettierrc`: Configuration file for code formatting using Prettier.
* `prettierignore`: Specifies files/folders to ignore for Prettier.
* `package.json`: Project configuration file containing metadata and dependencies.
* `package-lock.json`: Auto-generated file for locking dependencies.
* Readme.md: Documentation for the project.

---

### What are Models in Backend ?
Backend models ka kaam hai database aur application ke beech ka bridge banna. Ye data ko structure karte hain aur uska manipulation aur validation ensure karte hain. ex:- 

Data Model:
- Ye database structure define karta hai, jaise tables, fields, aur relationships.
- Example: User model ke liye fields ho sakti hain - name, email, password.

Request Model:
- Incoming API requests ka data validate aur process karta hai.
- Example: Login request mein sirf email aur password validate hoga.

Response Model:
- API ka output format karta hai, jo client ko data send kare.
- Example: Success message ke saath user details.

Business Logic Model:
- Core application logic handle karta hai, jaise rules aur calculations.
- Example: EMI calculator logic model.

ORM Models:
- Object Relational Mapping tools jaise Sequelize (Node.js) ya Mongoose (MongoDB) ke saath kaam karta hai.
- Ye models database operations ko simplify karte hain.

Example dekar clear karo, aur interviewer ke questions ke according models explain karo. 😊

---

### What are the Controllers in Backend?
Backend Controllers ka kaam hai client aur server ke beech ka mediator banna. Ye request ko handle karte hain aur appropriate response dete hain. Simply Functions h jo data lete h, process karte h, aur dete h

Controllers ke kaam:
1. Request Handle karna:
    - Client ke request ko process karna (GET, POST, PUT, DELETE).
    - Example: Login request aane par username aur password validate karna.
2. Business Logic ko Trigger karna:
    - Core application logic ko call karte hain jo service layer ya models mein hota hai.
    - Example: "Add to Cart" ke liye product aur user ko link karna.
3. Response Return karna:
    - Client ko JSON ya HTML response dena.
    - Example: res.status(200).json({ message: "Success" }).
4. Error Handling:
    - Exceptions ya errors ko handle karte hain aur user-friendly response bhejte hain.
    - Example: "Invalid email/password" ka proper error code return karna.
5. Database Interaction:
    - Models ko call karke database se data fetch/update karte hain.
    - Example: "Get All Users" ke liye User model ko query karna.

```
// User Controller Example
const UserController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = UserController;
```
Interview ke liye bas yahi points explain karo aur zarurat padne par example bhi de do. 😊

---

### What are the Routes in Backend?
Backend Routes ka kaam hai client ke requests ko handle karna aur unhe appropriate controllers ya actions par redirect karna. Yeh backend application ke entry points hote hain.

Routes ke Kaam:
1. HTTP Requests ko Handle karna:
    - GET, POST, PUT, DELETE jaise methods ke liye endpoints define karte hain.
    - Example: /login, /register, /products.
2. Controllers ko Map karna:
    - Route par aaye request ko appropriate controller ke function par forward karte hain.
    - Example: /user/login request ke liye UserController.login() call karna.
3. API Structure Define karna:
   - Application ka URL structure yahin se decide hota hai.
   - Example: RESTful APIs mein /api/products aur /api/users.
4. Middleware Integration:
    - Authentication, validation, aur logging ke liye middleware functions ko integrate karte hain.
    - Example: JWT authentication middleware lagana.

```
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Routes for User
router.post("/login", UserController.login); // Login API
router.post("/register", UserController.register); // Register API
router.get("/profile", authenticate, UserController.getProfile); // Get User Profile with middleware

module.exports = router;
```
#### Short Key Points for Interview:
- Routes HTTP requests ko handle karte hain.
- Controllers aur middleware se connect karte hain.
- REST API endpoints define karte hain.
- Clean aur modular backend architecture ke liye zaroori hain.

Clear aur concise answers dena, aur zarurat ho toh example code ka reference de do. 😊

---

### What are the Middleware in Backend? 
Backend Middleware ek function hota hai jo `request aur response ke beech ka bridge ka kaam` karta hai. Yeh `request process hone se pehle ya response bhejne se pehle kuch additional tasks perform karta hai`. Interview ke liye short aur simple explanation:

Middleware ke Kaam:
1. Request ko Process Karna:
    - Request object ko modify karte hain ya validate karte hain.
    - Example: Authentication check karna JWT token ke through.
2. Response ko Modify Karna:
    - Response bhejne se pehle data ko format ya modify karte hain
    - Example: Response ko compress karna.
3. Logging aur Debugging:
    - Request aur response details ko log karte hain.
    - Example: User requests ka log maintain karna.
4. Error Handling:
    - Errors ko catch karte hain aur proper response bhejte hain.
    - Example: 404 - Not Found ya 500 - Internal Server Error.
5. Custom Functionalities Add Karna:
    - Reusable logic likhte hain jo har request ke liye chale.
    - Example: Rate limiting ya CORS policies add karna.

Types of Middleware:
- Application-Level Middleware: Specific routes ya pura app ke liye apply hota hai.
- Router-Level Middleware: Specific routes ke liye middleware.
- Error-Handling Middleware: Errors ko handle karne ke liye.
- Third-Party Middleware: NPM libraries jaise body-parser, cors.

```
const express = require("express");
const app = express();

// Middleware for Logging
const logger = (req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Move to next middleware or route
};

// Middleware for Authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "valid-token") {
    next(); // Proceed if token is valid
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.use(logger); // Apply logger middleware

app.get("/secure-data", authenticate, (req, res) => {
  res.json({ data: "This is secure data" });
});

app.listen(3000, () => console.log("Server running on port 3000"));

```

#### Short Key Points for Interview:
- Middleware request/response lifecycle ko control karta hai.
- Authentication, validation, logging, aur error handling ke liye use hota hai.
- next() function ke through request flow ko forward karta hai.
- Modular aur reusable backend architecture banata hai.

Yeh concise points aur example code aapko interview mein confidently answer karne mein help karega! 😊

---

