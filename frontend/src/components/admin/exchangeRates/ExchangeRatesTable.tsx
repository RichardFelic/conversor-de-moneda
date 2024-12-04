import { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Button,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Chip
} from '@nextui-org/react';
import { Pencil, Trash2, AlertTriangle, Copy } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { institutionExchangeRateApi } from '@/services/api/institutionExchangeRates';
import type { InstitutionExchangeRate } from '@/services/api/institutionExchangeRates';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';

interface ExchangeRatesTableProps {
  rates: InstitutionExchangeRate[];
  onEdit: (rate: InstitutionExchangeRate) => void;
}

// Add type for error response
interface ErrorResponse {
  message?: string;
  response?: {
    status?: number;
  };
}

export default function ExchangeRatesTable({ rates, onEdit }: ExchangeRatesTableProps) {
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; rate: InstitutionExchangeRate | null }>({
    isOpen: false,
    rate: null
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { t } = useTranslation();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await institutionExchangeRateApi.delete(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution-exchange-rates'] });
      toast.success(t('common.success'));
      handleCloseDeleteModal();
    },
    onError: (error: ErrorResponse) => {
      if (error.response?.status === 401) {
        logout();
        navigate('/users/login');
      }
      toast.error(error.message || t('common.error'));
    }
  });

  const handleDelete = (rate: InstitutionExchangeRate) => {
    setDeleteModal({
      isOpen: true,
      rate
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.rate) {
      deleteMutation.mutate(deleteModal.rate._id);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      rate: null
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('common.success'));
  };

  if (!Array.isArray(rates)) {
    console.error('Rates is not an array:', rates);
    return null;
  }

  return (
    <>
      <Table 
        aria-label={t('admin.exchange_rates.title')}
        classNames={{
          wrapper: "shadow-md",
          td: "text-default-700 dark:text-default-300",
          th: "bg-default-100 dark:bg-default-50 text-default-600 dark:text-default-400"
        }}
      >
        <TableHeader>
          <TableColumn>{t('admin.exchange_rates.columns.id')}</TableColumn>
          <TableColumn>{t('admin.exchange_rates.columns.from')}</TableColumn>
          <TableColumn>{t('admin.exchange_rates.columns.to')}</TableColumn>
          <TableColumn>{t('admin.exchange_rates.columns.rate')}</TableColumn>
          <TableColumn>{t('admin.exchange_rates.columns.institution')}</TableColumn>
          <TableColumn>{t('admin.exchange_rates.columns.lastUpdate')}</TableColumn>
          <TableColumn align="center">{t('admin.exchange_rates.columns.actions')}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={t('admin.exchange_rates.noRates')}>
          {rates.map((rate) => (
            <TableRow key={rate._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono">{rate._id}</span>
                  <Tooltip content={t('admin.exchange_rates.tooltips.copyId')}>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => copyToClipboard(rate._id)}
                      className="text-default-400 hover:text-primary-500"
                    >
                      <Copy size={14} />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat" color="primary">
                  {rate.currencyFrom}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat" color="secondary">
                  {rate.currencyTo}
                </Chip>
              </TableCell>
              <TableCell className="font-medium">
                {Number(rate.exchangeRate).toFixed(4)}
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat" color="default">
                  {rate.institution?.name || 'Unknown Institution'}
                </Chip>
              </TableCell>
              <TableCell>
                {formatDate(rate.updatedAt)}
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Tooltip content={t('admin.exchange_rates.tooltips.edit')} color="warning">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => onEdit(rate)}
                      className="text-warning-500 hover:text-warning-600"
                    >
                      <Pencil size={18} />
                    </Button>
                  </Tooltip>
                  <Tooltip content={t('admin.exchange_rates.tooltips.delete')} color="danger">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => handleDelete(rate)}
                      className="text-danger hover:text-danger-600"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t('admin.exchange_rates.delete')}
              </ModalHeader>
              <ModalBody>
                <Card>
                  <CardBody className="py-5 flex flex-col items-center gap-3">
                    <div className="p-3 rounded-full bg-danger-50 dark:bg-danger-900/20">
                      <AlertTriangle className="text-danger" size={24} />
                    </div>
                    <p className="text-center">
                      {t('admin.exchange_rates.messages.deleteWarning')}
                    </p>
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={handleCloseDeleteModal}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  color="danger"
                  onPress={handleConfirmDelete}
                  isLoading={deleteMutation.isPending}
                >
                  {t('common.delete')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}