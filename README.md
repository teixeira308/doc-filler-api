# Doc Filler - Business Context

Doc filler is a solution to automate the generation of human resources documents automatically.

-**Upload personal data** <br/>
-**Upload template archive**<br/>
-**Generate document fullfilled**<br/>

With this solution it is possible to generate several documents automatically, without the need to assemble the file manually. Using templates with tags referring to each apersonal data, the file is generated with the data completed automatically.

# Doc Filler API - Backend Project

This is a backend project developed with TypeScript, MySQL, Express, typeorm, bcrypt, and jsonwebtoken.

## Technologies Used

- **TypeScript**: A superset of JavaScript that adds static typing.
- **MySQL**: A relational database used to store data.
- **Express**: A web framework for Node.js.
- **TypeORM**: An ORM (Object-Relational Mapping) library for TypeScript and JavaScript (ES7, ES6, ES5).
- **bcrypt**: A library to hash passwords.
- **jsonwebtoken**: A library to work with JSON Web Tokens (JWT).

## Installation

Follow the instructions below to set up the development environment:

1. Clone the repository:
    ```bash
    git clone https://github.com/teixeira308/doc-filler-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd doc-filler-api
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    Create a `.env` file in the root of the project and add the necessary environment variables, such as your MongoDB connection string.

    Example:
    ```env
    DB_PORT=**********
    DB_NAME==**********
    DB_USER==**********
    DB_PASS==**********
    DB_HOST==**********
    JWT_SECRET==**********
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

### API Endpoints

POST /v1/users/register <br/>
POST /v1/users/login <br/>
PUT /v1/users/status <br/>



