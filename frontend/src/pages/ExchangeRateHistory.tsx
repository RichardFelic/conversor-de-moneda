import { useState } from 'react';
import { 
  Card, 
  CardBody, 
  Spinner,
  Tabs,
  Tab,
  // Select,
  // SelectItem,
  Input
} from '@nextui-org/react';
import { History } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { exchangeRateHistoryApi } from '@/services/api/exchangeRateHistory';
import ExchangeRateHistoryTable from '@/components/exchangeRates/ExchangeRateHistoryTable';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';

type FilterType = 'all' | 'general' | 'institutional';
interface ApiError extends Error {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}
export default function ExchangeRateHistory() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { t } = useTranslation();

  const { data: history = [], isLoading, error, isError } = useQuery({
    queryKey: ['exchange-rate-history'],
    queryFn: async () => {
      const response = await exchangeRateHistoryApi.getAll();
      return response.data;
    }
  });
  
  if (isError) {
    if ((error as ApiError).response?.status === 401) {
      logout();
      navigate('/users/login');
    }
    toast.error((error as ApiError).response?.data?.message || 'Failed to load exchange rate history');
  }

  const filteredHistory = history.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.currencyFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currencyTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.institution?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'general') return !item.institution && matchesSearch;
    if (selectedFilter === 'institutional') return item.institution && matchesSearch;
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4 ">
        <Card>
          <CardBody className="py-8 px-12 flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-danger/10">
              <History className="text-danger" size={24} />
            </div>
            <p className="text-danger text-lg font-medium">
            {(error as { response?: { data?: { error?: string } } }).response?.data?.error || 'You need to be logged in to view exchange rate history'}
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
              <History className="text-primary-500" size={24} />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Exchange Rate History
            </h1>
          </div>
        </CardBody>
      </Card>

      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Tabs 
              selectedKey={selectedFilter}
              onSelectionChange={(key) => setSelectedFilter(key as FilterType)}
              className="flex-grow"
            >
              <Tab key="all" title="All" />
              <Tab key="general" title="General" />
              <Tab key="institutional" title="Institutional" />
            </Tabs>
            <Input
              type="search"
              placeholder={t('common.search')}
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="w-full sm:w-64"
              size="sm"
              isClearable
              startContent={
                <span className="text-default-400">🔍</span>
              }
            />
          </div>
        </CardBody>
      </Card>

      {filteredHistory.length === 0 ? (
        <Card className="mt-8">
          <CardBody className="py-12 flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-primary-50 dark:bg-primary-900/20">
              <History className="text-primary-500" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              No History Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              {searchTerm 
                ? 'No results match your search criteria.' 
                : 'There is no exchange rate history to display.'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <ExchangeRateHistoryTable history={filteredHistory} />
      )}
    </div>
  );
}