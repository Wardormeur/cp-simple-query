exports.up = (knex, Promise) =>
  // TODO Read Only
  // TODO Check if we can manipulate pg_catalog to move cd_dojos's earthdistance 
  knex.schema
    .raw('CREATE SERVER users FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host \'db\', dbname \'cp-users-development\', port \'5432\')')
    .raw('CREATE USER MAPPING FOR platform SERVER users OPTIONS (user \'platform\', password \'QdYx3D5y\')')
    .raw('CREATE SCHEMA IF NOT EXISTS "cp-users" AUTHORIZATION platform')
    .raw('ALTER ROLE platform SET search_path = public, "cp-dojos", "cp-users"')
    .raw('SET search_path = public, "cp-dojos", "cp-users"')
    .raw('IMPORT FOREIGN SCHEMA "public" FROM SERVER users INTO "cp-users"')
    
    .then(() => Promise.resolve());

exports.down = (knex, Promise) =>
  knex.schema
    .raw('DROP SCHEMA IF EXISTS "cp-users" CASCADE')
    .raw('DROP USER MAPPING FOR platform SERVER users')
    .raw('DROP SERVER IF EXISTS users CASCADE')
    .then(() => Promise.resolve());
