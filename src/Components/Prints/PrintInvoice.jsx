import React, { forwardRef } from "react";
import logo from '../../assets/Img/logo.png';

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
      style={{ direction: 'rtl' }}
    >
      <div className="border-b-2 pb-4 mb-4">
        <div className="flex justify-center mb-2">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-auto"
          />
        </div>
        <h1 className="text-lg font-semibold mb-1">مركز غرام سلطان يقدم فن المكياج والتصوير الاحترافي.</h1>
        <p className="text-sm">تواصل معنا: 0472570908</p>
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-right">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="font-semibold px-4 py-2">رقم الفاتورة:</td>
            <td className="px-4 py-2">{employee?.id || 'غير متوفر'}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">تاريخ اليوم:</td>
            <td className="px-4 py-2">{now.toLocaleDateString('ar-EG', options)}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">الوقت:</td>
            <td className="px-4 py-2">{now.toLocaleTimeString('ar-EG')}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">اسم العميل:</td>
            <td className="px-4 py-2">{employee?.name}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">رقم التليفون:</td>
            <td className="px-4 py-2">{employee?.phone}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">البلد:</td>
            <td className="px-4 py-2">{employee?.address}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">تاريخ المناسبة:</td>
            <td className="px-4 py-2">{new Date(employee?.appropriate).toLocaleDateString("ar-EG")}</td>
          </tr>
          {employee?.receivedDate && (
            <tr>
              <td className="font-semibold px-4 py-2">تاريخ الاستلام:</td>
              <td className="px-4 py-2">{new Date(employee?.receivedDate).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          {employee?.enter && (
            <tr>
              <td className="font-semibold px-4 py-2">معاد الدخول:</td>
              <td className="px-4 py-2">{convertTo12HourFormat(employee.enter)}</td>
            </tr>
          )}
          {employee?.arrive && (
            <tr>
              <td className="font-semibold px-4 py-2">معاد الوصول:</td>
              <td className="px-4 py-2">{convertTo12HourFormat(employee?.arrive)}</td>
            </tr>
          )}
          {employee?.exit && (
            <tr>
              <td className="font-semibold px-4 py-2">معاد الخروج:</td>
              <td className="px-4 py-2">{convertTo12HourFormat(employee.exit)}</td>
            </tr>
          )}
          <tr>
            <td className="font-semibold px-4 py-2">نوع الباكدج:</td>
            <td className="px-4 py-2">{employee?.category?.name}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">مرتجع من الباكدج:</td>
            <td className="px-4 py-2">{employee?.notes?.map((e) => e.key).join(', ')}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">خدمة إضافية:</td>
            <td className="px-4 py-2">{employee?.addService}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">سعر الخدمة الإضافية:</td>
            <td className="px-4 py-2">{`${employee?.priceService ? `${employee?.priceService.toLocaleString('ar-EG')} جنيه` : ''}`}</td>
          </tr>
          {employee?.dateService && (
            <tr>
              <td className="font-semibold px-4 py-2">تاريح الخدمه الاضافيه:</td>
              <td className="px-4 py-2">{new Date(employee?.dateService).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          {employee?.typeHair && (
            <tr>
              <td className="font-semibold px-4 py-2">نوع القسم الاخر:</td>
              <td className="px-4 py-2">{employee?.typeHair}</td>
            </tr>
          )}
          {employee?.priceHair && (
            <tr>
              <td className="font-semibold px-4 py-2">سعر القسم الاخر:</td>
              <td className="px-4 py-2">{employee?.typeHair}</td>
            </tr>
          )}
            {employee?.dateHair && (
            <tr>
              <td className="font-semibold px-4 py-2">تاريخ القسم الاخر:</td>
              <td className="px-4 py-2">{new Date(employee?.dateHair).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          <tr>
            <td className="font-semibold px-4 py-2">إجمالي:</td>
            <td className="px-4 py-2">{`${employee?.total.toLocaleString('ar-EG')} جنيه`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">المبلغ المدفوع:</td>
            <td className="px-4 py-2">{`${employee?.pay ? `${employee?.pay.toLocaleString('ar-EG')} جنيه` : ''}`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">المبلغ المتبقي:</td>
            <td className="px-4 py-2">{`${employee?.rest ? `${employee?.rest.toLocaleString('ar-EG')} جنيه` : ''}`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">نوع الخصم:</td>
            <td className="px-4 py-2">{employee?.discount?.discount || "لا يوجد خصم"}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">قيمة الخصم:</td>
            <td className="px-4 py-2">{`${employee?.discount?.price ? `${employee?.discount?.price.toLocaleString('ar-EG')} جنيه` : ''}` || "لا يوجد"}</td>
          </tr>
        </tbody>
      </table>

      <p className="text-md mb-1">
        <strong>في حالة الإلغاء لا يسترد المبلغ المدفوع</strong>
      </p>
      <p className="text-md mb-1">
        <strong>يرجى الاحتفاظ بالإيصال للمراجعة</strong>
      </p>
      <p className="text-md mb-1">
        <strong>العنوان: دسوق - شارع الجيش <br /> م: 0472570908</strong>
      </p>

      <div className="mt-4">
        <p className="text-md" style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
          <strong>
            تم تصميم وتطوير هذه المنصة بواسطة Coding Corner
            <br />
            رقم التواصل: 01002337574 - 01286552467
          </strong>
        </p>
      </div>
    </div>
  );
});

export default PrintInvoice;
