# Lab Link Data Utilities

This directory contains utilities for managing data in the Lab Link application.

## Database Utilities

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

To import data from CSV files:

```bash
# Import only faculty data
npm run import-data faculty=path/to/faculty.csv

# Import only papers data
npm run import-data papers=path/to/papers.csv

# Import both
npm run import-data faculty=path/to/faculty.csv papers=path/to/papers.csv
```

Alternative formats are also supported:

```bash
# Format 2: --key=value (with double dash separator)
npm run import-data -- --faculty=path/to/faculty.csv

# Format 3: key value (with double dash separator)
npm run import-data -- faculty path/to/faculty.csv

# Format 4: Short form options
npm run import-data f=path/to/faculty.csv p=path/to/papers.csv
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

If you experience connection problems:

1. Check your `.env.local` file has the correct values:
   - `NEXT_PUBLIC_SUPABASE_URL` - Should be in format `https://[project-ref].supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` - Should be your service role API key (not the anon key)

2. Verify your Supabase project:
   - Is the project active and not paused?
   - Are you using the correct credentials? 