import MUIDataTable from "mui-datatables";
import { Tab } from "@headlessui/react";
import StudioTableDaily from "../../Components/Daily/StudioTableDaily";
import { Fragment } from "react";
import MakeUpTableDaily from "../../Components/Daily/MakeUpTableDaily";

const Daily = () => {
  return (
    <div className="p-4">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-[#f3c74d] rounded-xl">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full py-2.5 text-xl leading-5 font-bold text-black rounded-lg ${
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                حجوزات استوديو
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full py-2.5 text-xl leading-5 font-bold text-black rounded-lgف ${
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                حجوزات ميكاب
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <StudioTableDaily />
          </Tab.Panel>
          <Tab.Panel>
            <MakeUpTableDaily/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Daily;
