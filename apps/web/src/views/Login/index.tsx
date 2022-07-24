import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login, LoginPayload } from '../../redux/thunks/auth';
import { Input, Button } from '../../styles';

export default function () {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(({ auth }) => auth);

  const data = useRef<LoginPayload>({
    username: '',
    roomId: '',
  });

  function submit() {
    dispatch(login(data.current));
  }

  return (
    <div className="flex justify-center align-center">
      <div className="max-w-xs p-3 bg-white shadow-lg rounded-sm ">
        <p className="font-bold mb-8 text-center text-lg">Join Chatroom</p>
        <Input
          placeholder="Username"
          onChange={(e: any) => (data.current.username = e.target.value)}
        />
        <Input
          placeholder="RoomID"
          className="mt-3"
          onChange={(e: any) => (data.current.roomId = e.target.value)}
        />
        <Button className="mt-20" onClick={submit} disabled={loading}>
          JOIN
        </Button>
      </div>
    </div>
  );
}
