-- Create the database if it does not exist
DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'pokemon') THEN
      PERFORM dblink_exec('dbname=postgres user=' || current_user, 'CREATE DATABASE pokemon');
   END IF;
END
$do$;