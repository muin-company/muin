# MUIN Tools Page - Search & Filter System

## Overview

The MUIN tools page features a comprehensive client-side filtering system with deep linking support. Users can filter tools by type, category, tags, and search query, with all filter states preserved in the URL for easy sharing.

## Features

### 🔍 Search
- Real-time text search across tool names, descriptions, and tags
- Debounced for performance (300ms delay)
- Keyboard shortcut: `/` to focus search, `ESC` to clear

### 🏷️ Type Filter
Three tool types are supported:
- **🌐 Web** - Browser-based web tools
- **⌨️ CLI** - Command-line interface tools
- **🧩 Extension** - Chrome browser extensions

### 📂 Category Filter
Tools are organized by category:
- 개발도구 (Development Tools)
- 생산성 (Productivity)
- 보안 (Security)
- 디자인 (Design)
- 유틸리티 (Utilities)

### 🏷️ Tag-Based Filtering
- Click any tag on a tool card to filter by that tag
- Multiple tags can be selected (AND logic - all tags must match)
- Active tags are highlighted with a distinct style
- Tags show in the active filters area with remove buttons

### 🔗 Deep Linking (URL Parameters)

All filter states are preserved in the URL for sharing and bookmarking.

**Supported URL parameters:**

| Parameter | Description | Example |
|-----------|-------------|---------|
| `q` or `search` | Search query | `?q=typescript` |
| `type` | Tool type filter | `?type=web` |
| `category` | Category filter | `?category=개발도구` |
| `tags` | Comma-separated tag list | `?tags=json,converter` |
| `sort` | Sort order | `?sort=category` |

**Example URLs:**

```
# Search for JSON tools
/tools/?q=json

# Filter by Web tools only
/tools/?type=web

# Filter by category
/tools/?category=개발도구

# Filter by tags
/tools/?tags=typescript,converter

# Combined filters
/tools/?type=web&category=개발도구&tags=json&q=type

# With custom sort
/tools/?category=보안&sort=name-desc
```

### 🎯 Active Filter Display

All active filters are displayed at the top of the results with:
- Visual chips showing each active filter
- Individual remove buttons (✕) per filter
- "Clear All" button to reset everything
- Filter type labels (검색, 유형, 카테고리, 태그)

### 🔀 Sorting Options

- **이름 (가나다순)** - Name ascending (A-Z)
- **이름 (역순)** - Name descending (Z-A)
- **카테고리별** - Group by category
- **유형별** - Group by type (Web, CLI, Extension)

### ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search input |
| `ESC` | Clear search or all filters |

### 📱 Responsive Design

- Mobile-optimized layout
- Stacked filters on small screens
- Touch-friendly tap targets for tags
- Collapsible filter sections

## File Structure

```
~/muin/
├── content/tools/
│   └── _index.md           # Tools page content
├── data/
│   └── tools.yaml          # Tools database
├── layouts/tools/
│   └── list.html           # Tools page template
├── static/
│   ├── css/
│   │   └── tools.css       # Styling
│   └── js/
│       └── tools.js        # Filter logic & deep linking
└── docs/
    └── TOOLS_PAGE_FILTERING.md  # This file
```

## Data Structure

Each tool in `data/tools.yaml` has the following fields:

```yaml
- name: "Tool Name"
  description: "Tool description in Korean"
  category: "개발도구"       # Required: category name
  type: "web"                # Required: web | cli | extension
  url: "/projects/tool-url/" # Tool URL or "#" for coming soon
  tags: ["tag1", "tag2"]     # Array of tags
```

**Example:**

```yaml
- name: "JSON to TypeScript"
  description: "JSON 데이터를 TypeScript 타입 정의로 변환합니다."
  category: "개발도구"
  type: "web"
  url: "/projects/json-to-types/"
  tags: ["typescript", "json", "converter"]
```

## How It Works

### Initialization
1. On page load, the JavaScript reads URL parameters
2. Filters and search are restored from URL state
3. All matching tools are displayed
4. Active filter chips are rendered

### User Interaction
1. User changes search, filters, or clicks tags
2. `applyFilters()` function runs (debounced for search)
3. Each tool card is checked against all active filters
4. Matching tools are shown, non-matching are hidden
5. Result count is updated
6. Active filter display is refreshed
7. URL is updated via `history.replaceState()` (no page reload)

### Filter Logic
Filters use **AND logic**:
- Search term matches name OR description OR tags
- Type must match (if type filter != "all")
- Category must match (if category filter != "all")
- ALL active tags must be present (if any tags selected)

### URL Management
- `history.replaceState()` updates URL without adding history entries
- Browser back/forward buttons work correctly
- `popstate` event listener restores state on navigation
- URL can be copied and shared to reproduce exact filter state

## Adding New Tools

1. Edit `~/muin/data/tools.yaml`
2. Add a new tool entry with all required fields
3. Choose appropriate `type` (web, cli, or extension)
4. Add descriptive tags for better filterability
5. Hugo will automatically rebuild on save

**New tool template:**

```yaml
- name: "Your Tool Name"
  description: "한글 설명"
  category: "카테고리"
  type: "web"
  url: "#"
  tags: ["tag1", "tag2", "tag3"]
```

## Customization

### Adding New Categories
1. Add tools with new category in `tools.yaml`
2. Update category dropdown in `layouts/tools/list.html`:
   ```html
   <option value="new-category">새 카테고리</option>
   ```

### Adding New Tool Types
1. Add tools with new type in `tools.yaml`
2. Update type filter dropdown in `layouts/tools/list.html`
3. Add type badge styling in `static/css/tools.css`:
   ```css
   .type-newtype {
     background: rgba(R, G, B, 0.1);
     color: #hexcolor;
     border-color: #hexcolor;
   }
   ```
4. Update template badge rendering logic

### Styling Customization
All styles are in `static/css/tools.css`:
- `.filter-chip` - Active filter chips
- `.clickable-tag` - Tag styling
- `.tool-type-badge` - Type badges
- CSS variables like `--tertiary`, `--primary` control colors

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- URL parameter support via `URLSearchParams` API
- History API for state management
- Optional: Web Share API for mobile sharing

## Performance

- **Debounced search** (300ms) reduces unnecessary filtering
- **Event delegation** for tag clicks (single listener)
- **CSS transitions** for smooth animations
- **Client-side only** - no server requests after initial page load

## Future Enhancements

Potential improvements:
- [ ] Fuzzy search for typo tolerance
- [ ] Save favorite filters to localStorage
- [ ] Export filtered results as JSON/CSV
- [ ] Advanced search syntax (e.g., `type:web tag:json`)
- [ ] Tag autocomplete in search
- [ ] Filter presets (e.g., "Developer Essentials")
- [ ] Dark mode color scheme for badges
- [ ] Analytics tracking for popular filters

## Testing URLs

Test the filtering system with these examples:

```bash
# All web tools
http://localhost:1313/tools/?type=web

# Security tools
http://localhost:1313/tools/?category=보안

# Tools with 'converter' tag
http://localhost:1313/tools/?tags=converter

# TypeScript-related tools
http://localhost:1313/tools/?q=typescript

# Chrome extensions for productivity
http://localhost:1313/tools/?type=extension&category=생산성

# All filters combined
http://localhost:1313/tools/?type=web&category=개발도구&tags=json,converter&q=type&sort=name-asc
```

## Troubleshooting

**Filters not working?**
- Check browser console for JavaScript errors
- Verify `tools.js` is loading correctly
- Ensure Hugo has rebuilt the site

**URL parameters not restoring state?**
- Check parameter names (case-sensitive)
- Verify values match exactly (e.g., category names in Korean)
- Try URL-encoding special characters

**Tags not clickable?**
- Verify `.clickable-tag` class is present in HTML
- Check event delegation is working in console
- Ensure CSS allows pointer events

**Styling issues?**
- Check CSS is loading (`tools.css`)
- Verify CSS variable values in theme
- Test in different browsers for compatibility

## Contact

For questions or improvements, refer to project documentation or raise an issue.

---

**Last Updated:** 2026-02-07  
**Version:** 2.0 (Deep Linking + Tag Filtering)
