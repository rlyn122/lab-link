# Lab Link Data Utilities

This directory contains utilities for managing data in the Lab Link application.

## Database Utilities

### Test Database Connection

To test the database connection:

```bash
npm run db-test
```

This will check if your database connection is working properly and provide troubleshooting tips if it fails.

### Generate Migration Files

To generate migration files from schema changes:

```bash
npm run generate-migrations
```

### Seed Database

To seed the database with sample data:

```bash
npm run seed
```

## Data Import Utilities

### Generate Sample CSV Files

To generate sample CSV files for testing:

```bash
npm run generate-csv
```

This will create a `sample-data` directory with:
- `faculty.csv` - Sample faculty data
- `papers.csv` - Sample papers data

### Import Data from CSV Files

To import data from CSV files, you can use any of these formats:

```bash
# Format 1: key=value
npm run import-data faculty=path/to/faculty.csv
npm run import-data papers=path/to/papers.csv
npm run import-data faculty=path/to/faculty.csv papers=path/to/papers.csv

# Format 2: --key=value (with double dash separator)
npm run import-data -- --faculty=path/to/faculty.csv
npm run import-data -- --papers=path/to/papers.csv

# Format 3: key value (with double dash separator)
npm run import-data -- faculty path/to/faculty.csv
npm run import-data -- papers path/to/papers.csv

# Format 4: Short form options
npm run import-data f=path/to/faculty.csv p=path/to/papers.csv

# Database connection check only
npm run import-data check-db
```

## CSV File Format Requirements

### Faculty CSV Format

Faculty CSV files should have the following headers:
- `Name` - Full name of the faculty member (required)
- `Affiliation` - Department or institution affiliation
- `Homepage` - URL to faculty member's homepage
- `Email_Domain` - Email domain (e.g., "cs.example.edu")
- `Scholar_ID` - Google Scholar ID
- `Interests` - Research interests as a comma-separated string
- `Citedby` - Total citation count
- `Citedby5y` - Citation count in last 5 years
- `hindex` - h-index value
- `hindex5y` - h-index value for last 5 years
- `i10index` - i10-index value
- `i10index5y` - i10-index value for last 5 years

### Papers CSV Format

Papers CSV files should have the following headers:
- `Title` - Title of the paper (required)
- `Year` - Publication year
- `URL` - URL to the paper
- `Abstract` - Paper abstract
- `Author` - Semicolon-separated list of author names (must match faculty names in the database)
- `Research_Areas` - Semicolon-separated list of research areas

## Troubleshooting

### Database Connection Issues

If you experience connection problems:

1. Run the database test utility:
   ```bash
   npm run db-test
   ```

2. Check your `.env.local` file has the correct values:
   - `NEXT_PUBLIC_SUPABASE_URL` - Should be in format `https://[project-ref].supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` - Should be your service role API key

3. Verify your Supabase project:
   - Is the project active and not paused?
   - Is your IP address allowed in the database settings?
   - Are you using the correct credentials?

4. Network issues:
   - Check if port 5432 is blocked by your firewall
   - Try a different network connection

If problems persist, check the Supabase documentation for direct database connections. 