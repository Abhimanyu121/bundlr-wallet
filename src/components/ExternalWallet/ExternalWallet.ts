import Onboard, { WalletState } from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'


const injected = injectedModule()


const onboard = Onboard({
    wallets: [injected],
    chains: [
        {
            id: '0x13881',
            token: 'Matic',
            label: 'Mumbai',
            rpcUrl: 'https://rpc.ankr.com/polygon_mumbai'
        }
    ]
})
let wallets: WalletState[] | undefined;
export const connectWallet = async () => {
    wallets = await onboard.connectWallet()
    return wallets;
}

export const disconnectWallet = async () => {
    wallets = await onboard.disconnectWallet({ label: 'disconnected' });
    return wallets;
}

export const getWallet = () => {
    return wallets;
}