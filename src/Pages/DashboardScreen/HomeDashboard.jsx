import React from "react";
import Daily from "./Daily";

const HomeDashboard = () => {

  return (
    <div className="p-4">
      <Daily/>

          {/* <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-[#f3c74d] rounded-xl">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full py-2.5 text-sm leading-5 font-medium text-black rounded-lg ${
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                حجز يومي
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full py-2.5 text-sm leading-5 font-medium text-black rounded-lg ${
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                حجز استوديو
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full py-2.5 text-sm leading-5 font-medium text-black rounded-lg ${
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                حجز ميكاب
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <MUIDataTable
              title={"حجز يومي"}
              data={data}
              columns={columns}
              options={options}
            />
          </Tab.Panel>
          <Tab.Panel>
            <MUIDataTable
              title={"حجز استوديو"}
              data={data}
              columns={columns}
              options={options}
            />
          </Tab.Panel>
          <Tab.Panel>
            <MUIDataTable
              title={"حجز ميكاب"}
              data={data}
              columns={columns}
              options={options}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div className="flex items-center justify-between flex-wrap gap-8 mt-10">
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">الموظف</p>
              <p className="text-[#344767] text-lg font-medium">6</p>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <PiUser className="text-4xl text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">الباكدج</p>
              <p className="text-[#344767] text-lg font-medium">8</p>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <LuPackage className="text-4xl text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">الايجار</p>
              <p className="text-[#344767] text-lg font-medium">2</p>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <IoTimer className="text-4xl text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">المصروفات</p>
              <p className="text-[#344767] text-lg font-medium">2</p>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <FaFileInvoiceDollar className="text-4xl text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap md:flex-row flex-col gap-8 pt-10 border-b pb-8">
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg w-full">
          <div className="flex items-start gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">
                حجوزات الميكاب
              </p>
              <div className="pr-4">
                <p className="text-[#344767] text-lg font-medium mb-1">
                  عدد الحجوزات: 6
                </p>
                <p className="text-[#344767] text-lg font-medium mb-1">
                  {" "}
                  الاجمالي: 15000
                </p>
                <p className="text-[#344767] text-lg font-medium mb-1">
                  {" "}
                  المدفوع: 12250
                </p>
                <p className="text-[#344767] text-lg font-medium mb-1">
                  {" "}
                  المبالغ المتبقيه: 2750
                </p>
                <p className="text-[#344767] text-lg font-medium mb-1">
                  {" "}
                  %نسبه الخصم: 20
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <FaRegFaceGrinBeam className="text-4xl text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg w-full">
          <div className="flex items-start gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">
                حجوزات استوديو
              </p>
              <div className="pr-4">
                <p className="text-[#344767] text-lg font-medium mb-1">
                  عدد الحجوزات: 6
                </p>
                <p className="text-[#344767] text-lg font-medium mb-1">
                  {" "}
                  الاجمالي: 15000
                </p>
                <p className="text-[#344767] text-lg font-medium mb-1">
                  {" "}
                  المدفوع: 12250
                </p>
                <p className="text-[#344767] text-lg font-medium mb-1">
                  {" "}
                  المبالغ المتبقيه: 2750
                </p>
                <p className="text-[#344767] text-lg font-medium mb-1">
                  {" "}
                  %نسبه الخصم: 20
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <FaPhotoVideo className="text-4xl text-white" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HomeDashboard;
