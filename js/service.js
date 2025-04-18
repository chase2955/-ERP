// 샘플 데이터
let services = [
    {
        date: '2024-03-15',
        customerName: '김철수',
        carModel: '현대 아반떼',
        carNumber: '12가3456',
        serviceType: '사고 수리',
        status: '접수'
    },
    {
        date: '2024-03-14',
        customerName: '이영희',
        carModel: '기아 K5',
        carNumber: '34나7890',
        serviceType: '정기 정비',
        status: '진행중'
    },
    {
        date: '2024-03-13',
        customerName: '박민수',
        carModel: '현대 그랜저',
        carNumber: '56다1234',
        serviceType: '일반 수리',
        status: '완료'
    }
];

// 서비스 목록 표시 함수
function displayServices() {
    const tbody = document.getElementById('serviceList');
    tbody.innerHTML = '';
    
    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.date}</td>
            <td>${service.customerName}</td>
            <td>${service.carModel}</td>
            <td>${service.carNumber}</td>
            <td>${service.serviceType}</td>
            <td>${service.status}</td>
        `;
        tbody.appendChild(row);
    });
}

// 폼 제출 처리
document.getElementById('serviceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newService = {
        date: new Date().toISOString().split('T')[0],
        customerName: document.getElementById('customerName').value,
        carModel: document.getElementById('carModel').value,
        carNumber: document.getElementById('carNumber').value,
        serviceType: document.getElementById('serviceType').value,
        status: '접수'
    };
    
    services.unshift(newService);
    displayServices();
    
    // 폼 초기화
    this.reset();
    alert('A/S 접수가 완료되었습니다.');
});

// 페이지 로드 시 서비스 목록 표시
document.addEventListener('DOMContentLoaded', displayServices); 