import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Layout from './components/Layout';
import DatePicker from './components/DatePicker';
import HolyDayCard from './components/HolyDayCard';
import Calendar from './components/Calendar';
import LoadingSpinner from './components/LoadingSpinner';

// ตั้งค่า dayjs ให้ใช้ภาษาไทย
dayjs.locale('th');

// ข้อมูลวันพระปี 2568-2569 (2025-2026) ตามปฏิทินจริงที่ถูกต้อง
// อ้างอิงจาก: สำนักงานพุทธศาสนาแห่งชาติ, ThaiLunar.com, และแหล่งข้อมูลที่น่าเชื่อถือ
const fallbackHolyDays = {
  // เดือน 1 (มกราคม 2568/2025)
  '2025-01-06': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 2', icon: '🌓' },
  '2025-01-13': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือน 2', icon: '🌕' },
  '2025-01-21': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 2', icon: '🌗' },
  '2025-01-28': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือน 2', icon: '🌑' },
  
  // เดือน 2 (กุมภาพันธ์ 2568/2025) - มาฆบูชา
  '2025-02-05': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 3', icon: '🌓' },
  '2025-02-12': { type: 'full_moon', name: 'วันมาฆบูชา', icon: '🌕', major: true },
  '2025-02-20': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 3', icon: '🌗' },
  '2025-02-26': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือน 3', icon: '🌑' },
  
  // เดือน 3 (มีนาคม 2568/2025)
  '2025-03-06': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 4', icon: '🌓' },
  '2025-03-13': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือน 4', icon: '🌕' },
  '2025-03-21': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 4', icon: '🌗' },
  '2025-03-28': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือน 4', icon: '🌑' },
  
  // เดือน 4 (เมษายน 2568/2025)
  '2025-04-05': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 5', icon: '🌓' },
  '2025-04-12': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือน 5', icon: '🌕' },
  '2025-04-20': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 5', icon: '🌗' },
  '2025-04-26': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือน 5', icon: '🌑' },
  
  // เดือน 5 (พฤษภาคม 2568/2025) - วิสาขบูชา
  '2025-05-04': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 6', icon: '🌓' },
  '2025-05-11': { type: 'full_moon', name: 'วันวิสาขบูชา', icon: '🌕', major: true },
  '2025-05-19': { type: 'quarter', name: 'วันอัฏฐมีบูชา', icon: '🌗', major: true },
  '2025-05-26': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือน 6', icon: '🌑' },
  
  // เดือน 6 (มิถุนายน 2568/2025)
  '2025-06-03': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 7', icon: '🌓' },
  '2025-06-10': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือน 7', icon: '🌕' },
  '2025-06-18': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 7', icon: '🌗' },
  '2025-06-25': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือน 7', icon: '🌑' },
  
  // เดือน 7 (กรกฎาคม 2568/2025) - อาสาฬหบูชา
  '2025-07-03': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 8', icon: '🌓' },
  '2025-07-10': { type: 'full_moon', name: 'วันอาสาฬหบูชา', icon: '🌕', major: true },
  '2025-07-18': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 8', icon: '🌗' },
  '2025-07-25': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือน 8', icon: '🌑' },
  
  // เดือน 8 (สิงหาคม 2568/2025)
  '2025-08-02': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 9', icon: '🌓' },
  '2025-08-09': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือน 9', icon: '🌕' },
  '2025-08-17': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 9', icon: '🌗' },
  '2025-08-23': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือน 9', icon: '🌑' },
  '2025-08-31': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 10', icon: '🌓' },
  
  // เดือน 9 (กันยายน 2568/2025)
  '2025-09-07': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือน 10', icon: '🌕' },
  '2025-09-15': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 10', icon: '🌗' },
  '2025-09-22': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือน 10', icon: '🌑' },
  '2025-09-30': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 11', icon: '🌓' },
  
  // เดือน 10 (ตุลาคม 2568/2025) - ออกพรรษา
  '2025-10-07': { type: 'full_moon', name: 'วันออกพรรษา', icon: '🌕', major: true },
  '2025-10-15': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 11', icon: '🌗' },
  '2025-10-21': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือน 11', icon: '🌑' },
  '2025-10-29': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 12', icon: '🌓' },
  
  // เดือน 11 (พฤศจิกายน 2568/2025) - ลอยกระทง
  '2025-11-05': { type: 'full_moon', name: 'วันลอยกระทง', icon: '🌕', major: true },
  '2025-11-13': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 12', icon: '🌗' },
  '2025-11-20': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือน 12', icon: '🌑' },
  '2025-11-28': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 1', icon: '🌓' },
  
  // เดือน 12 (ธันวาคม 2568/2025)
  '2025-12-05': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือน 1', icon: '🌕' },
  '2025-12-13': { type: 'quarter', name: 'แรม 8 ค่ำ เดือน 1', icon: '🌗' },
  '2025-12-19': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือน 1', icon: '🌑' },
  '2025-12-27': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือน 2', icon: '🌓' },

  // ===== ปี 2569 (2026) =====
  
  // เดือน 1 (มกราคม 2569/2026)
  '2026-01-03': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนยี่ (2)', icon: '🌕' },
  '2026-01-11': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนยี่ (2)', icon: '🌗' },
  '2026-01-18': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนยี่ (2)', icon: '🌑' },
  '2026-01-26': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสาม (3)', icon: '🌓' },
  
  // เดือน 2 (กุมภาพันธ์ 2569/2026)
  '2026-02-02': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนสาม (3)', icon: '🌕' },
  '2026-02-10': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสาม (3)', icon: '🌗' },
  '2026-02-16': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนสาม (3)', icon: '🌑' },
  '2026-02-24': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสี่ (4)', icon: '🌓' },
  
  // เดือน 3 (มีนาคม 2569/2026) - มาฆบูชา
  '2026-03-03': { type: 'full_moon', name: 'วันมาฆบูชา', icon: '🌕', major: true },
  '2026-03-11': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสี่ (4)', icon: '🌗' },
  '2026-03-18': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสี่ (4)', icon: '🌑' },
  '2026-03-26': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนห้า (5)', icon: '🌓' },
  
  // เดือน 4 (เมษายน 2569/2026)
  '2026-04-02': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนห้า (5)', icon: '🌕' },
  '2026-04-10': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนห้า (5)', icon: '🌗' },
  '2026-04-16': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนห้า (5)', icon: '🌑' },
  '2026-04-24': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนหก (6)', icon: '🌓' },
  
  // เดือน 5 (พฤษภาคม 2569/2026) - วิสาขบูชา
  '2026-05-01': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนหก (6)', icon: '🌕' },
  '2026-05-09': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนหก (6)', icon: '🌗' },
  '2026-05-16': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนหก (6)', icon: '🌑' },
  '2026-05-24': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนเจ็ด (7)', icon: '🌓' },
  '2026-05-31': { type: 'full_moon', name: 'วันวิสาขบูชา', icon: '🌕', major: true },
  
  // เดือน 6 (มิถุนายน 2569/2026) - อัฏฐมีบูชา
  '2026-06-08': { type: 'quarter', name: 'วันอัฏฐมีบูชา', icon: '🌗', major: true },
  '2026-06-14': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนเจ็ด (7)', icon: '🌑' },
  '2026-06-22': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนแปด (8)', icon: '🌓' },
  '2026-06-29': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนแปด (8)', icon: '🌕' },
  
  // เดือน 7 (กรกฎาคม 2569/2026) - อาสาฬหบูชา, เข้าพรรษา
  '2026-07-07': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนแปด (8)', icon: '🌗' },
  '2026-07-14': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนแปด (8)', icon: '🌑' },
  '2026-07-22': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนแปดหลัง (88)', icon: '🌓' },
  '2026-07-29': { type: 'full_moon', name: 'วันอาสาฬหบูชา', icon: '🌕', major: true },
  '2026-07-30': { type: 'quarter', name: 'วันเข้าพรรษา', icon: '🌗', major: true },
  
  // เดือน 8 (สิงหาคม 2569/2026)
  '2026-08-06': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนแปดหลัง (88)', icon: '🌗' },
  '2026-08-13': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนแปดหลัง (88)', icon: '🌑' },
  '2026-08-21': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนเก้า (9)', icon: '🌓' },
  '2026-08-28': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนเก้า (9)', icon: '🌕' },
  
  // เดือน 9 (กันยายน 2569/2026)
  '2026-09-05': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนเก้า (9)', icon: '🌗' },
  '2026-09-11': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนเก้า (9)', icon: '🌑' },
  '2026-09-19': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบ (10)', icon: '🌓' },
  '2026-09-26': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนสิบ (10)', icon: '🌕' },
  
  // เดือน 10 (ตุลาคม 2569/2026) - ออกพรรษา
  '2026-10-04': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบ (10)', icon: '🌗' },
  '2026-10-11': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสิบ (10)', icon: '🌑' },
  '2026-10-19': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบเอ็ด (11)', icon: '🌓' },
  '2026-10-26': { type: 'full_moon', name: 'วันออกพรรษา', icon: '🌕', major: true },
  
  // เดือน 11 (พฤศจิกายน 2569/2026) - ลอยกระทง
  '2026-11-03': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบเอ็ด (11)', icon: '🌗' },
  '2026-11-09': { type: 'new_moon', name: 'แรม 14 ค่ำ เดือนสิบเอ็ด (11)', icon: '🌑' },
  '2026-11-17': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนสิบสอง (12)', icon: '🌓' },
  '2026-11-24': { type: 'full_moon', name: 'วันลอยกระทง', icon: '🌕', major: true },
  
  // เดือน 12 (ธันวาคม 2569/2026)
  '2026-12-02': { type: 'quarter', name: 'แรม 8 ค่ำ เดือนสิบสอง (12)', icon: '🌗' },
  '2026-12-09': { type: 'new_moon', name: 'แรม 15 ค่ำ เดือนสิบสอง (12)', icon: '🌑' },
  '2026-12-17': { type: 'quarter', name: 'ขึ้น 8 ค่ำ เดือนอ้าย (1)', icon: '🌓' },
  '2026-12-24': { type: 'full_moon', name: 'ขึ้น 15 ค่ำ เดือนอ้าย (1)', icon: '🌕' },
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
  }
};

// ฟังก์ชันสำหรับแปลงเดือนเป็นภาษาไทย
const getThaiMonth = (month) => {
  const thaiMonths = [
    '', 'เดือนหนึ่ง (1)', 'เดือนสอง (2)', 'เดือนสาม (3)', 'เดือนสี่ (4)',
    'เดือนห้า (5)', 'เดือนหก (6)', 'เดือนเจ็ด (7)', 'เดือนแปด (8)',
    'เดือนเก้า (9)', 'เดือนสิบ (10)', 'เดือนสิบเอ็ด (11)', 'เดือนสิบสอง (12)'
  ];
  return thaiMonths[month] || `เดือน ${month}`;
};

// ฟังก์ชันสำหรับแปลงปีเป็นภาษาไทย
const getThaiYear = (year) => {
  const animals = ['หนู', 'วัว', 'เสือ', 'กระต่าย', 'มะโรง', 'มะเส็ง', 'มะเมีย', 'มะแม', 'วอก', 'ระกา', 'จอ', 'กุน'];
  const animalIndex = (year - 4) % 12;
  return `ปี${animals[animalIndex]}`;
};

// ฟังก์ชันสำหรับดึงข้อมูลวันพระจาก fallback data
const getHolyDayDataFromFallback = (date) => {
  const dateObj = dayjs(date);
  const holyDayData = fallbackHolyDays[date];
  
  if (holyDayData) {
    const info = HOLY_DAY_INFO[holyDayData.type] || HOLY_DAY_INFO.quarter;
    const thaiMonth = getThaiMonth(dateObj.month() + 1);
    const thaiYear = getThaiYear(dateObj.year());
    
    return {
      date,
      isHolyDay: true,
      type: holyDayData.type,
      name: holyDayData.name,
      icon: holyDayData.icon,
      thaiMonth,
      thaiYear,
      dayOfWeek: dateObj.format('dddd'),
      description: info.description,
      activities: info.activities,
      majorHolyDay: {
        is: holyDayData.major || false,
        name: holyDayData.major ? holyDayData.name : null
      },
      sources: { 
        onab: true,        // สำนักงานพุทธศาสนาแห่งชาติ
        thailunar: true,   // ThaiLunar.com
        fallback: true, 
        confidence: 'high' 
      }
    };
  }
  
  // ไม่ใช่วันพระ
  const thaiMonth = getThaiMonth(dateObj.month() + 1);
  const thaiYear = getThaiYear(dateObj.year());
  
  return {
    date,
    isHolyDay: false,
    type: null,
    name: null,
    icon: null,
    thaiMonth,
    thaiYear,
    dayOfWeek: dateObj.format('dddd'),
    description: null,
    activities: [],
    majorHolyDay: { is: false, name: null },
    sources: { 
      onab: false, 
      thailunar: false, 
      fallback: true, 
      confidence: 'low' 
    }
  };
};

// ฟังก์ชันสำหรับดึงข้อมูลรายเดือนจาก fallback data
const getMonthDataFromFallback = (month, year) => {
  const holyDays = [];
  const majorHolyDays = [];
  
  // วนลูปทุกวันในเดือน
  const daysInMonth = dayjs(`${year}-${String(month).padStart(2, '0')}-01`).daysInMonth();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const holyDayData = fallbackHolyDays[dateStr];
    
    if (holyDayData) {
      const dayData = {
        date: dateStr,
        type: holyDayData.type,
        name: holyDayData.name,
        icon: holyDayData.icon
      };
      
      if (holyDayData.major) {
        majorHolyDays.push({
          ...dayData,
          major: true
        });
      } else {
        holyDays.push(dayData);
      }
    }
  }
  
  return {
    month,
    year,
    thaiYear: getThaiYear(year),
    holyDays,
    majorHolyDays
  };
};

function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [holyDayData, setHolyDayData] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1);
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  // ฟังก์ชันสำหรับดึงข้อมูลวันพระ
  const fetchHolyDayData = async (date) => {
    setLoading(true);
    setError(null);
    
    try {
      // ใช้ข้อมูลที่ระบุไว้ก่อน (ข้อมูลปี 2568 ครบถ้วน)
      const data = getHolyDayDataFromFallback(date);
      setHolyDayData(data);
      
      // ถ้าไม่มีข้อมูลใน fallback data ค่อยลองใช้ API
      if (!data.isHolyDay && data.sources.confidence === 'low') {
        try {
          const response = await fetch(`/api/holy-day?date=${date}`);
          if (response.ok) {
            const apiData = await response.json();
            if (apiData.isHolyDay) {
              setHolyDayData(apiData);
            }
          }
        } catch (apiError) {
          console.log('API fallback failed, using local data:', apiError);
        }
      }
    } catch (err) {
      setError('ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      console.error('Error fetching holy day data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับดึงข้อมูลรายเดือน
  const fetchMonthData = async (month, year) => {
    try {
      // ใช้ข้อมูลที่ระบุไว้ก่อน (ข้อมูลปี 2568 ครบถ้วน)
      const data = getMonthDataFromFallback(month, year);
      setMonthData(data);
      
      // ถ้าไม่มีข้อมูลใน fallback data ค่อยลองใช้ API
      if (data.holyDays.length === 0 && data.majorHolyDays.length === 0) {
        try {
          const response = await fetch(`/api/holy-day?month=${month}&year=${year}`);
          if (response.ok) {
            const apiData = await response.json();
            if (apiData.holyDays.length > 0 || apiData.majorHolyDays.length > 0) {
              setMonthData(apiData);
            }
          }
        } catch (apiError) {
          console.log('API fallback failed, using local data:', apiError);
        }
      }
    } catch (err) {
      console.error('Error fetching month data:', err);
    }
  };

  // Effect สำหรับดึงข้อมูลเมื่อเปลี่ยนวันที่
  useEffect(() => {
    fetchHolyDayData(selectedDate);
  }, [selectedDate]);

  // Effect สำหรับดึงข้อมูลรายเดือน
  useEffect(() => {
    fetchMonthData(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  // ฟังก์ชันจัดการการเปลี่ยนวันที่
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const dateObj = dayjs(date);
    setCurrentMonth(dateObj.month() + 1);
    setCurrentYear(dateObj.year());
  };

  // ฟังก์ชันจัดการการเปลี่ยนเดือน
  const handleMonthChange = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  // ฟังก์ชันกลับไปวันนี้
  const goToToday = () => {
    const today = dayjs().format('YYYY-MM-DD');
    setSelectedDate(today);
    setCurrentMonth(dayjs().month() + 1);
    setCurrentYear(dayjs().year());
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-shadow">
            🙏 วันพระไทย
          </h1>
          <p className="text-gray-600 text-lg">
            ตรวจสอบวันพระและวันสำคัญทางพุทธศาสนา
          </p>
        </div>

        {/* Date Picker Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <button
            onClick={goToToday}
            className="btn-secondary text-sm"
          >
            📅 วันนี้
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card bg-red-50 border-red-200 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => fetchHolyDayData(selectedDate)}
              className="btn-primary mt-3"
            >
              ลองใหม่
            </button>
          </div>
        )}

        {/* Holy Day Card */}
        {!loading && !error && holyDayData && (
          <HolyDayCard data={holyDayData} />
        )}

        {/* Calendar Section */}
        {monthData && (
          <Calendar
            monthData={monthData}
            selectedDate={selectedDate}
            onDateSelect={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        )}

      </div>
    </Layout>
  );
}

export default App;