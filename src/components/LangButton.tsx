import { useState } from 'react';
import { animated } from 'react-spring';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';
import { Menu, MenuList, MenuButton, MenuLink } from '@reach/menu-button';

import useBoop from 'hooks/useBoop';
import Caret from 'icons/caret.svg';

import '@reach/menu-button/styles.css';

type LangButtonProps = {
  alternate: string;
};

const LangButton: React.FC<LangButtonProps> = ({ alternate }) => {
  const [style, trigger] = useBoop({ y: 4 });
  const router = useRouter();
  const i18n = useI18n();
  const [hidden, setHidden] = useState(true);

  const isEs = router?.locale === 'es';
  const to = isEs ? alternate : `/es${alternate}`;
  const language = isEs ? 'en' : 'es';

  return (
    <Menu>
      {({ isExpanded }) => (
        <>
          <MenuButton
            aria-label={i18n.t('nav.language')}
            title={i18n.t('nav.language')}
            onClick={() => setHidden(false)}
            className='flex flex-row justify-center items-center rounded-xl py-2 px-2 hover:bg-secondary active:bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:bg-secondary'
            onMouseEnter={() => trigger(true)}>
            {isEs ? <p>Spanish</p> : <p>English</p>}
            <animated.span className='ml-2' style={style} aria-hidden>
              <Caret width={24} height={24} />
            </animated.span>
          </MenuButton>
          <MenuList
            style={{ display: hidden ? 'none' : 'block' }}
            className={`rounded-xl ${isExpanded ? 'slide-down' : ''}`}>
            <NextLink href={to} locale={language}>
              <MenuLink
                as='a'
                href={to}
                lang={language}
                style={{ transform: 'translateY(10px)' }}
                onClick={() => setHidden(true)}
                className='flex-row justify-center z-30 relative bg-secondary rounded-xl items-center'>
                {isEs ? <p>English</p> : <p>Spanish</p>}
              </MenuLink>
            </NextLink>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default LangButton;
