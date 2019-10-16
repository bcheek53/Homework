-- Perform an INNER JOIN to generate Employee Number, Last, First, Gender, and Salary
SELECT e.emp_no, e.last_name, e.first_name, e.gender, s.salary
FROM employees AS e
INNER JOIN salaries AS s ON
e.emp_no = s.emp_no;

-- List employees who were hired in 1986
SELECT * FROM employees
WHERE EXTRACT (year FROM (hire_date)) = 1986;

-- List the manager of each department
SELECT dm.dept_no, dn.dept_name, dm.emp_no, e.last_name, e.first_name, dm.from_date, dm.to_date
FROM dept_manager AS dm
INNER JOIN departments AS dn ON
dm.dept_no = dn.dept_no
INNER JOIN employees AS e ON
dm.emp_no = e.emp_no;

-- List the department of each employee
SELECT e.emp_no, e.last_name, e.first_name, d.dept_name
FROM employees AS e
INNER JOIN dept_emp AS dn ON
e.emp_no = dn.emp_no
INNER JOIN departments AS d ON
dn.dept_no = d.dept_no;

-- List all employees whose first name is "Hercules" and last names begin with "B."
SELECT last_name, first_name
FROM employees
WHERE first_name LIKE 'Hercules' AND last_name LIKE 'B%';

-- List all employees in the Sales department
SELECT e.emp_no, e.last_name, e.first_name, d.dept_name
FROM employees AS e
INNER JOIN dept_emp AS dn ON
e.emp_no = dn.emp_no
INNER JOIN departments AS d ON
dn.dept_no = d.dept_no
WHERE d.dept_name LIKE 'Sales';

-- In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT last_name, COUNT(last_name) AS "Count"
FROM employees
GROUP BY last_name
ORDER BY "Count" DESC;

-- Why not ascending? There appears to be a suspicious last_name "Foolsday"
SELECT last_name, COUNT(last_name) AS "Count"
FROM employees
GROUP BY last_name
ORDER BY "Count" ASC;

