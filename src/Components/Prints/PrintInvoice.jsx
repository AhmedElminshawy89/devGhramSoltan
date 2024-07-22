import React, { forwardRef } from "react";
import logo from '../../assets/Img/logo.png'
const PrintInvoice = forwardRef(({ employee }, ref) => {
  
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
      width: "80mm",
      padding: "10mm",
      fontFamily: "Arial, sans-serif",
      direction: 'rtl',
    }}
  >
    <div style={{ textAlign: "center" }}>
      <img
        src={logo}
        alt="Logo"
        style={{ width: "30mm", height: "auto", margin: "0 auto" }}
      />
    </div>
    <div>
      <div
        style={{
          borderBottom: "1px solid #eee",
          padding: "4mm 0",
        }}
      >
        <p className="mb-1 text-lg">
          <strong>اسم العميل:</strong> {employee?.name}
        </p>
        <p className="mb-1 text-lg">
          <strong>رقم التليفون:</strong>  {employee?.phone}
        </p>
        <p className="mb-1 text-lg">
          <strong>البلد:</strong> {employee?.address}
        </p>
        <p className="mb-1 text-lg">
          <strong>تاريخ المناسبة:</strong>{" "}
          {new Date(employee?.appropriate).toLocaleDateString("ar-EG")}
        </p>
        {employee?.receivedDate&&(
        <p className="mb-1 text-lg">
          <strong>تاريخ الاستلام:</strong>{" "}
          {new Date(employee?.receivedDate).toLocaleDateString("ar-EG")}
        </p>
        )}
        <p className="mb-1">
          <strong>تاريخ اليوم:</strong> {now.toLocaleDateString('ar-EG', options)}
        </p>
        <p className="mb-1">
          <strong>الوقت:</strong> {now.toLocaleTimeString('ar-EG')}
        </p>
        {employee?.enter&&(
        <p className="mb-1 text-lg">
          <strong>معاد الدخول :</strong>{" "}
          {employee?.enter}
        </p>
        )}
                {employee?.arrive&&(
        <p className="mb-1 text-lg">
          <strong>معاد الوصول :</strong>{" "}
          {employee?.arrive}
        </p>
        )}
{employee?.exit && (
  <p className="mb-1 text-lg">
    <strong>معاد الخروج :</strong>{" "}
    {employee.exit}
  </p>
)}

      </div>
      <div
        style={{
          padding: "4mm 0",
        }}
      >
        <p className="mb-1">
          <strong>نوع الباكدج:</strong> {employee?.category?.name}
        </p>
        <p className="mb-1">
          <strong>مرتجع من الباكدج:</strong>{" "}
          {employee?.notes}
        </p>
        <p className="mb-1">
          <strong>خدمة إضافية:</strong> {employee?.addService}
        </p>
        <p className="mb-1">
          <strong>سعر الخدمة الإضافية:</strong>{" "}
          {`${employee?.priceService ? `${employee?.priceService.toLocaleString('ar-EG')} جنيه` : ''}`}
          </p>
        <p className="mb-1">
          <strong>إجمالي :</strong> {`${employee?.total.toLocaleString('ar-EG')} جنيه`}
        </p>
        <p className="mb-1">
          <strong>المبلغ المدفوع:</strong>{" "}
          {`${employee?.pay ? `${employee?.pay.toLocaleString('ar-EG')} جنيه` : ''}`}
          </p>
        <p className="mb-1">
          <strong>المبلغ المتبقي:</strong>{" "}
          {`${employee?.rest ? `${employee?.rest.toLocaleString('ar-EG')} جنيه` : ''}`}
        </p>
        <p className="mb-1">
          <strong>نوع الخصم:</strong>{employee?.discount?.discount}
        </p>
        <p className="mb-1">
          <strong>قيمة الخصم:</strong>{" "}
          {`${employee?.discount?.price ? `${employee?.discount?.price.toLocaleString('ar-EG')} جنيه` : ''}`}
        </p>
      </div>
    </div>
    <p className="mb-1 text-md text-center">
      <strong>في حاله الالغاء لا يسترد المبلغ المدفوع</strong>
    </p>
    <p className="mb-1 text-md text-center">
      <strong>يرجي الاحتفاظ بالايصال للمراجعه</strong>
    </p>
    <p className="mb-1 text-md text-center">
      <strong>العنوان: دسوق - شارع الجيش <br/> م: 0106853310</strong>
    </p>
  </div>
  );
});

export default PrintInvoice;
