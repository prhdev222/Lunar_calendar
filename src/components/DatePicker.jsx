import React from 'react';
import dayjs from 'dayjs';

const THAI_MONTHS = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม'
];

const BE_START = 2568; // 2025 CE
const BE_END = 2569;   // 2026 CE

const DatePicker = ({ selectedDate, onDateChange }) => {
  const dateObj = dayjs(selectedDate);
  const selectedDay = dateObj.date();
  const selectedMonth = dateObj.month() + 1; // 1-12
  const selectedYearCE = dateObj.year();
  const selectedYearBE = selectedYearCE + 543;

  const clampDayToMonth = (day, month, yearCE) => {
    const daysInMonth = dayjs(`${yearCE}-${String(month).padStart(2, '0')}-01`).daysInMonth();
    return Math.min(day, daysInMonth);
  };

  const handleDayChange = (e) => {
    const newDay = Number(e.target.value);
    const newDate = dayjs(`${selectedYearCE}-${String(selectedMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`);
    onDateChange(newDate.format('YYYY-MM-DD'));
  };

  const handleMonthChange = (e) => {
    const newMonth = Number(e.target.value); // 1-12
    const newDay = clampDayToMonth(selectedDay, newMonth, selectedYearCE);
    const newDate = dayjs(`${selectedYearCE}-${String(newMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`);
    onDateChange(newDate.format('YYYY-MM-DD'));
  };

  const handleYearChange = (e) => {
    const newYearBE = Number(e.target.value);
    const newYearCE = newYearBE - 543;
    const newDay = clampDayToMonth(selectedDay, selectedMonth, newYearCE);
    const newDate = dayjs(`${newYearCE}-${String(selectedMonth).padStart(2, '0')}-${String(newDay).padStart(2, '0')}`);
    onDateChange(newDate.format('YYYY-MM-DD'));
  };

  const formatDateForDisplay = (date) => {
    const d = dayjs(date);
    const dayStr = d.format('DD');
    const monthStr = THAI_MONTHS[d.month()];
    const yearBE = d.year() + 543;
    return `${dayStr} ${monthStr} ${yearBE}`;
  };

  const years = Array.from({ length: BE_END - BE_START + 1 }, (_, i) => BE_START + i);
  const daysInCurrentMonth = dayjs(`${selectedYearCE}-${String(selectedMonth).padStart(2, '0')}-01`).daysInMonth();
  const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Custom Date Inputs: วัน เดือน ปี พ.ศ. */}
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        {/* วัน */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-10 text-right">วัน</label>
          <select
            value={selectedDay}
            onChange={handleDayChange}
            className="
              w-24 px-3 py-2 text-base text-gray-700 bg-white border-2 border-gray-200 rounded-xl
              focus:border-holy-green focus:ring-2 focus:ring-holy-green/20 focus:outline-none transition-all duration-200
              shadow-sm
            "
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* เดือน */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-10 text-right">เดือน</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="
              w-40 px-3 py-2 text-base text-gray-700 bg-white border-2 border-gray-200 rounded-xl
              focus:border-holy-green focus:ring-2 focus:ring-holy-green/20 focus:outline-none transition-all duration-200
              shadow-sm
            "
          >
            {THAI_MONTHS.map((m, idx) => (
              <option key={m} value={idx + 1}>{m}</option>
            ))}
          </select>
        </div>

        {/* ปี พ.ศ. */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-16 text-right">ปี พ.ศ.</label>
          <select
            value={selectedYearBE}
            onChange={handleYearChange}
            className="
              w-32 px-3 py-2 text-base text-gray-700 bg-white border-2 border-gray-200 rounded-xl
              focus:border-holy-green focus:ring-2 focus:ring-holy-green/20 focus:outline-none transition-all duration-200
              shadow-sm
            "
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Selected Date in Thai */}
      <div className="text-center">
        <p className="text-sm text-gray-500">วันที่เลือก</p>
        <p className="text-lg font-medium text-gray-800">
          {formatDateForDisplay(selectedDate)}
        </p>
      </div>

      {/* Quick Date Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onDateChange(today)}
          className={`
            px-3 py-1 text-sm rounded-full transition-colors duration-200
            ${selectedDate === today 
              ? 'bg-holy-green text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          วันนี้
        </button>
        <button
          onClick={() => onDateChange(dayjs().add(1, 'day').format('YYYY-MM-DD'))}
          className={`
            px-3 py-1 text-sm rounded-full transition-colors duration-200
            ${selectedDate === dayjs().add(1, 'day').format('YYYY-MM-DD')
              ? 'bg-holy-green text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          พรุ่งนี้
        </button>
        <button
          onClick={() => onDateChange(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))}
          className={`
            px-3 py-1 text-sm rounded-full transition-colors duration-200
            ${selectedDate === dayjs().subtract(1, 'day').format('YYYY-MM-DD')
              ? 'bg-holy-green text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          เมื่อวาน
        </button>
      </div>
    </div>
  );
};

export default DatePicker;