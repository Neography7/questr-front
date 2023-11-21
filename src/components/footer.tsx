'use client';

import { Footer as FlowFooter } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {

  const { t } = useTranslation();

  return (
    <FlowFooter container className='rounded-none border-none shadow-none bg-gray-50 dark:bg-gray-900 p-6 md:py-10'>
      <div className="w-full text-center">
        <div className="w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <FlowFooter.Copyright
            by="Questr"
            year={2023}
            className='md:mr-6'
            />
          <FlowFooter.LinkGroup className='hidden md:flex text-gray-500 dark:text-gray-400'>
            <FlowFooter.Link href="#">
              <Link to="/about">{ t('about.heading') }</Link>
            </FlowFooter.Link>
            <FlowFooter.Link href=''>
              <Link to="/privacy-policy">{ t('privacy_policy.heading') }</Link>
            </FlowFooter.Link>
            <FlowFooter.Link href="https://www.linkedin.com/in/ilker-akyel/" target='_blank'>
              { t('general.contact') }
            </FlowFooter.Link>
          </FlowFooter.LinkGroup>
        </div>
      </div>
    </FlowFooter>
  )
}


