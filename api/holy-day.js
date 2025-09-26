// ข้อมูลวันพระไทย (Thai Buddhist Holy Days Data)
const fallbackHolyDays = {
  // มกราคม 2568 (2025) - เดือนยี่(๒)
  '2025-01-06': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนยี่(๒)', icon: '🌓' },
  '2025-01-13': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนยี่(๒)', icon: '🌕' },
  '2025-01-21': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนยี่(๒)', icon: '🌗' },
  '2025-01-28': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนยี่(๒)', icon: '🌑' },
  
  // กุมภาพันธ์ 2568 (2025) - เดือนสาม(๓) - มาฆบูชา
  '2025-02-05': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสาม(๓)', icon: '🌓' },
  '2025-02-12': { type: 'full_moon', name: 'วันมาฆบูชา - ขึ้น 15 ค่ำ เดือนสาม(๓)', icon: '🌕', major: true },
  '2025-02-20': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสาม(๓)', icon: '🌗' },
  '2025-02-26': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนสาม(๓)', icon: '🌑' },
  
  // มีนาคม 2568 (2025) - เดือนสี่(๔)
  '2025-03-06': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสี่(๔)', icon: '🌓' },
  '2025-03-13': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนสี่(๔)', icon: '🌕' },
  '2025-03-21': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสี่(๔)', icon: '🌗' },
  '2025-03-28': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสี่(๔)', icon: '🌑' },
  
  // เมษายน 2568 (2025) - เดือนห้า(๕)
  '2025-04-05': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนห้า(๕)', icon: '🌓' },
  '2025-04-12': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนห้า(๕)', icon: '🌕' },
  '2025-04-20': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนห้า(๕)', icon: '🌗' },
  '2025-04-26': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนห้า(๕)', icon: '🌑' },
  
  // พฤษภาคม 2568 (2025) - เดือนหก(๖) - วิสาขบูชา, ฉัตรมงคล, อัฏฐมีบูชา
  '2025-05-04': { type: 'quarter', name: 'วันฉัตรมงคล - ขึ้น 8 ค่ำ เดือนหก(๖)', icon: '🌓', major: true },
  '2025-05-11': { type: 'full_moon', name: 'วันวิสาขบูชา - ขึ้น 15 ค่ำ เดือนหก(๖)', icon: '🌕', major: true },
  '2025-05-19': { type: 'quarter', name: 'วันอัฏฐมีบูชา - แรม 8 ค่ำ เดือนหก(๖)', icon: '🌗', major: true },
  '2025-05-26': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนหก(๖)', icon: '🌑' },
  
  // มิถุนายน 2568 (2025) - เดือนเจ็ด(๗)
  '2025-06-03': { type: 'quarter', name: 'วันเฉลิมฯ พระบรมราชินี - ขึ้น 8 ค่ำ เดือนเจ็ด(๗)', icon: '🌓', major: true },
  '2025-06-10': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนเจ็ด(๗)', icon: '🌕' },
  '2025-06-18': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนเจ็ด(๗)', icon: '🌗' },
  '2025-06-25': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนเจ็ด(๗)', icon: '🌑' },
  
  // กรกฎาคม 2568 (2025) - เดือนแปด(๘) - อาสาฬหบูชา, เข้าพรรษา
  '2025-07-03': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนแปด(๘)', icon: '🌓' },
  '2025-07-10': { type: 'full_moon', name: 'วันอาสาฬหบูชา - ขึ้น 15 ค่ำ เดือนแปด(๘)', icon: '🌕', major: true },
  '2025-07-11': { type: 'special', name: 'วันเข้าพรรษา - แรม 1 ค่ำ เดือนแปด(๘)', icon: '⭐', major: true },
  '2025-07-18': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนแปด(๘)', icon: '🌗' },
  '2025-07-25': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนแปด(๘)', icon: '🌑' },
  
  // สิงหาคม 2568 (2025) - เดือนเก้า(๙)
  '2025-08-02': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนเก้า(๙)', icon: '🌓' },
  '2025-08-09': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนเก้า(๙)', icon: '🌕' },
  '2025-08-17': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนเก้า(๙)', icon: '🌗' },
  '2025-08-23': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนเก้า(๙)', icon: '🌑' },
  '2025-08-31': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบ(๑๐)', icon: '🌓' },
  
  // กันยายน 2568 (2025) - เดือนสิบ(๑๐)
  '2025-09-07': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนสิบ(๑๐)', icon: '🌕' },
  '2025-09-15': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบ(๑๐)', icon: '🌗' },
  '2025-09-22': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสิบ(๑๐)', icon: '🌑' },
  '2025-09-30': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบเอ็ด(๑๑)', icon: '🌓' },
  
  // ตุลาคม 2568 (2025) - เดือนสิบเอ็ด(๑๑) - ออกพรรษา
  '2025-10-07': { type: 'full_moon', name: 'วันออกพรรษา - ขึ้น 15 ค่ำ เดือนสิบเอ็ด(๑๑)', icon: '🌕', major: true },
  '2025-10-15': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบเอ็ด(๑๑)', icon: '🌗' },
  '2025-10-21': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนสิบเอ็ด(๑๑)', icon: '🌑' },
  '2025-10-29': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบสอง(๑๒)', icon: '🌓' },
  
  // พฤศจิกายน 2568 (2025) - เดือนสิบสอง(๑๒) - ลอยกระทง
  '2025-11-05': { type: 'full_moon', name: 'วันลอยกระทง - ขึ้น 15 ค่ำ เดือนสิบสอง(๑๒)', icon: '🌕', major: true },
  '2025-11-13': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบสอง(๑๒)', icon: '🌗' },
  '2025-11-20': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสิบสอง(๑๒)', icon: '🌑' },
  '2025-11-28': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนอ้าย(๑)', icon: '🌓' },
  
  // ธันวาคม 2568 (2025) - เดือนอ้าย(๑)
  '2025-12-05': { type: 'full_moon', name: 'วันพ่อ - ขึ้น 15 ค่ำ เดือนอ้าย(๑)', icon: '🌕', major: true },
  '2025-12-13': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนอ้าย(๑)', icon: '🌗' },
  '2025-12-19': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนอ้าย(๑)', icon: '🌑' },
  '2025-12-27': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนยี่(๒)', icon: '🌓' },

  // === ปี 2569 (2026) ===
  
  // มกราคม 2569 (2026) - เดือนยี่(๒)
  '2026-01-03': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนยี่(๒)', icon: '🌕' },
  '2026-01-11': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนยี่(๒)', icon: '🌗' },
  '2026-01-18': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนยี่(๒)', icon: '🌑' },
  '2026-01-26': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสาม(๓)', icon: '🌓' },
  
  // กุมภาพันธ์ 2569 (2026) - เดือนสาม(๓)
  '2026-02-02': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนสาม(๓)', icon: '🌕' },
  '2026-02-10': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสาม(๓)', icon: '🌗' },
  '2026-02-16': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนสาม(๓)', icon: '🌑' },
  '2026-02-24': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสี่(๔)', icon: '🌓' },
  
  // มีนาคม 2569 (2026) - เดือนสี่(๔)
  '2026-03-03': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนสี่(๔)', icon: '🌕' },
  '2026-03-11': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสี่(๔)', icon: '🌗' },
  '2026-03-18': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสี่(๔)', icon: '🌑' },
  '2026-03-26': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนห้า(๕)', icon: '🌓' },
  
  // เมษายน 2569 (2026) - เดือนห้า(๕)
  '2026-04-02': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนห้า(๕)', icon: '🌕' },
  '2026-04-10': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนห้า(๕)', icon: '🌗' },
  '2026-04-16': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนห้า(๕)', icon: '🌑' },
  '2026-04-24': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนหก(๖)', icon: '🌓' },
  
  // พฤษภาคม 2569 (2026) - เดือนหก(๖) - วิสาขบูชา
  '2026-05-01': { type: 'full_moon', name: 'วันวิสาขบูชา - ขึ้น 15 ค่ำ เดือนหก(๖)', icon: '🌕', major: true },
  '2026-05-09': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนหก(๖)', icon: '🌗' },
  '2026-05-16': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนหก(๖)', icon: '🌑' },
  '2026-05-24': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนเจ็ด(๗)', icon: '🌓' },
  '2026-05-31': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนเจ็ด(๗)', icon: '🌕' },
  
  // มิถุนายน 2569 (2026) - เดือนเจ็ด(๗)
  '2026-06-08': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนเจ็ด(๗)', icon: '🌗' },
  '2026-06-14': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนเจ็ด(๗)', icon: '🌑' },
  '2026-06-22': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนแปด(๘)', icon: '🌓' },
  '2026-06-29': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนแปด(๘)', icon: '🌕' },
  
  // กรกฎาคม 2569 (2026) - เดือนแปด(๘) - อาสาฬหบูชา, เข้าพรรษา และเดือนแปดหลัง
  '2026-07-07': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนแปด(๘)', icon: '🌗' },
  '2026-07-14': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนแปด(๘)', icon: '🌑' },
  '2026-07-22': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนแปดหลัง(๘๘)', icon: '🌓' },
  '2026-07-29': { type: 'full_moon', name: 'วันอาสาฬหบูชา - ขึ้น 15 ค่ำ เดือนแปดหลัง(๘๘)', icon: '🌕', major: true },
  '2026-07-30': { type: 'special', name: 'วันเข้าพรรษา - แรม 1 ค่ำ เดือนแปดหลัง(๘๘)', icon: '⭐', major: true },
  
  // สิงหาคม 2569 (2026) - เดือนแปดหลัง(๘๘) - เดือนอธิกมาส
  '2026-08-06': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนแปดหลัง(๘๘)', icon: '🌗' },
  '2026-08-13': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนแปดหลัง(๘๘)', icon: '🌑' },
  '2026-08-21': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนเก้า(๙)', icon: '🌓' },
  '2026-08-28': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนเก้า(๙)', icon: '🌕' },
  
  // กันยายน 2569 (2026) - เดือนเก้า(๙)
  '2026-09-05': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนเก้า(๙)', icon: '🌗' },
  '2026-09-11': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนเก้า(๙)', icon: '🌑' },
  '2026-09-19': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบ(๑๐)', icon: '🌓' },
  '2026-09-26': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนสิบ(๑๐)', icon: '🌕' },
  
  // ตุลาคม 2569 (2026) - เดือนสิบ(๑๐)
  '2026-10-04': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบ(๑๐)', icon: '🌗' },
  '2026-10-11': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสิบ(๑๐)', icon: '🌑' },
  '2026-10-19': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบเอ็ด(๑๑)', icon: '🌓' },
  '2026-10-26': { type: 'full_moon', name: 'วันออกพรรษา - ขึ้น 15 ค่ำ เดือนสิบเอ็ด(๑๑)', icon: '🌕', major: true },
  
  // พฤศจิกายน 2569 (2026) - เดือนสิบเอ็ด(๑๑)
  '2026-11-03': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบเอ็ด(๑๑)', icon: '🌗' },
  '2026-11-09': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนสิบเอ็ด(๑๑)', icon: '🌑' },
  '2026-11-17': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบสอง(๑๒)', icon: '🌓' },
  '2026-11-24': { type: 'full_moon', name: 'วันลอยกระทง - ขึ้น 15 ค่ำ เดือนสิบสอง(๑๒)', icon: '🌕', major: true },
  
  // ธันวาคม 2569 (2026) - เดือนสิบสอง(๑๒)
  '2026-12-02': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบสอง(๑๒)', icon: '🌗' },
  '2026-12-09': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสิบสอง(๑๒)', icon: '🌑' },
  '2026-12-17': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนอ้าย(๑)', icon: '🌓' },
  '2026-12-24': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนอ้าย(๑)', icon: '🌕' },
};

// ข้อมูลกิจกรรมและคำอธิบายสำหรับแต่ละประเภทวันพระ
const HOLY_DAY_INFO = {
  full_moon: {
    description: 'วันพระจันทร์เต็มดวง เป็นวันสำคัญสำหรับการปฏิบัติธรรม การรักษาศีล และการทำบุญ',
    activities: [
      'รักษาศีล 8 ประการ',
      'ฟังธรรมเทศนา',
      'นั่งสมาธิ',
      'ทำบุญตักบาตร',
      'ถวายเทียนพรรษา',
      'สวดมนต์',
      'ทำความดีต่างๆ'
    ]
  },
  new_moon: {
    description: 'วันพระจันทร์มืด เป็นวันสำหรับการสะท้อนตนเอง การปฏิบัติธรรม และการทำจิตใจให้สงบ',
    activities: [
      'รักษาศีล 5 หรือ 8 ประการ',
      'นั่งสมาธิ',
      'สวดมนต์',
      'อ่านหนังสือธรรม',
      'ทำบุญ',
      'ปฏิบัติจิตตภาวนา'
    ]
  },
  quarter: {
    description: 'วันอุโบสถ เป็นวันสำหรับการปฏิบัติธรรม การรักษาศีล และการเข้าวัด',
    activities: [
      'รักษาศีล 8 ประการ',
      'เข้าวัดฟังธรรม',
      'ทำบุญตักบาตร',
      'สวดมนต์',
      'นั่งสมาธิ',
      'ทำความดี'
    ]
  },
  special: {
    description: 'วันพระใหญ่ วันสำคัญทางพุทธศาสนา ที่มีความหมายพิเศษ',
    activities: [
      'รักษาศีล 8 ประการ',
      'เข้าร่วมพิธีกรรมพิเศษ',
      'ฟังธรรมเทศนา',
      'ทำบุญใหญ่',
      'ถวายสังฆทาน',
      'นั่งสมาธิ',
      'ปฏิบัติธรรมเป็นพิเศษ'
    ]
  },
  major: {
    description: 'วันพระใหญ่ วันสำคัญทางพุทธศาสนา',
    activities: [
      'ไปวัด',
      'ฟังเทศน์',
      'ทำบุญใหญ่',
      'รักษาศีล 8 ประการ',
      'นั่งสมาธิ',
      'เวียนเทียน 3 รอบ'
    ]
  }
};

// ข้อมูลวันพระใหญ่พิเศษ
const MAJOR_HOLY_DAYS = {
  'วันวิสาขบูชา': {
    description: 'วันที่พระพุทธเจ้าประสูติ ตรัสรู้ และปรินิพพาน เป็นวันสำคัญที่สุดของพุทธศาสนา',
    significance: 'วันสำคัญสากลของพุทธศาสนา',
    activities: [
      'เวียนเทียน 3 รอบ',
      'ฟังธรรมเทศนาพิเศษ',
      'ทำบุญใหญ่',
      'รักษาศีล 8 ประการ',
      'ถวายสังฆทาน',
      'ปล่อยนกปล่อยปลา',
      'ทำความดีเป็นพิเศษ'
    ]
  },
  'วันอาสาฬหบูชา': {
    description: 'วันที่พระพุทธเจ้าทรงแสดงธรรมจักกัปปวัตตนสูตร และเป็นวันเกิดพระสงฆ์',
    significance: 'วันเกิดพระไตรรัตน์ครบองค์',
    activities: [
      'เวียนเทียน 3 รอบ',
      'ฟังธรรมเทศนาเรื่องธรมจักร',
      'ทำบุญใหญ่',
      'รักษาศีล 8 ประการ',
      'ถวายสังฆทาน',
      'ปฏิบัติธรรมเป็นพิเศษ'
    ]
  },
  'วันเข้าพรรษา': {
    description: 'วันเริ่มต้นฤดูพรรษา พระสงฆ์จำพรรษาอยู่ประจำวัด 3 เดือน',
    significance: 'วันเริ่มต้นการปฏิบัติธรรมเข้มข้น',
    activities: [
      'ถวายเทียนพรรษา',
      'ถวายผ้าอาบน้ำฝน',
      'ทำบุญเข้าพรรษา',
      'รักษาศีล 8 ประการ',
      'ฟังธรรมเทศนา',
      'ปฏิบัติธรรมเป็นพิเศษ'
    ]
  },
  'วันออกพรรษา': {
    description: 'วันสิ้นสุดฤดูพรรษา พระสงฆ์สามารถเดินทางไปไหนมาไหนได้',
    significance: 'วันสิ้นสุดการจำพรรษา',
    activities: [
      'ทำบุญตักบาตรเทโว',
      'ถวายกฐิน',
      'ฟังธรรมเทศนา',
      'รักษาศีล 8 ประการ',
      'ทำบุญใหญ่',
      'เวียนเทียน'
    ]
  },
  'วันลอยกระทง': {
    description: 'วันขอขมาพระแม่คงคา และสะเดาะเคราะห์ ลอยกระทงเพื่อความเป็นสิริมงคล',
    significance: 'วันขอขมาและสะเดาะเคราะห์',
    activities: [
      'ลอยกระทง',
      'จุดประทีป',
      'สวดมนต์ขอขมา',
      'ทำบุญ',
      'รักษาศีล',
      'ปล่อยโคมลอย'
    ]
  }
};



// ฟังก์ชันสำหรับดึงข้อมูลวันพระ
function getHolyDayData(date) {
  const dateStr = date; // ใช้ date string โดยตรง (YYYY-MM-DD)
  
  if (fallbackHolyDays[dateStr]) {
    return {
      found: true,
      data: fallbackHolyDays[dateStr]
    };
  }
  
  return { found: false };
}

// ฟังก์ชันหลักสำหรับ API endpoint
export default async function handler(req, res) {
  // ตั้งค่า CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { date, month, year, source = 'hybrid' } = req.query;
    
    // ถ้าขอข้อมูลรายเดือน
    if (month && year) {
      return handleMonthRequest(req, res, month, year);
    }
    
    // ถ้าไม่มี date ให้ใช้วันปัจจุบัน
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
      return res.status(400).json({ 
        error: 'Invalid date format. Use YYYY-MM-DD' 
      });
    }
    
    // ดึงข้อมูลวันพระจากระบบ
    const holyDayResult = getHolyDayData(targetDate);
    
    // สร้าง response
    const dateObj = new Date(targetDate);
    const isHolyDay = holyDayResult.found;
    
    let holyDayData = null;
    if (holyDayResult.found) {
      holyDayData = holyDayResult.data;
    }
    
    // สร้าง response object
    const response = {
      date: targetDate,
      isHolyDay,
      dayOfWeek: dateObj.toLocaleDateString('th-TH', { weekday: 'long' }),
      sources: {
        internal: holyDayResult.found,
        confidence: holyDayResult.found ? 'high' : 'low'
      }
    };
    
    if (isHolyDay && holyDayData) {
      const thaiMonth = getThaiMonth(dateObj.getMonth() + 1);
      const thaiYear = getThaiYear(dateObj.getFullYear());
      const info = HOLY_DAY_INFO[holyDayData.type] || HOLY_DAY_INFO.quarter;
      
      response.type = holyDayData.type;
      response.name = holyDayData.name;
      response.icon = holyDayData.icon;
      response.thaiMonth = thaiMonth;
      response.thaiYear = thaiYear;
      response.description = info.description;
      response.activities = info.activities;
      response.majorHolyDay = {
        is: holyDayData.major || false,
        name: holyDayData.major ? holyDayData.name : null
      };
    } else {
      response.type = null;
      response.name = null;
      response.icon = null;
      response.majorHolyDay = { is: false, name: null };
    }
    
    // Cache headers
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
    
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// ฟังก์ชันสำหรับจัดการ request รายเดือน
async function handleMonthRequest(req, res, month, year) {
  try {
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (monthNum < 1 || monthNum > 12 || yearNum < 2020 || yearNum > 2030) {
      return res.status(400).json({ error: 'Invalid month or year' });
    }
    
    const holyDays = [];
    const majorHolyDays = [];
    
    // วนลูปทุกวันในเดือน
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${yearNum}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const holyDayResult = getHolyDayData(dateStr);
      
      if (holyDayResult.found) {
        const dayData = {
          date: dateStr,
          type: holyDayResult.data.type,
          name: holyDayResult.data.name,
          icon: holyDayResult.data.icon
        };
        
        if (holyDayResult.data.major) {
          majorHolyDays.push({
            ...dayData,
            major: true
          });
        } else {
          holyDays.push(dayData);
        }
      }
    }
    
    const response = {
      month: monthNum,
      year: yearNum,
      thaiYear: getThaiYear(yearNum),
      holyDays,
      majorHolyDays
    };
    
    res.setHeader('Cache-Control', 'public, max-age=7200'); // 2 hours
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Month API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// ฟังก์ชันสำหรับแปลงเดือนเป็นภาษาไทย
function getThaiMonth(month) {
  const thaiMonths = [
    '', 'เดือนหนึ่ง (1)', 'เดือนสอง (2)', 'เดือนสาม (3)', 'เดือนสี่ (4)',
    'เดือนห้า (5)', 'เดือนหก (6)', 'เดือนเจ็ด (7)', 'เดือนแปด (8)',
    'เดือนเก้า (9)', 'เดือนสิบ (10)', 'เดือนสิบเอ็ด (11)', 'เดือนสิบสอง (12)'
  ];
  return thaiMonths[month] || `เดือน ${month}`;
}

// ฟังก์ชันสำหรับแปลงปีเป็นภาษาไทย
function getThaiYear(year) {
  const animals = ['หนู', 'วัว', 'เสือ', 'กระต่าย', 'มะโรง', 'มะเส็ง', 'มะเมีย', 'มะแม', 'วอก', 'ระกา', 'จอ', 'กุน'];
  const animalIndex = (year - 4) % 12;
  return `ปี${animals[animalIndex]}`;
}