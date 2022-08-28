import {
  ChakraProvider,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
} from '@chakra-ui/react';
import { FC } from 'react';
import ReactPrismjs from '@uiw/react-prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.css';

export type CodeTabsProps = {
  uiCode: any;
  machineCode: any;
};

export const CodeTabs: FC<CodeTabsProps> = ({ uiCode, machineCode }) => {
  return (
    <ChakraProvider>
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab>UI Code</Tab>
          <Tab>Machine Code</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ReactPrismjs language="typescript" source={uiCode} />
          </TabPanel>
          <TabPanel>
            <ReactPrismjs language="typescript" source={machineCode} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
};
