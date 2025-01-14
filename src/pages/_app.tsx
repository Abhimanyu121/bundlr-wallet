import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import useInitialization from '@/hooks/useInitialization'
import useWalletConnectEventsManager from '@/hooks/useWalletConnectEventsManager'
import { createLegacySignClient } from '@/utils/LegacyWalletConnectUtil'
import { Button, createTheme, NextUIProvider } from '@nextui-org/react'
import { AppProps } from 'next/app'
import '../../public/main.css'
import { connectWallet } from '@/components/ExternalWallet/ExternalWallet'
import { TransactionsList } from '@/components/TransactionsList'

export default function App({ Component, pageProps }: AppProps) {
  // Step 1 - Initialize wallets and wallet connect client
  const initialized = useInitialization()

  // Step 2 - Once initialized, set up wallet connect event manager
  useWalletConnectEventsManager(initialized)

  // Backwards compatibility only - create a legacy v1 SignClient instance.
  createLegacySignClient()

  return (
    <NextUIProvider theme={createTheme({ type: 'dark' })}>
      <Layout initialized={initialized}>
        <Component {...pageProps} />
        <div><Button onClick={connectWallet}> Connect </Button>
          <TransactionsList></TransactionsList>
        </div>


      </Layout>


      <Modal />
    </NextUIProvider>
  )
}
