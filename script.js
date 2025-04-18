// 전역 변수
let services = [
    {
        id: 1,
        customerName: "김철수",
        phoneNumber: "010-1234-5678",
        carModel: "현대 아반떼",
        carNumber: "12가 3456",
        serviceType: "accident",
        description: "전면 범퍼 교체 및 도색 필요",
        status: "in-progress",
        date: new Date().toISOString()
    },
    {
        id: 2,
        customerName: "이영희",
        phoneNumber: "010-8765-4321",
        carModel: "기아 쏘렌토",
        carNumber: "34나 7890",
        serviceType: "maintenance",
        description: "정기 점검 및 오일 교환",
        status: "pending",
        date: new Date().toISOString()
    },
    {
        id: 3,
        customerName: "박민수",
        phoneNumber: "010-5555-6666",
        carModel: "현대 코나",
        carNumber: "56다 1234",
        serviceType: "repair",
        description: "에어컨 가스 충전 및 필터 교체",
        status: "completed",
        date: new Date().toISOString()
    }
];

let inventory = [
    {
        id: 1,
        name: "브레이크 패드",
        code: "BRK-001",
        quantity: 12,
        price: 45000,
        category: "brake"
    },
    {
        id: 2,
        name: "엔진 오일 필터",
        code: "ENG-002",
        quantity: 25,
        price: 15000,
        category: "engine"
    },
    {
        id: 3,
        name: "헤드라이트 전구",
        code: "ELC-003",
        quantity: 3,
        price: 25000,
        category: "electrical"
    },
    {
        id: 4,
        name: "프론트 범퍼",
        code: "BDY-004",
        quantity: 2,
        price: 180000,
        category: "body"
    },
    {
        id: 5,
        name: "타이밍 벨트",
        code: "ENG-005",
        quantity: 5,
        price: 75000,
        category: "engine"
    }
];

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지에 따라 적절한 이벤트 리스너 설정
    if (document.getElementById('serviceForm')) {
        setupServiceForm();
        updateServiceList();
    }
    
    if (document.getElementById('itemForm')) {
        setupInventoryForm();
        updateInventoryList();
    }
    
    // 대시보드 업데이트
    updateDashboard();
});

// 데이터 저장
function saveData() {
    // localStorage 관련 코드 제거
}

// 서비스 폼 설정
function setupServiceForm() {
    const form = document.getElementById('serviceForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const service = {
            id: Date.now(),
            customerName: document.getElementById('customerName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            carModel: document.getElementById('carModel').value,
            carNumber: document.getElementById('carNumber').value,
            serviceType: document.getElementById('serviceType').value,
            description: document.getElementById('description').value,
            status: 'pending',
            date: new Date().toISOString()
        };
        
        services.push(service);
        updateServiceList();
        form.reset();
        
        alert('접수가 완료되었습니다.');
    });
}

// 서비스 목록 업데이트
function updateServiceList() {
    const listContainer = document.getElementById('serviceList');
    if (!listContainer) return;
    
    const statusFilter = document.getElementById('statusFilter').value;
    const filteredServices = statusFilter === 'all' 
        ? services 
        : services.filter(service => service.status === statusFilter);
    
    listContainer.innerHTML = filteredServices.map(service => `
        <div class="service-item">
            <h3>${service.customerName} (${service.carModel})</h3>
            <p>차량번호: ${service.carNumber}</p>
            <p>서비스 유형: ${getServiceTypeName(service.serviceType)}</p>
            <p>상태: ${getStatusName(service.status)}</p>
            <button onclick="updateServiceStatus(${service.id}, 'in-progress')">진행</button>
            <button onclick="updateServiceStatus(${service.id}, 'completed')">완료</button>
        </div>
    `).join('');
}

// 서비스 상태 업데이트
function updateServiceStatus(id, newStatus) {
    const service = services.find(s => s.id === id);
    if (service) {
        service.status = newStatus;
        updateServiceList();
        updateDashboard();
    }
}

// 재고 폼 설정
function setupInventoryForm() {
    const form = document.getElementById('itemForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const item = {
            id: Date.now(),
            name: document.getElementById('itemName').value,
            code: document.getElementById('itemCode').value,
            quantity: parseInt(document.getElementById('quantity').value),
            price: parseInt(document.getElementById('price').value),
            category: document.getElementById('category').value
        };
        
        inventory.push(item);
        updateInventoryList();
        form.reset();
        hideAddItemForm();
        
        alert('부품이 추가되었습니다.');
    });
}

// 재고 목록 업데이트
function updateInventoryList() {
    const listContainer = document.getElementById('inventoryList');
    if (!listContainer) return;
    
    const categoryFilter = document.getElementById('categoryFilter').value;
    const filteredInventory = categoryFilter === 'all'
        ? inventory
        : inventory.filter(item => item.category === categoryFilter);
    
    listContainer.innerHTML = filteredInventory.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.code}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString()}원</td>
            <td>${getCategoryName(item.category)}</td>
            <td>
                <button onclick="updateItemQuantity(${item.id}, 1)">+</button>
                <button onclick="updateItemQuantity(${item.id}, -1)">-</button>
                <button onclick="deleteItem(${item.id})">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 재고 수량 업데이트
function updateItemQuantity(id, change) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 0) item.quantity = 0;
        updateInventoryList();
        updateDashboard();
    }
}

// 재고 삭제
function deleteItem(id) {
    if (confirm('정말 삭제하시겠습니까?')) {
        inventory = inventory.filter(item => item.id !== id);
        updateInventoryList();
        updateDashboard();
    }
}

// 대시보드 업데이트
function updateDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const todayServices = services.filter(service => 
        service.date.startsWith(today)
    );
    
    const ongoingServices = services.filter(service => 
        service.status === 'in-progress'
    );
    
    const lowInventory = inventory.filter(item => 
        item.quantity < 5
    );
    
    document.getElementById('todayServiceCount')?.textContent = 
        `${todayServices.length}건`;
    document.getElementById('ongoingServiceCount')?.textContent = 
        `${ongoingServices.length}건`;
    document.getElementById('inventoryAlert')?.textContent = 
        `${lowInventory.length}개`;
}

// 유틸리티 함수들
function getServiceTypeName(type) {
    const types = {
        'accident': '사고 수리',
        'maintenance': '정기 정비',
        'repair': '일반 수리'
    };
    return types[type] || type;
}

function getStatusName(status) {
    const statuses = {
        'pending': '대기 중',
        'in-progress': '진행 중',
        'completed': '완료'
    };
    return statuses[status] || status;
}

function getCategoryName(category) {
    const categories = {
        'engine': '엔진 부품',
        'brake': '브레이크 부품',
        'electrical': '전기 부품',
        'body': '차체 부품'
    };
    return categories[category] || category;
}

// 재고 검색
function searchInventory() {
    const searchTerm = document.getElementById('searchItem').value.toLowerCase();
    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.code.toLowerCase().includes(searchTerm)
    );
    
    const listContainer = document.getElementById('inventoryList');
    if (listContainer) {
        listContainer.innerHTML = filteredInventory.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.code}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toLocaleString()}원</td>
                <td>${getCategoryName(item.category)}</td>
                <td>
                    <button onclick="updateItemQuantity(${item.id}, 1)">+</button>
                    <button onclick="updateItemQuantity(${item.id}, -1)">-</button>
                    <button onclick="deleteItem(${item.id})">삭제</button>
                </td>
            </tr>
        `).join('');
    }
}

// 재고 추가 폼 표시/숨김
function showAddItemForm() {
    document.getElementById('addItemForm').style.display = 'block';
}

function hideAddItemForm() {
    document.getElementById('addItemForm').style.display = 'none';
} 