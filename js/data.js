// Realistic Indian Names for Demo Data
const firstNames = ['Aarav', 'Vihaan', 'Aditya', 'Arjun', 'Sai', 'Rohan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Diya', 'Ananya', 'Sneha', 'Kavya', 'Isha', 'Riya', 'Aarohi', 'Neha', 'Pooja', 'Shruti', 'Rahul', 'Amit', 'Vikram', 'Sanjay', 'Rajesh', 'Suresh', 'Ramesh', 'Rakesh', 'Ravi', 'Manoj', 'Priya', 'Anjali', 'Kiran', 'Swati', 'Megha', 'Priyanka', 'Deepika', 'Kareena', 'Alia', 'Katrina'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Patel', 'Desai', 'Joshi', 'Chawla', 'Kapoor', 'Malhotra', 'Bhatia', 'Reddy', 'Rao', 'Nair', 'Pillai', 'Menon', 'Iyer', 'Mukherjee', 'Banerjee', 'Das', 'Sen', 'Bose', 'Dutta', 'Ghosh', 'Mishra', 'Tiwari', 'Pandey', 'Shukla', 'Yadav'];

const brands = ['Apple', 'Samsung', 'Vivo', 'Oppo', 'Xiaomi', 'OnePlus', 'Realme'];
const models = {
    'Apple': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14', 'iPhone 13'],
    'Samsung': ['Galaxy S24 Ultra', 'Galaxy S23', 'Galaxy A54', 'Galaxy M34', 'Galaxy Z Fold 5'],
    'Vivo': ['X100 Pro', 'V29', 'T2 Pro', 'Y200', 'X90'],
    'Oppo': ['Reno 11 Pro', 'Find N3 Flip', 'F23', 'A78', 'A58'],
    'Xiaomi': ['14 Ultra', 'Redmi Note 13 Pro', 'Redmi 12', 'Poco X6', 'Xiaomi 13 Pro'],
    'OnePlus': ['12', '12R', 'Nord CE 3', 'Nord 3', 'Open'],
    'Realme': ['12 Pro+', 'C67', 'Narzo 60', '11 Pro', 'GT Neo 3']
};

const issues = ['Display Broken', 'Battery Draining', 'Not Charging', 'Water Damage', 'Software Brick', 'Speaker Not Working', 'Mic Issue', 'Camera Blurry', 'Motherboard Dead'];
const statuses = ['Pending', 'Diagnosed', 'Waiting for Approval', 'Under Repair', 'Spare Parts Ordered', 'Completed', 'Delivered'];

// Generate Customers (100)
const customers = Array.from({ length: 100 }).map((_, i) => {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    return {
        id: `CUST${(i + 1).toString().padStart(4, '0')}`,
        name: `${fn} ${ln}`,
        mobile: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
        joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
        type: Math.random() > 0.8 ? 'High Value' : 'Regular'
    };
});

// Generate Technicians (5)
const technicians = [
    { id: 'TECH01', name: 'Ramesh Kumar', skill: 'Level 3 / Motherboard', jobsActive: 3, efficiency: '92%' },
    { id: 'TECH02', name: 'Sanjay Singh', skill: 'Level 2 / Hardware', jobsActive: 5, efficiency: '88%' },
    { id: 'TECH03', name: 'Vikram Patel', skill: 'Level 1 / Display & Battery', jobsActive: 2, efficiency: '95%' },
    { id: 'TECH04', name: 'Amit Sharma', skill: 'Software Specialist', jobsActive: 1, efficiency: '99%' },
    { id: 'TECH05', name: 'Rahul Verma', skill: 'Level 2 / Hardware', jobsActive: 4, efficiency: '85%' }
];

// Generate Vendors (15)
const vendors = Array.from({ length: 15 }).map((_, i) => ({
    id: `VEND${(i + 1).toString().padStart(3, '0')}`,
    name: `${lastNames[Math.floor(Math.random() * lastNames.length)]} Electronics`,
    contact: `+91 80000000${i.toString().padStart(2, '0')}`,
    gst: `27AAAC${Math.floor(Math.random() * 9999)}C1Z${Math.floor(Math.random() * 9)}`,
    category: i % 3 === 0 ? 'Spare Parts' : (i % 3 === 1 ? 'Accessories' : 'Smartphones'),
    pendingPayment: `₹${(Math.floor(Math.random() * 50000)).toLocaleString()}`
}));

// Generate Repair Jobs (50)
const repairJobs = Array.from({ length: 50 }).map((_, i) => {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[brand][Math.floor(Math.random() * models[brand].length)];
    return {
        id: `JOB${(2024000 + i)}`,
        customerName: customers[Math.floor(Math.random() * customers.length)].name,
        device: `${brand} ${model}`,
        issue: issues[Math.floor(Math.random() * issues.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        technician: technicians[Math.floor(Math.random() * technicians.length)].name,
        estimatedCost: `₹${(500 + Math.floor(Math.random() * 15000)).toLocaleString()}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 2592000000)).toISOString().split('T')[0] // last 30 days
    };
});

// Products for POS
const posProducts = [
    { id: 'P001', name: 'iPhone 15 Pro Max', category: 'Smartphones', price: 159900, stock: 12, img: 'smartphone' },
    { id: 'P002', name: 'Samsung S24 Ultra', category: 'Smartphones', price: 129999, stock: 8, img: 'smartphone' },
    { id: 'P003', name: 'OnePlus 12', category: 'Smartphones', price: 64999, stock: 15, img: 'smartphone' },
    { id: 'P004', name: 'Apple 20W Charger', category: 'Accessories', price: 1900, stock: 45, img: 'plug' },
    { id: 'P005', name: 'Samsung 25W Charger', category: 'Accessories', price: 1299, stock: 30, img: 'plug' },
    { id: 'P006', name: 'AirPods Pro 2', category: 'Accessories', price: 24900, stock: 10, img: 'headphones' },
    { id: 'P007', name: 'Premium Silicone Case', category: 'Cases', price: 999, stock: 100, img: 'smartphone' },
    { id: 'P008', name: '9H Tempered Glass', category: 'Screen Guards', price: 299, stock: 200, img: 'smartphone' }
];
