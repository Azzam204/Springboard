DROP DATABASE IF EXISTS medical_centers;

CREATE DATABASE medical_centers;

\c medical_centers

CREATE TABLE centers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    phone_num NUMERIC(10,0)
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    first_name TEXT DEFAULT Dr,
    last_name TEXT NOT NULL,
    center_id INTEGER REFERENCES centers
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_num NUMERIC(10,0)
);

CREATE TABLE doctors_patients (
    id SERIAL PRIMARY KEY,
    doctors_id INTEGER REFERENCES doctors ON DELETE CASCADE NOT NULL,
    patients_id INTEGER REFERENCES patients ON DELETE CASCADE NOT NULL
);

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE diagnosis (
    id SERIAL PRIMARY KEY,
    doctors_patients_id INTEGER REFERENCES doctors_patients,
    disease_id INTEGER REFERENCES disease
);