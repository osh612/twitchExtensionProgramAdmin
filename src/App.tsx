import React, { useCallback } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useSetRecoilState } from 'recoil';
import { customErrAtom, errorAtom } from './recoil/errors/errorsAtom';
import Routor from './Routes';

function App() {
  const setError = useSetRecoilState(errorAtom);
  const setCustomErr = useSetRecoilState(customErrAtom);

  const ErrorHandler = useCallback(
    (err: any) => {
      if (err.status) {
        setError(err);
        setCustomErr(err);
      }
    },
    [setError, setCustomErr],
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: ErrorHandler,
      },
      mutations: {
        onError: ErrorHandler,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routor />
    </QueryClientProvider>
  );
}

export default App;
