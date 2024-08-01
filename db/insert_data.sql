-- Insert types with known IDs
INSERT INTO pokemon_type (id, type_name) VALUES
(1, 'Fire'),
(2, 'Electric'),
(3, 'Rock'),
(4, 'Dark'),
(5, 'Steel'),
(6, 'Water'),
(7, 'Grass'),
(8, 'Fighting'),
(9, 'Psychic');

-- Insert rarities with known IDs
INSERT INTO rarity (id, rarity_name) VALUES
(1, 'Common'),
(2, 'Uncommon'),
(3, 'Rare');

-- Insert Pokemon with specific type, weakness, resistance IDs, and rarity IDs
INSERT INTO pokemon (name, type_id, hp, attack, defense, weakness_id, resistance_id, retreat_cost, rarity_id, image_url) VALUES
('Charizard', 1, 180, 120, 100, 6, NULL, 3, 3, 'https://img.pokemondb.net/artwork/charizard.jpg'),
('Pikachu', 2, 60, 20, 50, 8, 5, 1, 1, 'https://img.pokemondb.net/artwork/pikachu.jpg'),
('Onix', 3, 90, 40, 160, 7, NULL, 3, 2, 'https://img.pokemondb.net/artwork/onix.jpg'),
('Sneasel', 4, 70, 20, 50, 1, 9, 1, 2, 'https://img.pokemondb.net/artwork/sneasel.jpg'),
('Scizor', 5, 120, 60, 100, 1, 9, 2, 3, 'https://img.pokemondb.net/artwork/scizor.jpg'),
('Feraligatr', 6, 180, 160, 100, 7, NULL, 2, 3, 'https://img.pokemondb.net/artwork/feraligatr.jpg'),
('Treecko', 7, 40, 10, 35, 1, 6, 1, 1, 'https://img.pokemondb.net/artwork/treecko.jpg'),
('Bulbasaur', 7, 45, 49, 49, 1, 6, 1, 1, 'https://img.pokemondb.net/artwork/bulbasaur.jpg'),
('Squirtle', 6, 44, 48, 65, 7, 9, 1, 1, 'https://img.pokemondb.net/artwork/squirtle.jpg'),
('Charmander', 1, 39, 52, 43, 6, NULL, 1, 1, 'https://img.pokemondb.net/artwork/charmander.jpg'),
('Jigglypuff', 9, 115, 45, 20, 8, 5, 2, 2, 'https://img.pokemondb.net/artwork/jigglypuff.jpg'),
('Gengar', 9, 60, 65, 60, 7, 1, 1, 3, 'https://img.pokemondb.net/artwork/gengar.jpg'),
('Snorlax', 8, 160, 110, 65, 6, 9, 4, 3, 'https://img.pokemondb.net/artwork/snorlax.jpg'),
('Mewtwo', 9, 106, 110, 90, 7, 8, 2, 3, 'https://img.pokemondb.net/artwork/mewtwo.jpg'),
('Dragonite', 1, 91, 134, 95, 7, 9, 3, 3, 'https://img.pokemondb.net/artwork/dragonite.jpg'),
('Eevee', 8, 55, 55, 50, 7, 1, 1, 2, 'https://img.pokemondb.net/artwork/eevee.jpg'),
('Vaporeon', 6, 130, 65, 60, 7, NULL, 2, 3, 'https://img.pokemondb.net/artwork/vaporeon.jpg'),
('Jolteon', 2, 65, 110, 60, 8, 5, 2, 3, 'https://img.pokemondb.net/artwork/jolteon.jpg'),
('Flareon', 1, 65, 130, 60, 6, NULL, 2, 3, 'https://img.pokemondb.net/artwork/flareon.jpg'),
('Machamp', 8, 90, 130, 80, 9, 5, 3, 3, 'https://img.pokemondb.net/artwork/machamp.jpg'),
('Gyarados', 6, 95, 125, 79, 7, 8, 3, 3, 'https://img.pokemondb.net/artwork/gyarados.jpg'),
('Alakazam', 9, 55, 50, 45, 8, 7, 3, 3, 'https://img.pokemondb.net/artwork/alakazam.jpg');

-- Insert User (for testing proposes)
INSERT INTO users (username, password) VALUES
('gustavo.paris', '$2a$10$5SSl/6OANhDAg.WvbjmR9eGWBKirloBTPWm2uAKy9ityolWYwrCoi')