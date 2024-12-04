import { useParams } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  Spinner,
  Chip
} from '@nextui-org/react';
import { DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { exchangeRateApi } from '@/services/api/exchangeRates';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';


export default function ExchangeRateDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();


  const { data: rate, isLoading, error } = useQuery({
    queryKey: ['exchange-rate', id],
    queryFn: async () => {
      if (!id) throw new Error(t('errors.exchangeRateIdRequired'));
      try {
        const response = await exchangeRateApi.getById(id);
        return response.data;
      } catch (error: unknown) {
        const errorResponse = error as { response?: { data?: { error?: string; message?: string } } };
        const errorMessage = 
          errorResponse.response?.data?.error || 
          errorResponse.response?.data?.message || 
          t('errors.failedToLoadExchangeRate');
        toast.error(errorMessage);
        throw error;
      }
    },
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !rate) {
    const errorResponse = error as { response?: { data?: { error?: string; message?: string } } };
    const errorMessage = 
      errorResponse?.response?.data?.error || 
      errorResponse?.response?.data?.message || 
      t('errors.exchangeRateNotFound');
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Card>
          <CardBody className="py-8 px-12 flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-danger/10">
              <DollarSign className="text-danger" size={24} />
            </div>
            <p className="text-danger text-lg font-medium">
              {errorMessage}
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardBody className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/20">
              <DollarSign className="text-primary-500" size={24} />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {t('exchange_rate_details.title')}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('exchange_rate_details.from')}</h2>
                <Chip size="lg" variant="flat" color="primary" className="mt-1">
                  {rate.currencyFrom}
                </Chip>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('exchange_rate_details.to')}</h2>
                <Chip size="lg" variant="flat" color="secondary" className="mt-1">
                  {rate.currencyTo}
                </Chip>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('exchange_rate_details.exchange_rate')}</h2>
                <p className="text-2xl font-semibold text-primary-600 dark:text-primary-400 mt-1">
                  {rate.exchangeRate.toFixed(4)}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('exchange_rate_details.last_updated')}</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {formatDate(rate.update_date)}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}