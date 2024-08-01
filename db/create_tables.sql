CREATE TABLE IF NOT EXISTS pokemon_type (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS rarity (
    id SERIAL PRIMARY KEY,
    rarity_name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type_id INT NOT NULL,
    hp INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    weakness_id INT,
    resistance_id INT,
    retreat_cost INT,
    rarity_id INT NOT NULL,
    image_url VARCHAR(255),
    FOREIGN KEY (type_id) REFERENCES pokemon_type (id),
    FOREIGN KEY (weakness_id) REFERENCES pokemon_type (id),
    FOREIGN KEY (resistance_id) REFERENCES pokemon_type (id),
    FOREIGN KEY (rarity_id) REFERENCES rarity (id)
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);