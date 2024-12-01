import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import MakeUpReports from "../../Components/Reports/MakeUpReports";
import StudioReports from "../../Components/Reports/StudioReports";
import ExpensesReaport from "../../Components/Reports/ExpensesReaport";
import LoansReports from "../../Components/Reports/LoansReports";

const Reports = () => {

  return (
    <div className="p-4">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-[#20b2aa]  rounded-xl flex-col sm:flex-row">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
              className={`w-full py-2.5 text-xl leading-5 font-bold text-black rounded-lg ${
                selected
                  ? "bg-white shadow"
                  : "text-white hover:bg-white/[0.12]"
              }`}
              >
                حجوزات استوديو
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
              className={`w-full py-2.5 text-xl leading-5 font-bold text-black rounded-lg ${
                selected
                  ? "bg-white shadow"
                  : "text-white hover:bg-white/[0.12]"
              }`}
              >
                حجوزات ميكاب
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
              className={`w-full py-2.5 text-xl leading-5 font-bold text-black rounded-lg ${
                selected
                  ? "bg-white shadow"
                  : "text-white hover:bg-white/[0.12]"
              }`}
              >
                مصروفات 
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
              className={`w-full py-2.5 text-xl leading-5 font-bold text-black rounded-lg ${
                selected
                  ? "bg-white shadow"
                  : "text-white hover:bg-white/[0.12]"
              }`}
              >
                السلف 
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <StudioReports/>
          </Tab.Panel>
          <Tab.Panel>
            <MakeUpReports/>
          </Tab.Panel>
          <Tab.Panel>
            <ExpensesReaport/>
          </Tab.Panel>
          <Tab.Panel>
            <LoansReports/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Reports
