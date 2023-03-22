import Link from 'next/link'

import { Container } from '@/common/Container/Container'
import { Grid } from '@/common/Grid/Grid'

import { MyLiquidityCoverCard } from '@/common/Cover/MyLiquidity/MyLiquidityCoverCard'
import { CardSkeleton } from '@/common/Skeleton/CardSkeleton'
import { CARDS_PER_PAGE } from '@/src/config/constants'
import { Routes } from '@/src/config/routes'
import { useCoversAndProducts2 } from '@/src/context/CoversAndProductsData2'
import { t, Trans } from '@lingui/macro'

export const MyLiquidityPage = ({ myLiquidities, loading }) => {
  return (
    <Container className='py-16' data-testid='page-container'>
      <div className='flex justify-end'>
        <Link href={Routes.LiquidityTransactions}>
          <a className='text-lg font-medium text-4e7dd9 hover:underline'>
            <Trans>Transaction List</Trans>
          </a>
        </Link>
      </div>

      <MyLiquidities data={myLiquidities} loading={loading} />
    </Container>
  )
}

function MyLiquidities ({ data, loading }) {
  const { loading: isSummaryLoading, getCoverByCoverKey, getProductsByCoverKey } = useCoversAndProducts2()

  if (loading || isSummaryLoading) {
    return (
      <Grid className='mb-24 mt-14' data-testid='loading-grid'>
        <CardSkeleton
          numberOfCards={CARDS_PER_PAGE}
          statusBadge={false}
          subTitle={false}
        />
      </Grid>
    )
  }

  if (data.length === 0) {
    return (
      <div
        className='flex flex-col items-center w-full pt-20'
        data-testid='no-liquidities-grid'
      >
        <img
          src='/images/covers/empty-list-illustration.svg'
          alt={t`No data found`}
          className='w-48 h-48'
        />
        <p className='max-w-full mt-8 text-center text-md text-404040 w-96'>
          <Trans>
            Liquidity providers collectively own a liquidity pool. To become a
            liquidity provider, select a cover from the home screen.
          </Trans>
        </p>
      </div>
    )
  }

  return (
    <Grid className='mb-24 mt-14' data-testid='liquidities-grid'>
      {data.map((x) => {
        const coverKey = x.cover.id
        const coverData = getCoverByCoverKey(coverKey)
        const isDiversified = coverData?.supportsProducts

        return (
          <Link href={Routes.MyCoverLiquidity(coverKey)} key={x.id}>
            <a
              className='rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-4e7dd9'
              data-testid='liquidity-cover-card'
            >
              <MyLiquidityCoverCard
                coverKey={coverKey}
                coverData={coverData}
                totalPODs={x.totalPodsRemaining}
                tokenSymbol={x.cover.vaults[0].tokenSymbol}
                tokenDecimal={x.cover.vaults[0].tokenDecimal}
                subProducts={isDiversified ? getProductsByCoverKey(coverKey) : null}
              />
            </a>
          </Link>
        )
      })}
    </Grid>
  )
}
