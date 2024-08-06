# Little Lake

The little lake is a simple data lake application that allows users to upload and download files to and from an S3 bucket. The application is built using Node.js and Express.js.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the s3ninja docker container:
   ```
   docker run -p 9000:9000 -t scireum/s3-ninja:latest
   ```
4. Start the application:
   ```
   npm start
   ```
5. Run tests:
   ```
   npm test
   ```

## Project Structure

- `src/services`: Contains core services like S3Service, LakeDestinationService, and DataGeneratorService
- `src/models`: Contains data models and managers
- `src/utils`: Contains utility functions and classes
- `src/server`: Contains Express server setup and routes



Good luck!