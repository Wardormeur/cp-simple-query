simple-query:
Or "how to ignore the whole idea of your architecture just because you're fed up with emulating the rdb inside of your code"


TODO : 
 - PR for cp-dojos's exhausting earthdistance: 

  REPLAY https://github.com/CoderDojo/cp-dojos-service/blob/master/scripts/database/pg/migrations/010.do.add-geo-extensions.sql but replace:
   - CREATE EXTENSION ... SCHEMA pg_catalog;
   Reason : https://www.postgresql.org/docs/9.6/static/postgres-fdw.html#AEN186129   
