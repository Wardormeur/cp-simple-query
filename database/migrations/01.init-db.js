exports.up = (knex, Promise) =>
  // TODO Read Only
  // TODO Check if we can manipulate pg_catalog to move cd_dojos's earthdistance 
  knex.schema.raw('CREATE EXTENSION IF NOT EXISTS postgres_fdw')
    .raw('CREATE SERVER dojos FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host \'db\', dbname \'cp-dojos-development\', port \'5432\')')
    .raw('CREATE USER MAPPING FOR platform SERVER dojos OPTIONS (user \'platform\', password \'QdYx3D5y\')')
    .raw('CREATE SCHEMA IF NOT EXISTS "cp-dojos" AUTHORIZATION platform')
    .raw('ALTER ROLE platform SET search_path = public, "cp-dojos"')
    .raw('SET search_path = public, "cp-dojos"')
    .raw('IMPORT FOREIGN SCHEMA "public" FROM SERVER dojos INTO "cp-dojos"')
    
    .then(() => Promise.resolve());

exports.down = (knex, Promise) =>
  knex.schema
    .raw('DROP SCHEMA IF EXISTS "cp-dojos" CASCADE')
    .raw('DROP USER MAPPING FOR platform SERVER dojos')
    .raw('DROP SERVER IF EXISTS dojos CASCADE')
    .then(() => Promise.resolve());
