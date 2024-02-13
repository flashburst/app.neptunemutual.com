import { registerToken } from '@/lib/connect-wallet/utils/wallet'
import { useWeb3React } from '@web3-react/core'

export const useRegisterToken = () => {
  const { account } = useWeb3React()

  const register = (address, symbol, decimals = 18) => {
    if (!account) { return }

    const image = (symbol && typeof symbol === 'string') ? `https://cdn.neptunemutual.net/images/currencies/icons/default/${symbol.toLowerCase()}.svg` : undefined

    registerToken(address, symbol, decimals, image)
      .then(console.log)
      .catch(console.error)
  }

  return {
    register
  }
}
