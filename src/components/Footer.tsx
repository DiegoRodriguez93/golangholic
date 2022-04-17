import { useI18n } from 'next-localization';

import LinkedinIcon from 'icons/linkedin.svg';
import EmailIcon from 'icons/email.svg';
import GithubIcon from 'icons/github.svg';

const hadleRedirectToLinkedin = () =>
  window.open('https://www.linkedin.com/in/diego-rodriguez-paiva/', '_blank');

const hadleRedirectToEmail = () =>
  window.open('mailto:diegorodriguez93@hotmail.com', '_blank');

const hadleRedirectToGithub = () =>
  window.open('https://github.com/DiegoRodriguez93', '_blank');

const Footer: React.FC = () => {
  const i18n = useI18n();

  return (
    <footer className='max-w-2xl mx-auto w-full pb-8 mt-16 px-4 md:px-0 text-center'>
      <hr className='w-full border-1 border-gray-200 dark:border-gray-800 mb-8' />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <h3
        onClick={hadleRedirectToLinkedin}
        onKeyDown={(ev) => {
          if (ev.keyCode === 13) hadleRedirectToLinkedin();
        }}
        className='mb-4 p-1 font-medium cursor-pointer'>
        {i18n.t('footer.contact')} <span>Diego Rodriguez</span>
      </h3>
      <div className='flex justify-center gap-3'>
        <button onClick={hadleRedirectToLinkedin}>
          <LinkedinIcon width={60} height={60} />
        </button>
        <button onClick={hadleRedirectToEmail}>
          <EmailIcon width={45} height={45} />
        </button>
        <button onClick={hadleRedirectToGithub}>
          <GithubIcon width={50} height={50} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
