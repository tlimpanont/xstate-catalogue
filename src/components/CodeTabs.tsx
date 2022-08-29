import { Tab } from '@headlessui/react';
import { FC } from 'react';
import ReactPrismjs from '@uiw/react-prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.min.css';

export type CodeTabsProps = {
  uiCode: any;
  machineCode: any;
};

export const CodeTabs: FC<CodeTabsProps> = ({ uiCode, machineCode }) => {
  return (
    <Tab.Group>
      <Tab.List className={'space-x-4'}>
        <Tab>
          {({ selected }) => (
            <button
              className={
                selected
                  ? 'p-2 border-blue-600 border-b-2'
                  : 'bg-white text-black'
              }
            >
              UI Code
            </button>
          )}
        </Tab>
        <Tab>
          {({ selected }) => (
            <button
              className={
                selected
                  ? 'p-2 border-blue-600 border-b-2'
                  : 'bg-white text-black'
              }
            >
              Machine code
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <ReactPrismjs language="typescript" source={uiCode} />
        </Tab.Panel>
        <Tab.Panel>
          <ReactPrismjs language="typescript" source={machineCode} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
