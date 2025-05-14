-- ================================
-- 1. Create the "orders" table
-- ================================
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- ================================
-- 2. Insert sample data
-- ================================
INSERT INTO orders (customer, amount, order_date) VALUES 
('Alice', 120.50, '2024-03-05'),
('Bob', 250.00, '2024-03-15'),
('Charlie', 300.00, '2024-02-10'),
('Alice', 90.00, '2024-03-20'),
('Bob', 400.00, '2024-01-10'),
('Charlie', 200.00, '2024-03-12'),
('Alice', 130.00, '2024-04-01'),
('Bob', 150.00, date('now', '-1 month')),
('Charlie', 175.00, date('now', '-2 months')),
('Alice', 210.00, date('now', '-3 months'));

-- ================================
-- 3. Query: Total Sales Volume for March 2024
-- ================================
SELECT SUM(amount) AS total_sales_march_2024
FROM orders
WHERE order_date >= '2024-03-01' AND order_date < '2024-04-01';

-- ================================
-- 4. Query: Customer Who Spent the Most Overall
-- ================================
SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- ================================
-- 5. Query: Average Order Value for the Last 3 Months
-- ================================
SELECT AVG(amount) AS average_order_value_last_3_months
FROM orders
WHERE order_date >= date('now', '-3 months');