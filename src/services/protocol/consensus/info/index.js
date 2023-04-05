import { utils } from 'neptunemutual-sdk-test'

import { stringifyProps } from '@/utils/props'

import { getKeys } from './keys'

export const getUnstakeInfoFor = async (
  chainId,
  coverKey,
  productKey,
  account,
  incidentDate,
  provider
) => {
  try {
    const all = await getKeys(coverKey, productKey, account, incidentDate)

    const result = await utils.store.readStorage(chainId, all, provider)

    return stringifyProps(result)
  } catch (error) {
    console.error(error)
    throw error
  }
}
