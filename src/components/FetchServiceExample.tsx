import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ChakraProvider,
  Spinner,
} from '@chakra-ui/react';
import { fetchServiceMachine } from '@machines/fetchServiceMachine';
import { fetchService } from '@services/fetchService';
import { useMachine } from '@xstate/react';
import { FC, useEffect } from 'react';
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export const FetchServiceExample: FC = () => {
  const [state, send] = useMachine(
    fetchServiceMachine.withConfig({
      services: {
        fetchService: async (context, event) => {
          return fetchService(event.url);
        },
      },
    }),
    { devTools: true }
  );

  const users = state.context.data as User[];

  const url = 'https://jsonplaceholder.typicode.com/users';

  useEffect(() => {
    send({ type: 'FETCH', url });
  }, []);
  return (
    <ChakraProvider>
      <h1 className="text-4xl">Users List</h1>
      <Button
        className="w-48"
        colorScheme={'teal'}
        onClick={() => send({ type: 'FETCH', url })}
        isLoading={state.matches('isFetching')}
      >
        Fetch again
      </Button>
      {state.matches('isSuccess') && (
        <Accordion>
          {users.map((user) => {
            return (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {user.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Living in street: {user.address.street}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </ChakraProvider>
  );
};
