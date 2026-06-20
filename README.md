# Creator Cards Microservice

A RESTful API microservice for managing "link-in-bio" style Creator Cards with integrated service rate catalogs. Built using Node.js, Express, and MongoDB.

This project was built as part of the backend engineer technical assessment.

## Features
- **Public & Private Cards**: Support for draft, published, public, and private access control states.
- **Slug Generation**: Unique alphanumeric identifiers generated dynamically with fallback collision handling.
- **Robust Validation**: Enforces strict payload validation and standardized API error formatting.

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
3. Start the development server:
   ```bash
   npm run dev
   ```

## Documentation
- Detailed field-level validation rules can be found in `specs/creator-cards/data/`.
- Custom business logic constraint error codes are strictly mapped to their corresponding HTTP status codes according to the assessment specifications.
