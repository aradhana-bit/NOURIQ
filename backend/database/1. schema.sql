CREATE TABLE IF NOT EXISTS app_users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'staff' CHECK (role IN ('admin','manager','staff')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS students (
  id BIGSERIAL PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150),
  department VARCHAR(100),
  phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','inactive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS menus (
  id BIGSERIAL PRIMARY KEY,
  menu_name VARCHAR(120) NOT NULL,
  meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN ('breakfast','lunch','snacks','dinner')),
  menu_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS menu_item (
  id BIGSERIAL PRIMARY KEY,
  menu_id BIGINT,
  item_name VARCHAR(120) NOT NULL,
  category VARCHAR(80),
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS attendance (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL,
  menu_id BIGINT,
  meal_type VARCHAR(30),
  attendance_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present','absent')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS ingredients (
  id BIGSERIAL PRIMARY KEY,
  ingredient_name VARCHAR(120) NOT NULL,
  quantity NUMERIC(12,2) NOT NULL DEFAULT 0,
  unit VARCHAR(30) NOT NULL,
  reorder_level NUMERIC(12,2) DEFAULT 0,
  unit_price NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS purchases (
  id BIGSERIAL PRIMARY KEY,
  ingredient_id BIGINT,
  supplier_name VARCHAR(120),
  quantity NUMERIC(12,2) NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL,
  purchase_date DATE NOT NULL,
  status VARCHAR(30) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS food_preparation (
  id BIGSERIAL PRIMARY KEY,
  menu_item_id BIGINT,
  preparation_date DATE NOT NULL,
  quantity_prepared NUMERIC(12,2) NOT NULL,
  quantity_unit VARCHAR(30) DEFAULT 'portions',
  prepared_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS food_waste (
  id BIGSERIAL PRIMARY KEY,
  menu_item_id BIGINT,
  waste_date DATE NOT NULL,
  quantity NUMERIC(12,2) NOT NULL,
  unit VARCHAR(30) DEFAULT 'kg',
  reason VARCHAR(255),
  recorded_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS suppliers (
  id BIGSERIAL PRIMARY KEY,
  supplier_name VARCHAR(120) NOT NULL,
  contact_person VARCHAR(120),
  email VARCHAR(150),
  phone VARCHAR(30),
  address TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','inactive')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
