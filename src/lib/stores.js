import { ApiPromise, WsProvider } from "@polkadot/api";

import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@polkadot/extension-dapp";

import { writable } from 'svelte/store';

export const account = writable('');
export const selectedTab = writable('c');

export let api;

export let init = async () =>  {
    let socket = "ws://127.0.0.1:9944";

    // we are now informed that the user has at least one extension and that we
    // will be able to show and use accounts
    const allAccounts = await web3Accounts();
    // accountId = allAccounts[0].address ;
    account.set(JSON.stringify(allAccounts[0]));

    // Construct
    const wsProvider = new WsProvider(socket);
    api = await ApiPromise.create({ provider: wsProvider });
}