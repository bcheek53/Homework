--DROP TABLE IF EXISTS employees
--DROP TABLE IF EXISTS departments
--DROP TABLE IF EXISTS salaries
--DROP TABLE IF EXISTS titles
--DROP TABLE IF EXISTS dept_emp
--DROP TABLE IF EXISTS dept_manager


-- Create a new tables
CREATE TABLE departments (
	dept_no VARCHAR(10) NOT NULL,
	PRIMARY KEY (dept_no),
	dept_name VARCHAR (50)NOT NULL
	);

SELECT * FROM departments

CREATE TABLE employees (
	emp_no INT,
	PRIMARY KEY (emp_no),
	birth_date DATE,
	first_name VARCHAR (30),
	last_name VARCHAR (30),
	gender VARCHAR (1),
	hire_date DATE
	);

SELECT * FROM employees

CREATE TABLE salaries (
	emp_no INT,
	FOREIGN KEY (emp_no) REFERENCES employees(emp_no),
	salary INT,
	from_date DATE,
	to_date DATE
	);

SELECT * FROM salaries	
	
CREATE TABLE titles (
	emp_no INT,
	FOREIGN KEY (emp_no) REFERENCES employees(emp_no),
	title VARCHAR (50),
	from_date DATE,
	to_date DATE
	);
	
SELECT * FROM titles

CREATE TABLE dept_emp (
	emp_no INT,
	FOREIGN KEY (emp_no) REFERENCES employees(emp_no),
	dept_no VARCHAR (10),
	FOREIGN KEY	(dept_no) REFERENCES departments(dept_no),
	PRIMARY KEY (emp_no, dept_no),
	from_date DATE,
	to_date DATE
	);

SELECT * FROM dept_emp

CREATE TABLE dept_manager (
	dept_no VARCHAR (10) NOT NULL,
	FOREIGN KEY (dept_no) REFERENCES departments(dept_no),
	emp_no INT,
	FOREIGN KEY (emp_no) REFERENCES employees(emp_no),
	PRIMARY KEY (dept_no, emp_no),
	from_date DATE,
	to_date DATE
	);

SELECT * FROM dept_manager

	