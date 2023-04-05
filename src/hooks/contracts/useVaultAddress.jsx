import {
  useEffect,
  useState
} from 'react'

import { registry } from 'neptunemutual-sdk-test'

import { getProviderOrSigner } from '@/lib/connect-wallet/utils/web3'
import { useNetwork } from '@/src/context/Network'
import { useWeb3React } from '@web3-react/core'

export const useVaultAddress = ({ coverKey }) => {
  const [address, setAddress] = useState(null)
  const { networkId } = useNetwork()
  const { library, account } = useWeb3React()

  useEffect(() => {
    let ignore = false
    if (!networkId || !account || !coverKey) return

    async function exec () {
      const signerOrProvider = getProviderOrSigner(library, account, networkId)

      const vaultAddress = await registry.Vault.getAddress(
        networkId,
        coverKey,
        signerOrProvider
      )

      if (ignore) return
      setAddress(vaultAddress)
    }

    exec()

    return () => {
      ignore = true
    }
  }, [account, coverKey, library, networkId])

  return address
}
