// 샘플 데이터
const sampleCustomers = [
    {
        id: 1,
        name: '김철수',
        phone: '010-1234-5678',
        carModel: '현대 아반떼',
        carNumber: '12가3456',
        lastVisit: '2024-03-15',
        totalVisits: 5,
        totalSpent: 1250000,
        notes: '정기 점검 고객'
    },
    {
        id: 2,
        name: '이영희',
        phone: '010-2345-6789',
        carModel: '기아 K5',
        carNumber: '34나5678',
        lastVisit: '2024-03-10',
        totalVisits: 3,
        totalSpent: 850000,
        notes: 'A/S 보증 고객'
    },
    {
        id: 3,
        name: '박민수',
        phone: '010-3456-7890',
        carModel: '현대 소나타',
        carNumber: '56다7890',
        lastVisit: '2024-03-05',
        totalVisits: 8,
        totalSpent: 2100000,
        notes: 'VIP 고객'
    },
    {
        id: 4,
        name: '정지은',
        phone: '010-4567-8901',
        carModel: '기아 쏘렌토',
        carNumber: '78라9012',
        lastVisit: '2024-02-28',
        totalVisits: 2,
        totalSpent: 450000,
        notes: '신규 고객'
    },
    {
        id: 5,
        name: '최동욱',
        phone: '010-5678-9012',
        carModel: '현대 그랜저',
        carNumber: '90마1234',
        lastVisit: '2024-02-20',
        totalVisits: 6,
        totalSpent: 1800000,
        notes: '법인 고객'
    }
];

// 고객 목록 표시
function displayCustomerList() {
    const customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
    const tbody = document.querySelector('#customerList tbody');
    tbody.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.carModel}</td>
            <td>${customer.carNumber}</td>
            <td>${customer.lastVisit}</td>
            <td>${customer.totalVisits}</td>
            <td>${customer.totalSpent.toLocaleString()}원</td>
            <td>${customer.notes}</td>
            <td>
                <button onclick="editCustomer(${customer.id})">수정</button>
                <button onclick="deleteCustomer(${customer.id})">삭제</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 고객 추가/수정
function saveCustomer() {
    const id = document.getElementById('customerId').value;
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const carModel = document.getElementById('carModel').value;
    const carNumber = document.getElementById('carNumber').value;
    const notes = document.getElementById('customerNotes').value;

    if (!name || !phone || !carModel || !carNumber) {
        alert('필수 정보를 모두 입력해주세요.');
        return;
    }

    const customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
    const newCustomer = {
        id: id ? parseInt(id) : customers.length + 1,
        name,
        phone,
        carModel,
        carNumber,
        lastVisit: new Date().toISOString().split('T')[0],
        totalVisits: 1,
        totalSpent: 0,
        notes
    };

    if (id) {
        const index = customers.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            customers[index] = { ...customers[index], ...newCustomer };
        }
    } else {
        customers.push(newCustomer);
    }

    localStorage.setItem('customers', JSON.stringify(customers));
    displayCustomerList();
    document.getElementById('customerForm').reset();
    document.getElementById('customerId').value = '';
}

// 고객 수정
function editCustomer(id) {
    const customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
    const customer = customers.find(c => c.id === id);
    
    if (customer) {
        document.getElementById('customerId').value = customer.id;
        document.getElementById('customerName').value = customer.name;
        document.getElementById('customerPhone').value = customer.phone;
        document.getElementById('carModel').value = customer.carModel;
        document.getElementById('carNumber').value = customer.carNumber;
        document.getElementById('customerNotes').value = customer.notes;
    }
}

// 고객 삭제
function deleteCustomer(id) {
    if (confirm('정말로 이 고객 정보를 삭제하시겠습니까?')) {
        const customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
        const filteredCustomers = customers.filter(c => c.id !== id);
        localStorage.setItem('customers', JSON.stringify(filteredCustomers));
        displayCustomerList();
    }
}

// 검색 기능
function searchCustomers() {
    const searchTerm = document.getElementById('searchCustomer').value.toLowerCase();
    const customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm) ||
        customer.carNumber.includes(searchTerm)
    );

    const tbody = document.querySelector('#customerList tbody');
    tbody.innerHTML = '';

    filteredCustomers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.carModel}</td>
            <td>${customer.carNumber}</td>
            <td>${customer.lastVisit}</td>
            <td>${customer.totalVisits}</td>
            <td>${customer.totalSpent.toLocaleString()}원</td>
            <td>${customer.notes}</td>
            <td>
                <button onclick="editCustomer(${customer.id})">수정</button>
                <button onclick="deleteCustomer(${customer.id})">삭제</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    const customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
    localStorage.setItem('customers', JSON.stringify(customers));
    displayCustomerList();
}); 