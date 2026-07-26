# Project Rules & Guidelines

## Database Schema & Migrations
- **Drizzle ORM Workflow**: Always use the official Drizzle ORM commands for database schema changes and migrations:
  - Generate migration files: `pnpm run db:generate`
  - Apply migrations: `pnpm run db:migrate`
  - Push schema changes: `pnpm run db:push`
- Avoid creating ad-hoc custom raw SQL migration scripts. All database schema evolution must be managed and tracked strictly through Drizzle Kit.
