import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaUser, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";

const convertToArabicNumbers = (num) => {
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
  return num.toString().split('').map(digit => arabicDigits[parseInt(digit, 10)]).join('');
};

const convertTo12HourFormat = (time) => {
  if (!time) return "غير محدد";

  if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)) {
    return "غير محدد";
  }

  let [hours, minutes] = time.split(':').map(Number);

  const period = hours >= 12 ? 'م' : 'ص';
  hours = hours % 12 || 12;

  const arabicHours = convertToArabicNumbers(hours);
  const arabicMinutes = convertToArabicNumbers(minutes.toString().padStart(2, '0'));

  return `${arabicHours}:${arabicMinutes} ${period}`;
};
const DetailsStudio = ({ isOpen, closeModal, initialValues }) => {
  const name = initialValues?.name || "غير محدد";
  const phone = initialValues?.phone || "غير محدد";
  const address = initialValues?.address || "غير محدد";
  const appropriate = initialValues?.appropriate || "غير محدد";
  const addService = initialValues?.addService || "غير محدد";
  const priceService = initialValues?.priceService || "غير محدد";
  const pay = initialValues?.pay || "غير محدد";
  const total = initialValues?.total || "غير محدد";
  const rest = initialValues?.rest || "غير محدد";
  const status = initialValues?.status || "غير محدد";
  const notes = initialValues?.notes || [];
  const category = initialValues?.category || {};
  const discount = initialValues?.discount || {};
  const enter = initialValues?.enter || "غير محدد";
  const arrive = initialValues?.arrive || "غير محدد";
  const exit = initialValues?.exit || "غير محدد";
  
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-800 mb-8 text-center">
                    تفاصيل الفاتوره الخاصه ب العميل {name}
                  </Dialog.Title>

                  <div className="space-y-8">
                    <div className="md:flex md:space-x-6 space-y-4 md:space-y-0 gap-4">
                      <div className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 shadow-md">
                        <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                          <FaUser className="text-indigo-600 mr-2" /> معلومات أساسية
                        </h4>
                        <div className="grid grid-cols-1 text-gray-600">
                          <p className=" text-start"><strong>الاسم:</strong> {name}</p>
                          <p className=" text-start"><strong>الهاتف:</strong> {phone}</p>
                          <p className=" text-start"><strong>العنوان:</strong> {address}</p>
                          <p className=" text-start"><strong>المناسبة:</strong> {appropriate}</p>
                          <p className=" text-start"><strong>الاستلام:</strong> {initialValues?.receivedDate||"غير محدد"}</p>
                          <p className=" text-start"><strong>الخدمة:</strong> {addService}</p>
                          <p className=" text-start"><strong>السعر:</strong> {priceService}</p>
                        </div>
                      </div>

                      <div className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 shadow-md">
                        <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                          <FaMoneyBillWave className="text-green-600 mr-2" /> تفاصيل الدفع
                        </h4>
                        <div className="grid grid-cols-1 text-gray-600">
                          <p className=" text-start"><strong>المدفوع:</strong> {pay}</p>
                          <p className=" text-start"><strong>الإجمالي:</strong> {total}</p>
                          <p className=" text-start"><strong>الباقي:</strong> {rest}</p>
                          <p className=" text-start"><strong>الحالة:</strong> {status}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:flex md:space-x-6 space-y-4 md:space-y-0 gap-4">
                      <div className="flex-1 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-6 shadow-md">
                        <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                          <FaInfoCircle className="text-teal-600 mr-2" /> ملاحظات إضافية
                        </h4>
                        <ul className="list-disc pl-6 space-y-1 text-gray-600 text-start">
{/* 
                          {notes && notes.length > 0 ? (
                            notes.map((note, index) => (
                              <li key={index}>
                                <strong>{note?.key ?? 'No Key'}:</strong> {note?.value ?? 'No Value'}
                              </li>
                            ))
                          ) : (
                            <li>لا يوجد</li>
                          )} */}

                        </ul>
                      </div>

                      <div className="flex-1 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6 shadow-md">
                        <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                          <FaInfoCircle className="text-yellow-600 mr-2" /> التصنيف والخصم
                        </h4>
                        <p className="text-gray-600 text-start">
                          <strong>التصنيف:</strong> {category?.name || "غير محدد"}
                        </p>
                        <p className="text-gray-600 text-start">
                          <strong>الخصم:</strong> {discount?.name || "غير محدد"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:flex md:space-x-6 space-y-4 md:space-y-0 gap-4 mt-6">
  <div className="flex-1 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6 shadow-md">
    <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
      <FaInfoCircle className="text-yellow-600 mr-2" /> تفاصيل المواعيد
    </h4>
    <div className="flex flex-col md:space-x-4 text-gray-600">
      <p className="text-start">
        <strong>معاد الوصول:</strong> {convertTo12HourFormat(arrive)}
      </p>
      <p className="text-start">
        <strong>معاد الدخول:</strong> {convertTo12HourFormat(enter)}
      </p>
      <p className="text-start">
        <strong>معاد الخروج:</strong> {convertTo12HourFormat(exit)}
      </p>
    </div>
  </div>
</div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={closeModal}
                    >
                      إغلاق
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DetailsStudio;
