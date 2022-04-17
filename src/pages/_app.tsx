import { I18nProvider } from 'next-localization';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import 'focus-visible';

import { addToQueue, sendVitals } from 'utils/vitals';

import 'styles/index.css';

import type { AppProps, NextWebVitalsMetric } from 'next/app';

export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  addToQueue(metric);
  sendVitals();
};

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { lngDict, ...rest } = pageProps;
  const router = useRouter();

  return (
    <>
      <NextNProgress height={5} />
      <I18nProvider lngDict={lngDict} locale={router?.locale as string}>
        <Component {...rest} />
      </I18nProvider>
    </>
  );
};

export default MyApp;
