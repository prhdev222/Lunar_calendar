import React from 'react';
import dayjs from 'dayjs';

const HolyDayCard = ({ data }) => {
  if (!data) return null;

  const { isHolyDay, type, name, icon, description, activities, majorHolyDay, dayOfWeek, sources } = data;

  // กำหนดสีและสไตล์ตามประเภทวันพระ
  const getCardStyle = () => {
    if (!isHolyDay) {
      return {
        bgClass: 'bg-gray-50 border-gray-200',
        iconBg: 'bg-gray-100',
        textColor: 'text-gray-600'
      };
    }

    switch (type) {
      case 'full_moon':
        return {
          bgClass: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200',
          iconBg: 'bg-yellow-100',
          textColor: 'text-yellow-800'
        };
      case 'new_moon':
        return {
          bgClass: 'bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200',
          iconBg: 'bg-gray-100',
          textColor: 'text-gray-700'
        };
      case 'quarter':
        return {
          bgClass: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200',
          iconBg: 'bg-blue-100',
          textColor: 'text-blue-800'
        };
      case 'major':
        return {
          bgClass: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
          iconBg: 'bg-green-100',
          textColor: 'text-green-800'
        };
      default:
        return {
          bgClass: 'bg-white border-gray-200',
          iconBg: 'bg-gray-100',
          textColor: 'text-gray-600'
        };
    }
  };

  const cardStyle = getCardStyle();
  const formattedDate = dayjs(data.date).format('DD MMMM YYYY');

  return (
    <div className={`card ${cardStyle.bgClass} animate-fade-in`}>
      <div className="flex flex-col items-center text-center space-y-4">
        
        {/* Icon and Status */}
        <div className="flex flex-col items-center space-y-2">
          <div className={`w-20 h-20 ${cardStyle.iconBg} rounded-full flex items-center justify-center text-4xl`}>
            {isHolyDay ? icon : '📅'}
          </div>
          
          {isHolyDay ? (
            <div className={`holy-day-indicator ${type === 'full_moon' ? 'holy-day-full-moon' : 
                           type === 'new_moon' ? 'holy-day-new-moon' : 
                           type === 'quarter' ? 'holy-day-quarter' : 'holy-day-major'}`}>
              <span className="font-medium">วันพระ</span>
            </div>
          ) : (
            <div className="holy-day-indicator bg-gray-100 text-gray-600 border-gray-200">
              <span className="font-medium">วันธรรมดา</span>
            </div>
          )}
        </div>

        {/* Date Information */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {formattedDate}
          </h2>
          <p className="text-lg text-gray-600">
            {dayOfWeek}
          </p>
        </div>

        {/* Holy Day Information */}
        {isHolyDay && (
          <div className="w-full space-y-4">
            {/* Holy Day Name */}
            <div className="text-center">
              <h3 className={`text-xl font-bold ${cardStyle.textColor}`}>
                {name}
              </h3>
              {majorHolyDay.is && (
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-holy-green text-white rounded-full text-sm font-medium">
                  <span className="mr-1">⭐</span>
                  วันพระใหญ่
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div className="bg-white/50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {/* Activities */}
            {activities && activities.length > 0 && (
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🙏</span>
                  กิจกรรมที่ควรปฏิบัติ
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-holy-green rounded-full mr-2 flex-shrink-0"></span>
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Non-Holy Day Message */}
        {!isHolyDay && (
          <div className="bg-white/50 rounded-lg p-4 w-full text-center">
            <p className="text-gray-600">
              วันนี้ไม่ใช่วันพระ แต่ยังสามารถปฏิบัติธรรมได้ทุกวัน
            </p>
            <p className="text-sm text-gray-500 mt-2">
              🧘‍♂️ นั่งสมาธิ • 📖 อ่านธรรมะ • 🙏 ทำจิตใจให้สงบ
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default HolyDayCard;