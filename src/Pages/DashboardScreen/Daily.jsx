import { Tab } from "@headlessui/react";
import StudioTableDaily from "../../Components/Daily/StudioTableDaily";
import { Fragment } from "react";
import MakeUpTableDaily from "../../Components/Daily/MakeUpTableDaily";
import HairTableDaily from "../../Components/Daily/HairTableDaily";

const Daily = () => {
  return (
    <div className="p-4">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-[#20b2aa] rounded-xl">
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
                حجوزات الشعر
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
                حجوزات استوديو
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <MakeUpTableDaily/>
          </Tab.Panel>
          <Tab.Panel>
            <HairTableDaily />
          </Tab.Panel>
          <Tab.Panel>
            <StudioTableDaily />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Daily;
