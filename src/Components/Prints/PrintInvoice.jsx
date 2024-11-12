import React, { forwardRef } from "react";
import logo from '../../assets/Img/logo.png';
import qrcode from '../../assets/Img/qrcode.png';

const convertTo12HourFormat = (time) => {
  const convertToArabicNumbers = (num) => {
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
    return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
  };

  if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
    return '!! الوقت غير صحيح';
  }

  let [hours, minutes, seconds] = time.split(':').map(Number);
  let period = hours >= 12 ? 'م' : 'ص';
  hours = hours % 12 || 12;

  return `${convertToArabicNumbers(hours)}:${convertToArabicNumbers(minutes < 10 ? '0' + minutes : minutes)}:${convertToArabicNumbers(seconds < 10 ? '0' + seconds : seconds)} ${period}`;
};

const PrintInvoice = forwardRef(({ employee }, ref) => {
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  
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
        direction: 'rtl',
         textAlign: "center"
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
            <strong>رقم التليفون:</strong> {employee?.phone}
          </p>
          <p className="mb-1 text-lg">
            <strong>البلد:</strong> {employee?.address}
          </p>
          <p className="mb-1 text-lg">
            <strong>تاريخ المناسبة:</strong>{" "}
            {isValidDate(new Date(employee?.appropriate)) ? new Date(employee?.appropriate).toLocaleDateString('ar-EG') : "تاريخ غير صالح"}
          </p>
          {employee?.receivedDate &&(
          <p className="mb-1 text-lg">
            <strong>تاريخ الاستلام:</strong>{" "}
            {new Date(employee?.receivedDate).toLocaleDateString("ar-EG")}         </p>
          )}
          {employee?.enter&&(
          <p className="mb-1 text-lg">
            <strong>معاد الدخول:</strong>{" "}
            {convertTo12HourFormat(employee.enter)}          </p>
          )}
          {employee?.arrive &&(
          <p className="mb-1 text-lg">
            <strong>معاد الوصول:</strong>{" "}
            {convertTo12HourFormat(employee.arrive )}          </p>
          )}
          {employee?.exit  &&(
          <p className="mb-1 text-lg">
            <strong>معاد الخروج:</strong>{" "}
            {convertTo12HourFormat(employee.exit  )}          </p>
          )}
          <p className="mb-1">
            <strong>تاريخ اليوم:</strong> {now.toLocaleDateString('ar-EG', options)}
          </p>
          <p className="mb-1">
            <strong>الوقت:</strong> {now.toLocaleTimeString('ar-EG')}
          </p>
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
  {(() => {
    let notesArray = employee?.notes;

    if (typeof notesArray === 'string') {
      try {
        notesArray = JSON.parse(notesArray);
      } catch (error) {
        console.error("Failed to parse notes:", error);
        notesArray = []; 
      }
    }

    return Array.isArray(notesArray)
      ? notesArray.map((detail) => detail.key).join(', ')
      : "لا يوجد";
  })()}
</p>

          <p className="mb-1">
            <strong>خدمة إضافية:</strong> {employee?.addService}
          </p>
          <p className="mb-1">
            <strong>سعر الخدمة الإضافية:</strong>{" "}
            {`${employee?.priceService ? `${employee?.priceService.toLocaleString('ar-EG')} جنيه` : ''}`}
            </p>
            {employee?.dateService && (
                      <p className="mb-1">
                      <strong>تاريخ الخدمة الإضافية:</strong>{" "}
                      {isValidDate(new Date(employee?.dateService)) ? new Date(employee?.dateService).toLocaleDateString('ar-EG') : "تاريخ غير صالح"}
                      </p>
            )}
            {employee?.typeHair && (
            <p className="mb-1">
            <strong>نوع القسم الاخر:</strong>{" "}
            {employee?.typeHair}
            </p>
            )}
            {employee?.priceHair && (
            <p className="mb-1">
            <strong>سعر القسم الاخر:</strong>{" "}
            {employee?.priceHair}
            </p>
            )}
            
              {employee?.dateHair && (
            <p className="mb-1">
            <strong>تاريخ القسم الاخر:</strong>{" "}
            {employee?.dateHair}
            </p>
            )}
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
            <strong>نوع الخصم:</strong> {employee?.discount?.discount?employee?.discount?.discount:""}
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
        <strong>العنوان: دسوق - شارع الجيش <br/> م: 0472570908</strong>
      </p>
      <div className="mt-2 border-t pt-[5px]">
          <p className="text-xl flex items-center justify-center gap-1 " style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
            <strong>
              تم تصميم وتطوير هذه المنصة بواسطة Coding Corner
            </strong>
            <img src={qrcode} alt="qr-code" className="w-[50px] h-[50px] object-cover"/>
          </p>
        </div>
    </div>
  );
});

export default PrintInvoice;
