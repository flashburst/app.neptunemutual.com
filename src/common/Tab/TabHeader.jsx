import { Tab } from '@/common/Tab/Tab'
import { classNames } from '@/utils/classnames'

export const TabHeader = ({ activeTab, headers, onClick }) => {
  return (
    <div
      className='px-2 border-b border-b-B0C4DB xs:px-16 sm:min-w-fit'
      data-testid='tab-header-container'
    >
      <div className='flex mx-auto xs:max-w-7xl justify-center xs:justify-start '>
        {headers.map((header) => (
          <Tab key={header.name} active={activeTab === header.name}>
            <button
              onClick={() => onClick(header.name)}
              className={classNames(
                'inline-block px-6 py-2',
                activeTab === header.name ? 'font-semibold' : ''
              )}
              data-testid='tab-btn'
            >
              {header.displayAs}
            </button>
          </Tab>
        ))}
      </div>
    </div>
  )
}
