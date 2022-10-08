import React from 'react'
import { screen } from '@/utils/unit-tests/test-utils'
import { PoliciesTabs } from '@/modules/my-policies/PoliciesTabs'
import { formatCurrency } from '@/utils/formatter/currency'
import { convertFromUnits } from '@/utils/bn'
import { initiateTest, mockFn } from '@/utils/unit-tests/test-mockup-fn'
import { testData } from '@/utils/unit-tests/test-data'

const props = {
  active: 'active',
  children: () => <></>
}

const initialMocks = () => {
  mockFn.useActivePolicies()
  mockFn.useValidReport()
}

describe('PoliciesTab test', () => {
  const { initialRender, rerenderFn } = initiateTest(
    PoliciesTabs,
    props,
    initialMocks
  )

  beforeAll(() => {
    mockFn.useWeb3React()
  })

  beforeEach(() => {
    initialRender()
  })

  test('should render the hero container', () => {
    const hero = screen.getByTestId('hero-container')
    expect(hero).toBeInTheDocument()
  })

  test('should show the `My Policies` text properly', () => {
    const title = screen.getByText('My Policies')
    expect(title).toBeInTheDocument()
  })

  test('should render the herostat title', () => {
    const heroStat = screen.getByText('Total Active Protection')
    expect(heroStat).toBeInTheDocument()
  })

  test('should not render the herostat value when wallet is not connected', () => {
    mockFn.useWeb3React(() => ({ ...testData.account, account: null }))
    rerenderFn()

    const value = formatCurrency(
      convertFromUnits(
        '1032000000',
        testData.appConstants.liquidityTokenDecimals
      ),
      'en'
    ).long
    const heroStatVal = screen.queryByText(value)
    expect(heroStatVal).not.toBeInTheDocument()

    mockFn.useWeb3React()
    rerenderFn()
  })

  test('should render the herostat value', () => {
    const value = formatCurrency(
      convertFromUnits(
        '1032000000',
        testData.appConstants.liquidityTokenDecimals
      ),
      'en'
    ).long
    const heroStatVal = screen.queryByText(value)
    expect(heroStatVal).toBeInTheDocument()
  })

  test('should render the TabNav container', () => {
    const tabNav = screen.getByTestId('tab-nav-container')
    expect(tabNav).toBeInTheDocument()
  })
})