CREATE DATABASE bible;
CREATE ROLE api LOGIN PASSWORD 'devpass';
GRANT ALL ON DATABASE bible TO api;

\connect bible

CREATE TABLE bsb (
  id SERIAL PRIMARY KEY,
  book TEXT NOT NULL,
  chapter INT NOT NULL,
  verse INT NOT NULL,  
  scripture TEXT
);
GRANT ALL ON TABLE bsb TO api;
GRANT ALL ON sequence bsb_id_seq TO api;

/**
1. Copy the file to the db container
docker container cp /home/troy/projects/versetime/bible-data/bsb-insert.sql versetime-db:/home/

2. Get onto the container
docker exec -it versetime-db "/bin/bash"

3. Insert the bible
psql -h localhost bible -f bsb-insert.sql
*/