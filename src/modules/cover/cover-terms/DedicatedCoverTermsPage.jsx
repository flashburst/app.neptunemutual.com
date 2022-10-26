import { Divider } from '@/common/Divider/Divider'
import { CoverTerms } from '@/modules/cover/cover-terms/CoverTerms'
import { StandardsTerms } from '@/modules/cover/cover-terms/StandardTerms'
import { Routes } from '@/src/config/routes'
import { t, Trans } from '@lingui/macro'
import Link from 'next/link'
import { useEffect } from 'react'

export const DedicatedCoverTermsPage = ({ coverInfo }) => {
  useEffect(() => {
    if (!coverInfo) return

    setTimeout(() => {
      window.print()
      window.close()
    }, 500)
  }, [coverInfo])

  if (!coverInfo) return null

  const effectiveDate = new Date().toISOString()

  return (
    <div>
      <Link href={Routes.Home} replace>
        <a className='block w-max'>
          <picture>
            <img
              loading='lazy'
              alt={t`Neptune Mutual`}
              srcSet='/logos/neptune-mutual-full-beta.svg'
              className='w-full text-black h-9'
              data-testid='header-logo'
            />
          </picture>
        </a>
      </Link>

      <Divider className='border !border-black' />

      <p className='mt-3 text-lg font-semibold font-arial text-000000'>
        <Trans>As of: {effectiveDate}</Trans>
      </p>

      <CoverTerms coverInfo={coverInfo} />

      <StandardsTerms className='mt-12' />
    </div>
  )
}
