# MyWallet API 💸

This is an API for a financial control application built with **Express** and **Node.js**. The API allows users to register, log in, create financial transactions, and view a transaction history. The endpoints are organized in a RESTful way and include functionalities such as basic authentication and input validations.

## 🌐 Endpoints

- **POST** `/sign-up`: Registers a new user.
- **POST** `/sign-in`: Logs the user in and returns an authentication token.
- **POST** `/nova-transacao/:tipo`: Creates a new financial transaction (input or output).
- **GET** `/home`: Lists all transactions for the authenticated user.

---

## 🛠️ Technologies

- **JavaScript (ES6+)** - Use of modern language resources.
- **Express** - Minimalist web framework for Node.js.
- **Node.js** - Execution environment for JavaScript on the server.
- **MongoDB** - NoSQL database to store users and transactions.
- **CORS** - Middleware to allow requests from different origins.
- **Joi** - Data entry validation.
- **UUID** - Generation of unique identifiers for session tokens.
- **Day.js** - Manipulation and formatting of dates.
- **Bcrypt** - Password hashing for greater security.

---

## 🚀 Features

- **User Registration**: Allows new users to register with username, email and password.
- **User Authentication**: Generates an authentication token when logging in.
- **Transaction Creation**: Authenticated users can record financial transactions.
- **Transaction List**: View each user's transaction history.

---

## 🎮 How to Use

### **User Registration**

- **Endpoint**: `POST /sign-up`
- **Body**:
    ```json
    {
      "userName": "example",
      "email": "example@email.com",
      "password": "password123"
    }
    ```

### **User Login**

- **Endpoint**: `POST /sign-in`
- **Body**:
    ```json
    {
      "email": "example@email.com",
      "password": "password123"
    }
    ```
- **Response**: Returns an authentication token and `userName`.

### **New Transaction**

- **Endpoint**: `POST /nova-transacao/:tipo`  
  - `type`: Defines the type of transaction (`input` or `output`).
- **Headers**:  
  - `Authorization`: Authentication token in `Bearer` format.
- **Body**:
    ```json
    {
      "value": 100.00,
      "description": "Compra de materiais"
    }
    ```

### **Transaction History**

- **Endpoint**: `GET /home`
- **Headers**:  
  - `Authorization`: Authentication token in `Bearer` format.

---

## 🖥️ Running Locally

To run the project locally, follow the steps below:

1. Clone the repository:

    ```bash
    git clone https://github.com/seu-usuario/financial-transactions-api.git
    ```

2. Install dependencies:

    ```bash
    cd financial-transactions-api
    npm install
    ```

3. Configure the environment variables in the `.env` file:

    ```
    DATABASE_URL=mongodb+srv://<usuário>:<senha>@cluster0.mongodb.net/<database>
    PORT=5000
    ```

4. Start the project:

    ```bash
    npm start
    ```

The server will be available at `http://localhost:5000`.

---

## 📝 Future Improvements

- Implement authentication with JWT for greater security.
- Add support for editing and deleting transactions.
- Improve validation and handling of input errors.

---

## 👤 Developer

Developed by [Luiz Fernando](https://github.com/luuizfernando). Feel free to get in touch and contribute to the project!

---

## 📫 Contato

- **Email:** [luizfernandosant26@gmail.com](mailto:luizfernandosant26@gmail.com)
- **LinkedIn:** [linkedin.com/in/luiz-fernando-dalpra](https://linkedin.com/in/luiz-fernando-dalpra)
