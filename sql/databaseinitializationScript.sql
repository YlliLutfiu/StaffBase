CREATE SCHEMA IF NOT EXISTS staffbase;

CREATE TABLE staffbase."user" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE staffbase.departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    department_manager INT
);

CREATE TABLE staffbase.employee (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    employee_position VARCHAR(100) NOT NULL,
    employee_phone VARCHAR(15),
    employee_email VARCHAR(255) UNIQUE,
    employee_department VARCHAR(100),
    employee_createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    employee_salary DECIMAL(10,2)
);

CREATE TABLE staffbase.salary (
    salary_id SERIAL PRIMARY KEY,
    employee_salary INT NOT NULL,
    salary_amount NUMERIC(10,2) NOT NULL,
    salary_date DATE NOT NULL
);

CREATE TABLE staffbase.tasks (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    task_description TEXT,
    task_employee INT,
    task_deadline DATE,
    task_status VARCHAR(50)
);