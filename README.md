# 🙏 วันพระไทย - Buddhist Holy Days Web Application

เว็บแอปพลิเคชันสำหรับตรวจสอบวันพระและวันสำคัญทางพุทธศาสนา พัฒนาด้วย React + Vite และ Tailwind CSS

## ✨ คุณสมบัติ

- 🔍 **ค้นหาวันพระ** - ตรวจสอบวันพระตามวันที่ที่เลือก
- 📅 **ปฏิทินรายเดือน** - แสดงวันพระทั้งเดือนพร้อมสัญลักษณ์
- 🌕 **ข้อมูลครบถ้วน** - วันเพ็ญ, วันแรม, วันอุโบสถ, วันพระใหญ่
- 📱 **Responsive Design** - ใช้งานได้ทั้งมือถือและคอมพิวเตอร์
- 🇹🇭 **ภาษาไทย** - ข้อมูลและ UI เป็นภาษาไทยทั้งหมด
- ⚡ **Performance** - โหลดเร็ว < 3 วินาที
- 🎨 **Thai Design** - ออกแบบตามหลัก Thai UX/UI

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 18+** - JavaScript library สำหรับ UI
- **Vite 4+** - Build tool ที่เร็วและทันสมัย
- **Tailwind CSS 3+** - Utility-first CSS framework
- **Day.js** - Library สำหรับจัดการวันที่

### Backend
- **Vercel Functions** - Serverless API endpoints
- **iCAL.js** - Parser สำหรับข้อมูล iCAL
- **Fallback Data** - ข้อมูลสำรองในกรณี API ล่ม

## 🚀 การติดตั้งและรัน

### ข้อกำหนดระบบ
- Node.js 18+ 
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd monk_day
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **รันในโหมด development**
   ```bash
   npm run dev
   ```

4. **เปิดเบราว์เซอร์**
   ```
   http://localhost:3000
   ```

### การ Build สำหรับ Production

```bash
npm run build
npm run preview
```

## 📁 โครงสร้างโปรเจกต์

```
monk_day/
├── api/
│   └── holy-day.js          # Vercel API function
├── src/
│   ├── components/
│   │   ├── Layout.jsx       # Layout หลัก
│   │   ├── DatePicker.jsx   # เลือกวันที่
│   │   ├── HolyDayCard.jsx  # แสดงข้อมูลวันพระ
│   │   ├── Calendar.jsx     # ปฏิทินรายเดือน
│   │   └── LoadingSpinner.jsx # Loading state
│   ├── App.jsx              # Component หลัก
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── vercel.json              # Vercel deployment config
└── README.md                # เอกสารนี้
```

## 🔌 API Endpoints

### GET `/api/holy-day`

ตรวจสอบวันพระสำหรับวันที่เฉพาะ

**Parameters:**
- `date` (optional) - วันที่ในรูปแบบ YYYY-MM-DD (default: วันปัจจุบัน)
- `source` (optional) - แหล่งข้อมูล: `hybrid`, `ical`, `fallback` (default: hybrid)

**Response:**
```json
{
  "date": "2024-01-13",
  "isHolyDay": true,
  "type": "full_moon",
  "name": "วันเพ็ญ เดือน 2",
  "icon": "🌕",
  "thaiMonth": "เดือนสอง (2)",
  "thaiYear": "ปีมะเส็ง",
  "dayOfWeek": "วันเสาร์",
  "description": "วันพระจันทร์เต็มดวง เป็นวันสำคัญสำหรับการปฏิบัติธรรม",
  "activities": ["รักษาศีล 8", "ฟังธรรมเทศนา", "นั่งสมาธิ", "ทำบุญตักบาตร"],
  "majorHolyDay": { "is": false, "name": null },
  "sources": { "ical": false, "fallback": true, "confidence": "medium" }
}
```

### GET `/api/holy-day?month=1&year=2024`

ดึงข้อมูลวันพระทั้งเดือน

**Response:**
```json
{
  "month": 1,
  "year": 2024,
  "thaiYear": "ปีมะเส็ง",
  "holyDays": [
    {
      "date": "2024-01-06",
      "type": "quarter",
      "name": "ขึ้น 8 ค่ำ เดือน 2",
      "icon": "🌓"
    }
  ],
  "majorHolyDays": []
}
```

## 🎨 การออกแบบ

### สีหลัก
- **Holy Green**: `#4CAF50` - สีหลักสำหรับวันพระ
- **Holy Gold**: `#FFD700` - สำหรับวันพระใหญ่
- **Thai Blue**: `#1976D2` - สีเสริม

### ฟอนต์
- **Noto Sans Thai** - ฟอนต์หลักสำหรับภาษาไทย
- **Inter** - ฟอนต์เสริมสำหรับภาษาอังกฤษ

### ไอคอน
- 🌕 วันเพ็ญ (Full Moon)
- 🌑 วันแรม (New Moon)  
- 🌓 วันอุโบสถ (Quarter Moon)
- ⭐ วันพระใหญ่ (Major Holy Day)
- ☸️ สัญลักษณ์พุทธศาสนา

## 📊 Performance

- **Page Load**: < 3 วินาที
- **API Response**: < 2 วินาที
- **Bundle Size**: < 500KB gzipped
- **Mobile First**: รองรับ 320px+
- **Lighthouse Score**: 90+

## 🔄 Data Sources

1. **Primary**: Google Calendar iCAL API
2. **Secondary**: Fallback JSON data
3. **Caching**: Browser cache + Vercel KV

## 🚀 Deployment

### Vercel (แนะนำ)

1. **เชื่อมต่อ GitHub**
   ```bash
   vercel --prod
   ```

2. **ตั้งค่า Environment Variables** (ถ้ามี)

3. **Custom Domain** (optional)

### การตั้งค่า Vercel

```json
{
  "functions": {
    "api/holy-day.js": {
      "maxDuration": 10
    }
  }
}
```

## 🧪 การทดสอบ

### ทดสอบ Manual
- ✅ วันพระที่ถูกต้อง
- ✅ วันธรรมดาที่ไม่ใช่วันพระ  
- ✅ วันพระใหญ่พิเศษ
- ✅ Responsive design
- ✅ Performance บนมือถือ

### ทดสอบ API
```bash
# ทดสอบวันปัจจุบัน
curl https://your-domain.vercel.app/api/holy-day

# ทดสอบวันที่เฉพาะ
curl https://your-domain.vercel.app/api/holy-day?date=2024-01-13

# ทดสอบข้อมูลรายเดือน
curl https://your-domain.vercel.app/api/holy-day?month=1&year=2024
```

## 🤝 การมีส่วนร่วม

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add amazing feature'`)
4. Push ไปยัง branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

## 📝 License

MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 🙏 กิตติกรรมประกาศ

- ข้อมูลวันพระอ้างอิงจากปฏิทินพุทธศาสนาไทย
- Icons จาก Unicode Emoji
- Fonts จาก Google Fonts

## 📞 ติดต่อ

- 📧 Email: [your-email@example.com]
- 🐙 GitHub: [your-github-username]
- 🌐 Website: [your-website.com]

---

**🙏 สาธุ สาธุ สาธุ 🙏**

*พัฒนาด้วยความเคารพต่อพระพุทธศาสนา*