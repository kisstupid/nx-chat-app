import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export type LoginPayload = {
  username: string;
  roomId: string;
};

type LoginResponse = {
  access_token: string;
};

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async (payload) => {
    const res = await axios.post('conversation', payload);
    return res.data;
  }
);
