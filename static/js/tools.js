// Tools 페이지 검색/필터 기능
(function() {
  'use strict';

  // DOM 요소
  const searchInput = document.getElementById('tool-search');
  const categoryFilter = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-select');
  const toolsGrid = document.getElementById('tools-grid');
  const resultCount = document.getElementById('result-count');
  const noResults = document.getElementById('no-results');

  // 모든 도구 카드 가져오기
  let toolCards = Array.from(document.querySelectorAll('.tool-card'));
  const originalOrder = [...toolCards];

  // 검색 함수
  function searchTools() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    let visibleCount = 0;

    toolCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const description = card.dataset.description.toLowerCase();
      const tags = card.dataset.tags.toLowerCase();
      const category = card.dataset.category;

      // 검색어 매칭
      const matchesSearch = searchTerm === '' || 
        name.includes(searchTerm) || 
        description.includes(searchTerm) ||
        tags.includes(searchTerm);

      // 카테고리 필터링
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

      // 둘 다 매칭되면 표시
      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // 결과 카운트 업데이트
    resultCount.textContent = visibleCount;

    // 결과 없음 메시지 표시/숨김
    if (visibleCount === 0) {
      noResults.style.display = 'block';
      toolsGrid.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      toolsGrid.style.display = 'grid';
    }
  }

  // 정렬 함수
  function sortTools() {
    const sortValue = sortSelect.value;

    // 현재 보이는 카드만 정렬
    toolCards.sort((a, b) => {
      switch(sortValue) {
        case 'name-asc':
          return a.dataset.name.localeCompare(b.dataset.name, 'ko');
        
        case 'name-desc':
          return b.dataset.name.localeCompare(a.dataset.name, 'ko');
        
        case 'category':
          const categoryCompare = a.dataset.category.localeCompare(b.dataset.category, 'ko');
          if (categoryCompare !== 0) return categoryCompare;
          return a.dataset.name.localeCompare(b.dataset.name, 'ko');
        
        default:
          return 0;
      }
    });

    // DOM 재정렬
    toolCards.forEach(card => {
      toolsGrid.appendChild(card);
    });
  }

  // 이벤트 리스너
  searchInput.addEventListener('input', searchTools);
  categoryFilter.addEventListener('change', () => {
    searchTools();
    sortTools();
  });
  sortSelect.addEventListener('change', sortTools);

  // 검색창 포커스 시 안내
  searchInput.addEventListener('focus', function() {
    this.placeholder = '예: JSON, 변환, 보안...';
  });

  searchInput.addEventListener('blur', function() {
    if (this.value === '') {
      this.placeholder = '도구 검색... (이름, 설명, 태그)';
    }
  });

  // 키보드 단축키: / 키로 검색창 포커스
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && 
        document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      searchInput.focus();
    }
    
    // ESC로 검색 초기화
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      searchTools();
      searchInput.blur();
    }
  });

  // URL 파라미터로 카테고리 필터 지원
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    categoryFilter.value = categoryParam;
    searchTools();
  }

  // 초기 정렬
  sortTools();

  // 디바운스 함수 (성능 최적화)
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 검색에 디바운스 적용 (입력 후 300ms 대기)
  const debouncedSearch = debounce(searchTools, 300);
  searchInput.removeEventListener('input', searchTools);
  searchInput.addEventListener('input', debouncedSearch);

})();
