import React from 'react';

const DashboardCard = ({ title, data, icon, ...rest }) => {
  return (
    <div
      className={`flex items-center justify-between p-5 w-full rounded-lg shadow-md border-l-4 bg-white`}
      {...rest}
    >
      <div className='flex flex-col gap-3'>
        <h2 className="text-gray-500 text-sm font-semibold">{title.toUpperCase()}</h2>
        <div className="text-3xl font-bold text-gray-800">
          {Array.isArray(data) ? data.length : data ?? 0}
        </div>
      </div>
     
    </div>
  );
};

export default DashboardCard;
