import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import EncryptedStorage from 'react-native-encrypted-storage';

export const getAccounts = createAsyncThunk(
  'login/getAccounts',
  async (_, { getState }) => {
    const { privateKey } = getState().login;
    const provider = new ethers.Wallet(privateKey, ethers.getDefaultProvider('https://rpc.ankr.com/eth_sepolia'));
    const address = await provider.getAddress();
    return address;
  }
);

export const getBalance = createAsyncThunk(
  'login/getBalance',
  async (_, { getState }) => {
    const { privateKey } = getState().login;
    const wallet = new ethers.Wallet(privateKey);
    const provider = ethers.getDefaultProvider('https://rpc.ankr.com/eth_sepolia');
    const balance = await provider.getBalance(wallet.address);
    return ethers.utils.formatEther(balance);
  }
);

export const signMessage = createAsyncThunk(
  'login/signMessage',
  async (_, { getState }) => {
    const { privateKey } = getState().login;
    const provider = new ethers.Wallet(privateKey, ethers.getDefaultProvider('https://rpc.ankr.com/eth_sepolia'));
    const signedMessage = await provider.signMessage('YOUR_MESSAGE');
    return signedMessage;
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
    userInfo: null,
    accounts: null,
    balance: null,
    signedMessage: null,
    privateKey: null,
    web3auth: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.loggedIn = true;
      state.userInfo = action.payload.userInfo;
      state.privateKey = action.payload.privateKey;
      state.web3auth = action.payload.web3auth;
      // Persist privateKey securely
      EncryptedStorage.setItem('privateKey', action.payload.privateKey);
    },
    logoutSuccess: (state) => {
      state.loggedIn = false;
      state.userInfo = null;
      state.accounts = null;
      state.balance = null;
      state.signedMessage = null;
      state.privateKey = null;
      state.web3auth = null;
      // Remove privateKey from secure storage
      EncryptedStorage.removeItem('privateKey');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(signMessage.fulfilled, (state, action) => {
        state.signedMessage = action.payload;
      });
  },
});

export const { loginSuccess, logoutSuccess } = loginSlice.actions;

export default loginSlice.reducer;
