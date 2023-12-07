import { Routes } from '@/src/config/routes'
import {
  t,
  Trans
} from '@lingui/macro'

export const getActions = (i18n) => {
  return {
    purchase: {
      title: t(i18n)`Purchase Policy`,
      description: <Trans>to get protection from hacks & exploits</Trans>,
      imgSrc: '/cover-actions/purchase.png',
      getHref: (coverKey, productKey) => { return Routes.PurchasePolicy(coverKey, productKey) },
      action: 'purchase'
    },
    'add-liquidity': {
      title: t(i18n)`Provide Liquidity`,
      description: <Trans>to pool risks and receive rewards</Trans>,
      imgSrc: '/cover-actions/add-liquidity.png',
      getHref: (coverKey, _productKey) => { return Routes.ProvideLiquidity(coverKey) },
      action: 'add-liquidity'
    },
    report: {
      title: t(i18n)`Report Incident`,
      description: <Trans>to notify other users about the cover event</Trans>,
      imgSrc: '/cover-actions/report.png',
      getHref: (coverKey, productKey) => { return Routes.ReportNewIncident(coverKey, productKey) },
      action: 'new-report'
    },
    claim: {
      title: t(i18n)`Claim Cover`,
      description: <Trans>to receive payout by claiming cxTokens</Trans>,
      imgSrc: '/cover-actions/claim.png',
      getHref: (_coverKey, _productKey) => { return Routes.MyActivePolicies },
      action: 'claim'
    }
  }
}
