import { 
  Card, 
  CardBody, 
  Spinner,
} from '@nextui-org/react';
import { DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { exchangeRateApi } from '@/services/api/exchangeRates';
import ExchangeRatesTable from '@/components/exchangeRates/ExchangeRatesTable';
import { toast } from 'sonner';

export default function ExchangeRates() {
  const { data: rates = [], isLoading, error } = useQuery({
    queryKey: ['exchange-rates'],
    queryFn: async () => {
      const response = await exchangeRateApi.getAll();
      return response.data;
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

  if (error) {
    const errorMessage = (error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to load exchange rates';
    toast.error(errorMessage);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardBody className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/20">
              <DollarSign className="text-primary-500" size={24} />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Exchange Rates
            </h1>
          </div>
        </CardBody>
      </Card>

      {rates.length === 0 ? (
        <Card className="mt-8">
          <CardBody className="py-12 flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-primary-50 dark:bg-primary-900/20">
              <DollarSign className="text-primary-500" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              No Exchange Rates Available
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              There are currently no exchange rates to display.
            </p>
          </CardBody>
        </Card>
      ) : (
        <ExchangeRatesTable rates={rates} />
      )}
    </div>
  );
}