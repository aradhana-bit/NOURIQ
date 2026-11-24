import 'dotenv/config';
import { pool } from './src/config/db.js';

function dateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function ensureRow(table, fields, values, where, whereValues) {
  const [existing] = await pool.execute(`SELECT id FROM ${table} WHERE ${where} LIMIT 1`, whereValues);
  if (existing.length) return Number(existing[0].id);
  const [result] = await pool.execute(
    `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
    values
  );
  return Number(result.insertId);
}

async function seedDemoData() {
  console.log('Adding safe, repeatable cafeteria demo data...');

  const studentRows = [
    ['DEMO001', 'Aarav Sharma', 'aarav.sharma@example.test', 'Computer Science', '9000000001'],
    ['DEMO002', 'Ananya Verma', 'ananya.verma@example.test', 'Information Technology', '9000000002'],
    ['DEMO003', 'Rohan Mehta', 'rohan.mehta@example.test', 'Electronics', '9000000003'],
    ['DEMO004', 'Ishita Gupta', 'ishita.gupta@example.test', 'Computer Science', '9000000004'],
    ['DEMO005', 'Kabir Singh', 'kabir.singh@example.test', 'Mechanical', '9000000005'],
    ['DEMO006', 'Meera Nair', 'meera.nair@example.test', 'Information Technology', '9000000006'],
    ['DEMO007', 'Vivaan Kapoor', 'vivaan.kapoor@example.test', 'Civil', '9000000007'],
    ['DEMO008', 'Saanvi Rao', 'saanvi.rao@example.test', 'Computer Science', '9000000008'],
    ['DEMO009', 'Aditya Joshi', 'aditya.joshi@example.test', 'Electronics', '9000000009'],
    ['DEMO010', 'Diya Malhotra', 'diya.malhotra@example.test', 'Business Administration', '9000000010'],
    ['DEMO011', 'Arjun Khanna', 'arjun.khanna@example.test', 'Computer Science', '9000000011'],
    ['DEMO012', 'Aditi Bansal', 'aditi.bansal@example.test', 'Information Technology', '9000000012'],
    ['DEMO013', 'Reyansh Sood', 'reyansh.sood@example.test', 'Electronics', '9000000013'],
    ['DEMO014', 'Myra Iyer', 'myra.iyer@example.test', 'Mechanical', '9000000014'],
    ['DEMO015', 'Krish Malhotra', 'krish.malhotra@example.test', 'Civil', '9000000015'],
    ['DEMO016', 'Sara Khan', 'sara.khan@example.test', 'Computer Science', '9000000016'],
    ['DEMO017', 'Atharv Jain', 'atharv.jain@example.test', 'Information Technology', '9000000017'],
    ['DEMO018', 'Kiara Das', 'kiara.das@example.test', 'Electronics', '9000000018'],
    ['DEMO019', 'Dev Patel', 'dev.patel@example.test', 'Business Administration', '9000000019'],
    ['DEMO020', 'Navya Reddy', 'navya.reddy@example.test', 'Computer Science', '9000000020'],
    ['DEMO021', 'Ayaan Kapoor', 'ayaan.kapoor@example.test', 'Information Technology', '9000000021'],
    ['DEMO022', 'Tara Menon', 'tara.menon@example.test', 'Mechanical', '9000000022'],
    ['DEMO023', 'Ishaan Arora', 'ishaan.arora@example.test', 'Civil', '9000000023'],
    ['DEMO024', 'Riya Chawla', 'riya.chawla@example.test', 'Electronics', '9000000024'],
    ['DEMO025', 'Dhruv Sethi', 'dhruv.sethi@example.test', 'Computer Science', '9000000025'],
    ['DEMO026', 'Anika Bose', 'anika.bose@example.test', 'Information Technology', '9000000026'],
    ['DEMO027', 'Vihaan Gill', 'vihaan.gill@example.test', 'Business Administration', '9000000027'],
    ['DEMO028', 'Sia Thomas', 'sia.thomas@example.test', 'Mechanical', '9000000028'],
    ['DEMO029', 'Yuvaan Roy', 'yuvaan.roy@example.test', 'Civil', '9000000029'],
    ['DEMO030', 'Mira Fernandes', 'mira.fernandes@example.test', 'Electronics', '9000000030']
  ];
  const studentIds = [];
  for (const row of studentRows) {
    studentIds.push(await ensureRow(
      'students',
      ['student_id', 'name', 'email', 'department', 'phone', 'status'],
      [...row, 'active'],
      'student_id = ?',
      [row[0]]
    ));
  }

  const meals = [
    { type: 'breakfast', items: [['Poha', 'Breakfast', 35], ['Masala Tea', 'Beverages', 15]] },
    { type: 'lunch', items: [['Rajma Rice', 'Main Course', 75], ['Paneer Curry', 'Main Course', 90]] },
    { type: 'snacks', items: [['Veg Sandwich', 'Snacks', 45], ['Fresh Lime Water', 'Beverages', 25]] },
    { type: 'dinner', items: [['Dal Tadka', 'Main Course', 65], ['Jeera Rice', 'Main Course', 55]] }
  ];
  const lunchByDate = [];
  const itemsByDate = [];

  for (let offset = -13; offset <= 0; offset++) {
    const date = dateOffset(offset);
    for (const meal of meals) {
      const menuId = await ensureRow(
        'menus',
        ['menu_name', 'meal_type', 'menu_date', 'description'],
        [`Demo ${meal.type} menu ${date}`, meal.type, date, 'Sample data for cafeteria demonstration'],
        'menu_name = ? AND menu_date = ?',
        [`Demo ${meal.type} menu ${date}`, date]
      );
      const menuItems = [];
      for (const item of meal.items) {
        const itemId = await ensureRow(
          'menu_item',
          ['menu_id', 'item_name', 'category', 'price', 'is_available'],
          [menuId, item[0], item[1], item[2], 1],
          'menu_id = ? AND item_name = ?',
          [menuId, item[0]]
        );
        menuItems.push(itemId);
      }
      if (meal.type === 'lunch') {
        lunchByDate.push({ date, menuId, itemIds: menuItems });
        itemsByDate.push({ date, itemIds: menuItems });
      }
    }
  }

  for (let dayIndex = 0; dayIndex < lunchByDate.length; dayIndex++) {
    const day = lunchByDate[dayIndex];
    for (let studentIndex = 0; studentIndex < studentIds.length; studentIndex++) {
      const status = (studentIndex + dayIndex) % 5 === 0 ? 'absent' : 'present';
      await ensureRow(
        'attendance',
        ['student_id', 'menu_id', 'meal_type', 'attendance_date', 'status'],
        [studentIds[studentIndex], day.menuId, 'lunch', day.date, status],
        'student_id = ? AND menu_id = ? AND attendance_date = ?',
        [studentIds[studentIndex], day.menuId, day.date]
      );
    }
    for (let itemIndex = 0; itemIndex < day.itemIds.length; itemIndex++) {
      const itemId = day.itemIds[itemIndex];
      await ensureRow(
        'food_preparation',
        ['menu_item_id', 'preparation_date', 'quantity_prepared', 'quantity_unit', 'prepared_by'],
        [itemId, day.date, 85 + dayIndex * 3 + itemIndex * 12, 'portions', 'Demo Kitchen Team'],
        'menu_item_id = ? AND preparation_date = ?',
        [itemId, day.date]
      );
      await ensureRow(
        'food_waste',
        ['menu_item_id', 'waste_date', 'quantity', 'unit', 'reason', 'recorded_by'],
        [itemId, day.date, (1.2 + ((dayIndex + itemIndex) % 4) * 0.35).toFixed(2), 'kg', itemIndex === 0 ? 'Over-preparation' : 'Plate leftovers', 'Demo Kitchen Team'],
        'menu_item_id = ? AND waste_date = ? AND reason = ?',
        [itemId, day.date, itemIndex === 0 ? 'Over-preparation' : 'Plate leftovers']
      );
    }
  }

  const ingredientRows = [
    ['Rice', 48, 'kg', 20, 58],
    ['Wheat Flour', 32, 'kg', 15, 42],
    ['Paneer', 9, 'kg', 10, 320],
    ['Tomatoes', 14, 'kg', 8, 36],
    ['Onions', 18, 'kg', 10, 30],
    ['Potatoes', 24, 'kg', 12, 28],
    ['Cooking Oil', 11, 'litre', 8, 145],
    ['Milk', 16, 'litre', 10, 58],
    ['Tea Leaves', 4, 'kg', 2, 420],
    ['Lentils', 13, 'kg', 8, 115]
  ];
  const ingredientIds = {};
  for (const row of ingredientRows) {
    ingredientIds[row[0]] = await ensureRow(
      'ingredients',
      ['ingredient_name', 'quantity', 'unit', 'reorder_level', 'unit_price'],
      row,
      'ingredient_name = ?',
      [row[0]]
    );
  }

  const supplierRows = [
    ['Fresh Farms Wholesale', 'Neeraj Kumar', 'orders@freshfarms.example.test', '9000010001', 'Sector 18, Gurugram', 'active'],
    ['Daily Dairy Supply', 'Pooja Sethi', 'sales@dailydairy.example.test', '9000010002', 'Udyog Vihar, Gurugram', 'active'],
    ['Grain Basket Traders', 'Rakesh Arora', 'contact@grainbasket.example.test', '9000010003', 'Sadar Bazar, Gurugram', 'active'],
    ['Kitchen Essentials Co.', 'Simran Kaur', 'hello@kitchenessentials.example.test', '9000010004', 'IMT Manesar, Gurugram', 'active']
  ];
  for (const row of supplierRows) {
    await ensureRow(
      'suppliers',
      ['supplier_name', 'contact_person', 'email', 'phone', 'address', 'status'],
      row,
      'supplier_name = ?',
      [row[0]]
    );
  }

  const purchaseRows = [
    ['Rice', 'Grain Basket Traders', 25, 58, -6],
    ['Wheat Flour', 'Grain Basket Traders', 20, 42, -5],
    ['Paneer', 'Daily Dairy Supply', 8, 320, -4],
    ['Tomatoes', 'Fresh Farms Wholesale', 15, 36, -3],
    ['Onions', 'Fresh Farms Wholesale', 18, 30, -2],
    ['Cooking Oil', 'Kitchen Essentials Co.', 10, 145, -1]
  ];
  for (const row of purchaseRows) {
    const purchaseDate = dateOffset(row[4]);
    await ensureRow(
      'purchases',
      ['ingredient_id', 'supplier_name', 'quantity', 'unit_price', 'total_amount', 'purchase_date', 'status'],
      [ingredientIds[row[0]], row[1], row[2], row[3], Number((row[2] * row[3]).toFixed(2)), purchaseDate, 'completed'],
      'ingredient_id = ? AND supplier_name = ? AND purchase_date = ? AND quantity = ?',
      [ingredientIds[row[0]], row[1], purchaseDate, row[2]]
    );
  }

  console.log('Demo data ready: 30 students, 56 menus, 112 menu items, 420 attendance records, preparation, waste, 10 ingredients, 4 suppliers and 6 purchases.');
}

try {
  await seedDemoData();
} catch (error) {
  console.error('Demo data seeding failed:', error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
