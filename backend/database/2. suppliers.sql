CREATE TABLE IF NOT EXISTS suppliers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  supplier_name VARCHAR(120) NOT NULL,
  contact_person VARCHAR(120),
  email VARCHAR(150),
  phone VARCHAR(30),
  address TEXT,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
