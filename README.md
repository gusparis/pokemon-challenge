# Pokemon Battle Application

## Overview

This is a full-stack Pokemon battle application built using an Nx monorepo. The application allows users to log in, search for Pokemon, view Pokemon details, and initiate battles between Pokemons. The backend is built with NestJS, and the frontend is built with React.

### Assumptions

- Battles are determined based on Pokemon type, weaknesses, resistances, and rarity.
- Users must be authenticated to access the Pokemon search and battle functionalities.

## Features

- User authentication with JWT
- Search for Pokemon by name or type
- Pagination
- View Pokemon details
- Battle Pokemon and view battle results

## Technologies Used

- **Backend**: NestJS, TypeORM, PostgreSQL
- **Frontend**: React, Redux Toolkit, styled-components
- **Monorepo Management**: Nx
- **End-to-End Testing**: Cypress
- **Unit Testing**: Jest

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker
- Docker Compose
- Nx CLI (`npm install -g nx`)

### Project Structure

```plaintext
.
├── apps
│   ├── api
│   ├── ui
│   └── ui-e2e
├── libs
│   └── pokemon-shared
├── db
├── .eslintrc.json
├── .prettierrc
├── jest.config.js
├── nx.json
├── package.json
├── README.md
└── tsconfig.base.json
```

### Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/pokemon-battle.git
   cd pokemon-battle
   ```

2. **Run the monorepo with Docker Compose**:

   ```bash
   docker-compose up --build -d
   ```

   Database will be created and populated automatically from sql files inside `/db`.

### Swagger Documentation

Swagger is integrated to provide API documentation and can be accessed at:

- **Swagger URL**: [http://localhost:3000/api](http://localhost:3000/api)

To use Swagger, ensure your NestJS application is running, and visit the Swagger URL in your browser.

### Accessing the Application

- **Backend**: The backend API can be accessed at [http://localhost:3000](http://localhost:3000).
- **Frontend**: The frontend application can be accessed at [http://localhost:4200](http://localhost:4200).

### Backend Endpoints

- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Get Pokemon**: `GET /api/pokemons`
- **Get Pokemon types**: `GET /api/types`
- **Battle Pokemon**: `GET /api/battle?attackerId=ID&defenderId=ID`

### Frontend Components

- **Login Page**: A form for user login.
- **Signup Page**: A form for user registration.
- **Pokemon Page**: Display all Pokemons paginated. Search for Pokemons by name or type.
- **Pokemon Detail Modal**: Displays detailed information about a Pokemon and provides an option to battle another Pokemon.

### Running Tests

To run tests, use the following command:

```bash
yarn test
```

This will run both unit tests and e2e tests. For a more detailed run, use:

#### Backend Unit tests

```bash
npx nx api:test
```

#### E2E tests

```bash
nx run ui-e2e:e2e
```

Feel free to explore, contribute, and have fun battling Pokemon!
