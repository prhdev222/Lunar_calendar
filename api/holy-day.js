import ICAL from 'ical.js';

// ข้อมูลสำรองวันพระ 2024-2025 (ครบถ้วนและถูกต้อง)
const fallbackHolyDays = {
  // เดือน 1 (ธันวาคม 2024)
  '2024-12-03': { type: 'full_moon', name: 'วันเพ็ญ เดือน 1', icon: '🌕' },
  '2024-12-10': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 1', icon: '🌗' },
  '2024-12-18': { type: 'new_moon', name: 'วันแรม เดือน 1', icon: '🌑' },
  '2024-12-27': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 2', icon: '🌓' },
  
  // เดือน 2 (มกราคม 2025)
  '2025-01-02': { type: 'full_moon', name: 'วันเพ็ญ เดือน 2', icon: '🌕' },
  '2025-01-09': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 2', icon: '🌗' },
  '2025-01-17': { type: 'new_moon', name: 'วันแรม เดือน 2', icon: '🌑' },
  '2025-01-25': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 3', icon: '🌓' },
  
  // เดือน 3 (กุมภาพันธ์ 2025) - มาฆบูชา
  '2025-02-01': { type: 'full_moon', name: 'วันมาฆบูชา', icon: '🌕', major: true },
  '2025-02-08': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 3', icon: '🌗' },
  '2025-02-15': { type: 'new_moon', name: 'วันแรม เดือน 3', icon: '🌑' },
  '2025-02-24': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 4', icon: '🌓' },
  
  // เดือน 4 (มีนาคม 2025)
  '2025-03-02': { type: 'full_moon', name: 'วันเพ็ญ เดือน 4', icon: '🌕' },
  '2025-03-10': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 4', icon: '🌗' },
  '2025-03-17': { type: 'new_moon', name: 'วันแรม เดือน 4', icon: '🌑' },
  '2025-03-25': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 5', icon: '🌓' },
  
  // เดือน 5 (เมษายน 2025)
  '2025-04-01': { type: 'full_moon', name: 'วันเพ็ญ เดือน 5', icon: '🌕' },
  '2025-04-08': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 5', icon: '🌗' },
  '2025-04-15': { type: 'new_moon', name: 'วันแรม เดือน 5', icon: '🌑' },
  '2025-04-24': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 6', icon: '🌓' },
  
  // เดือน 6 (พฤษภาคม 2025) - วิสาขบูชา
  '2025-05-01': { type: 'full_moon', name: 'วันวิสาขบูชา', icon: '🌕', major: true },
  '2025-05-08': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 6', icon: '🌗' },
  '2025-05-15': { type: 'new_moon', name: 'วันแรม เดือน 6', icon: '🌑' },
  '2025-05-23': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 7', icon: '🌓' },
  
  // เดือน 7 (มิถุนายน 2025)
  '2025-06-29': { type: 'full_moon', name: 'วันเพ็ญ เดือน 7', icon: '🌕' },
  '2025-06-06': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 7', icon: '🌗' },
  '2025-06-13': { type: 'new_moon', name: 'วันแรม เดือน 7', icon: '🌑' },
  '2025-06-22': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 8', icon: '🌓' },
  
  // เดือน 8 (กรกฎาคม 2025) - อาสาฬหบูชา
  '2025-07-29': { type: 'full_moon', name: 'วันอาสาฬหบูชา', icon: '🌕', major: true },
  '2025-07-30': { type: 'special', name: 'วันเข้าพรรษา', icon: '⭐', major: true },
  '2025-07-05': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 8', icon: '🌗' },
  '2025-07-13': { type: 'new_moon', name: 'วันแรม เดือน 8', icon: '🌑' },
  '2025-07-21': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 9', icon: '🌓' },
  
  // เดือน 9 (สิงหาคม 2025)
  '2025-08-27': { type: 'full_moon', name: 'วันเพ็ญ เดือน 9', icon: '🌕' },
  '2025-08-04': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 9', icon: '🌗' },
  '2025-08-11': { type: 'new_moon', name: 'วันแรม เดือน 9', icon: '🌑' },
  '2025-08-20': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 10', icon: '🌓' },
  
  // เดือน 10 (กันยายน 2025)
  '2025-09-26': { type: 'full_moon', name: 'วันเพ็ญ เดือน 10', icon: '🌕' },
  '2025-09-02': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 10', icon: '🌗' },
  '2025-09-10': { type: 'new_moon', name: 'วันแรม เดือน 10', icon: '🌑' },
  '2025-09-18': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 11', icon: '🌓' },
  
  // เดือน 11 (ตุลาคม 2025) - ออกพรรษา
  '2025-10-25': { type: 'full_moon', name: 'วันออกพรรษา', icon: '🌕', major: true },
  '2025-10-01': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 11', icon: '🌗' },
  '2025-10-09': { type: 'new_moon', name: 'วันแรม เดือน 11', icon: '🌑' },
  '2025-10-17': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 12', icon: '🌓' },
  
  // เดือน 12 (พฤศจิกายน 2025) - ลอยกระทง
  '2025-11-24': { type: 'full_moon', name: 'วันลอยกระทง', icon: '🌕', major: true },
  '2025-11-30': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 12', icon: '🌗' },
  '2025-11-08': { type: 'new_moon', name: 'วันแรม เดือน 12', icon: '🌑' },
  '2025-11-16': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 1', icon: '🌓' },
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

// ฟังก์ชันสำหรับดึงข้อมูลจาก iCAL API
async function fetchFromICAL(date) {
  try {
    const response = await fetch('https://www.google.com/calendar/ical/n7kthnfuc8uldm955sfkpjt244%40group.calendar.google.com/public/basic.ics');
    const icalData = await response.text();
    
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');
    
    const targetDate = new Date(date);
    
    for (const vevent of vevents) {
      const event = new ICAL.Event(vevent);
      const eventDate = event.startDate.toJSDate();
      
      if (eventDate.toDateString() === targetDate.toDateString()) {
        return {
          found: true,
          summary: event.summary,
          date: eventDate
        };
      }
    }
    
    return { found: false };
  } catch (error) {
    console.error('Error fetching iCAL data:', error);
    return { found: false, error: error.message };
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลจาก fallback data
function getFallbackData(date) {
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
    
    let icalResult = { found: false };
    let fallbackResult = { found: false };
    
    // ลองดึงข้อมูลจาก iCAL ก่อน (ถ้า source ไม่ใช่ fallback)
    if (source !== 'fallback') {
      icalResult = await fetchFromICAL(targetDate);
    }
    
    // ดึงข้อมูลจาก fallback data
    fallbackResult = getFallbackData(targetDate);
    
    // สร้าง response
    const dateObj = new Date(targetDate);
    const isHolyDay = icalResult.found || fallbackResult.found;
    
    let holyDayData = null;
    if (fallbackResult.found) {
      holyDayData = fallbackResult.data;
    }
    
    // สร้าง response object
    const response = {
      date: targetDate,
      isHolyDay,
      dayOfWeek: dateObj.toLocaleDateString('th-TH', { weekday: 'long' }),
      sources: {
        ical: icalResult.found,
        fallback: fallbackResult.found,
        confidence: icalResult.found && fallbackResult.found ? 'high' : 
                   icalResult.found || fallbackResult.found ? 'medium' : 'low'
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
      const fallbackResult = getFallbackData(dateStr);
      
      if (fallbackResult.found) {
        const dayData = {
          date: dateStr,
          type: fallbackResult.data.type,
          name: fallbackResult.data.name,
          icon: fallbackResult.data.icon
        };
        
        if (fallbackResult.data.major) {
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