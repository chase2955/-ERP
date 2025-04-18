// 샘플 데이터
const reportData = {
    services: [
        { date: '2024-03-15', type: '사고 수리', count: 3, amount: 1500000 },
        { date: '2024-03-14', type: '정기 정비', count: 5, amount: 800000 },
        { date: '2024-03-13', type: '일반 수리', count: 4, amount: 1200000 }
    ],
    revenue: [
        { date: '2024-03-15', income: 1500000, expense: 500000, profit: 1000000 },
        { date: '2024-03-14', income: 800000, expense: 300000, profit: 500000 },
        { date: '2024-03-13', income: 1200000, expense: 400000, profit: 800000 }
    ],
    parts: [
        { name: '브레이크 패드', used: 8, stock: 15, reorder: false },
        { name: '오일 필터', used: 12, stock: 30, reorder: false },
        { name: '타이밍 벨트', used: 3, stock: 8, reorder: true },
        { name: '서스펜션 스트럿', used: 2, stock: 5, reorder: true }
    ]
};

// 차트 초기화
function initializeCharts() {
    // A/S 접수 현황 차트
    const serviceCtx = document.getElementById('serviceChart').getContext('2d');
    new Chart(serviceCtx, {
        type: 'bar',
        data: {
            labels: reportData.services.map(item => item.date),
            datasets: [{
                label: 'A/S 건수',
                data: reportData.services.map(item => item.count),
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // 수익 현황 차트
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: reportData.revenue.map(item => item.date),
            datasets: [{
                label: '수익',
                data: reportData.revenue.map(item => item.income),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // 부품 사용량 차트
    const partsCtx = document.getElementById('partsChart').getContext('2d');
    new Chart(partsCtx, {
        type: 'pie',
        data: {
            labels: reportData.parts.map(item => item.name),
            datasets: [{
                data: reportData.parts.map(item => item.used),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// 보고서 표시 함수
function displayReports() {
    // A/S 현황 보고서
    const serviceBody = document.getElementById('serviceReportBody');
    serviceBody.innerHTML = reportData.services.map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.type}</td>
            <td>${item.count}</td>
            <td>${item.amount.toLocaleString()}원</td>
        </tr>
    `).join('');

    // 수익 현황 보고서
    const revenueBody = document.getElementById('revenueReportBody');
    revenueBody.innerHTML = reportData.revenue.map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.income.toLocaleString()}원</td>
            <td>${item.expense.toLocaleString()}원</td>
            <td>${item.profit.toLocaleString()}원</td>
        </tr>
    `).join('');

    // 재고 현황 보고서
    const inventoryBody = document.getElementById('inventoryReportBody');
    inventoryBody.innerHTML = reportData.parts.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.used}</td>
            <td>${item.stock}</td>
            <td>${item.reorder ? '예' : '아니오'}</td>
        </tr>
    `).join('');
}

// 탭 전환 기능
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        // 활성 탭 변경
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // 콘텐츠 표시 변경
        const tabId = this.dataset.tab;
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabId}Report`).classList.add('active');
    });
});

// 기간 선택 기능
document.getElementById('reportPeriod').addEventListener('change', function() {
    const customRange = document.querySelector('.custom-date-range');
    if (this.value === 'custom') {
        customRange.style.display = 'flex';
    } else {
        customRange.style.display = 'none';
        // 선택된 기간에 따른 데이터 필터링 및 업데이트
        updateReportsByPeriod(this.value);
    }
});

// 기간별 보고서 업데이트 함수
function updateReportsByPeriod(period) {
    // 실제 구현에서는 선택된 기간에 맞는 데이터를 필터링하여 표시
    displayReports();
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    displayReports();
}); 