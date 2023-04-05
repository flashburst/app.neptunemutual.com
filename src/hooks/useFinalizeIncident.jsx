import { useState } from 'react'

import {
  registry,
  utils
} from 'neptunemutual-sdk-test'

import { getProviderOrSigner } from '@/lib/connect-wallet/utils/web3'
import { useNetwork } from '@/src/context/Network'
import { useTxPoster } from '@/src/context/TxPoster'
import { getActionMessage } from '@/src/helpers/notification'
import { useAuthValidation } from '@/src/hooks/useAuthValidation'
import { useErrorNotifier } from '@/src/hooks/useErrorNotifier'
import { useTxToast } from '@/src/hooks/useTxToast'
import { METHODS } from '@/src/services/transactions/const'
import {
  STATUS,
  TransactionHistory
} from '@/src/services/transactions/transaction-history'
import { t } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'

export const useFinalizeIncident = ({ coverKey, productKey, incidentDate }) => {
  const [finalizing, setFinalizing] = useState(false)

  const { account, library } = useWeb3React()
  const { networkId } = useNetwork()
  const { requiresAuth } = useAuthValidation()

  const txToast = useTxToast()
  const { notifyError } = useErrorNotifier()
  const { writeContract } = useTxPoster()

  const finalize = async (onSuccess = (f) => f) => {
    if (!networkId || !account) {
      requiresAuth()
      return
    }

    setFinalizing(true)
    const cleanup = () => {
      setFinalizing(false)
    }

    const handleError = (err) => {
      notifyError(err, t`Could not finalize incident`)
    }

    try {
      const signerOrProvider = getProviderOrSigner(library, account, networkId)
      const instance = await registry.Resolution.getInstance(
        networkId,
        signerOrProvider
      )

      const onTransactionResult = async (tx) => {
        TransactionHistory.push({
          hash: tx.hash,
          methodName: METHODS.INCIDENT_FINALIZE,
          status: STATUS.PENDING
        })

        await txToast.push(
          tx,
          {
            pending: getActionMessage(METHODS.INCIDENT_FINALIZE, STATUS.PENDING)
              .title,
            success: getActionMessage(METHODS.INCIDENT_FINALIZE, STATUS.SUCCESS)
              .title,
            failure: getActionMessage(METHODS.INCIDENT_FINALIZE, STATUS.FAILED)
              .title
          },
          {
            onTxSuccess: () => {
              onSuccess()
              TransactionHistory.push({
                hash: tx.hash,
                methodName: METHODS.INCIDENT_FINALIZE,
                status: STATUS.SUCCESS
              })
            },
            onTxFailure: () => {
              TransactionHistory.push({
                hash: tx.hash,
                methodName: METHODS.INCIDENT_FINALIZE,
                status: STATUS.FAILED
              })
            }
          }
        )

        cleanup()
      }

      const onRetryCancel = () => {
        cleanup()
      }

      const onError = (err) => {
        handleError(err)
        cleanup()
      }

      const productKeyArg = productKey || utils.keyUtil.toBytes32('')
      const args = [coverKey, productKeyArg, incidentDate]
      writeContract({
        instance,
        methodName: 'finalize',
        args,
        onTransactionResult,
        onRetryCancel,
        onError
      })
    } catch (err) {
      handleError(err)
      cleanup()
    }
  }

  return {
    finalize,
    finalizing
  }
}
