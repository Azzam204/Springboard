DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams 
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    rank INTEGER
);

CREATE TABLE players
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    team_id INTEGER REFERENCES teams
);

CREATE TABLE referees
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE seasons
(
    id SERIAL PRIMARY KEY,
    start DATE,
    end DATE
);

CREATE TABLE  matches
(
    id SERIAL PRIMARY KEY,
    season_id INTEGER REFERENCES seasons NOT NULL,
    game_day DATE NOT NULL,
    home_team_id INTEGER REFERENCES teams NOT NULL,
    away_team_id INTEGER REFERENCES teams NOT NULL,
    head_ref_id INTEGER REFERENCES referees,
    assist_ref1_id INTEGER REFERENCES referees,
    assist_ref2_id INTEGER REFERENCES referees
);

CREATE TABLE goals
(
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches,
    player_id INTEGER REFERENCES players
);