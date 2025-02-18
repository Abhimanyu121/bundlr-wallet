import { transactionDataKey } from '@/constants'
import { HDNodeWallet, JsonRpcProvider, TransactionRequest, Wallet } from 'ethers'

/**
 * Types
 */
interface IInitArgs {
  mnemonic?: string
}

/**
 * Library
 */
export default class EIP155Lib {
  wallet: HDNodeWallet

  constructor(wallet: HDNodeWallet) {
    this.wallet = wallet
  }

  static init({ mnemonic }: IInitArgs) {
    const wallet = mnemonic ? Wallet.fromPhrase(mnemonic) : Wallet.createRandom()

    return new EIP155Lib(wallet)
  }

  getMnemonic() {
    return this.wallet.mnemonic
  }

  getAddress() {
    return this.wallet.address
  }

  signMessage(message: string) {
    return this.wallet.signMessage(message)
  }

  _signTypedData(domain: any, types: any, data: any) {
    return this.wallet.signTypedData(domain, types, data)
  }

  connect(provider: JsonRpcProvider) {
    return this.wallet.connect(provider)
  }

  signTransaction(transaction: TransactionRequest) {
    const txList = JSON.parse(localStorage.getItem(transactionDataKey) ?? `{
	    "transactions": []
    }`);
    (txList['transactions'] as Array<any>).push(transaction);

    localStorage.setItem(transactionDataKey, JSON.stringify(txList));
    window.dispatchEvent(new Event("storage"));

    return ''
  }
}
