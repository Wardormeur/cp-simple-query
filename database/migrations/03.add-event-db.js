exports.up = (knex, Promise) =>
  knex.schema
    .raw('CREATE SERVER events FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host \'db\', dbname \'cp-events-development\', port \'5432\')')
    .raw('CREATE USER MAPPING FOR platform SERVER events OPTIONS (user \'platform\', password \'QdYx3D5y\')')
    .raw('CREATE SCHEMA IF NOT EXISTS "cp-events" AUTHORIZATION platform')
    .raw('ALTER ROLE platform SET search_path = public, "cp-dojos", "cp-users", "cp-events"')
    .raw('SET search_path = public, "cp-dojos", "cp-users", "cp-events"')
    .raw('IMPORT FOREIGN SCHEMA "public" FROM SERVER events INTO "cp-events"')
    
    .then(() => Promise.resolve());

exports.down = (knex, Promise) =>
  knex.schema
    .raw('DROP SCHEMA IF EXISTS "cp-events" CASCADE')
    .raw('DROP USER MAPPING FOR platform SERVER events')
    .raw('DROP SERVER IF EXISTS events CASCADE')
    .then(() => Promise.resolve());
