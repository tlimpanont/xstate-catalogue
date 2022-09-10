import { authClientMachine } from '@machines/simpleAuthMachine';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useMachine } from '@xstate/react';
import { FC } from 'react';

export type SimpleAuthExampleProps = {};

export const SimpleAuthExample: FC<SimpleAuthExampleProps> = () => {
  const [state, send] = useMachine(authClientMachine, { devTools: true });
  const loading = state.matches('authorizing');
  return (
    <>
      <Typography variant="body1">
        Invoke AuthServer Machine and wait for 3 seconds until the server
        responds back with a TOKEN
      </Typography>
      <Button
        sx={{ width: 200 }}
        disabled={loading}
        variant="contained"
        onClick={() => {
          send({ type: 'AUTH' });
        }}
      >
        Authorize
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: '#00a152',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Button>
    </>
  );
};
