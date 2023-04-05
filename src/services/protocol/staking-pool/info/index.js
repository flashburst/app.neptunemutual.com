import { utils } from 'neptunemutual-sdk-test'

import { stringifyProps } from '../../../../utils/props'
import { getKeys } from './keys'

export const getInfo = async (chainId, type, poolKey, account, provider) => {
  try {
    const candidates = await getKeys(chainId, poolKey, account, provider)
    const result = await utils.store.readStorage(chainId, candidates, provider)

    return stringifyProps(result)
  } catch (error) {
    console.error(error)
    throw error
  }
}
