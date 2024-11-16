import { CurrencyConverter } from "@/components/converter/CurrencyConverter";
import ExchangeRates from "./exchangeRateCard/ExchangeRates";
import { useTranslation } from 'react-i18next';


export default function Home() {

  const { t } = useTranslation();


  return (
    <div className="bg-[#F0F5FF] w-full h-96">
      <div className="flex flex-col items-center justify-center gap-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 ">
          {t('converter.title')}

          </h1>
          <p className="text-small text-black max-w-2xl">
          {t('converter.headline')}
          </p>
        </div>

        <CurrencyConverter />
      </div>

      <div className="max-w-3xl mx-auto mb-12 text-center pt-16 p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t('available_rates.title')}
        </h2>
        
        <ExchangeRates />
      </div>
    </div>
  );
}
