import { useI18n } from 'next-localization';

const Footer: React.FC = () => {
  const i18n = useI18n();

  return (
    <footer className='max-w-2xl mx-auto w-full pb-8 mt-16 px-4 md:px-0 text-center'>
      <hr className='w-full border-1 border-gray-200 dark:border-gray-800 mb-8' />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <h3
        onClick={() =>
          window.open(
            'https://www.linkedin.com/in/diego-rodriguez-paiva/',
            '_blank',
          )
        }
        onKeyDown={(ev) => {
          if (ev.keyCode === 13) {
            window.open(
              'https://www.linkedin.com/in/diego-rodriguez-paiva/',
              '_blank',
            );
          }
        }}
        className='mb-4 p-1 font-medium cursor-pointer'>
        {i18n.t('footer.contact')} <span>Diego Rodriguez</span>
      </h3>
    </footer>
  );
};

export default Footer;
