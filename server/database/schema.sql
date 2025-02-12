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

create table `character` (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
  class_id int unsigned not null,
  level int unsigned not null check(level >= 1 and level <= 80),
  server_id int unsigned not null,
  user_id int unsigned not null,
  created_at timestamp default current_timestamp,
  foreign key(user_id) references user(id) on delete cascade,
  foreign key(class_id) references class(id),
  foreign key(server_id) references server(id)
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
