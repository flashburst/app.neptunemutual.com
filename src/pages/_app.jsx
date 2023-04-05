import '@fontsource/inter/latin.css'
import '../common/GaugeChart/GaugeChart.css'
import '../styles/globals.css'

import { useEffect } from 'react'

import ErrorBoundary from '@/common/ErrorBoundary'
import { getLibrary } from '@/lib/connect-wallet/utils/web3'
import { ToastProvider } from '@/lib/toast/provider'
import { DEFAULT_VARIANT } from '@/src/config/toast'
import { AppConstantsProvider } from '@/src/context/AppConstants'
import { CookiesProvider } from '@/src/context/Cookie'
import {
  CoversAndProductsProvider2
} from '@/src/context/CoversAndProductsData2'
import { NetworkProvider } from '@/src/context/Network'
import { TxPosterProvider } from '@/src/context/TxPoster'
import { UnlimitedApprovalProvider } from '@/src/context/UnlimitedApproval'
import { MainLayout } from '@/src/layouts/main/MainLayout'
import { setupMetamaskForFirefox } from '@/utils/metamask-firefox'
import { Web3ReactProvider } from '@web3-react/core'

import { LanguageProvider } from '../i18n'

console.log('NPM_ETHEREUM_STORE', process.env.NPM_ETHEREUM_STORE)
console.log('NEXT_PUBLIC_ETHEREUM_STORE', process.env.NEXT_PUBLIC_ETHEREUM_STORE)
console.log('NPM_ARBITRUM_STORE', process.env.NPM_ARBITRUM_STORE)
console.log('NEXT_PUBLIC_ARBITRUM_STORE', process.env.NEXT_PUBLIC_ARBITRUM_STORE)
console.log('NPM_BASE_GOERLI_STORE', process.env.NPM_BASE_GOERLI_STORE)
console.log('NEXT_PUBLIC_BASE_GOERLI_STORE', process.env.NEXT_PUBLIC_BASE_GOERLI_STORE)
console.log('NPM_MUMBAI_STORE', process.env.NPM_MUMBAI_STORE)
console.log('NEXT_PUBLIC_MUMBAI_STORE', process.env.NEXT_PUBLIC_MUMBAI_STORE)
console.log('NPM_FUJI_STORE', process.env.NPM_FUJI_STORE)
console.log('NEXT_PUBLIC_FUJI_STORE', process.env.NEXT_PUBLIC_FUJI_STORE)

const Wrappers = ({ children, noHeader }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <NetworkProvider>
        <AppConstantsProvider>
          <CoversAndProductsProvider2>
            <UnlimitedApprovalProvider>
              <ToastProvider variant={DEFAULT_VARIANT}>
                <TxPosterProvider>
                  <MainLayout noHeader={noHeader}>{children}</MainLayout>
                </TxPosterProvider>
              </ToastProvider>
            </UnlimitedApprovalProvider>
          </CoversAndProductsProvider2>
        </AppConstantsProvider>
      </NetworkProvider>
    </Web3ReactProvider>
  )
}

function MyApp ({ Component, pageProps }) {
  // useEffect(() => {
  //   console.log('NPM_ETHEREUM_STORE', process.env.NPM_ETHEREUM_STORE)
  //   console.log('NEXT_PUBLIC_ETHEREUM_STORE', process.env.NEXT_PUBLIC_ETHEREUM_STORE)
  //   console.log('NPM_ARBITRUM_STORE', process.env.NPM_ARBITRUM_STORE)
  //   console.log('NEXT_PUBLIC_ARBITRUM_STORE', process.env.NEXT_PUBLIC_ARBITRUM_STORE)
  //   console.log('NPM_BASE_GOERLI_STORE', process.env.NPM_BASE_GOERLI_STORE)
  //   console.log('NEXT_PUBLIC_BASE_GOERLI_STORE', process.env.NEXT_PUBLIC_BASE_GOERLI_STORE)
  //   console.log('NPM_MUMBAI_STORE', process.env.NPM_MUMBAI_STORE)
  //   console.log('NEXT_PUBLIC_MUMBAI_STORE', process.env.NEXT_PUBLIC_MUMBAI_STORE)
  //   console.log('NPM_FUJI_STORE', process.env.NPM_FUJI_STORE)
  //   console.log('NEXT_PUBLIC_FUJI_STORE', process.env.NEXT_PUBLIC_FUJI_STORE)
  // }, [])

  useEffect(() => {
    setupMetamaskForFirefox()
  }, [])

  if (pageProps.noWrappers) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <CookiesProvider>
        <ErrorBoundary>
          <LanguageProvider>
            <Wrappers noHeader={pageProps.noHeader}>
              <Component {...pageProps} />
            </Wrappers>
          </LanguageProvider>
        </ErrorBoundary>
      </CookiesProvider>
    </>
  )
}

export default MyApp
