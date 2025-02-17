# Project Setup

## Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Never commit the `.env` file to version control. The `.env.example` file serves as a template for required environment variables.

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
``` 