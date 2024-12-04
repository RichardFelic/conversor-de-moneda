import { useState } from 'react';
import { 
  Card, 
  CardBody, 
  Spinner,
  Input
} from '@nextui-org/react';
import { History } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { conversionApi } from '@/services/api/conversions';
import ConversionHistoryTable from '@/components/converter/ConversionHistoryTable';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';

export default function ConversionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { t } = useTranslation();

  const { data: history = [], isLoading, error } = useQuery({
    queryKey: ['conversion-history'],
    queryFn: async () => {
      const response = await conversionApi.getHistory();
      return response.data;
    }
  });
  
  if (error) {
    const errorResponse = error as { response?: { status?: number } };
    if (errorResponse.response?.status === 401) {
      logout();
      navigate('/users/login');
    }
    toast.error(error.message || t('common.error'));
  }

  const filteredHistory = history.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return searchTerm === '' || 
      item.currencyFrom.toLowerCase().includes(searchLower) ||
      item.currencyTo.toLowerCase().includes(searchLower);
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
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Card>
          <CardBody className="py-8 px-12 flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-danger/10">
              <History className="text-danger" size={24} />
            </div>
            <p className="text-danger text-lg font-medium">
              {t('auth.loginRequired')}
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
              {t('conversion_history.title')}
            </h1>
          </div>
        </CardBody>
      </Card>

      <Card className="mb-6">
        <CardBody>
          <Input
            type="search"
            placeholder={t('conversion_history.search_placeholder')}
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="w-full sm:w-64"
            size="sm"
            isClearable
            startContent={
              <span className="text-default-400">🔍</span>
            }
          />
        </CardBody>
      </Card>

      {filteredHistory.length === 0 ? (
        <Card className="mt-8">
          <CardBody className="py-12 flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-primary-50 dark:bg-primary-900/20">
              <History className="text-primary-500" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t('common.noResults')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              {searchTerm 
                ? t('conversion_history.no_results')
                : t('conversion_history.no_history')}
            </p>
          </CardBody>
        </Card>
      ) : (
        <ConversionHistoryTable history={filteredHistory} />
      )}
    </div>
  );
}