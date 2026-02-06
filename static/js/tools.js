// Tools 페이지 검색/필터 기능
(function() {
  'use strict';

  // DOM 요소
  const searchInput = document.getElementById('tool-search');
  const typeFilter = document.getElementById('type-filter');
  const categoryFilter = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-select');
  const toolsGrid = document.getElementById('tools-grid');
  const resultCount = document.getElementById('result-count');
  const noResults = document.getElementById('no-results');
  const activeFiltersContainer = document.getElementById('active-filters');
  const filterChipsContainer = document.getElementById('filter-chips');
  const clearFiltersBtn = document.getElementById('clear-filters');

  // 모든 도구 카드 가져오기
  let toolCards = Array.from(document.querySelectorAll('.tool-card'));
  const originalOrder = [...toolCards];

  // 검색 및 필터 함수
  function searchAndFilter() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value;
    const selectedCategory = categoryFilter.value;
    let visibleCount = 0;

    toolCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const description = card.dataset.description.toLowerCase();
      const tags = card.dataset.tags.toLowerCase();
      const type = card.dataset.type;
      const category = card.dataset.category;

      // 검색어 매칭
      const matchesSearch = searchTerm === '' || 
        name.includes(searchTerm) || 
        description.includes(searchTerm) ||
        tags.includes(searchTerm);

      // 유형 필터링
      const matchesType = selectedType === 'all' || type === selectedType;

      // 카테고리 필터링
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

      // 모두 매칭되면 표시
      if (matchesSearch && matchesType && matchesCategory) {
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

    // 활성 필터 UI 업데이트
    updateActiveFiltersUI();
  }

  // 활성 필터 UI 업데이트
  function updateActiveFiltersUI() {
    const chips = [];
    
    // 검색어 칩
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      chips.push({ type: 'search', label: `검색: "${searchTerm}"`, value: searchTerm });
    }
    
    // 유형 칩
    const selectedType = typeFilter.value;
    if (selectedType && selectedType !== 'all') {
      const typeLabels = { web: '🌐 Web', cli: '⌨️ CLI', extension: '🧩 Extension' };
      chips.push({ type: 'type', label: typeLabels[selectedType], value: selectedType });
    }
    
    // 카테고리 칩
    const selectedCategory = categoryFilter.value;
    if (selectedCategory && selectedCategory !== 'all') {
      chips.push({ type: 'category', label: selectedCategory, value: selectedCategory });
    }
    
    // 칩이 있으면 표시, 없으면 숨김
    if (chips.length === 0) {
      activeFiltersContainer.style.display = 'none';
      return;
    }
    
    activeFiltersContainer.style.display = 'flex';
    filterChipsContainer.innerHTML = '';
    
    chips.forEach(chip => {
      const chipElement = document.createElement('span');
      chipElement.className = 'filter-chip';
      chipElement.innerHTML = `
        ${chip.label}
        <button class="remove-filter" data-filter-type="${chip.type}" data-filter-value="${chip.value}" title="필터 제거">×</button>
      `;
      filterChipsContainer.appendChild(chipElement);
      
      // 개별 칩 제거 버튼 이벤트
      chipElement.querySelector('.remove-filter').addEventListener('click', function() {
        const filterType = this.dataset.filterType;
        if (filterType === 'search') {
          searchInput.value = '';
        } else if (filterType === 'type') {
          typeFilter.value = 'all';
        } else if (filterType === 'category') {
          categoryFilter.value = 'all';
        }
        searchAndFilter();
        updateURL();
      });
    });
  }

  // 정렬 함수
  function sortTools() {
    const sortValue = sortSelect.value;

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
        
        case 'type':
          const typeCompare = a.dataset.type.localeCompare(b.dataset.type, 'ko');
          if (typeCompare !== 0) return typeCompare;
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

  // URL 파라미터 업데이트 (deep linking)
  function updateURL() {
    const params = new URLSearchParams();
    
    // 검색어 추가
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    
    // 유형 추가
    const type = typeFilter.value;
    if (type && type !== 'all') {
      params.set('type', type);
    }
    
    // 카테고리 추가
    const category = categoryFilter.value;
    if (category && category !== 'all') {
      params.set('category', category);
    }
    
    // URL 업데이트 (페이지 리로드 없이)
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}` 
      : window.location.pathname;
    
    window.history.replaceState({}, '', newURL);
  }

  // URL 파라미터에서 필터 상태 복원
  function loadFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // 검색어 복원
    const query = urlParams.get('q');
    if (query) {
      searchInput.value = query;
    }
    
    // 유형 복원
    const type = urlParams.get('type');
    if (type) {
      typeFilter.value = type;
    }
    
    // 카테고리 복원
    const category = urlParams.get('category');
    if (category) {
      categoryFilter.value = category;
    }
    
    // 필터 적용
    searchAndFilter();
  }

  // 모든 필터 초기화
  clearFiltersBtn.addEventListener('click', function() {
    searchInput.value = '';
    typeFilter.value = 'all';
    categoryFilter.value = 'all';
    searchAndFilter();
    updateURL();
  });

  // 이벤트 리스너
  searchInput.addEventListener('input', () => {
    debouncedSearch();
    updateURL();
  });

  typeFilter.addEventListener('change', () => {
    searchAndFilter();
    sortTools();
    updateURL();
  });

  categoryFilter.addEventListener('change', () => {
    searchAndFilter();
    sortTools();
    updateURL();
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

  // 키보드 단축키
  document.addEventListener('keydown', (e) => {
    // / 키로 검색창 포커스
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && 
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'SELECT') {
      e.preventDefault();
      searchInput.focus();
    }
    
    // ESC로 모든 필터 초기화
    if (e.key === 'Escape') {
      if (document.activeElement === searchInput && searchInput.value) {
        searchInput.value = '';
        searchAndFilter();
        updateURL();
      } else if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') {
        document.activeElement.blur();
      } else {
        // 전체 필터 초기화
        searchInput.value = '';
        typeFilter.value = 'all';
        categoryFilter.value = 'all';
        searchAndFilter();
        updateURL();
      }
    }
  });

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
  const debouncedSearch = debounce(searchAndFilter, 300);

  // 초기화
  loadFiltersFromURL();
  sortTools();

})();
