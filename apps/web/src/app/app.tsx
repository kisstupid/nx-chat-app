import styled from 'styled-components';

import { Route, Routes, Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useEffect, useRef } from 'react';
import { SEND_MESSAGE } from '@nx-chat-app/shared';


const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const socket = useRef<any>()

  useEffect(() => {
    socket.current = io('http://localhost:3333', {
      path: '/ws/',
      transports: ['websocket']
    })

    socket.current.on('receive_msg', (data: any) => {
      console.log(data);
    })

    socket.current.emit(SEND_MESSAGE, 'test')
  }, []);



  return (
    <StyledApp>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
function SEND_MSG(SEND_MSG: any, arg1: string) {
  throw new Error('Function not implemented.');
}

