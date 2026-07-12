import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, '..', 'wayz.db')

let db

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
  }
  return db
}

export function initDb() {
  const db = getDb()

  db.exec(`
    CREATE TABLE IF NOT EXISTS locations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      base INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS drivers (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      base TEXT NOT NULL,
      vehicle TEXT NOT NULL,
      car_number TEXT DEFAULT '',
      rating REAL DEFAULT 0,
      reviews INTEGER DEFAULT 0,
      avatar TEXT DEFAULT '',
      phone TEXT NOT NULL,
      experience TEXT DEFAULT '',
      FOREIGN KEY (base) REFERENCES locations(id)
    );

    CREATE TABLE IF NOT EXISTS driver_routes (
      driver_id INTEGER NOT NULL,
      location_id TEXT NOT NULL,
      PRIMARY KEY (driver_id, location_id),
      FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE,
      FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // Seed locations
  const locations = [
    ["ocean", "Ocean Super Center Hub (Ottarathiri)", 19.817165195371956, 96.15440628725972, 1],
    ["train-station", "Naypyidaw Central Railway Station", 19.85, 96.1961, 1],
    ["museum", "National Museum & Gems Commercial Area", 19.734, 96.1119, 1],
    ["airport", "Naypyidaw International Airport (NYT)", 19.6205, 96.1988, 1],
    ["thapyaykone", "Thabyegone Market Hub (Zabuthiri)", 19.7423, 96.1158, 1],
    ["university", "NSPU – Naypyitaw State Polytechnic University", 19.848515, 96.159470, 1],
    ["myoma", "Myoma Market", 19.739, 96.136, 1],
    ["junction", "Junction Supermarket", 19.7562, 96.0827, 1],
    ["hospital", "Naypyidaw General Hospital", 19.7126, 96.1017, 1],
    ["yau", "Yezin Agricultural University (YAU)", 19.8333, 96.2667, 0],
    ["forestry-uni", "University of Forestry & Environmental Science", 19.8375, 96.2642, 0],
    ["hypermarket", "Capital Hypermarket Naypyidaw", 19.7314, 96.0955, 0],
    ["pyinmana-market", "Pyinmana Central Market Zone", 19.7337, 96.2057, 0],
    ["parliament", "Parliament Complex (Hluttaw Building)", 19.761, 96.0792, 0],
    ["palace", "Presidential Palace Zone", 19.771, 96.103, 0],
    ["transport-ministry", "Ministry of Transport & Communications", 19.7891, 96.134, 0],
    ["education-ministry", "Ministry of Education (Office No. 13)", 19.7876, 96.1368, 0],
    ["foreign-ministry", "Ministry of Foreign Affairs", 19.8164, 96.1432, 0],
    ["pagoda", "Uppatasanti Pagoda", 19.7711, 96.183, 0],
    ["zoological-gardens", "Naypyidaw Zoological Gardens", 19.7825, 96.1350, 0],
    ["safari-park", "Naypyidaw Safari Park", 19.7685, 96.1320, 0],
    ["gems-museum", "Myanmar Gems Museum", 19.7340, 96.1119, 0],
    ["landmark-garden", "National Landmark Garden", 19.7580, 96.0970, 0],
    ["water-fountain-garden", "Water Fountain Garden", 19.7630, 96.1030, 0],
    ["parliament-viewpoint", "Parliament Building (Viewpoint)", 19.7610, 96.0792, 0],
    ["yan-aung-myin-pagoda", "Yan Aung Myin Pagoda", 19.7560, 96.1490, 0]
  ]

  const insertLoc = db.prepare("INSERT OR IGNORE INTO locations (id, name, lat, lng, base) VALUES (?, ?, ?, ?, ?)")
  for (const loc of locations) {
    insertLoc.run(...loc)
  }

  // Seed drivers (45)
  const drivers = [
    [1,"Ko Nyan Lin Aung","ocean","EV:Leapmotor T-03","NPW-HH/2278",4.7,181,"👨‍💼","+95 9954777496","8 years"],
    [2,"Ko Toe Wai","ocean","Toyota Probox","NPW-BB/1560",4.9,187,"🤵‍♂️","+95 9782220250","7 years"],
    [3,"Ko Htet Oo","ocean","Toyota Probox","MDY-6B/2895",4.7,104,"👨‍💼","+95 9266669650","6 years"],
    [4,"U Banyar Naing","ocean","Honda Insight","NPW-6P/5152",4.8,157,"🤵‍♂️","+95 9782220250","14 years"],
    [5,"Ko Htun Oo","train-station","Ceraus","YGN-5F/2086",5.0,154,"👨‍💼","+95 9266669650","11 years"],
    [6,"Pobba EV{pls, book early}","train-station","EV:Leapmotor T-03","NPW-HH/4828",4.6,219,"🤵‍♂️","+95 9442806400","12 years"],
    [7,"Ko Thura Aung","train-station","hiace(for multiple people)","YGN-6C/6816",4.9,110,"👨‍💼","+95 9782220250","4 years"],
    [8,"U Min Khant","train-station","light Truck(for multiple people)","YGN-8D/7677",4.9,205,"🤵‍♂️","+95 926669650","4 years"],
    [9,"U Lay Thein","museum","Avatar EV","MDY-HH/1519",4.5,150,"👨‍💼","+95 9683111302","7 years"],
    [10,"Ko Kyi Thein","museum","EV:Leapmotor T-03","YGN-HH/2926",4.9,103,"🤵‍♂️","+95 9898124856","13 years"],
    [11,"Ko Zaw Myo","museum","Honda Fit","NPW-9P/1146",4.7,115,"👨‍💼","+95 9880610774","3 years"],
    [12,"U Tin Oo","museum","Toyota Camry","MDY-9D/8906",4.6,206,"🤵‍♂️","+95 9768102138","7 years"],
    [13,"Ko Yan Naing","airport","Toyota Corolla","YGN-8F/5075",5.0,110,"👨‍💼","+95 9783419696","5 years"],
    [14,"U Tat Lu","airport","Suzuki Swift","MDY-6K/4979",4.9,151,"🤵‍♂️","+95 9682609307","7 years"],
    [15,"Ko Htut Khaung","airport","Avatar EV","YGN-HH/2774",4.9,184,"👨‍💼","+95 9665185474","7 years"],
    [16,"U Htun Kyaing","airport","Toyota Hiace","NPW-6P/7979",4.6,143,"🤵‍♂️","+95 9673977058","14 years"],
    [17,"U Nay Myo","thapyaykone","Honda Fit","NPW-7D/9086",4.9,92,"👨‍💼","+95 9441464646","4 years"],
    [18,"U Aye Naing Win","thapyaykone","Toyota Camry","",4.6,194,"🤵‍♂️","+95 9976499416","12 years"],
    [19,"Pyae Sone","thapyaykone","Toyota Corolla","",4.9,210,"👨‍💼","+95 9697130685","6 years"],
    [20,"Bhone Myint","thapyaykone","Suzuki Swift","",5.0,174,"🤵‍♂️","+95 9791181101","3 years"],
    [21,"Mg Mg","university","Avatar EV","",4.5,201,"👨‍💼","+95 966 555 021","3 years"],
    [22,"Kyi Kyi","university","Toyota Hiace","",4.6,197,"👩‍💼","+95 966 555 022","13 years"],
    [23,"Htet Aung","university","Honda Fit","",4.6,111,"👨‍💼","+95 966 555 023","7 years"],
    [24,"Phyo May","university","Toyota Camry","",4.7,139,"👩‍💼","+95 966 555 024","14 years"],
    [25,"Tun Tun","myoma","Toyota Corolla","",4.7,208,"👨‍💼","+95 966 555 025","13 years"],
    [26,"Yin Yin","myoma","Suzuki Swift","",4.7,151,"👩‍💼","+95 966 555 026","7 years"],
    [27,"Zayar Win","myoma","Avatar EV","",4.7,209,"👨‍💼","+95 966 555 027","9 years"],
    [28,"Nandar Hlaing","myoma","Toyota Hiace","",4.6,201,"👩‍💼","+95 966 555 028","10 years"],
    [29,"Thiha Soe","junction","Honda Fit","",4.9,136,"👨‍💼","+95 966 555 029","3 years"],
    [30,"Thaw Thaw","junction","Toyota Camry","",4.6,107,"👩‍💼","+95 966 555 030","13 years"],
    [31,"Ko Ko","junction","Toyota Corolla","",4.6,119,"👨‍💼","+95 966 555 031","5 years"],
    [32,"Wai Wai","junction","Suzuki Swift","",4.8,120,"👩‍💼","+95 966 555 032","12 years"],
    [33,"Kyaw Kyaw","hospital","Avatar EV","",4.6,135,"👨‍💼","+95 966 555 033","14 years"],
    [34,"Zin Zin","hospital","Toyota Hiace","",4.5,173,"👩‍💼","+95 966 555 034","5 years"],
    [35,"Aung Aung","hospital","Honda Fit","",4.8,151,"👨‍💼","+95 966 555 035","14 years"],
    [36,"Lae Lae","hospital","Toyota Camry","",5.0,174,"👩‍💼","+95 966 555 036","8 years"],
    [37,"Zayar Htet","ocean","OE Way","",4.8,137,"👨‍💼","+95 966 555 037","5 years"],
    [38,"Nilar Win","train-station","OE Way","",4.8,138,"👩‍💼","+95 966 555 038","6 years"],
    [39,"Aung Kyaw","museum","OE Way","",4.8,139,"👨‍💼","+95 966 555 039","7 years"],
    [40,"Sandar Oo","airport","OE Way","",4.8,140,"👩‍💼","+95 966 555 040","8 years"],
    [41,"Thet Naing","thapyaykone","OE Way","",4.8,141,"👨‍💼","+95 966 555 041","9 years"],
    [42,"Wut Yee","university","OE Way","",4.8,142,"👩‍💼","+95 966 555 042","10 years"],
    [43,"Kaung Sat","myoma","OE Way","",4.8,143,"👨‍💼","+95 966 555 043","11 years"],
    [44,"Ei Ei Phyo","junction","OE Way","",4.8,144,"👩‍💼","+95 966 555 044","12 years"],
    [45,"Myo Min","hospital","OE Way","",4.8,145,"👨‍💼","+95 966 555 045","13 years"]
  ]

  const insertDriver = db.prepare("INSERT OR IGNORE INTO drivers (id, name, base, vehicle, car_number, rating, reviews, avatar, phone, experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
  for (const d of drivers) {
    insertDriver.run(...d)
  }

  // Seed routes
  const routes = {
    1: ["airport","forestry-uni","hospital","pyinmana-market"],
    2: ["junction","train-station","foreign-ministry","yau","palace","hospital"],
    3: ["transport-ministry","yau","train-station","airport","palace","pyinmana-market"],
    4: ["university","education-ministry","junction","forestry-uni","transport-ministry","foreign-ministry"],
    5: ["foreign-ministry","forestry-uni","palace","pyinmana-market","education-ministry","transport-ministry"],
    6: ["museum","thapyaykone","education-ministry","foreign-ministry"],
    7: ["ocean","thapyaykone","myoma","palace","parliament"],
    8: ["pyinmana-market","education-ministry","university","museum","junction"],
    9: ["myoma","pagoda","train-station","airport","parliament"],
    10: ["palace","ocean","university","airport"],
    11: ["pyinmana-market","university","myoma","train-station","foreign-ministry"],
    12: ["train-station","hospital","airport","parliament"],
    13: ["transport-ministry","yau","education-ministry","foreign-ministry","university","myoma"],
    14: ["thapyaykone","palace","hypermarket","museum"],
    15: ["junction","thapyaykone","pagoda","foreign-ministry","palace"],
    16: ["thapyaykone","transport-ministry","forestry-uni","myoma","pagoda","museum"],
    17: ["education-ministry","airport","foreign-ministry","transport-ministry","hospital","parliament"],
    18: ["pagoda","airport","hypermarket","forestry-uni","train-station"],
    19: ["foreign-ministry","yau","train-station","myoma","forestry-uni","hospital"],
    20: ["museum","hypermarket","pyinmana-market","parliament","hospital"],
    21: ["ocean","transport-ministry","yau","parliament","airport","museum"],
    22: ["pagoda","hypermarket","museum","train-station","hospital","palace"],
    23: ["pyinmana-market","myoma","hospital","yau","train-station"],
    24: ["yau","palace","foreign-ministry","hospital"],
    25: ["thapyaykone","train-station","ocean","education-ministry","pagoda","airport"],
    26: ["hospital","pyinmana-market","ocean","palace","junction"],
    27: ["thapyaykone","yau","pagoda","airport","university"],
    28: ["yau","train-station","pyinmana-market","forestry-uni"],
    29: ["train-station","palace","museum","pyinmana-market","transport-ministry"],
    30: ["myoma","yau","pyinmana-market","pagoda","thapyaykone"],
    31: ["yau","parliament","museum","education-ministry","hospital","university"],
    32: ["thapyaykone","museum","parliament","forestry-uni","foreign-ministry","airport"],
    33: ["ocean","hypermarket","palace","parliament","transport-ministry"],
    34: ["foreign-ministry","airport","museum","transport-ministry","junction"],
    35: ["palace","foreign-ministry","forestry-uni","yau","museum"],
    36: ["ocean","education-ministry","pagoda","junction"]
  }

  const allLocIds = ["ocean","train-station","museum","airport","thapyaykone","university","myoma","junction","hospital","yau","forestry-uni","hypermarket","pyinmana-market","parliament","palace","transport-ministry","education-ministry","foreign-ministry","pagoda"]
  for (let i = 37; i <= 45; i++) {
    routes[i] = allLocIds
  }

  const insertRoute = db.prepare("INSERT OR IGNORE INTO driver_routes (driver_id, location_id) VALUES (?, ?)")
  for (const [driverId, locIds] of Object.entries(routes)) {
    for (const locId of locIds) {
      insertRoute.run(Number(driverId), locId)
    }
  }

  return { success: true, message: 'Database initialized with seed data' }
}
