import React from 'react';
import dayjs from 'dayjs';

const Calendar = ({ monthData, selectedDate, onDateSelect, onMonthChange }) => {
  if (!monthData) return null;

  const { month, year, holyDays, majorHolyDays } = monthData;
  
  // สร้างวันที่ของเดือน
  const firstDayOfMonth = dayjs(`${year}-${String(month).padStart(2, '0')}-01`);
  const lastDayOfMonth = firstDayOfMonth.endOf('month');
  const startDate = firstDayOfMonth.startOf('week');
  const endDate = lastDayOfMonth.endOf('week');
  
  // สร้าง array ของวันที่ทั้งหมดในปฏิทิน
  const calendarDays = [];
  let currentDate = startDate;
  
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    calendarDays.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  // ฟังก์ชันตรวจสอบว่าเป็นวันพระหรือไม่
  const getHolyDayInfo = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    
    // ตรวจสอบวันพระใหญ่ก่อน
    const majorHolyDay = majorHolyDays.find(day => day.date === dateStr);
    if (majorHolyDay) {
      return { ...majorHolyDay, isMajor: true };
    }
    
    // ตรวจสอบวันพระธรรมดา
    const holyDay = holyDays.find(day => day.date === dateStr);
    if (holyDay) {
      return { ...holyDay, isMajor: false };
    }
    
    return null;
  };

  // ฟังก์ชันจัดการการคลิกวันที่
  const handleDateClick = (date) => {
    if (date.month() + 1 === month) {
      onDateSelect(date.format('YYYY-MM-DD'));
    }
  };

  // ฟังก์ชันเปลี่ยนเดือน
  const handlePrevMonth = () => {
    const prevMonth = firstDayOfMonth.subtract(1, 'month');
    onMonthChange(prevMonth.month() + 1, prevMonth.year());
  };

  const handleNextMonth = () => {
    const nextMonth = firstDayOfMonth.add(1, 'month');
    onMonthChange(nextMonth.month() + 1, nextMonth.year());
  };

  // ฟังก์ชันกลับไปเดือนปัจจุบัน
  const goToCurrentMonth = () => {
    const now = dayjs();
    onMonthChange(now.month() + 1, now.year());
  };

  const monthName = firstDayOfMonth.format('MMMM YYYY');
  const isCurrentMonth = firstDayOfMonth.isSame(dayjs(), 'month');

  return (
    <div className="card animate-slide-up">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="เดือนก่อนหน้า"
        >
          <span className="text-xl">←</span>
        </button>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800">
            {monthName}
          </h3>
          {!isCurrentMonth && (
            <button
              onClick={goToCurrentMonth}
              className="text-sm text-holy-green hover:text-green-600 transition-colors duration-200"
            >
              กลับไปเดือนปัจจุบัน
            </button>
          )}
        </div>
        
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="เดือนถัดไป"
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day, index) => (
          <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const isCurrentMonth = date.month() + 1 === month;
          const isToday = date.isSame(dayjs(), 'day');
          const isSelected = date.format('YYYY-MM-DD') === selectedDate;
          const holyDayInfo = getHolyDayInfo(date);
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                relative p-2 text-sm rounded-lg transition-all duration-200 min-h-[40px]
                ${!isCurrentMonth 
                  ? 'text-gray-300 cursor-default' 
                  : 'hover:bg-gray-100 cursor-pointer'
                }
                ${isToday 
                  ? 'bg-blue-100 text-blue-800 font-bold ring-2 ring-blue-300' 
                  : ''
                }
                ${isSelected && isCurrentMonth
                  ? 'bg-holy-green text-white font-bold shadow-md' 
                  : ''
                }
                ${holyDayInfo && isCurrentMonth
                  ? holyDayInfo.isMajor 
                    ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 font-medium'
                    : holyDayInfo.type === 'full_moon'
                      ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800'
                      : holyDayInfo.type === 'new_moon'
                        ? 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
                        : 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800'
                  : ''
                }
              `}
              disabled={!isCurrentMonth}
            >
              <div className="flex flex-col items-center">
                <span className={isSelected && isCurrentMonth ? 'text-white' : ''}>
                  {date.date()}
                </span>
                
                {/* Holy Day Indicator */}
                {holyDayInfo && isCurrentMonth && (
                  <div className="absolute -top-1 -right-1">
                    <span className="text-xs">
                      {holyDayInfo.isMajor ? '⭐' : holyDayInfo.icon}
                    </span>
                  </div>
                )}
                
                {/* Today Indicator */}
                {isToday && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">สัญลักษณ์</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded border border-yellow-300"></div>
            <span className="text-gray-600">🌕 วันเพ็ญ</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded border border-gray-300"></div>
            <span className="text-gray-600">🌑 วันแรม</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded border border-blue-300"></div>
            <span className="text-gray-600">🌓 อุโบสถ</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-br from-green-100 to-green-200 rounded border border-green-300"></div>
            <span className="text-gray-600">⭐ วันพระใหญ่</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {(holyDays.length > 0 || majorHolyDays.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            วันพระในเดือนนี้ ({holyDays.length + majorHolyDays.length} วัน)
          </h4>
          <div className="text-xs text-gray-600 space-y-1">
            {majorHolyDays.length > 0 && (
              <p>🌟 วันพระใหญ่: {majorHolyDays.length} วัน</p>
            )}
            {holyDays.length > 0 && (
              <p>🙏 วันพระธรรมดา: {holyDays.length} วัน</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;