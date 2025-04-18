// 샘플 데이터
let inventory = [
    {
        partName: '브레이크 패드',
        partNumber: 'BP-001',
        category: 'brake',
        quantity: 15,
        price: 45000,
        supplier: 'A부품공급',
        lastStockDate: '2024-03-10',
        minimumStock: 10
    },
    {
        partName: '오일 필터',
        partNumber: 'OF-002',
        category: 'engine',
        quantity: 30,
        price: 12000,
        supplier: 'B부품공급',
        lastStockDate: '2024-03-12',
        minimumStock: 20
    },
    {
        partName: '타이밍 벨트',
        partNumber: 'TB-003',
        category: 'engine',
        quantity: 8,
        price: 85000,
        supplier: 'C부품공급',
        lastStockDate: '2024-03-08',
        minimumStock: 5
    },
    {
        partName: '서스펜션 스트럿',
        partNumber: 'SS-004',
        category: 'suspension',
        quantity: 5,
        price: 120000,
        supplier: 'D부품공급',
        lastStockDate: '2024-03-05',
        minimumStock: 3
    }
];

// 재고 입출고 내역
let stockHistory = [
    {
        date: '2024-03-15',
        partNumber: 'BP-001',
        type: '출고',
        quantity: 2,
        reason: 'A/S 작업'
    },
    {
        date: '2024-03-14',
        partNumber: 'OF-002',
        type: '입고',
        quantity: 10,
        reason: '정기 입고'
    },
    {
        date: '2024-03-13',
        partNumber: 'TB-003',
        type: '출고',
        quantity: 1,
        reason: 'A/S 작업'
    }
];

// 재고 목록 표시 함수
function displayInventory(filteredItems = null) {
    const tbody = document.getElementById('inventoryList');
    tbody.innerHTML = '';
    
    const itemsToDisplay = filteredItems || inventory;
    
    itemsToDisplay.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.partName}</td>
            <td>${item.partNumber}</td>
            <td>${item.category}</td>
            <td class="${item.quantity <= item.minimumStock ? 'low-stock' : ''}">${item.quantity}</td>
            <td>${item.price.toLocaleString()}원</td>
            <td>${item.supplier}</td>
            <td>${item.lastStockDate}</td>
            <td>
                <button onclick="editItem(${index})">수정</button>
                <button onclick="deleteItem(${index})">삭제</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 재고 수정 함수
function editItem(index) {
    const item = inventory[index];
    document.getElementById('editIndex').value = index;
    document.getElementById('partName').value = item.partName;
    document.getElementById('partNumber').value = item.partNumber;
    document.getElementById('category').value = item.category;
    document.getElementById('quantity').value = item.quantity;
    document.getElementById('price').value = item.price;
    document.getElementById('supplier').value = item.supplier;
    document.getElementById('minimumStock').value = item.minimumStock;
    
    document.getElementById('submitBtn').textContent = '수정하기';
    document.getElementById('cancelBtn').style.display = 'inline-block';
}

// 재고 삭제 함수
function deleteItem(index) {
    if (confirm('정말로 이 항목을 삭제하시겠습니까?')) {
        inventory.splice(index, 1);
        displayInventory();
    }
}

// 재고 사용 함수 (A/S 접수 시 호출)
function useInventory(partNumber, quantity) {
    const item = inventory.find(item => item.partNumber === partNumber);
    if (item) {
        if (item.quantity >= quantity) {
            item.quantity -= quantity;
            displayInventory();
            return true;
        } else {
            alert('재고가 부족합니다.');
            return false;
        }
    }
    return false;
}

// 폼 제출 처리
document.getElementById('inventoryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const editIndex = parseInt(document.getElementById('editIndex').value);
    const newItem = {
        partName: document.getElementById('partName').value,
        partNumber: document.getElementById('partNumber').value,
        category: document.getElementById('category').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseInt(document.getElementById('price').value),
        supplier: document.getElementById('supplier').value,
        lastStockDate: new Date().toISOString().split('T')[0],
        minimumStock: parseInt(document.getElementById('minimumStock').value)
    };
    
    if (editIndex >= 0) {
        inventory[editIndex] = newItem;
    } else {
        inventory.push(newItem);
    }
    
    displayInventory();
    this.reset();
    document.getElementById('editIndex').value = '-1';
    document.getElementById('submitBtn').textContent = '등록하기';
    document.getElementById('cancelBtn').style.display = 'none';
});

// 취소 버튼 처리
document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('inventoryForm').reset();
    document.getElementById('editIndex').value = '-1';
    document.getElementById('submitBtn').textContent = '등록하기';
    this.style.display = 'none';
});

// 검색 기능
document.getElementById('searchInventory').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = inventory.filter(item => 
        item.partName.toLowerCase().includes(searchTerm) ||
        item.partNumber.toLowerCase().includes(searchTerm)
    );
    displayInventory(filteredItems);
});

// 카테고리 필터
document.getElementById('categoryFilter').addEventListener('change', function(e) {
    const category = e.target.value;
    const filteredItems = category ? 
        inventory.filter(item => item.category === category) : 
        inventory;
    displayInventory(filteredItems);
});

// 재고 입출고 내역 표시 함수
function displayStockHistory() {
    const tbody = document.getElementById('stockHistoryBody');
    tbody.innerHTML = '';
    
    stockHistory.forEach(item => {
        const part = inventory.find(p => p.partNumber === item.partNumber);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${part ? part.partName : item.partNumber}</td>
            <td>${item.partNumber}</td>
            <td>${item.type}</td>
            <td>${item.quantity}</td>
            <td>${item.reason}</td>
        `;
        tbody.appendChild(row);
    });
}

// 재고 입출고 처리 함수
function processStock(type) {
    const partNumber = document.getElementById('stockPartNumber').value;
    const quantity = parseInt(document.getElementById('stockQuantity').value);
    const reason = document.getElementById('stockReason').value;

    if (!partNumber || !quantity || !reason) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const itemIndex = inventory.findIndex(item => item.partNumber === partNumber);

    if (itemIndex === -1) {
        alert('해당 부품 번호를 찾을 수 없습니다.');
        return;
    }

    const item = inventory[itemIndex];
    const newQuantity = type === 'in' ? item.quantity + quantity : item.quantity - quantity;

    if (type === 'out' && newQuantity < 0) {
        alert('재고가 부족합니다.');
        return;
    }

    // 재고 업데이트
    inventory[itemIndex].quantity = newQuantity;
    inventory[itemIndex].lastUpdated = new Date().toISOString();
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // 재고 기록 추가
    const stockHistory = JSON.parse(localStorage.getItem('stockHistory')) || [];
    stockHistory.unshift({
        date: new Date().toISOString(),
        partName: item.partName,
        partNumber: item.partNumber,
        type: type === 'in' ? '입고' : '출고',
        quantity: quantity,
        reason: reason
    });
    localStorage.setItem('stockHistory', JSON.stringify(stockHistory));

    // 폼 초기화
    document.getElementById('stockPartNumber').value = '';
    document.getElementById('stockQuantity').value = '';
    document.getElementById('stockReason').value = '';

    // 목록 새로고침
    displayInventoryList();
    displayStockHistory();
    alert(type === 'in' ? '입고가 완료되었습니다.' : '출고가 완료되었습니다.');
}

// 재고 기록 표시
function displayStockHistory() {
    const stockHistory = JSON.parse(localStorage.getItem('stockHistory')) || [];
    const tbody = document.querySelector('#stockHistoryTable tbody');
    tbody.innerHTML = '';

    stockHistory.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(record.date).toLocaleString()}</td>
            <td>${record.partName}</td>
            <td>${record.partNumber}</td>
            <td>${record.type}</td>
            <td>${record.quantity}</td>
            <td>${record.reason}</td>
        `;
        tbody.appendChild(row);
    });
}

// 페이지 로드 시 재고 기록 표시
document.addEventListener('DOMContentLoaded', () => {
    displayStockHistory();
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    displayInventory();
    displayStockHistory();
}); 