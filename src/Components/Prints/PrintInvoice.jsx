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
      className="p-10 font-sans text-center bg-white shadow-lg rounded-lg"
      style={{
        width: '80mm',
        padding: '10px',
        fontSize: '12px',
        direction: 'rtl',
      }}
    >
      <div className="border-b-2 pb-4 mb-4">
        <div className="flex justify-center mb-2">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-auto"
          />
        </div>
        <h1 className="text-xl font-semibold mb-1">مركز غرام سلطان يقدم فن المكياج والتصوير الاحترافي.</h1>
        <p className="text-lg">تواصل معنا: 0472570908</p>
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-right">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">تاريخ اليوم:</td>
            <td className="px-4 py-2 text-xl">{now.toLocaleDateString('ar-EG', options)}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">الوقت:</td>
            <td className="px-4 py-2 text-xl">{now.toLocaleTimeString('ar-EG')}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">اسم العميل:</td>
            <td className="px-4 py-2 text-xl">{employee?.name}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">رقم التليفون:</td>
            <td className="px-4 py-2 text-xl">{employee?.phone}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">البلد:</td>
            <td className="px-4 py-2 text-xl">{employee?.address}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">تاريخ المناسبة:</td>
            <td className="px-4 py-2 text-xl">{new Date(employee?.appropriate).toLocaleDateString("ar-EG")}</td>
          </tr>
          {employee?.receivedDate && (
            <tr>
              <td className="font-semibold px-4 py-2 text-xl">تاريخ الاستلام:</td>
              <td className="px-4 py-2 text-xl">{new Date(employee?.receivedDate).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          {employee?.enter && (
            <tr>
              <td className="font-semibold px-4 py-2 text-xl">معاد الدخول:</td>
              <td className="px-4 py-2 text-xl">{convertTo12HourFormat(employee.enter)}</td>
            </tr>
          )}
          {employee?.arrive && (
            <tr>
              <td className="font-semibold px-4 py-2 text-xl">معاد الوصول:</td>
              <td className="px-4 py-2 text-xl">{convertTo12HourFormat(employee?.arrive)}</td>
            </tr>
          )}
          {employee?.exit && (
            <tr>
              <td className="font-semibold px-4 py-2 text-xl">معاد الخروج:</td>
              <td className="px-4 py-2 text-xl">{convertTo12HourFormat(employee.exit)}</td>
            </tr>
          )}
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">نوع الباكدج:</td>
            <td className="px-4 py-2 text-xl">{employee?.category?.name}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">مرتجع من الباكدج:</td>
            <td className="px-4 py-2 text-xl">{employee?.notes?.map((e) => e.key).join(', ')}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">خدمة إضافية:</td>
            <td className="px-4 py-2 text-xl">{employee?.addService}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">سعر الخدمة الإضافية:</td>
            <td className="px-4 py-2 text-xl">{`${employee?.priceService ? `${employee?.priceService.toLocaleString('ar-EG')} جنيه` : ''}`}</td>
          </tr>
          {employee?.dateService && (
            <tr>
              <td className="font-semibold px-4 py-2 text-xl">تاريح الخدمه الاضافيه:</td>
              <td className="px-4 py-2 text-xl">{new Date(employee?.dateService).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          {employee?.typeHair && (
            <tr>
              <td className="font-semibold px-4 py-2 text-xl">نوع القسم الاخر:</td>
              <td className="px-4 py-2 text-xl">{employee?.typeHair}</td>
            </tr>
          )}
          {employee?.priceHair && (
            <tr>
              <td className="font-semibold px-4 py-2 text-xl">سعر القسم الاخر:</td>
              <td className="px-4 py-2 text-xl">{employee?.typeHair}</td>
            </tr>
          )}
            {employee?.dateHair && (
            <tr>
              <td className="font-semibold px-4 py-2 text-xl">تاريخ القسم الاخر:</td>
              <td className="px-4 py-2 text-xl">{new Date(employee?.dateHair).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">إجمالي:</td>
            <td className="px-4 py-2 text-xl">{`${employee?.total.toLocaleString('ar-EG')} جنيه`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">المبلغ المدفوع:</td>
            <td className="px-4 py-2 text-xl">{`${employee?.pay ? `${employee?.pay.toLocaleString('ar-EG')} جنيه` : ''}`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">المبلغ المتبقي:</td>
            <td className="px-4 py-2 text-xl">{`${employee?.rest ? `${employee?.rest.toLocaleString('ar-EG')} جنيه` : ''}`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">نوع الخصم:</td>
            <td className="px-4 py-2 text-xl">{employee?.discount?.discount || "لا يوجد خصم"}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 text-xl">قيمة الخصم:</td>
            <td className="px-4 py-2 text-xl">{`${employee?.discount?.price ? `${employee?.discount?.price.toLocaleString('ar-EG')} جنيه` : ''}` || "لا يوجد"}</td>
          </tr>
        </tbody>
      </table>

      <p className="text-xl mb-1 border-t pt-[5px]">
        <strong>في حالة الإلغاء لا يسترد المبلغ المدفوع</strong>
      </p>
      <p className="text-xl mb-1">
        <strong>يرجى الاحتفاظ بالإيصال للمراجعة</strong>
      </p>
      <p className="text-xl mb-1">
        <strong>العنوان: دسوق - شارع الجيش <br /> م: 0472570908</strong>
      </p>

      <div className="mt-2 border-t pt-[5px]">
        <p className="text-xl flex items-center justify-center gap-1 " style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
          <strong>
            تم تصميم وتطوير هذه المنصة بواسطة Coding Corner
          </strong>
          <img src={qrcode} alt="qr-code" className="w-[90px] h-[90px] object-cover"/>
        </p>
      </div>
    </div>
  );
});

export default PrintInvoice;
