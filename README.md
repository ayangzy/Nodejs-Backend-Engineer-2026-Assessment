# Creator Cards Microservice

A RESTful API microservice for managing "link-in-bio" style Creator Cards with integrated service rate catalogs. Built using Node.js, Express, and MongoDB.

This project was built as part of the backend engineer technical assessment.

## Features
- **Public & Private Cards**: Support for draft, published, public, and private access control states.
- **Slug Generation**: Unique alphanumeric identifiers generated dynamically with fallback collision handling.
- **Robust Validation**: Enforces strict payload validation and standardized API error formatting.

## Live Deployment
The API is currently deployed and accessible at:
`https://nodejs-backend-engineer-2026-assessment.onrender.com`

## API Endpoints
All endpoints are available at the root URL (no versioning prefixes):

- `POST /creator-cards`: Create a new creator card.
- `GET /creator-cards/:slug`: Publicly retrieve a published card (supports `access_code` for private cards).
- `DELETE /creator-cards/:slug`: Soft-delete a creator card (requires valid `creator_reference`).

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file and configure your `MONGODB_URI`.
3. **CRITICAL:** You must also add the following Validator environment variables to your `.env` (and your production host's environment variables) for validation errors to format correctly according to the project specifications:
   ```env
   #VALIDATOR
   NO_SINGLE_ERRORS=1  
   TOP_LEVEL_ERROR_MESSAGE="Validation failed."
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Documentation
- Detailed field-level validation rules can be found in `specs/creator-cards/data/`.
- Custom business logic constraint error codes are strictly mapped to their corresponding HTTP status codes according to the assessment specifications.
