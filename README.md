# Express TypeScript Application

This repository contains a Node.js application written in TypeScript that connects to a PostgreSQL database, both managed by Docker Compose.

## Requirements

- Docker
- Docker Compose

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Create the `.env` file at the root of the project with the required environment variables:

   ```
   PORT=3000
   POSTGRES_USER=postgres
   POSTGRES_HOST=db
   POSTGRES_DB=ts-demo-web
   POSTGRES_PASSWORD=password
   POSTGRES_PORT=5432
   PG_DATABASE_URL=postgres://postgres:password@db:5432/ts-demo-web

   ```

   Adjust the values as needed for your environment.

## Running the Application

1. Build and start the containers with Docker Compose:

   ```
   docker-compose up --build
   ```

2. Check the logs:

   ```
   docker-compose logs -f
   ```

3. Access the Application:

   The application will be available at http://localhost:3000.

## Stopping and Removing Containers

To stop and remove containers, networks, and volumes created by `docker-compose up`, use the command:

```
docker-compose down
```

## Development

During development, changes to the source code will be reflected immediately. To run the application in development mode:

```
docker-compose up --build
```

## Contributing

Contributions are welcome! To contribute to the project:

1. Fork this repository.
2. Create a branch for your feature or fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or need further assistance, feel free to open an issue in the repository or contact the project maintainer.

---

Thank you for using this project! We hope it serves you well and that you have a great experience with Docker and Node.js.
