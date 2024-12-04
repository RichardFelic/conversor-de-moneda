import { useEffect } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  Select,
  SelectItem
} from '@nextui-org/react';
import { DollarSign } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { institutionExchangeRateApi } from '@/services/api/institutionExchangeRates';
import type { InstitutionExchangeRate } from '@/services/api/institutionExchangeRates';
import { institutionApi } from '@/services/api/institutions';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';

interface Institution {
  _id: string;
  name: string;
}

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

const exchangeRateSchema = z.object({
  currencyFrom: z.string()
    .min(3, 'Currency code must be 3 characters')
    .max(3, 'Currency code must be 3 characters')
    .toUpperCase(),
  currencyTo: z.string()
    .min(3, 'Currency code must be 3 characters')
    .max(3, 'Currency code must be 3 characters')
    .toUpperCase(),
  exchangeRate: z.number()
    .min(0.0001, 'Rate must be greater than 0')
    .max(9999.9999, 'Rate must be less than 10000'),
  institution: z.string()
    .min(1, 'Institution is required')
});

interface ExchangeRateModalProps {
  rate: InstitutionExchangeRate | null;
  isOpen: boolean;
  onClose: () => void;
}

type FormData = z.infer<typeof exchangeRateSchema>;

export default function ExchangeRateModal({ 
  rate, 
  isOpen, 
  onClose 
}: ExchangeRateModalProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { t } = useTranslation();

  const { data: institutions = [] } = useQuery<Institution[]>({
    queryKey: ['institutions'],
    queryFn: async () => {
      const response = await institutionApi.getAll();
      return response.data;
    }
  });

  const { 
    control, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(exchangeRateSchema),
    defaultValues: {
      currencyFrom: '',
      currencyTo: '',
      exchangeRate: 0,
      institution: ''
    }
  });

  useEffect(() => {
    if (rate) {
      reset({
        currencyFrom: rate.currencyFrom,
        currencyTo: rate.currencyTo,
        exchangeRate: rate.exchangeRate,
        institution: rate.institution._id
      });
    } else {
      reset({
        currencyFrom: '',
        currencyTo: '',
        exchangeRate: 0,
        institution: ''
      });
    }
  }, [rate, reset]);

  const handleError = (error: unknown) => {
    const apiError = error as ApiError;
    if (apiError.response?.status === 401) {
      logout();
      navigate('/users/login');
    }
    toast.error(apiError.response?.data?.message || t('common.error'));
  };

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await institutionExchangeRateApi.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution-exchange-rates'] });
      toast.success(t('common.success'));
      onClose();
    },
    onError: handleError
  });

  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!rate) throw new Error('No rate to update');
      const response = await institutionExchangeRateApi.update(rate._id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution-exchange-rates'] });
      toast.success(t('common.success'));
      onClose();
    },
    onError: handleError
  });

  const onSubmit = async (data: FormData) => {
    if (rate) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      scrollBehavior="inside"
      classNames={{
        base: "max-w-xl"
      }}
    >
      <ModalContent>
        {() => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">
              {rate ? t('admin.exchange_rates.edit') : t('admin.exchange_rates.create')}
            </ModalHeader>
            <ModalBody>
              <Card>
                <CardBody className="gap-4">
                  <div className="flex justify-center">
                    <div className={`p-3 rounded-full ${
                      rate 
                        ? "bg-warning-100 dark:bg-warning-900/20" 
                        : "bg-success-100 dark:bg-success-900/20"
                    }`}>
                      <DollarSign className={
                        rate 
                          ? "text-warning-500" 
                          : "text-success-500"
                      } size={24} />
                    </div>
                  </div>

                  <Controller
                    name="currencyFrom"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={t('admin.exchange_rates.form.fromCurrency')}
                        variant="bordered"
                        description={t('admin.exchange_rates.form.currencyCodeHelp')}
                        maxLength={3}
                        value={field.value.toUpperCase()}
                        errorMessage={errors.currencyFrom?.message}
                        isDisabled={isSubmitting}
                        classNames={{
                          label: "text-sm font-medium text-default-700 dark:text-gray-300",
                          input: "text-sm dark:text-white uppercase",
                          inputWrapper: "border-surface-300 dark:border-gray-600",
                          description: "text-xs text-default-400"
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="currencyTo"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={t('admin.exchange_rates.form.toCurrency')}
                        variant="bordered"
                        description={t('admin.exchange_rates.form.currencyCodeHelp')}
                        maxLength={3}
                        value={field.value.toUpperCase()}
                        errorMessage={errors.currencyTo?.message}
                        isDisabled={isSubmitting}
                        classNames={{
                          label: "text-sm font-medium text-default-700 dark:text-gray-300",
                          input: "text-sm dark:text-white uppercase",
                          inputWrapper: "border-surface-300 dark:border-gray-600",
                          description: "text-xs text-default-400"
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="exchangeRate"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <Input
                        {...field}
                        type="number"
                        step="0.0001"
                        min="0.0001"
                        max="9999.9999"
                        label={t('admin.exchange_rates.form.rate')}
                        variant="bordered"
                        description={t('admin.exchange_rates.form.rateHelp')}
                        value={value.toString()}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        errorMessage={errors.exchangeRate?.message}
                        isDisabled={isSubmitting}
                        classNames={{
                          label: "text-sm font-medium text-default-700 dark:text-gray-300",
                          input: "text-sm dark:text-white",
                          inputWrapper: "border-surface-300 dark:border-gray-600",
                          description: "text-xs text-default-400"
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="institution"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label={t('institutions.title')}
                        variant="bordered"
                        selectedKeys={field.value ? [field.value] : []}
                        onChange={(e) => field.onChange(e.target.value)}
                        errorMessage={errors.institution?.message}
                        isDisabled={isSubmitting}
                        classNames={{
                          label: "text-sm font-medium text-default-700 dark:text-gray-300",
                          value: "text-sm dark:text-white",
                          trigger: "h-12",
                          listbox: "text-sm",
                        }}
                      >
                        {institutions.map((institution) => (
                          <SelectItem 
                            key={institution._id} 
                            value={institution._id}
                            className="text-sm"
                          >
                            {institution.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                isDisabled={isSubmitting}
              >
                {t('common.cancel')}
              </Button>
              <Button
                color={rate ? "warning" : "success"}
                type="submit"
                isLoading={isSubmitting}
              >
                {rate ? t('common.update') : t('common.create')}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}