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
  CardBody
} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DollarSign } from 'lucide-react';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { exchangeRateApi } from '@/services/api/exchangeRates';
import type { ExchangeRate } from '@/types/api';
import { toast } from 'sonner';

const schema = yup.object({
  currencyFrom: yup.string()
    .required('From currency is required')
    .length(3, 'Currency code must be 3 characters')
    .matches(/^[A-Z]+$/, 'Must be uppercase letters only'),
  currencyTo: yup.string()
    .required('To currency is required')
    .length(3, 'Currency code must be 3 characters')
    .matches(/^[A-Z]+$/, 'Must be uppercase letters only'),
  exchangeRate: yup.number()
    .required('Exchange rate is required')
    .positive('Exchange rate must be positive')
    .max(9999.9999, 'Exchange rate is too high')
}).required();

interface ExchangeRateModalProps {
  rate: ExchangeRate | null;
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
};

export default function ExchangeRateModal({ 
  rate, 
  isOpen, 
  onClose 
}: ExchangeRateModalProps) {
  const queryClient = useQueryClient();
  
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      currencyFrom: '',
      currencyTo: '',
      exchangeRate: 1.0
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formattedData = {
        ...data,
        currencyFrom: data.currencyFrom.toUpperCase(),
        currencyTo: data.currencyTo.toUpperCase(),
        exchangeRate: Number(data.exchangeRate)
      };
      
      if (rate) {
        return exchangeRateApi.update(rate._id, formattedData);
      }
      return exchangeRateApi.create(formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exchange-rates'] });
      toast.success(`Exchange rate ${rate ? 'updated' : 'created'} successfully`);
      handleClose();
    },
    onError: (error: unknown) => {
      const errorResponse = error as { response?: { data?: { error?: string; message?: string } } };
      const errorMessage = 
        errorResponse.response?.data?.error || 
        errorResponse.response?.data?.message || 
        `Failed to ${rate ? 'update' : 'create'} exchange rate`;
      toast.error(errorMessage);
    }
  });

  useEffect(() => {
    if (rate) {
      reset({
        currencyFrom: rate.currencyFrom,
        currencyTo: rate.currencyTo,
        exchangeRate: Number(rate.exchangeRate)
      });
    } else {
      reset({
        currencyFrom: '',
        currencyTo: '',
        exchangeRate: 1.0
      });
    }
  }, [rate, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-white dark:bg-gray-900",
        header: "border-b border-[#292f46]",
      }}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            <span className={rate ? "text-warning-500" : "text-success-500"}>
              {rate ? 'Edit Exchange Rate' : 'Add New Exchange Rate'}
            </span>
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
                      label="From Currency (e.g., USD)"
                      variant="bordered"
                      description="3-letter currency code"
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
                      label="To Currency (e.g., EUR)"
                      variant="bordered"
                      description="3-letter currency code"
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
                      min="0"
                      label="Exchange Rate"
                      variant="bordered"
                      description="Up to 4 decimal places"
                      value={value.toString()}
                      onChange={(e) => onChange(Number(e.target.value))}
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
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="flat"
              onPress={handleClose}
              isDisabled={isSubmitting}
              className="bg-gray-100 dark:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className={
                rate 
                  ? "bg-warning-500 text-white hover:bg-warning-600" 
                  : "bg-success-500 text-white hover:bg-success-600"
              }
            >
              {rate ? 'Update' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}