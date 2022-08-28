/* This example requires Tailwind CSS v2.0+ */
import { ChakraProvider } from '@chakra-ui/react';
import { Disclosure } from '@headlessui/react';
import { BarChartOutlined, CheckroomSharp } from '@mui/icons-material';
import { inspect } from '@xstate/inspect';
import { FC, useEffect } from 'react';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [{ name: 'Catalogue', href: '#', current: true }];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Application: FC = ({ children }) => {
  useEffect(() => {
    inspect({});
  }, []);
  return (
    <ChakraProvider>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-900 border-b border-gray-200">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src="https://www.theuy.nl/content/images/2021/04/theuy-logo-800x800--2--7.png"
                        alt="Theuy B.V. Logo"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src="https://www.theuy.nl/content/images/2021/04/theuy-logo-800x800--2--7.png"
                        alt="Theuy B.V. Logo"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'border-sky-500 text-white'
                              : 'border-transparent text-white hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <BarChartOutlined
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckroomSharp
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-sky-50 border-sky-500 text-sky-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-8">{children}</div>
      </div>
    </ChakraProvider>
  );
};
