import React, { forwardRef } from "react";
import logo from '../../assets/Img/logo.png'
const PrintInvoiceQuickWork = forwardRef(({ employee }, ref) => {
  
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <div
      ref={ref}
      style={{
        // width: "80mm",
        padding: "10mm",
        fontFamily: "Arial, sans-serif",
        direction: "rtl",
        textAlign:'center'
      }}
    >
      <div
        style={{
          padding: "10mm 0",
        }}
      >
        <div         style={{
        display:'flex', justifyContent:'center',
        alignItems: 'center'

        }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "30mm", height: "auto", marginBottom: "2px" }}
        />
        </div>
        <p className="mb-1">
          <strong>اسم الموظف:</strong> {employee?.employee.employee_name}
        </p>
        <p className="mb-1">
          <strong>الشغلانه:</strong> {employee?.job}
        </p>
        <p className="mb-1">
          <strong>السعر:</strong> {`${employee?.total ? `${employee?.total.toLocaleString('ar-EG')} جنيه` : ''}`}
        </p>
        <p className="mb-1">
          <strong>التاريخ:</strong> {now.toLocaleDateString('ar-EG', options)}
        </p>
        <p className="mb-1">
          <strong>الوقت:</strong> {now.toLocaleTimeString('ar-EG')}
        </p>
      </div>
    </div>
  );
});

export default PrintInvoiceQuickWork;
