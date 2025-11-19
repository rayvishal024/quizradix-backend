# quizRadix — Backend

A simple, production-ready backend for quizRadix. 

## Quick overview
- REST APIs, auth (JWT), quiz & user management.
- Tech: Node.js + javaScript, Express, MongoDB.

## Quick start

### Prerequisites
- Node.js 
- npm/ 
- mongoDB


### Environment (example .env)
cp .env example.env

### Install & run
- Install: npm install
- Dev: npm run dev
- Build + run: npm run build && npm start


## Database
- MongoDB (mongoose ODM)

## API & Auth
- Version your API: /api/v1/
- Auth: JWT access + refresh tokens
- Common routes:
     - POST /auth/register
     - POST /auth/login -> { accessToken, refreshToken }
     - GET /api/v1/quizzes
     - POST /api/v1/quizzes
     - GET /api/v1/quizzes/:id
- Document with OpenAPI/Swagger at /docs

## Testing
- Unit tests for logic, integration tests for DB.
- Commands:
     - npm run test
     - npm run test:watch
- Use a separate test DB and reset state between tests.



## License
MIT
