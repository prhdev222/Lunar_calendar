# SRS: เว็บแอปพลิเคชันค้นหาวันพระ

## 1. ภาพรวมโปรเจกต์

### วัตถุประสงค์
พัฒนาเว็บแอปพลิเคชันสำหรับตรวจสอบวันพระในพุทธศาสนา เพื่อให้ผู้ใช้สามารถค้นหาและทราบข้อมูลวันสำคัญทางพุทธศาสนาได้อย่างสะดวก

### ขอบเขตโปรเจกต์
- เว็บแอปพลิเคชันแบบ Single Page Application (SPA)
- รองรับการใช้งานบนอุปกรณ์มือถือและคอมพิวเตร์
- ข้อมูลวันพระครอบคลุมปีปัจจุบันและปีถัดไป

### เป้าหมายผู้ใช้
- ชาวพุทธที่ต้องการทราบวันพระ
- ผู้ที่สนใจปฏิบัติธรรมตามวันสำคัญ
- บุคคลทั่วไปที่ต้องการข้อมูลปฏิทินพุทธศาสนา

## 2. ความต้องการเชิงหน้าที่ (Functional Requirements)

### FR-001: การค้นหาวันพระ
- **UC-001**: ผู้ใช้สามารถเลือกวันที่ผ่านช่องกรอกวันที่ (Date Picker)
- **UC-002**: ระบบแสดงผลว่าวันที่เลือกเป็นวันพระหรือไม่
- **UC-003**: แสดงชื่อวันพระ (เช่น วันเพ็ญ, วันแรม 8 ค่ำ, วันอุโบสถ)
- **UC-004**: แสดงผลด้วยสีและไอคอนที่ชัดเจน

### FR-002: แสดงข้อมูลเพิ่มเติม
- **UC-005**: แสดงความหมายและความสำคัญของวันพระ
- **UC-006**: แสดงกิจกรรมที่ควรปฏิบัติในวันพระ
- **UC-007**: แสดงเวลาที่เหมาะสมสำหรับการปฏิบัติธรรม

### FR-003: แสดงปฏิทินรายเดือน
- **UC-008**: แสดงปฏิทินเดือนปัจจุบัน
- **UC-009**: เน้นวันพระด้วยสีหรือสัญลักษณ์พิเศษ
- **UC-010**: คลิกที่วันในปฏิทินเพื่อดูรายละเอียด

### FR-004: การนำทาง
- **UC-011**: สามารถเปลี่ยนเดือน/ปี ได้
- **UC-012**: ปุ่มกลับไปหน้าวันนี้ได้ง่าย
- **UC-013**: แสดงวันที่ปัจจุบันเด่นชัด

### FR-005: ข้อมูลวันปัจจุบัน
- **UC-014**: แสดงสถานะวันปัจจุบันทันทีที่เข้าเว็บ
- **UC-015**: อัพเดตข้อมูลตามเวลาจริง

## 3. ความต้องการเชิงคุณภาพ (Non-Functional Requirements)

### Performance
- หน้าเว็บโหลดภายใน 3 วินาที
- การค้นหาแสดงผลภายใน 1 วินาที
- ขนาดไฟล์รวมไม่เกิน 2 MB

### Usability  
- **ง่ายต่อการใช้งาน**: UI ไม่ซับซ้อน เหมาะสำหรับผู้ใช้ทุกวัย
- **Responsive Design**: รองรับหน้าจอตั้งแต่ 320px ถึง 1920px
- **Accessibility**: รองรับ Screen Reader และ Keyboard Navigation

### Reliability
- ระบบทำงานได้ 99% ของเวลา
- ข้อมูลวันพระถูกต้องแม่นยำ 100%
- Graceful degradation เมื่อไม่มี Internet

### Security
- ไม่เก็บข้อมูลส่วนตัวของผู้ใช้
- HTTPS เท่านั้น

## 4. ความต้องการระบบ (System Requirements)

### Client-side Requirements
| Component | Requirement |
|-----------|-------------|
| **Browser** | Chrome 90+, Safari 14+, Firefox 88+, Edge 90+ |
| **JavaScript** | ES6+ Support, Enabled |
| **Screen Size** | 320px - 1920px |
| **Internet** | Required for initial load |

### Server-side Requirements
- **Hosting**: Static hosting (GitHub Pages หรือ Vercel)
- **CDN**: Global CDN สำหรับ performance
- **SSL**: HTTPS Certificate
- **ไม่ต้องการ**: Database server, Backend API

## 5. การออกแบบ User Interface

### Layout หน้าจอหลัก
```
┌─────────────────────────────────────┐
│              🙏 วันพระไทย              │
├─────────────────────────────────────┤
│  📅 เลือกวันที่: [DD/MM/YYYY] [ค้นหา]   │
├─────────────────────────────────────┤
│         ผลการค้นหา                   │
│    ✅ วันนี้เป็นวันพระ                │
│      "วันเพ็ญ เดือน 4"              │
│                                     │
│  📖 ความหมาย: วันที่พระจันทร์เต็มดวง    │
│  🙏 กิจกรรม: ฟังธรรม รักษาศีล 8       │
├─────────────────────────────────────┤
│           ปฏิทินเดือนนี้             │
│  [Calendar Widget แสดงวันพระ]        │
└─────────────────────────────────────┘
```

### Color Scheme
| Element | Color | Hex Code |
|---------|-------|----------|
| **วันพระ** | สีเขียว | `#4CAF50` |
| **วันธรรมดา** | สีเทา | `#9E9E9E` |
| **Background** | สีขาวครีม | `#FEFEFE` |
| **Header** | สีน้ำเงินเข้ม | `#1565C0` |
| **Accent** | สีทอง | `#FFB300` |

### Responsive Breakpoints
```css
/* Mobile First */
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
```

## 6. ข้อมูล (Data Requirements)

### โครงสร้างข้อมูลวันพระ
```json
{
  "date": "2024-02-24",
  "isHolyDay": true,
  "type": "full_moon",
  "name": "วันเพ็ญ เดือน 3",
  "description": "วันพระจันทร์เต็มดวงเดือนสาม",
  "activities": [
    "รักษาศีล 8",
    "ฟังธรรมเทศนา",
    "นั่งสมาธิ",
    "ทำบุญตักบาตร"
  ],
  "significance": "เป็นวันสำคัญสำหรับการปฏิบัติธรรม"
}
```

### ประเภทวันพระ
- **วันเพ็ญ** (Full Moon): วันขึ้น 15 ค่ำ
- **วันแรม** (New Moon): วันแรม 15 ค่ำ  
- **วันอุโบสถ** (Observance Day): วันขึ้น-แรม 8 ค่ำ
- **วันพระใหญ่**: วิสาขบูชา, มาฆบูชา, อาสาฬหบูชา

### แหล่งข้อมูล
- **Primary API**: iCAL from Google Calendar (`n7kthnfuc8uldm955sfkpjt244@group.calendar.google.com`)
- **Secondary Source**: Thai Buddhism Calendar (sites.google.com/site/thaibuddhismcalendar)
- **Official Reference**: สำนักงานพุทธศาสนาแห่งชาติ
- **Data Coverage**: ปี พ.ศ. 2550 - ปัจจุบัน (อัพเดตต่อเนื่อง)

## 7. API และการเชื่อมต่อข้อมูล

### Data Source Options

#### **Option 1: iCAL API (แนะนำหลัก)**
```
iCAL URL: https://www.google.com/calendar/ical/n7kthnfuc8uldm955sfkpjt244%40group.calendar.google.com/public/basic.ics
Format: iCalendar (.ics)
Update: ต่อเนื่อง (ล่าสุด 2024-01-17)
Coverage: ปี พ.ศ. 2550 - ปัจจุบัน
ข้อดี: เสถียร, มาตรฐาน, API-friendly
ข้อเสีย: ข้อมูลภาษาอังกฤษ, format ซับซ้อน
```

#### **Option 2: Sanook.com (ข้อมูลไทยครบถ้วน)**
```
URL: https://www.sanook.com/horoscope/295859/
Format: HTML (Web Scraping)
Update: ประจำปี
Coverage: ปี พ.ศ. 2568 (2025) และปีต่อๆ ไป
ข้อดี: ข้อมูลภาษาไทย, ครบถ้วน, มีวันพระใหญ่
ข้อเสีย: ต้อง scrape, ไม่เสถียร, copyright
```

#### **Option 3: Hybrid Approach (แนะนำสุด)**
```
Primary: iCAL API สำหรับความเสถียร
Secondary: Sanook scraping สำหรับข้อมูลไทย
Fallback: Static JSON สำหรับ offline
Validation: Cross-check ระหว่าง sources
```

### Data Source Strategy Matrix

| Criteria | iCAL API | Sanook.com | Static JSON | Hybrid |
|----------|----------|------------|-------------|---------|
| **Reliability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Data Quality** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Thai Language** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Maintenance** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

### วันพระตามสัญลักษณ์
- **🌓 ขึ้น 8 ค่ำ**: วันอุโบสถ
- **🌕 ขึ้น 15 ค่ำ**: วันเพ็ญ (วันพระ)
- **🌗 แรม 8 ค่ำ**: วันอุโบสถ  
- **🌑 แรม 15/14 ค่ำ**: วันแรม (วันพระ)
- **☸️ วันพระใหญ่**: วิสาขบูชา, มาฆบูชา, อาสาฬหบูชา

### วันพระใหญ่จาก Sanook Data
- **วันมาฆบูชา**: ขึ้น 15 ค่ำ เดือน 3
- **วันวิสาขบูชา**: ขึ้น 15 ค่ำ เดือน 6  
- **วันอาสาฬหบูชา**: ขึ้น 15 ค่ำ เดือน 8
- **วันเข้าพรรษา**: แรม 1 ค่ำ เดือน 8
- **วันออกพรรษา**: ขึ้น 15 ค่ำ เดือน 11

### API Architecture Options

#### **Option A: Single Source (iCAL Only)**
```
Frontend (React)
    ↓ HTTP Request
Vercel Function (/api/holy-day)
    ↓ Fetch & Parse
iCAL Data (Google Calendar)
    ↓ Process & Cache
JSON Response
```

#### **Option B: Multi-Source Validation**
```
Frontend (React)
    ↓ HTTP Request
Vercel Function (/api/holy-day)
    ↓ Parallel Fetch
┌─ iCAL API ─┐    ┌─ Sanook Scraper ─┐
│  Primary   │    │    Secondary     │
└─────────────┘    └──────────────────┘
    ↓ Cross-Validation & Merge
Enhanced JSON Response
```

#### **Option C: Pre-processed Hybrid**
```
Build Process:
├── Scrape Sanook → Generate base JSON
├── Fetch iCAL → Enhance JSON
└── Deploy static data

Runtime:
Frontend → Static JSON (Fast)
Background: Periodic validation with live APIs
```

### API Endpoints Design
```javascript
// GET /api/holy-day?date=2024-12-25&source=hybrid
{
  "date": "2024-12-25",
  "isHolyDay": true,
  "type": "full_moon",
  "name": "วันเพ็ญ เดือน 12",
  "icon": "🌕",
  "thaiMonth": "เดือนสิบสอง (12)",
  "thaiYear": "ปีมะเส็ง",
  "description": "วันพระจันทร์เต็มดวง",
  "activities": ["รักษาศีล 8", "ฟังธรรม", "นั่งสมาธิ"],
  "sources": {
    "ical": true,
    "sanook": true,
    "confidence": "high"
  }
}

// GET /api/holy-days?month=12&year=2024&source=sanook
{
  "month": 12,
  "year": 2024,
  "source": "sanook",
  "holyDays": [...],
  "majorHolyDays": [
    {
      "date": "2024-12-05",
      "name": "วันออกพรรษา",
      "type": "major",
      "icon": "☸️"
    }
  ]
}
```

### Data Caching Strategy
- **Client Cache**: localStorage (7 วัน)
- **Server Cache**: Vercel KV (24 ชั่วโมง)  
- **CDN Cache**: Headers max-age=3600
- **Background Sync**: อัพเดตข้อมูลทุก 6 ชั่วโมง
- **Source Rotation**: fallback เมื่อ primary source ล่ม

## 8. ข้อกำหนดทางเทคนิค

### Technology Stack
| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend Framework** | React.js | 18+ | UI Components |
| **CSS Framework** | Tailwind CSS | 3+ | Styling |
| **Date Library** | Day.js | 1.11+ | Date Manipulation |
| **API Parser** | ical.js | 1.5+ | Parse iCAL Data |
| **Web Scraper** | Cheerio/Puppeteer | Latest | Sanook Data Extraction |
| **HTTP Client** | Fetch API | Native | API Calls |
| **Build Tool** | Vite | 4+ | Development & Build |
| **Serverless** | Vercel Functions | Latest | API Backend |
| **Caching** | Vercel KV | Latest | Multi-source Data Caching |
| **Deployment** | Vercel | Latest | Hosting |
| **Version Control** | Git + GitHub | Latest | Source Control |

### Project Structure
```
buddhist-days-app/
├── api/
│   ├── holy-day.js         # Single day check API
│   ├── holy-days.js        # Month/Year data API  
│   ├── scrape-sanook.js    # Sanook data scraper
│   └── utils/
│       ├── icalParser.js   # iCAL parsing logic
│       ├── sanookScraper.js # Sanook scraping logic
│       ├── dataValidator.js # Cross-source validation
│       └── cache.js        # Multi-source caching
├── data/
│   ├── static-holy-days.json # Fallback data
│   └── sources-config.json   # Data source configuration
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Calendar.jsx
│   │   ├── DatePicker.jsx
│   │   ├── HolyDayCard.jsx
│   │   ├── SourceIndicator.jsx # แสดง data source
│   │   └── Layout.jsx
│   ├── services/
│   │   ├── api.js          # Frontend API calls
│   │   └── sourceManager.js # Manage multiple sources
│   ├── utils/
│   │   ├── dateHelper.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json             # Vercel configuration
└── README.md
```

### Performance Optimization
- **Code Splitting**: Lazy loading components
- **Image Optimization**: WebP format, responsive images
- **Caching**: Service Worker สำหรับ offline
- **Bundle Size**: < 500KB gzipped

## 9. Timeline การพัฒนา

### Phase 1: MVP 
- [x] Setup โปรเจกต์ React + Tailwind
- [x] สร้าง UI หน้าหลัก  
- [ ] สร้าง Vercel Function สำหรับ iCAL API
- [ ] ระบบค้นหาวันพระพื้นฐาน (เชื่อมต่อ API)
- [ ] Deploy บน Vercel

### Phase 2: Enhanced Features 
- [ ] เพิ่มปฏิทินรายเดือน interactive (ใช้ API data)
- [ ] ข้อมูลเพิ่มเติมของแต่ละวันพระ
- [ ] Caching system (client + server)
- [ ] Responsive design สำหรับมือถือ
- [ ] Error handling & offline fallback

### Phase 3: Polish & Testing 
- [ ] Performance optimization (API & caching)
- [ ] UI/UX improvements
- [ ] ทดสอบครอบคลุมทุก browser
- [ ] API rate limiting & monitoring
- [ ] Accessibility compliance
- [ ] Documentation

## 9. การทดสอบ (Testing Strategy)

### Unit Testing
- [ ] ฟังก์ชันคำนวณวันพระ
- [ ] iCAL parsing functions
- [ ] Date helper functions
- [ ] Component rendering
- [ ] API endpoint functions

### Integration Testing  
- [ ] API integration (frontend ↔ backend)
- [ ] iCAL data fetching & parsing
- [ ] Caching system functionality
- [ ] Error handling flows

### API Testing
- [ ] `/api/holy-day` endpoint responses
- [ ] `/api/holy-days` month data
- [ ] Error handling (network failures)
- [ ] Performance (< 2s response time)
- [ ] Rate limiting behavior

### User Acceptance Testing
| Test Case | Expected Result | Status |
|-----------|----------------|--------|
| ค้นหาวันพระที่ถูกต้อง | แสดงผล "เป็นวันพระ" พร้อมรายละเอียด | ⏳ |
| ค้นหาวันธรรมดา | แสดงผล "ไม่ใช่วันพระ" | ⏳ |
| เปิดใช้บนมือถือ | แสดงผลเรียบร้อย responsive | ⏳ |
| เปลี่ยนเดือนในปฏิทิน | อัพเดตข้อมูลถูกต้อง | ⏳ |
| โหลดหน้าเว็บ | โหลดเสร็จภายใน 3 วินาที | ⏳ |

### Browser Compatibility Testing
- [x] Chrome (Desktop/Mobile)
- [x] Safari (Desktop/Mobile)  
- [x] Firefox (Desktop)
- [x] Edge (Desktop)

## 10. Deployment & Maintenance

### Deployment Process
1. **Development**: Local development server
2. **Staging**: Vercel preview deployment
3. **Production**: Vercel production deployment
4. **Monitoring**: Vercel Analytics

### Maintenance Plan
- **ข้อมูลวันพระ**: อัพเดตปีละครั้ง (ธันวาคม)
- **Security Updates**: ทุกเดือน
- **Feature Updates**: ตามความต้องการ
- **Bug Fixes**: ภายใน 48 ชั่วโมง

### Backup Strategy
- **Source Code**: GitHub repository
- **Data**: JSON files ใน repository
- **Deployment**: Auto-backup ใน Vercel

---

## เอกสารอ้างอิง
- [Thai Buddhism Calendar - Google Sites](https://sites.google.com/site/thaibuddhismcalendar)
- [iCAL Buddhist Calendar Data](https://www.google.com/calendar/ical/n7kthnfuc8uldm955sfkpjt244%40group.calendar.google.com/public/basic.ics)
- [Sanook.com - ปฏิทินวันพระปี 2568](https://www.sanook.com/horoscope/295859/)
- [ปฏิทินพุทธศาสนา - สำนักงานพุทธศาสนาแห่งชาติ](https://www.onab.go.th)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [iCal.js Library](https://github.com/mozilla-comm/ical.js)
- [Cheerio - Server-side jQuery](https://cheerio.js.org/)
- [Vercel Functions Documentation](https://vercel.com/docs/functions)

---


> **หมายเหตุ**: เอกสาร SRS นี้เป็นเวอร์ชันเบื้องต้น สามารถปรับแก้ไขได้ตามความต้องการและข้อเสนอแนะจากผู้มีส่วนเกี่ยวข้อง