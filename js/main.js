// 대시보드 통계 업데이트 함수
function updateDashboardStats() {
    // A/S 접수 현황
    const today = new Date().toISOString().split('T')[0];
    const todayServices = services.filter(service => service.date === today).length;
    document.querySelector('.stats .stat-card:nth-child(1) .number').textContent = todayServices;
    
    // 진행중 A/S
    const inProgressServices = services.filter(service => service.status === '진행중').length;
    document.querySelector('.stats .stat-card:nth-child(2) .number').textContent = inProgressServices;
    
    // 재고 알림 (수량이 10개 미만인 항목)
    const lowStockItems = inventory.filter(item => item.quantity < 10).length;
    document.querySelector('.stats .stat-card:nth-child(3) .number').textContent = lowStockItems;
}

// 페이지 로드 시 통계 업데이트
document.addEventListener('DOMContentLoaded', updateDashboardStats); 