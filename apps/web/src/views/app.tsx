import { useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { io } from 'socket.io-client';
import { SEND_MESSAGE } from '@nx-chat-app/shared';

import ChatRoom from './ChatRoom';
import Login from './Login';
import { useAppSelector } from '../hooks';
import NoMatch from './NoMatch';

export default function () {
  const navigate = useNavigate();
  const { authenticated } = useAppSelector(({ auth }) => auth);

  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io('http://localhost:3333', {
      path: '/ws/',
      transports: ['websocket'],
    });

    socket.current.on('receive_msg', (data: any) => {
      console.log(data);
    });

    socket.current.emit(SEND_MESSAGE, 'test');
  }, []);

  useEffect(() => {
    if (authenticated) navigate('');
    else navigate('/login');
  }, [authenticated]);

  if (authenticated) return <ChatRoom />;

  return (
    <Routes>
      <Route path="/">
        <Route index element={<ChatRoom />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
