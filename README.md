# StarWars Character Rating API

#### THIS A NODEJS BACKEND TECHNICAL CHALLENGE

API that allows to rate and list StarWars characters based on a score assigned by users. The API consists of several endpoints that allow listing characters, as well as rating and querying their scores.

This project combines the integration of the StarWars API with a database that allows to store the ratings assigned by users, which requires skills in programming, API and database integration, among others.

## Documentation

- [Endpoints](documentation/endpoints.md) - Cointains all services' routes.

## In Markdown

Inspired by [@iros](https://github.com/iros)'s [documentation
gist](https://gist.github.com/iros/3426278).

Focus on using the templating Markdown to create comprehensive, structured and helpful API documentation. Structure should be regular and repeated across endpoints and between projects.

## Directory structure

This is the main directory structure you end up with following the instructions of this page:

```plaintext
|-- project
|   |-- documentation
|   |-- src
|       |-- constants
|       |-- services
|   |-- test
|       |-- services
|   |-- .env.example
|   |-- .gitignore
|   |-- package.json
|   |-- README.md
|   |-- serverless.yml
```

## Requirements

- [Node.js](https://nodejs.org/es) (v14 or later)
- NPM (v7 or later)
- [Serverless](https://www.serverless.com/) Framework (v2 or later)

## Installation

1. Clone the repository:
```
git clone https://github.com/JJohanGH/swapi-aws-test-api.git
```
2. Install Serverless:
```
npm install -g serverless
```
3. Configure Serverless:
```
serverless configure
```
Provide only the access key and secret access key from AWS and omit the rest with enter

4. Install dependencies:
```
npm install
```

## Configuration

Copy the `env.example` file to `.env` and set the environment variables as needed.

## Run

### Running locally

To run the project locally, execute the following command:

```
npm run dev
```
The application should be available at `http://localhost:3000`.

## Test

Para ejecutar los tests unitarios, ejecutar el siguiente comando:

```
npm run test
```

## Deploy

To deploy the project, execute the following command:

```
npm run deploy
```

## License

This project is licensed under the MIT License.

## Contributors

| [![JJohan][jjohan_avatar]][jjohan_homepage]<br/>[JJohan][jjohan_homepage] |
| ------------------------------------------------------------------------------------------------ |

[jjohan_homepage]: https://github.com/JJohanGH
[jjohan_avatar]: https://secure.gravatar.com/avatar/62640ec554c938fa246d5e29064682d4?s=150
