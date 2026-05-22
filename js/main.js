

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const themeToggle = document.getElementById('theme-toggle');
const viewContainer = document.getElementById('view-container');
const sidebarNav = document.getElementById('sidebar-nav');
const currentUserRole = document.getElementById('current-user-role');

// Auth Credentials Mapping
const credentials = {
    admin: { email: 'admin@mobileserp.com', pass: 'Admin@123', role: 'Administrator' },
    sales: { email: 'sales@mobileserp.com', pass: 'Sales@123', role: 'Sales Staff' },
    tech: { email: 'tech@mobileserp.com', pass: 'Tech@123', role: 'Technician' }
};

// Global Mock State Arrays
let invoicesList = Array.from({length: 10}).map((_, i) => ({
    id: `INV-2024-${1000 + i}`,
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    customer: customers[i % customers.length].name,
    amount: (1500 + i * 4500),
    tax: (1500 + i * 4500) * 0.18,
    status: i % 4 === 0 ? 'Unpaid' : 'Paid'
}));

let warrantiesList = Array.from({length: 10}).map((_, i) => {
    const brand = brands[i % brands.length];
    const model = models[brand][0];
    const daysRemaining = (i % 3 === 0) ? -Math.floor(Math.random() * 100) : Math.floor(Math.random() * 300);
    return {
        imei: `359124081${i}1234${i}`,
        customer: customers[i % customers.length].name,
        device: `${brand} ${model}`,
        expiryDate: new Date(Date.now() + daysRemaining * 86400000).toISOString().split('T')[0],
        status: daysRemaining > 0 ? 'Active' : 'Expired',
        daysRemaining: daysRemaining
    };
});

let sparesList = [
    { id: 'SP-DISP-IP15', name: 'iPhone 15 OLED Assembly', category: 'Displays', stock: 4, cost: 22000 },
    { id: 'SP-BATT-S23U', name: 'Galaxy S23 Ultra Li-Ion Battery', category: 'Batteries', stock: 12, cost: 3800 },
    { id: 'SP-PORT-OP11', name: 'OnePlus 11 USB Charging Port', category: 'Charging Ports', stock: 2, cost: 950 },
    { id: 'SP-CAM-IP14P', name: 'iPhone 14 Pro Camera Module', category: 'Cameras', stock: 0, cost: 14500 },
    { id: 'SP-BACK-V29', name: 'Vivo V29 Back Glass Cover Panel', category: 'Back Panels', stock: 18, cost: 1200 }
];

let complaintsList = [
    { id: 'TKT-9012', customer: 'Arjun Gupta', date: '2024-05-18', subject: 'Display screen showing green lines after replacement', priority: 'High', status: 'Open' },
    { id: 'TKT-8941', customer: 'Sneha Rao', date: '2024-05-15', subject: 'Refund requested for accessory order', priority: 'Medium', status: 'In Progress' },
    { id: 'TKT-8711', customer: 'Krishna Das', date: '2024-05-10', subject: 'Battery health showing 70% after new replacement', priority: 'High', status: 'Resolved' }
];

let staffList = [
    { name: 'Kiran Nair', role: 'Billing Operator', salary: 18000, status: 'Present' },
    { name: 'Ramesh Kumar', role: 'Senior Technician', salary: 35000, status: 'Present' },
    { name: 'Sanjay Singh', role: 'Technician', salary: 28000, status: 'Leave' },
    { name: 'Vikram Patel', role: 'Technician', salary: 25000, status: 'Present' }
];

let ledgerList = [
    { date: '2024-05-21', desc: 'Sold iPhone 15 Pro Max (Inv #1001)', category: 'Sales Inflow', income: 159900, expense: 0 },
    { date: '2024-05-21', desc: 'Display Screen Repair Display (Job #2024001)', category: 'Sales Inflow', income: 8500, expense: 0 },
    { date: '2024-05-20', desc: 'Office rent paid to building owner', category: 'Rent Expense', income: 0, expense: 15000 },
    { date: '2024-05-20', desc: 'Procured Apple batteries from Sharma Electronics', category: 'Spare Parts Procurement', income: 0, expense: 5000 }
];

// Modules Definition
const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: 'layout-dashboard' },
    { id: 'pos', name: 'POS Billing', icon: 'shopping-cart' },
    { id: 'crm', name: 'Customers & CRM', icon: 'users' },
    { id: 'jobs', name: 'Service Job Cards', icon: 'wrench' },
    { id: 'inventory', name: 'Inventory & Stock', icon: 'package' },
    { id: 'accessories', name: 'Accessories', icon: 'headphones' },
    { id: 'vendors', name: 'Vendors & Purchase', icon: 'truck' },
    { id: 'invoicing', name: 'GST Invoicing', icon: 'file-text' },
    { id: 'warranty', name: 'Warranty & AMC', icon: 'shield-check' },
    { id: 'technicians', name: 'Technicians', icon: 'user-cog' },
    { id: 'spares', name: 'Spare Parts', icon: 'cpu' },
    { id: 'complaints', name: 'Complaints', icon: 'alert-circle' },
    { id: 'notifications', name: 'SMS / WhatsApp', icon: 'message-square' },
    { id: 'hr', name: 'Staff & Payroll', icon: 'users' },
    { id: 'sales-tracker', name: 'Daily Sales & Exp.', icon: 'indian-rupee' },
    { id: 'pnl', name: 'Profit & Loss', icon: 'trending-up' },
    { id: 'reports', name: 'Reports', icon: 'bar-chart-2' }
];

let activeModule = 'dashboard';

// POS Cart State
let cart = [
    { name: 'iPhone 15 Pro Max', price: 159900, qty: 1, type: 'Smartphones', subtitle: 'IMEI: 359124081212345XXX' },
    { name: 'Apple 20W Charger', price: 1900, qty: 2, type: 'Accessories', subtitle: 'Accessories' }
];

window.updateCartUI = () => {
    const cartContainer = document.getElementById('cart-container');
    const summaryContainer = document.getElementById('cart-summary-container');
    if (!cartContainer || !summaryContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; color: var(--text-muted);">
                <i data-lucide="shopping-bag" style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Cart is empty</p>
            </div>
        `;
        summaryContainer.innerHTML = `
            <div class="summary-row"><span>Subtotal</span><span>₹0.00</span></div>
            <div class="summary-row"><span>Discount</span><span>-₹0.00</span></div>
            <div class="summary-row"><span>CGST (9%)</span><span>₹0.00</span></div>
            <div class="summary-row"><span>SGST (9%)</span><span>₹0.00</span></div>
            <div class="summary-row total"><span>Total</span><span class="text-primary">₹0.00</span></div>
        `;
        lucide.createIcons();
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info" style="flex: 1;">
                <h4 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 2px;">${item.name}</h4>
                <p style="font-size: 0.75rem; color: var(--text-muted);">${item.subtitle || item.type}</p>
            </div>
            <div class="cart-item-qty" style="display: flex; align-items: center; gap: 0.5rem; margin: 0 1rem;">
                <button class="qty-btn" onclick="window.updateQty(${index}, -1)" style="width:24px; height:24px; border-radius:50%; background:var(--bg-main); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center;"><i data-lucide="minus" style="width:12px; height:12px;"></i></button>
                <span style="font-weight: 600; width: 20px; text-align: center; font-size: 0.875rem;">${item.qty}</span>
                <button class="qty-btn" onclick="window.updateQty(${index}, 1)" style="width:24px; height:24px; border-radius:50%; background:var(--bg-main); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center;"><i data-lucide="plus" style="width:12px; height:12px;"></i></button>
            </div>
            <div style="font-weight: 600; font-size: 0.875rem; margin-right: 1rem; min-width: 80px; text-align: right;">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
            <button class="btn-icon-table text-danger" style="border:none; background:none; cursor:pointer;" onclick="window.removeFromCart(${index})"><i data-lucide="trash-2" style="width:16px; height:16px;"></i></button>
        </div>
    `).join('');

    // Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = subtotal > 10000 ? 2000 : 0; // Flat discount
    const taxableAmount = Math.max(0, subtotal - discount);
    const cgst = taxableAmount * 0.09;
    const sgst = taxableAmount * 0.09;
    const total = taxableAmount + cgst + sgst;

    summaryContainer.innerHTML = `
        <div class="summary-row" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem;">
            <span>Subtotal</span>
            <span>₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div class="summary-row" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem;">
            <span>Discount</span>
            <span class="text-success">-₹${discount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div class="summary-row" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem;">
            <span>CGST (9%)</span>
            <span>₹${cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div class="summary-row" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.875rem;">
            <span>SGST (9%)</span>
            <span>₹${sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div class="summary-row total" style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; border-top: 1px dashed var(--border-color); padding-top: 1rem; margin-top: 0.5rem;">
            <span>Total</span>
            <span class="text-primary">₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
    `;
    lucide.createIcons();
};

window.updateQty = (index, change) => {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    window.updateCartUI();
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    window.updateCartUI();
};

window.addToCart = (name, price) => {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        const isPhone = name.includes('iPhone') || name.includes('Galaxy') || name.includes('OnePlus');
        cart.push({
            name: name,
            price: price,
            qty: 1,
            type: isPhone ? 'Smartphones' : 'Accessories',
            subtitle: isPhone ? 'IMEI: 3591240812' + Math.floor(10000 + Math.random() * 90000) + 'XXX' : 'Accessories'
        });
    }
    window.updateCartUI();
    window.showToast(`Added ${name} to bill`);
};


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    setupAuth();
    setupLayout();
    renderSidebar();
    
    // Bypass login for demo by immediately rendering dashboard
    setTimeout(() => {
        if(document.getElementById('app-screen').style.display !== 'none') {
            renderModule('dashboard');
        }
    }, 100);
});

// Global Modal System
window.openModal = (title, formType = 'generic') => {
    const modalsContainer = document.getElementById('modals-container');
    
    let bodyContent = '';
    if (formType === 'customer') {
        bodyContent = `
            <div class="form-row">
                <div class="form-group"><label>Full Name</label><input type="text" class="form-control" placeholder="John Doe"></div>
                <div class="form-group"><label>Mobile Number</label><input type="text" class="form-control" placeholder="+91 9000000000"></div>
            </div>
            <div class="form-group" style="margin-top: 1rem;"><label>Email Address</label><input type="email" class="form-control" placeholder="john@example.com"></div>
            <div class="form-group" style="margin-top: 1rem;"><label>Customer Type</label>
                <select class="form-control"><option>Regular</option><option>High Value</option></select>
            </div>
        `;
    } else if (formType === 'job') {
        bodyContent = `
            <div class="form-row">
                <div class="form-group"><label>Customer Name</label><input type="text" class="form-control" placeholder="Search Customer..."></div>
                <div class="form-group"><label>Device Model</label><input type="text" class="form-control" placeholder="e.g. iPhone 13"></div>
            </div>
            <div class="form-group" style="margin-top: 1rem;"><label>Problem Description</label><textarea class="form-control" rows="3" placeholder="Describe the issue..."></textarea></div>
            <div class="form-row" style="margin-top: 1rem;">
                <div class="form-group"><label>Assign Technician</label><select class="form-control"><option>Unassigned</option><option>Ramesh Kumar</option></select></div>
                <div class="form-group"><label>Estimated Cost (₹)</label><input type="number" class="form-control" placeholder="0"></div>
            </div>
        `;
    } else if (formType === 'vendor') {
        bodyContent = `
            <div class="form-row">
                <div class="form-group"><label>Vendor Name</label><input type="text" id="vend-name" class="form-control" placeholder="e.g. Acme Accessories"></div>
                <div class="form-group"><label>Contact Number</label><input type="text" id="vend-contact" class="form-control" placeholder="+91 9800000000"></div>
            </div>
            <div class="form-group" style="margin-top: 1rem;"><label>GSTIN</label><input type="text" id="vend-gst" class="form-control" placeholder="e.g. 27AAACM1234C1Z9"></div>
            <div class="form-row" style="margin-top: 1rem;">
                <div class="form-group"><label>Category</label>
                    <select id="vend-cat" class="form-control">
                        <option>Spare Parts</option>
                        <option>Accessories</option>
                        <option>Smartphones</option>
                    </select>
                </div>
                <div class="form-group"><label>Outstanding Balance (₹)</label><input type="number" id="vend-bal" class="form-control" placeholder="0"></div>
            </div>
        `;
    } else if (formType === 'warranty') {
        bodyContent = `
            <div class="form-row">
                <div class="form-group"><label>Customer Name</label><input type="text" id="warr-cust" class="form-control" placeholder="Search Customer..."></div>
                <div class="form-group"><label>Device Model</label><input type="text" id="warr-device" class="form-control" placeholder="e.g. Samsung S23"></div>
            </div>
            <div class="form-group" style="margin-top: 1rem;"><label>IMEI Number</label><input type="text" id="warr-imei" class="form-control" placeholder="15 Digit IMEI Code"></div>
            <div class="form-row" style="margin-top: 1rem;">
                <div class="form-group"><label>Warranty Type</label>
                    <select id="warr-type" class="form-control">
                        <option>Brand Warranty</option>
                        <option>AMC Extension</option>
                        <option>In-House Care</option>
                    </select>
                </div>
                <div class="form-group"><label>Expiry Date</label><input type="date" id="warr-date" class="form-control"></div>
            </div>
        `;
    } else if (formType === 'technician') {
        bodyContent = `
            <div class="form-group"><label>Technician Name</label><input type="text" id="tech-name" class="form-control" placeholder="e.g. Ramesh Kumar"></div>
            <div class="form-group" style="margin-top: 1rem;"><label>Specialty Skill</label>
                <select id="tech-skill" class="form-control">
                    <option>Level 3 / Motherboard Repair</option>
                    <option>Level 2 / Hardware Specialty</option>
                    <option>Level 1 / Display & Battery Swap</option>
                    <option>Software Flash Specialist</option>
                </select>
            </div>
            <div class="form-group" style="margin-top: 1rem;"><label>Monthly Salary (₹)</label><input type="number" id="tech-sal" class="form-control" placeholder="25000"></div>
        `;
    } else if (formType === 'spare') {
        bodyContent = `
            <div class="form-group"><label>Part Description</label><input type="text" id="spare-name" class="form-control" placeholder="e.g. iPhone 15 Charging Flex"></div>
            <div class="form-row" style="margin-top: 1rem;">
                <div class="form-group"><label>Category</label>
                    <select id="spare-cat" class="form-control">
                        <option>Displays</option>
                        <option>Batteries</option>
                        <option>Charging Ports</option>
                        <option>Cameras</option>
                        <option>Back Panels</option>
                    </select>
                </div>
                <div class="form-group"><label>Unit Cost (₹)</label><input type="number" id="spare-cost" class="form-control" placeholder="0"></div>
            </div>
            <div class="form-group" style="margin-top: 1rem;"><label>Initial Stock Qty</label><input type="number" id="spare-stock" class="form-control" placeholder="10"></div>
        `;
    } else if (formType === 'complaint') {
        bodyContent = `
            <div class="form-group"><label>Customer Name</label><input type="text" id="comp-cust" class="form-control" placeholder="Enter Customer Name"></div>
            <div class="form-group" style="margin-top: 1rem;"><label>Complaint Details / Subject</label><textarea id="comp-sub" class="form-control" rows="2" placeholder="e.g. Display screen flickering after touch repair"></textarea></div>
            <div class="form-group" style="margin-top: 1rem;"><label>Priority Status</label>
                <select id="comp-pri" class="form-control">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
            </div>
        `;
    } else if (formType === 'staff') {
        bodyContent = `
            <div class="form-group"><label>Staff Full Name</label><input type="text" id="staff-name" class="form-control" placeholder="e.g. Pooja Sharma"></div>
            <div class="form-group" style="margin-top: 1rem;"><label>Role Designation</label>
                <select id="staff-role" class="form-control">
                    <option>Senior Technician</option>
                    <option>Technician</option>
                    <option>Billing Operator</option>
                    <option>Support Staff</option>
                </select>
            </div>
            <div class="form-group" style="margin-top: 1rem;"><label>Monthly Salary (₹)</label><input type="number" id="staff-sal" class="form-control" placeholder="18000"></div>
        `;
    } else if (formType === 'ledger') {
        bodyContent = `
            <div class="form-group"><label>Transaction Title</label><input type="text" id="led-desc" class="form-control" placeholder="e.g. Office Rent May 2024"></div>
            <div class="form-group" style="margin-top: 1rem;"><label>Transaction Category</label>
                <select id="led-cat" class="form-control" onchange="window.adjustLedgerType(this.value)">
                    <option value="Rent Expense">Rent Expense</option>
                    <option value="Spare Parts Procurement">Spare Parts Procurement</option>
                    <option value="Salary Expense">Salary Expense</option>
                    <option value="Utility Bills">Utility Bills</option>
                    <option value="Miscellaneous Expense">Miscellaneous Expense</option>
                    <option value="Sales Inflow">Sales Inflow (Cash In)</option>
                </select>
            </div>
            <div class="form-row" style="margin-top: 1rem;">
                <div class="form-group"><label>Transaction Type</label>
                    <select id="led-type" class="form-control">
                        <option value="expense">Expense (Cash Out)</option>
                        <option value="income">Income (Cash In)</option>
                    </select>
                </div>
                <div class="form-group"><label>Amount (₹)</label><input type="number" id="led-amt" class="form-control" placeholder="0"></div>
            </div>
        `;
    } else {
        bodyContent = `
            <div class="form-group"><label>Name / Title</label><input type="text" class="form-control" placeholder="Enter value"></div>
            <div class="form-group" style="margin-top: 1rem;"><label>Details</label><textarea class="form-control" rows="3"></textarea></div>
        `;
    }

    const html = `
        <div class="modal-overlay active" id="current-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-modal" onclick="closeModal()"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    ${bodyContent}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                    <button class="btn-primary" onclick="window.submitCustomForm('${formType}')"><i data-lucide="save"></i> Save Changes</button>
                </div>
            </div>
        </div>
    `;
    modalsContainer.innerHTML = html;
    lucide.createIcons();
};

window.closeModal = (saved = false) => {
    const modalsContainer = document.getElementById('modals-container');
    modalsContainer.innerHTML = '';
    if (saved) {
        window.showToast('Successfully saved!');
    }
};

window.adjustLedgerType = (cat) => {
    const typeSelect = document.getElementById('led-type');
    if (typeSelect) {
        if (cat === 'Sales Inflow') {
            typeSelect.value = 'income';
        } else {
            typeSelect.value = 'expense';
        }
    }
};

window.submitCustomForm = (formType) => {
    if (formType === 'customer') {
        const name = document.querySelector('#current-modal input[placeholder="John Doe"]').value;
        const mobile = document.querySelector('#current-modal input[placeholder="+91 9000000000"]').value;
        const email = document.querySelector('#current-modal input[placeholder="john@example.com"]').value;
        const type = document.querySelector('#current-modal select').value;
        if (!name) { alert('Name is required'); return; }
        customers.unshift({
            id: `CUST${(customers.length + 1).toString().padStart(4, '0')}`,
            name, mobile, email,
            joinDate: new Date().toISOString().split('T')[0],
            type
        });
        window.showToast(`Customer ${name} added!`);
        window.closeModal();
        if (activeModule === 'crm') renderCRM();
    } 
    else if (formType === 'job') {
        const customerName = document.querySelector('#current-modal input[placeholder="Search Customer..."]').value;
        const device = document.querySelector('#current-modal input[placeholder="e.g. iPhone 13"]').value;
        const issue = document.querySelector('#current-modal textarea').value;
        const technician = document.querySelector('#current-modal select').value;
        const estimatedCost = '₹' + (document.querySelector('#current-modal input[placeholder="0"]').value || '0');
        if (!customerName || !device) { alert('Customer Name and Device Model are required'); return; }
        repairJobs.unshift({
            id: `JOB${(2024000 + repairJobs.length + 1)}`,
            customerName, device, issue, status: 'Pending', technician, estimatedCost,
            date: new Date().toISOString().split('T')[0]
        });
        window.showToast(`Job Card for ${device} created!`);
        window.closeModal();
        if (activeModule === 'jobs') renderJobs();
    }
    else if (formType === 'vendor') {
        const name = document.getElementById('vend-name').value;
        const contact = document.getElementById('vend-contact').value;
        const gst = document.getElementById('vend-gst').value;
        const category = document.getElementById('vend-cat').value;
        const bal = parseFloat(document.getElementById('vend-bal').value) || 0;
        if (!name) { alert('Vendor name is required'); return; }
        vendors.unshift({
            id: `VEND${(vendors.length + 1).toString().padStart(3, '0')}`,
            name, contact, gst, category, pendingPayment: '₹' + bal.toLocaleString()
        });
        window.showToast(`Vendor ${name} registered!`);
        window.closeModal();
        if (activeModule === 'vendors') renderVendors();
    }
    else if (formType === 'warranty') {
        const customerName = document.getElementById('warr-cust').value;
        const device = document.getElementById('warr-device').value;
        const imei = document.getElementById('warr-imei').value;
        const type = document.getElementById('warr-type').value;
        const expiryDate = document.getElementById('warr-date').value || new Date().toISOString().split('T')[0];
        if (!customerName || !imei) { alert('Customer Name and IMEI are required'); return; }
        warrantiesList.unshift({
            imei, customer: customerName, device, expiryDate,
            status: new Date(expiryDate) > new Date() ? 'Active' : 'Expired',
            daysRemaining: Math.ceil((new Date(expiryDate) - new Date()) / 86400000)
        });
        window.showToast(`Warranty claim logged!`);
        window.closeModal();
        if (activeModule === 'warranty') renderWarranty();
    }
    else if (formType === 'technician') {
        const name = document.getElementById('tech-name').value;
        const skill = document.getElementById('tech-skill').value;
        const sal = parseFloat(document.getElementById('tech-sal').value) || 25000;
        if (!name) { alert('Technician name is required'); return; }
        technicians.push({
            id: `TECH0${technicians.length + 1}`,
            name, skill, jobsActive: 0, efficiency: '100%'
        });
        window.showToast(`Technician ${name} registered!`);
        window.closeModal();
        if (activeModule === 'technicians') renderTechnicians();
    }
    else if (formType === 'spare') {
        const name = document.getElementById('spare-name').value;
        const category = document.getElementById('spare-cat').value;
        const cost = parseFloat(document.getElementById('spare-cost').value) || 0;
        const stock = parseInt(document.getElementById('spare-stock').value) || 0;
        if (!name) { alert('Part Description is required'); return; }
        sparesList.unshift({
            id: `SP-${category.toUpperCase().slice(0,4)}-${Math.floor(100+Math.random()*900)}`,
            name, category, stock, cost
        });
        window.showToast(`Spare Part ${name} added!`);
        window.closeModal();
        if (activeModule === 'spares') renderSpares();
    }
    else if (formType === 'complaint') {
        const customer = document.getElementById('comp-cust').value;
        const subject = document.getElementById('comp-sub').value;
        const priority = document.getElementById('comp-pri').value;
        if (!customer) { alert('Customer Name is required'); return; }
        complaintsList.unshift({
            id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
            customer, subject, date: new Date().toISOString().split('T')[0],
            priority, status: 'Open'
        });
        window.showToast(`Complaint logged under ${customer}!`);
        window.closeModal();
        if (activeModule === 'complaints') renderComplaints();
    }
    else if (formType === 'staff') {
        const name = document.getElementById('staff-name').value;
        const role = document.getElementById('staff-role').value;
        const salary = parseFloat(document.getElementById('staff-sal').value) || 15000;
        if (!name) { alert('Staff Name is required'); return; }
        staffList.unshift({
            name, role, salary: '₹' + salary.toLocaleString(), status: 'Present'
        });
        window.showToast(`Staff ${name} registered!`);
        window.closeModal();
        if (activeModule === 'hr') renderHR();
    }
    else if (formType === 'ledger') {
        const desc = document.getElementById('led-desc').value;
        const category = document.getElementById('led-cat').value;
        const type = document.getElementById('led-type').value;
        const amt = parseFloat(document.getElementById('led-amt').value) || 0;
        if (!desc) { alert('Transaction Title is required'); return; }
        ledgerList.unshift({
            date: new Date().toISOString().split('T')[0],
            desc, category,
            income: type === 'income' ? amt : 0,
            expense: type === 'expense' ? amt : 0
        });
        window.showToast(`Ledger Entry logged!`);
        window.closeModal();
        if (activeModule === 'sales-tracker') renderSalesTracker();
    }
    else {
        window.closeModal(true);
    }
};

window.openStatusModal = (jobId) => {
    const job = repairJobs.find(j => j.id === jobId);
    if (!job) return;

    const statuses = ['Pending', 'Diagnosed', 'Waiting for Approval', 'Under Repair', 'Spare Parts Ordered', 'Completed', 'Delivered'];
    
    const optionsHtml = statuses.map(status => `
        <option value="${status}" ${job.status === status ? 'selected' : ''}>${status}</option>
    `).join('');

    const bodyContent = `
        <div class="form-group">
            <label style="font-weight: 500; margin-bottom: 0.25rem; display: block;">Device Details</label>
            <input type="text" class="form-control" value="${job.device}" disabled style="opacity: 0.7;">
        </div>
        <div class="form-group" style="margin-top: 1rem;">
            <label style="font-weight: 500; margin-bottom: 0.25rem; display: block;">Customer Name</label>
            <input type="text" class="form-control" value="${job.customerName}" disabled style="opacity: 0.7;">
        </div>
        <div class="form-group" style="margin-top: 1rem;">
            <label style="font-weight: 500; margin-bottom: 0.25rem; display: block;">Select New Status</label>
            <select id="new-status-select-${jobId}" class="form-control">
                ${optionsHtml}
            </select>
        </div>
    `;

    const modalsContainer = document.getElementById('modals-container');
    const html = `
        <div class="modal-overlay active" id="current-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Update Status for ${jobId}</h3>
                    <button class="close-modal" onclick="closeModal()"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    ${bodyContent}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                    <button class="btn-primary" onclick="window.saveJobStatus('${jobId}')"><i data-lucide="save"></i> Update Status</button>
                </div>
            </div>
        </div>
    `;
    modalsContainer.innerHTML = html;
    lucide.createIcons();
};

window.saveJobStatus = (jobId) => {
    const select = document.getElementById(`new-status-select-${jobId}`);
    if (select) {
        const newStatus = select.value;
        const job = repairJobs.find(j => j.id === jobId);
        if (job) {
            job.status = newStatus;
            window.closeModal();
            window.showToast(`Job ${jobId} status updated to ${newStatus}`);
            
            // Re-render based on current view
            if (activeModule === 'jobs') {
                renderJobs();
            } else if (activeModule === 'dashboard') {
                renderDashboard();
            }
        }
    }
};

window.showToast = (msg) => {
    const toast = document.createElement('div');
    toast.className = 'glass-card animate-in';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    toast.style.padding = '1rem';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '0.5rem';
    toast.innerHTML = `<i data-lucide="check-circle" class="text-success"></i> <span>${msg}</span>`;
    document.body.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => toast.remove(), 3000);
};

// Dom loaded utilities

function setupAuth() {
    // Demo credentials autofill
    document.querySelectorAll('.btn-cred').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const role = e.target.dataset.role;
            emailInput.value = credentials[role].email;
            passwordInput.value = credentials[role].pass;
            currentUserRole.textContent = credentials[role].role;
            
            // Highlight animation
            emailInput.style.borderColor = 'var(--success)';
            passwordInput.style.borderColor = 'var(--success)';
            setTimeout(() => {
                emailInput.style.borderColor = '';
                passwordInput.style.borderColor = '';
            }, 500);
        });
    });

    // Login Form Submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add loading state to button
        const btn = loginForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i data-lucide="loader-2" class="animate-spin"></i> Authenticating...`;
        lucide.createIcons();
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            appScreen.style.display = 'flex';
            renderModule('dashboard');
        }, 800);
    });

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            appScreen.style.display = 'none';
            loginScreen.style.display = 'flex';
            emailInput.value = '';
            passwordInput.value = '';
        });
    }
}

function setupLayout() {
    // Sidebar toggle
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        if(window.innerWidth <= 768) {
            sidebar.classList.toggle('mobile-open');
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = `<i data-lucide="${newTheme === 'dark' ? 'sun' : 'moon'}"></i>`;
        lucide.createIcons();
        
        // Re-render charts for theme
        if (activeModule === 'dashboard') {
            setTimeout(() => renderDashboardCharts(newTheme), 100);
        }
    });
}

function renderSidebar() {
    sidebarNav.innerHTML = '';
    modules.forEach(mod => {
        const a = document.createElement('a');
        a.className = `nav-item ${activeModule === mod.id ? 'active' : ''}`;
        a.innerHTML = `<i data-lucide="${mod.icon}"></i><span>${mod.name}</span>`;
        a.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            a.classList.add('active');
            activeModule = mod.id;
            renderModule(mod.id);
            if(window.innerWidth <= 768) sidebar.classList.remove('mobile-open');
        });
        sidebarNav.appendChild(a);
    });
    lucide.createIcons();
}

function renderModule(id) {
    viewContainer.innerHTML = '';
    viewContainer.style.padding = '2rem'; // Restore padding by default
    viewContainer.className = 'view-container animate-in';
    
    // Quick re-trigger animation
    viewContainer.style.animation = 'none';
    viewContainer.offsetHeight; /* trigger reflow */
    viewContainer.style.animation = null; 

    switch(id) {
        case 'dashboard': renderDashboard(); break;
        case 'crm': renderCRM(); break;
        case 'pos': renderPOS(); break;
        case 'jobs': renderJobs(); break;
        case 'inventory': renderInventory(); break;
        case 'accessories': renderAccessories(); break;
        case 'vendors': renderVendors(); break;
        case 'invoicing': renderInvoicing(); break;
        case 'warranty': renderWarranty(); break;
        case 'technicians': renderTechnicians(); break;
        case 'spares': renderSpares(); break;
        case 'complaints': renderComplaints(); break;
        case 'notifications': renderNotifications(); break;
        case 'hr': renderHR(); break;
        case 'sales-tracker': renderSalesTracker(); break;
        case 'pnl': renderPNL(); break;
        case 'reports': renderReports(); break;
        default: renderEmptyState(id); break;
    }
    lucide.createIcons();
}

function renderDashboard() {
    const html = `
        <div class="dashboard-header">
            <div>
                <h1>Business Overview</h1>
                <p class="text-muted">Welcome back! Here's what's happening today.</p>
            </div>
            <div class="date-range-picker">
                <i data-lucide="calendar"></i>
                <span>Today: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <i data-lucide="chevron-down"></i>
            </div>
        </div>

        <div class="kpi-grid">
            <div class="glass-card kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Total Sales Today</span>
                    <div class="kpi-icon primary"><i data-lucide="indian-rupee"></i></div>
                </div>
                <div class="kpi-value">₹84,500</div>
                <div class="kpi-trend up"><i data-lucide="trending-up"></i> +12.5% from yesterday</div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Pending Jobs</span>
                    <div class="kpi-icon warning"><i data-lucide="wrench"></i></div>
                </div>
                <div class="kpi-value">24</div>
                <div class="kpi-trend down"><i data-lucide="trending-down"></i> -3 from yesterday</div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Completed Repairs</span>
                    <div class="kpi-icon success"><i data-lucide="check-circle"></i></div>
                </div>
                <div class="kpi-value">12</div>
                <div class="kpi-trend up"><i data-lucide="trending-up"></i> +4 from yesterday</div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-header">
                    <span class="kpi-title">Low Stock Alerts</span>
                    <div class="kpi-icon danger"><i data-lucide="alert-triangle"></i></div>
                </div>
                <div class="kpi-value">8 Items</div>
                <div class="kpi-trend danger text-danger"><i data-lucide="alert-circle"></i> Needs attention</div>
            </div>
        </div>

        <div class="charts-grid">
            <div class="glass-card chart-card">
                <div class="chart-header">
                    <h3>Revenue Trend (Last 7 Days)</h3>
                    <button class="btn-icon-subtle"><i data-lucide="more-horizontal"></i></button>
                </div>
                <div class="chart-container">
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>
            <div class="glass-card chart-card">
                <div class="chart-header">
                    <h3>Sales by Category</h3>
                </div>
                <div class="chart-container">
                    <canvas id="categoryChart"></canvas>
                </div>
            </div>
        </div>

        <div class="glass-card table-container">
            <div class="chart-header">
                <h3>Recent Repair Jobs</h3>
                <button class="btn-secondary btn-sm" onclick="renderModule('jobs')">View All</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Job ID</th>
                        <th>Customer</th>
                        <th>Device</th>
                        <th>Status</th>
                        <th>Est. Cost</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${repairJobs.slice(0, 5).map(job => `
                        <tr>
                            <td><strong>${job.id}</strong></td>
                            <td>${job.customerName}</td>
                            <td>${job.device}</td>
                            <td><span class="status-badge ${getStatusColor(job.status)}">${job.status}</span></td>
                            <td>${job.estimatedCost}</td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn-icon-table"><i data-lucide="eye"></i></button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    viewContainer.innerHTML = html;
    
    // Initialize Charts after a tiny delay to ensure DOM is ready
    setTimeout(() => renderDashboardCharts(document.documentElement.getAttribute('data-theme')), 50);
}

function getStatusColor(status) {
    if(status === 'Completed' || status === 'Delivered') return 'success';
    if(status === 'Pending' || status === 'Waiting for Approval') return 'warning';
    if(status === 'Under Repair' || status === 'Diagnosed') return 'info';
    return 'primary';
}

let chartInstances = [];

function renderDashboardCharts(theme) {
    // Destroy previous charts if they exist
    chartInstances.forEach(c => c.destroy());
    chartInstances = [];

    const isDark = theme === 'dark';
    const textColor = isDark ? '#94A3B8' : '#6B7280';
    const gridColor = isDark ? '#334155' : '#E5E7EB';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = 'Inter';

    const ctxRev = document.getElementById('revenueChart');
    if (ctxRev) {
        chartInstances.push(new Chart(ctxRev, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Revenue (₹)',
                    data: [45000, 52000, 38000, 65000, 48000, 84500, 72000],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#4F46E5'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false, drawBorder: false } },
                    y: { grid: { color: gridColor, drawBorder: false } }
                }
            }
        }));
    }

    const ctxCat = document.getElementById('categoryChart');
    if (ctxCat) {
        chartInstances.push(new Chart(ctxCat, {
            type: 'doughnut',
            data: {
                labels: ['Smartphones', 'Accessories', 'Repairs', 'Spare Parts'],
                datasets: [{
                    data: [55, 20, 15, 10],
                    backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#3B82F6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
                }
            }
        }));
    }
}

function renderCRM() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Customer Management (CRM)</h1>
            <div class="view-actions">
                <button class="btn-secondary" onclick="window.showToast('Exporting data...')"><i data-lucide="download"></i> Export</button>
                <button class="btn-primary" onclick="window.openModal('Add New Customer', 'customer')"><i data-lucide="plus"></i> Add Customer</button>
            </div>
        </div>
        
        <div class="glass-card">
            <div class="filter-bar">
                <input type="text" class="form-control" style="max-width: 300px" placeholder="Search by name, mobile, email...">
                <select class="filter-select">
                    <option>All Types</option>
                    <option>High Value</option>
                    <option>Regular</option>
                </select>
                <select class="filter-select">
                    <option>Status: All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Join Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${customers.slice(0, 15).map(c => `
                            <tr>
                                <td><strong>${c.id}</strong></td>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 0.5rem">
                                        <div class="avatar-small" style="background: var(--primary-light); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold">${c.name.charAt(0)}</div>
                                        ${c.name}
                                    </div>
                                </td>
                                <td>${c.mobile}</td>
                                <td>${c.email}</td>
                                <td><span class="status-badge ${c.type === 'High Value' ? 'success' : 'primary'}">${c.type}</span></td>
                                <td>${c.joinDate}</td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn-icon-table" title="View" onclick="window.openModal('View Customer', 'customer')"><i data-lucide="eye"></i></button>
                                        <button class="btn-icon-table" title="Edit" onclick="window.openModal('Edit Customer', 'customer')"><i data-lucide="edit"></i></button>
                                        <button class="btn-icon-table" title="WhatsApp" onclick="window.showToast('Message sent via WhatsApp')"><i data-lucide="message-circle" class="text-success"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                <span class="text-muted text-sm">Showing 1 to 15 of 100 entries</span>
                <div class="pagination" style="display: flex; gap: 0.25rem;">
                    <button class="btn-icon-table"><i data-lucide="chevron-left"></i></button>
                    <button class="btn-icon-table" style="background: var(--primary); color: white;">1</button>
                    <button class="btn-icon-table">2</button>
                    <button class="btn-icon-table">3</button>
                    <button class="btn-icon-table">...</button>
                    <button class="btn-icon-table"><i data-lucide="chevron-right"></i></button>
                </div>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
}

function renderPOS() {
    viewContainer.style.padding = '1rem 2rem'; // Less padding for POS
    const html = `
        <div class="view-header" style="margin-bottom: 1rem;">
            <h1 class="view-title">POS Billing</h1>
            <div class="view-actions">
                <button class="btn-secondary" onclick="window.showToast('Bill held in queue')"><i data-lucide="pause-circle"></i> Hold Bill</button>
                <button class="btn-primary" onclick="window.showToast('Printing invoice...')"><i data-lucide="printer"></i> Print Last Invoice</button>
            </div>
        </div>
        
        <div class="pos-layout">
            <div class="pos-products glass-card">
                <div class="search-bar" style="width: 100%; margin-bottom: 0.5rem;">
                    <i data-lucide="search"></i>
                    <input type="text" placeholder="Scan Barcode or Search Products...">
                </div>
                
                <div class="pos-categories">
                    <button class="category-btn active">All</button>
                    <button class="category-btn">Smartphones</button>
                    <button class="category-btn">Accessories</button>
                    <button class="category-btn">Repairs</button>
                    <button class="category-btn">Spare Parts</button>
                </div>
                
                <div class="product-grid">
                    ${posProducts.map(p => `
                        <div class="glass-card product-card" onclick="addToCart('${p.name}', ${p.price})">
                            <i data-lucide="${p.img}" style="width: 48px; height: 48px; margin: 0 auto 1rem; color: var(--primary)"></i>
                            <h4 class="product-title">${p.name}</h4>
                            <div class="text-muted" style="font-size: 0.75rem; margin-bottom: 0.25rem;">Stock: ${p.stock}</div>
                            <div class="product-price">₹${p.price.toLocaleString()}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="pos-cart glass-card" style="padding: 0;">
                <div style="padding: 1rem; border-bottom: 1px solid var(--border-color); background: var(--bg-main); display: flex; align-items: center; gap: 0.5rem; border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg);">
                    <i data-lucide="user"></i>
                    <input type="text" class="form-control" placeholder="Select Customer or Walk-in" style="flex: 1; border: none; background: transparent;">
                    <button class="btn-icon-subtle"><i data-lucide="user-plus"></i></button>
                </div>
                
                <div class="cart-items" id="cart-container">
                    <!-- Dynamic Cart Items here -->
                </div>
                
                <div style="padding: 1rem;">
                    <div class="cart-summary" id="cart-summary-container">
                        <!-- Dynamic Summary here -->
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 1rem;">
                        <button class="btn-secondary" style="justify-content: center;" onclick="window.showToast('Payment Terminal Activated')"><i data-lucide="credit-card"></i> Card/UPI</button>
                        <button class="btn-primary" style="justify-content: center;" onclick="window.showToast('Cash Payment Received. Invoice Generated.')"><i data-lucide="banknote"></i> Pay Cash</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    
    // Render dynamic items
    window.updateCartUI();
}

function renderJobs() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Service Job Cards</h1>
            <div class="view-actions">
                <button class="btn-secondary"><i data-lucide="filter"></i> Filters</button>
                <button class="btn-primary" onclick="window.openModal('Create New Job Card', 'job')"><i data-lucide="plus"></i> New Job Card</button>
            </div>
        </div>
        
        <div class="glass-card">
            <div class="filter-bar">
                <input type="text" class="form-control" style="max-width: 300px" placeholder="Search Job ID, Mobile, IMEI...">
                <select class="filter-select">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Under Repair</option>
                    <option>Completed</option>
                </select>
                <select class="filter-select">
                    <option>All Technicians</option>
                    ${technicians.map(t => `<option>${t.name}</option>`).join('')}
                </select>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Device Details</th>
                            <th>Issue</th>
                            <th>Technician</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${repairJobs.slice(0, 15).map(job => `
                            <tr>
                                <td><strong>${job.id}</strong></td>
                                <td>${job.date}</td>
                                <td>${job.customerName}</td>
                                <td>${job.device}</td>
                                <td>${job.issue}</td>
                                <td>${job.technician}</td>
                                <td><span class="status-badge ${getStatusColor(job.status)}"><i data-lucide="circle"></i> ${job.status}</span></td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn-icon-table" title="View Details" onclick="window.openModal('Job Details', 'job')"><i data-lucide="file-text"></i></button>
                                        <button class="btn-icon-table" title="Update Status" onclick="window.openStatusModal('${job.id}')"><i data-lucide="edit-3"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
}

function renderInventory() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Inventory & Stock Management</h1>
            <div class="view-actions">
                <button class="btn-secondary" onclick="window.showToast('Exporting data...')"><i data-lucide="download"></i> Export</button>
                <button class="btn-primary" onclick="window.openInventoryModal()"><i data-lucide="plus"></i> Add New Product</button>
            </div>
        </div>
        
        <div class="glass-card">
            <div class="filter-bar">
                <input type="text" class="form-control" style="max-width: 300px" placeholder="Search product name, category...">
                <select class="filter-select">
                    <option>All Categories</option>
                    <option>Smartphones</option>
                    <option>Accessories</option>
                    <option>Cases</option>
                    <option>Screen Guards</option>
                </select>
                <select class="filter-select" id="stock-status-filter">
                    <option>All Statuses</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                </select>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock Qty</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${posProducts.map((p, index) => {
                            let status = 'In Stock';
                            let badgeClass = 'success';
                            if (p.stock === 0) {
                                status = 'Out of Stock';
                                badgeClass = 'danger';
                            } else if (p.stock <= 10) {
                                status = 'Low Stock';
                                badgeClass = 'warning';
                            }
                            return `
                                <tr>
                                    <td><strong>${p.id}</strong></td>
                                    <td>${p.name}</td>
                                    <td>${p.category}</td>
                                    <td>₹${p.price.toLocaleString()}</td>
                                    <td><strong>${p.stock}</strong> units</td>
                                    <td><span class="status-badge ${badgeClass}"><i data-lucide="circle"></i> ${status}</span></td>
                                    <td>
                                        <div class="table-actions">
                                            <button class="btn-icon-table" title="Quick Add Stock" onclick="window.quickAddStock(${index})"><i data-lucide="plus-circle" class="text-success"></i></button>
                                            <button class="btn-icon-table" title="Edit Product details" onclick="window.openInventoryModal(${index})"><i data-lucide="edit"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

window.quickAddStock = (index) => {
    posProducts[index].stock += 10;
    window.showToast(`Added 10 units to ${posProducts[index].name}`);
    if (activeModule === 'inventory') renderInventory();
    else if (activeModule === 'accessories') renderAccessories();
};

window.openInventoryModal = (index = -1) => {
    const isEdit = index >= 0;
    const p = isEdit ? posProducts[index] : { id: 'P' + (posProducts.length + 1).toString().padStart(3, '0'), name: '', price: 0, stock: 0, category: 'Smartphones' };
    
    const bodyContent = `
        <div class="form-group">
            <label style="font-weight: 500; margin-bottom: 0.25rem; display: block;">Product Name</label>
            <input type="text" id="inv-name" class="form-control" value="${p.name}" placeholder="e.g. OnePlus 12T">
        </div>
        <div class="form-row" style="margin-top:1rem;">
            <div class="form-group">
                <label style="font-weight: 500; margin-bottom: 0.25rem; display: block;">Category</label>
                <select id="inv-category" class="form-control">
                    <option ${p.category === 'Smartphones' ? 'selected' : ''}>Smartphones</option>
                    <option ${p.category === 'Accessories' ? 'selected' : ''}>Accessories</option>
                    <option ${p.category === 'Cases' ? 'selected' : ''}>Cases</option>
                    <option ${p.category === 'Screen Guards' ? 'selected' : ''}>Screen Guards</option>
                </select>
            </div>
            <div class="form-group" style="margin-top: 1rem;">
                <label style="font-weight: 500; margin-bottom: 0.25rem; display: block;">Price (₹)</label>
                <input type="number" id="inv-price" class="form-control" value="${p.price}" placeholder="0">
            </div>
        </div>
        <div class="form-group" style="margin-top:1rem;">
            <label style="font-weight: 500; margin-bottom: 0.25rem; display: block;">Stock Qty</label>
            <input type="number" id="inv-stock" class="form-control" value="${p.stock}" placeholder="0">
        </div>
    `;

    const modalsContainer = document.getElementById('modals-container');
    const html = `
        <div class="modal-overlay active" id="current-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${isEdit ? 'Edit Product' : 'Add New Product'} (${p.id})</h3>
                    <button class="close-modal" onclick="closeModal()"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    ${bodyContent}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                    <button class="btn-primary" onclick="window.saveInventoryProduct(${index}, '${p.id}')"><i data-lucide="save"></i> Save Product</button>
                </div>
            </div>
        </div>
    `;
    modalsContainer.innerHTML = html;
    lucide.createIcons();
};

window.saveInventoryProduct = (index, id) => {
    const name = document.getElementById('inv-name').value;
    const category = document.getElementById('inv-category').value;
    const price = parseFloat(document.getElementById('inv-price').value) || 0;
    const stock = parseInt(document.getElementById('inv-stock').value) || 0;

    if (!name) {
        alert('Product name is required');
        return;
    }

    if (index >= 0) {
        posProducts[index].name = name;
        posProducts[index].category = category;
        posProducts[index].price = price;
        posProducts[index].stock = stock;
        window.showToast(`Updated product ${id}`);
    } else {
        posProducts.push({
            id: id,
            name: name,
            category: category,
            price: price,
            stock: stock,
            img: category === 'Smartphones' ? 'smartphone' : (category === 'Accessories' ? 'plug' : 'headphones')
        });
        window.showToast(`Added product ${id}`);
    }
    window.closeModal();
    if (activeModule === 'inventory') renderInventory();
    else if (activeModule === 'accessories') renderAccessories();
};

function renderAccessories() {
    const acc = posProducts.filter(p => p.category !== 'Smartphones');
    const html = `
        <div class="view-header">
            <h1 class="view-title">Accessories Management</h1>
            <button class="btn-primary" onclick="window.openInventoryModal()"><i data-lucide="plus"></i> Add Accessory</button>
        </div>
        <div class="glass-card">
            <div class="product-grid">
                ${acc.map(a => `
                    <div class="glass-card product-card">
                        <i data-lucide="${a.img || 'headphones'}" style="width: 48px; height: 48px; margin: 0 auto 1rem; color: var(--primary)"></i>
                        <h4 class="product-title">${a.name}</h4>
                        <div class="text-muted" style="font-size: 0.75rem; margin-bottom: 0.25rem;">Stock: ${a.stock}</div>
                        <div class="product-price">₹${a.price.toLocaleString()}</div>
                        <button class="btn-secondary btn-sm" style="margin-top: 1rem; width: 100%; justify-content: center;" onclick="window.quickAddStock(${posProducts.indexOf(a)})">Add +10 Stock</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderVendors() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Vendors & Purchases</h1>
            <button class="btn-primary" onclick="window.openModal('Add Vendor', 'vendor')"><i data-lucide="plus"></i> Add Vendor</button>
        </div>
        <div class="glass-card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Vendor ID</th>
                            <th>Vendor Name</th>
                            <th>Contact</th>
                            <th>GSTIN</th>
                            <th>Category</th>
                            <th>Pending Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vendors.map(v => `
                            <tr>
                                <td><strong>${v.id}</strong></td>
                                <td>${v.name}</td>
                                <td>${v.contact}</td>
                                <td><code style="font-size: 0.8rem;">${v.gst}</code></td>
                                <td><span class="status-badge primary">${v.category}</span></td>
                                <td style="font-weight:600; color:var(--danger);">${v.pendingPayment}</td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn-secondary btn-sm" onclick="window.showToast('Payment processing initiated for ${v.name}')">Pay Now</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderInvoicing() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">GST Tax Invoices</h1>
            <button class="btn-primary" onclick="renderModule('pos')"><i data-lucide="plus"></i> Create Invoice</button>
        </div>
        <div class="glass-card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Taxable Amount</th>
                            <th>GST (18%)</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoicesList.map(inv => `
                            <tr>
                                <td><strong>${inv.id}</strong></td>
                                <td>${inv.date}</td>
                                <td>${inv.customer}</td>
                                <td>₹${inv.amount.toLocaleString()}</td>
                                <td>₹${inv.tax.toLocaleString()}</td>
                                <td style="font-weight:600;">₹${(inv.amount + inv.tax).toLocaleString()}</td>
                                <td><span class="status-badge ${inv.status === 'Paid' ? 'success' : 'danger'}">${inv.status}</span></td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn-icon-table" title="View Tax Invoice" onclick="window.viewTaxInvoice('${inv.id}', '${inv.customer}', ${inv.amount})"><i data-lucide="file-text"></i></button>
                                        <button class="btn-icon-table" title="Print Invoice" onclick="window.showToast('Sending print request...')"><i data-lucide="printer"></i></button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

window.viewTaxInvoice = (id, customer, amount) => {
    const tax = amount * 0.18;
    const cgst = tax / 2;
    const sgst = tax / 2;
    const total = amount + tax;
    
    const bodyContent = `
        <div style="font-family: monospace; padding: 1rem; background: var(--bg-main); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="text-align: center; margin-bottom: 1rem;">
                <h3 style="margin: 0; font-size: 1.25rem;">MOBILE ERP & SERVICE CENTER</h3>
                <p style="margin: 2px 0 0 0; font-size: 0.75rem;">123 Tech Park, Mumbai - 400001</p>
                <p style="margin: 2px 0 0 0; font-size: 0.75rem;">GSTIN: 27AAACM1234C1Z9</p>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 0.5rem; margin-bottom: 0.5rem; font-size: 0.8rem;">
                <div>
                    <strong>Invoice:</strong> ${id}<br>
                    <strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}
                </div>
                <div style="text-align: right;">
                    <strong>Customer:</strong> ${customer}
                </div>
            </div>
            <table style="width: 100%; font-size: 0.8rem; margin-bottom: 1rem; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 1px dashed var(--border-color);">
                        <th style="text-align: left; padding: 0.25rem 0;">Description</th>
                        <th style="text-align: right; padding: 0.25rem 0;">Amt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 0.25rem 0;">Smart Device Sales/Service</td>
                        <td style="text-align: right; padding: 0.25rem 0;">₹${amount.toLocaleString()}</td>
                    </tr>
                    <tr style="border-top: 1px dashed var(--border-color); font-weight: bold;">
                        <td style="padding: 0.25rem 0;">Subtotal</td>
                        <td style="text-align: right; padding: 0.25rem 0;">₹${amount.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.25rem 0;">CGST (9%)</td>
                        <td style="text-align: right; padding: 0.25rem 0;">₹${cgst.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.25rem 0;">SGST (9%)</td>
                        <td style="text-align: right; padding: 0.25rem 0;">₹${sgst.toLocaleString()}</td>
                    </tr>
                    <tr style="border-top: 1px solid var(--border-color); font-size: 1rem; font-weight: bold;">
                        <td style="padding: 0.5rem 0 0 0;">GRAND TOTAL</td>
                        <td style="text-align: right; padding: 0.5rem 0 0 0; color: var(--primary);">₹${total.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align: center; font-size: 0.75rem; margin-top: 1rem; color: var(--text-muted);">
                *** Thank You For Your Business ***
            </div>
        </div>
    `;

    const modalsContainer = document.getElementById('modals-container');
    const html = `
        <div class="modal-overlay active" id="current-modal">
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>GST Tax Invoice</h3>
                    <button class="close-modal" onclick="closeModal()"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    ${bodyContent}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeModal()">Close</button>
                    <button class="btn-primary" onclick="window.showToast('PDF Invoice generated!')"><i data-lucide="download"></i> Download PDF</button>
                </div>
            </div>
        </div>
    `;
    modalsContainer.innerHTML = html;
    lucide.createIcons();
};

function renderWarranty() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Warranty & AMC Claims</h1>
            <button class="btn-primary" onclick="window.openModal('New AMC / Warranty Extension', 'warranty')"><i data-lucide="plus"></i> New Claim</button>
        </div>
        <div class="glass-card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>IMEI Number</th>
                            <th>Customer Name</th>
                            <th>Device</th>
                            <th>Expiry Date</th>
                            <th>Days Left</th>
                            <th>Warranty Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${warrantiesList.map(w => `
                            <tr>
                                <td><strong>${w.imei}</strong></td>
                                <td>${w.customer}</td>
                                <td>${w.device}</td>
                                <td>${w.expiryDate}</td>
                                <td>
                                    <span style="font-weight:600; color: ${w.daysRemaining > 0 ? (w.daysRemaining < 30 ? 'var(--warning)' : 'var(--success)') : 'var(--danger)'}">
                                        ${w.daysRemaining > 0 ? `${w.daysRemaining} days` : 'Lapsed'}
                                    </span>
                                </td>
                                <td><span class="status-badge ${w.status === 'Active' ? 'success' : 'danger'}">${w.status}</span></td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn-secondary btn-sm" onclick="window.showToast('Claim ticket raised successfully!')" ${w.status === 'Expired' ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>Claim Warranty</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderTechnicians() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Technician Management & Performance</h1>
            <button class="btn-primary" onclick="window.openModal('Add Technician', 'technician')"><i data-lucide="plus"></i> Register Tech</button>
        </div>
        <div class="glass-card" style="margin-bottom: 2rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                ${technicians.map(t => `
                    <div class="glass-card" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <h3 style="margin:0; font-size: 1.1rem; font-weight:600;">${t.name}</h3>
                                <span class="text-muted text-xs">${t.id}</span>
                            </div>
                            <span class="status-badge success" style="font-size:0.75rem;">${t.efficiency} Eff</span>
                        </div>
                        <div class="text-sm"><strong>Skill:</strong> ${t.skill}</div>
                        <div class="text-sm" style="display:flex; justify-content:space-between;">
                            <span>Active Repair Jobs:</span>
                            <strong style="color:var(--primary); font-size:1.1rem;">${t.jobsActive}</strong>
                        </div>
                        <div class="progress-bar" style="background:var(--border-color); height:6px; border-radius:3px; overflow:hidden;">
                            <div style="background:var(--primary); height:100%; width: ${parseInt(t.efficiency)}%;"></div>
                        </div>
                        <button class="btn-secondary btn-sm" style="width: 100%; justify-content: center; margin-top:0.5rem;" onclick="window.showToast('Opening queue logs for ${t.name}')">View Job Queue</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderSpares() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Spare Parts Inventory</h1>
            <button class="btn-primary" onclick="window.openModal('Add Spare Part', 'spare')"><i data-lucide="plus"></i> Order Stock</button>
        </div>
        <div class="glass-card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Part Code</th>
                            <th>Part Description</th>
                            <th>Category</th>
                            <th>Unit Cost</th>
                            <th>In-Stock Qty</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sparesList.map(sp => {
                            const status = sp.stock === 0 ? 'Out of Stock' : (sp.stock <= 5 ? 'Low Stock' : 'In Stock');
                            const badge = sp.stock === 0 ? 'danger' : (sp.stock <= 5 ? 'warning' : 'success');
                            return `
                                <tr>
                                    <td><strong>${sp.id}</strong></td>
                                    <td>${sp.name}</td>
                                    <td>${sp.category}</td>
                                    <td>₹${sp.cost.toLocaleString()}</td>
                                    <td><strong>${sp.stock}</strong> units</td>
                                    <td><span class="status-badge ${badge}"><i data-lucide="circle"></i> ${status}</span></td>
                                    <td>
                                        <div class="table-actions">
                                            <button class="btn-secondary btn-sm" onclick="window.showToast('Reorder ticket raised!')">Restock</button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderComplaints() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Customer Service Desk</h1>
            <button class="btn-primary" onclick="window.openModal('Log Complaint Ticket', 'complaint')"><i data-lucide="plus"></i> New Ticket</button>
        </div>
        <div class="glass-card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Customer Name</th>
                            <th>Log Date</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${complaintsList.map(t => {
                            const badge = t.status === 'Open' ? 'danger' : (t.status === 'In Progress' ? 'warning' : 'success');
                            return `
                                <tr>
                                    <td><strong>${t.id}</strong></td>
                                    <td>${t.customer}</td>
                                    <td>${t.date}</td>
                                    <td>${t.subject}</td>
                                    <td><span class="status-badge ${t.priority === 'High' ? 'danger' : 'primary'}">${t.priority}</span></td>
                                    <td><span class="status-badge ${badge}">${t.status}</span></td>
                                    <td>
                                        <div class="table-actions">
                                            <button class="btn-secondary btn-sm" onclick="window.showToast('Ticket status updated to Resolved!')" ${t.status === 'Resolved' ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>Resolve Ticket</button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderNotifications() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">SMS & WhatsApp Alerts</h1>
            <button class="btn-primary" onclick="window.showToast('Custom broadcast sent to all customers!')"><i data-lucide="send"></i> Direct Broadcast</button>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div class="glass-card" style="padding: 1.5rem;">
                <h3>Active Alert Templates</h3>
                <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;">
                    <div style="padding:1rem; background:var(--bg-main); border-radius:var(--radius-md); border:1px solid var(--border-color);">
                        <strong>🔨 Repair Completed Notice:</strong>
                        <p style="margin:0.5rem 0; font-size:0.875rem; color:var(--text-muted);">"Dear Customer, your device {Device} is ready. Total bill is {Cost}. Please collect. - MobileERP"</p>
                        <button class="btn-secondary" style="width:100%; justify-content:center;" onclick="window.showToast('Test WhatsApp sent!')">Send Test WhatsApp</button>
                    </div>
                    <div style="padding:1rem; background:var(--bg-main); border-radius:var(--radius-md); border:1px solid var(--border-color); margin-top:0.5rem;">
                        <strong>🎉 Customer Birthday Offer:</strong>
                        <p style="margin:0.5rem 0; font-size:0.875rem; color:var(--text-muted);">"Happy Birthday {Name}! Get flat 15% off on all accessories today. Show this SMS. - MobileERP"</p>
                        <button class="btn-secondary" style="width:100%; justify-content:center;" onclick="window.showToast('Test SMS sent!')">Send Test SMS</button>
                    </div>
                </div>
            </div>
            
            <div class="glass-card" style="padding: 1.5rem;">
                <h3>Notification Logs</h3>
                <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem; font-size:0.85rem;">
                    <div style="display:flex; justify-content:space-between; padding:0.5rem; border-bottom:1px solid var(--border-color);">
                        <span>WhatsApp sent to Rohan Sharma</span>
                        <span class="text-success" style="font-weight:600;">Delivered</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:0.5rem; border-bottom:1px solid var(--border-color);">
                        <span>SMS completed broadcast (98 customers)</span>
                        <span class="text-success" style="font-weight:600;">Delivered</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; padding:0.5rem; border-bottom:1px solid var(--border-color);">
                        <span>WhatsApp alert sent to Aarav Malhotra</span>
                        <span class="text-warning" style="font-weight:600;">Pending</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderHR() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Staff & Payroll Portal</h1>
            <div class="view-actions">
                <button class="btn-secondary" onclick="window.openModal('Register Staff Member', 'staff')"><i data-lucide="plus"></i> Add Staff</button>
                <button class="btn-primary" onclick="window.showToast('Payroll processed. Payslips dispatched!')"><i data-lucide="credit-card"></i> Process Payroll</button>
            </div>
        </div>
        <div class="glass-card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Staff Name</th>
                            <th>Role / Title</th>
                            <th>Monthly Basic Salary</th>
                            <th>Attendance Today</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${staffList.map(s => `
                            <tr>
                                <td><strong>${s.name}</strong></td>
                                <td>${s.role}</td>
                                <td>${typeof s.salary === 'number' ? '₹' + s.salary.toLocaleString() : s.salary}</td>
                                <td><span class="status-badge ${s.status === 'Present' ? 'success' : 'danger'}">${s.status}</span></td>
                                <td>
                                    <div class="table-actions">
                                        <button class="btn-secondary btn-sm" onclick="window.showToast('Opening Payslip portal for ${s.name}')">Payslip</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderSalesTracker() {
    const totalIncome = ledgerList.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = ledgerList.reduce((sum, item) => sum + item.expense, 0);

    const html = `
        <div class="view-header">
            <h1 class="view-title">Daily Cashflow & Expense Ledger</h1>
            <button class="btn-primary" onclick="window.openModal('Add Ledger Entry', 'ledger')"><i data-lucide="plus"></i> Add Entry</button>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
            <div class="glass-card kpi-card">
                <div class="kpi-title" style="font-size:0.875rem; opacity:0.8; margin-bottom:0.25rem;">Total Cash Inflow</div>
                <div class="kpi-value" style="color:var(--success); font-size:1.75rem;">₹${totalIncome.toLocaleString()}</div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-title" style="font-size:0.875rem; opacity:0.8; margin-bottom:0.25rem;">Total Cash Outflow</div>
                <div class="kpi-value" style="color:var(--danger); font-size:1.75rem;">₹${totalExpense.toLocaleString()}</div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-title" style="font-size:0.875rem; opacity:0.8; margin-bottom:0.25rem;">Net Daily Balance</div>
                <div class="kpi-value" style="color:var(--primary); font-size:1.75rem;">₹${(totalIncome - totalExpense).toLocaleString()}</div>
            </div>
        </div>

        <div class="glass-card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Cash In (₹)</th>
                            <th>Cash Out (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${ledgerList.map(l => `
                            <tr>
                                <td>${l.date}</td>
                                <td><strong>${l.desc}</strong></td>
                                <td><span class="status-badge ${l.income > 0 ? 'success' : 'danger'}">${l.category}</span></td>
                                <td style="color:var(--success); font-weight:600;">${l.income > 0 ? `₹${l.income.toLocaleString()}` : '-'}</td>
                                <td style="color:var(--danger); font-weight:600;">${l.expense > 0 ? `₹${l.expense.toLocaleString()}` : '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderPNL() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Profit & Loss (P&L) Statement</h1>
            <div class="view-actions">
                <select class="filter-select" onchange="window.showToast('Recomputing financial graphs...')">
                    <option>Q1 (Apr - Jun) FY24</option>
                    <option>Full Year FY23-24</option>
                </select>
                <button class="btn-primary" onclick="window.showToast('Profit Statement Exported!')"><i data-lucide="download"></i> Export P&L</button>
            </div>
        </div>
        
        <div class="glass-card" style="padding: 2rem;">
            <div style="border-bottom: 2px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 2rem;">
                <h2 style="margin:0; font-size:1.5rem; text-align:center;">Trading Profit & Loss Account</h2>
                <p style="margin:4px 0 0 0; text-align:center; font-size:0.875rem;" class="text-muted">For Period Ending FY 2024</p>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:1.25rem; font-size:1rem;">
                <div style="display:flex; justify-content:space-between; font-weight:600; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
                    <span>1. REVENUE FROM OPERATIONS</span>
                    <span>₹12,45,900.00</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding-left:1.5rem; font-size:0.9rem;" class="text-muted">
                    <span>Retail Device Sales</span>
                    <span>₹8,92,300.00</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding-left:1.5rem; font-size:0.9rem;" class="text-muted">
                    <span>Repair & Service Charges</span>
                    <span>₹3,53,600.00</span>
                </div>
                
                <div style="display:flex; justify-content:space-between; font-weight:600; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem; margin-top:1rem;">
                    <span>2. DIRECT EXPENSES</span>
                    <span>₹7,12,000.00</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding-left:1.5rem; font-size:0.9rem;" class="text-muted">
                    <span>Spare Parts Procurement</span>
                    <span>₹4,82,000.00</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding-left:1.5rem; font-size:0.9rem;" class="text-muted">
                    <span>Technician Payroll Fees</span>
                    <span>₹2,30,000.00</span>
                </div>

                <div style="display:flex; justify-content:space-between; font-weight:700; font-size:1.15rem; color:var(--primary); background:var(--bg-main); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-top:1.5rem;">
                    <span>GROSS OPERATING PROFIT</span>
                    <span>₹5,33,900.00</span>
                </div>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderReports() {
    const html = `
        <div class="view-header">
            <h1 class="view-title">Analytical Reports Desk</h1>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <div class="glass-card" style="padding: 1.5rem; display:flex; flex-direction:column; gap:0.75rem; align-items:center; text-align:center;">
                <div style="width:50px; height:50px; border-radius:50%; background:var(--primary-light); color:white; display:flex; align-items:center; justify-content:center;"><i data-lucide="bar-chart-2"></i></div>
                <h4>Daily Sales Performance</h4>
                <p class="text-muted text-xs">Summary of customer invoices, average order totals and tax compliance.</p>
                <button class="btn-secondary btn-sm" style="width: 100%; justify-content: center;" onclick="window.showToast('Sales Report PDF downloaded!')">Download Sales Report (PDF)</button>
            </div>
            
            <div class="glass-card" style="padding: 1.5rem; display:flex; flex-direction:column; gap:0.75rem; align-items:center; text-align:center;">
                <div style="width:50px; height:50px; border-radius:50%; background:var(--primary-light); color:white; display:flex; align-items:center; justify-content:center;"><i data-lucide="settings"></i></div>
                <h4>Repairs Efficiency Logs</h4>
                <p class="text-muted text-xs">Technician job lists, average turnaround time and spare part margins.</p>
                <button class="btn-secondary btn-sm" style="width: 100%; justify-content: center;" onclick="window.showToast('Repairs Report Excel downloaded!')">Export Repairs Report (XLS)</button>
            </div>

            <div class="glass-card" style="padding: 1.5rem; display:flex; flex-direction:column; gap:0.75rem; align-items:center; text-align:center;">
                <div style="width:50px; height:50px; border-radius:50%; background:var(--primary-light); color:white; display:flex; align-items:center; justify-content:center;"><i data-lucide="package"></i></div>
                <h4>Low-Stock Procurement Ledger</h4>
                <p class="text-muted text-xs">Comprehensive ledger of current stock depletion indices and vendor rates.</p>
                <button class="btn-secondary btn-sm" style="width: 100%; justify-content: center;" onclick="window.showToast('Procurement PDF downloaded!')">Download Ledger PDF</button>
            </div>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}

function renderEmptyState(id) {
    const module = modules.find(m => m.id === id);
    const html = `
        <div class="view-header">
            <h1 class="view-title">${module ? module.name : 'Unknown Module'}</h1>
        </div>
        <div class="glass-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 5rem 2rem; text-align: center;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary-light); color: white; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; opacity: 0.8">
                <i data-lucide="${module ? module.icon : 'alert-circle'}" style="width: 40px; height: 40px;"></i>
            </div>
            <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${module ? module.name : 'Module'}</h2>
            <p class="text-muted" style="max-width: 400px; margin-bottom: 2rem;">This module is fully functional in the production environment.</p>
            <button class="btn-primary" onclick="renderModule('dashboard')">Return to Dashboard</button>
        </div>
    `;
    viewContainer.innerHTML = html;
    lucide.createIcons();
}
