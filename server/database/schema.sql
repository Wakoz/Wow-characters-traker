create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null,
  created_at timestamp default current_timestamp
);

create table class (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null unique
);

create table server (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null unique
);

CREATE TABLE race (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  faction VARCHAR(20) NOT NULL CHECK(faction IN ('Alliance', 'Horde', 'Neutre'))
);

create table `character` (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
  class_id int unsigned not null,
  race_id INT UNSIGNED not null,
  level int unsigned not null check(level >= 1 and level <= 80),
  server_id int unsigned not null,
  user_id int unsigned not null,
  created_at timestamp default current_timestamp,
  foreign key(user_id) references user(id) on delete cascade,
  foreign key(class_id) references class(id),
  foreign key(server_id) references server(id),
  foreign key(race_id) REFERENCES race(id)
);

insert into class (name)
values
  ('Warrior'),
  ('Paladin'),
  ('Hunter'),
  ('Rogue'),
  ('Priest'),
  ('Death Knight'),
  ('Shaman'),
  ('Mage'),
  ('Warlock'),
  ('Monk'),
  ('Druid'),
  ('Demon Hunter'),
  ('Evoker');

insert into server (name)
values
  ('Archimonde'),
  ('Hyjal'),
  ('Ysondre'),
  ('Dalaran'),
  ('Chant Eternel'),
  ('Sargeras'),
  ('Stormrage'),
  ('Tichondrius'),
  ('Zul''jin');

INSERT INTO race (name, faction) VALUES
-- Alliance
('Humain', 'Alliance'),
('Nain', 'Alliance'),
('Gnome', 'Alliance'),
('Elfe de la nuit', 'Alliance'),
('Draeneï', 'Alliance'),
('Worgen', 'Alliance'),
('Pandaren (Alliance)', 'Alliance'),
('Elfe du vide (Alliance)', 'Alliance'),
('Nain sombrefer', 'Alliance'),
('Mécagnome', 'Alliance'),
('Kultirassien', 'Alliance'),
('Draeneï sancteforge', 'Alliance'),

-- Horde
('Orc', 'Horde'),
('Troll', 'Horde'),
('Tauren', 'Horde'),
('Mort-vivant', 'Horde'),
('Elfe de sang', 'Horde'),
('Gobelin', 'Horde'),
('Pandaren (Horde)', 'Horde'),
('Troll zandalari', 'Horde'),
('Tauren de Haut-Roc', 'Horde'),
('Orc mag''har', 'Horde'),
('Elfe du vide (Horde)', 'Horde'),
('Vulpérin', 'Horde');