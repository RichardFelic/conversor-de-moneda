import { useEffect } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Chip
} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Users } from 'lucide-react';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/services/api/users';
import type { User } from '@/types/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';

const schema = (t: (key: string) => string) => yup.object({
  username: yup.string()
    .required(t('users.validation.username_required'))
    .min(3, t('users.validation.username_min'))
    .max(20, t('users.validation.username_max')),
  email: yup.string()
    .required(t('users.validation.email_required'))
    .email(t('users.validation.email_invalid')),
  name: yup.string()
    .required(t('users.validation.name_required'))
    .min(3, t('users.validation.name_min'))
    .max(50, t('users.validation.name_max')),
  role: yup.string()
    .required(t('users.validation.role_required'))
    .oneOf(['user', 'admin'] as const, t('users.validation.role_invalid'))
}).required();

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  username: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
};

export default function UserModal({ 
  user, 
  isOpen, 
  onClose 
}: UserModalProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { t } = useTranslation();
  
  const roles = [
    { label: t('users.roles.user'), value: 'user' },
    { label: t('users.roles.admin'), value: 'admin' }
  ] as const;
  
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema(t)),
    defaultValues: {
      username: '',
      email: '',
      name: '',
      role: 'user'
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user?._id) throw new Error('User ID is required');
      return userApi.update(user._id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(t('users.messages.update_success'));
      handleClose();
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        logout();
        navigate('/users/login');
      } else {
        const errorMessage = error.response?.data?.message || t('users.messages.update_error');
        toast.error(errorMessage);
      }
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role as 'user' | 'admin'
      });
    }
  }, [user, reset]);

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
            <span className="text-warning-500">{t('users.edit')}</span>
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="gap-4">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-warning-100 dark:bg-warning-900/20">
                    <Users className="text-warning-500" size={24} />
                  </div>
                </div>

                {user && (
                  <div className="flex justify-center gap-2">
                    <Chip
                      size="sm"
                      variant="flat"
                      color={user.isConfirmed ? 'success' : 'danger'}
                    >
                      {user.isConfirmed ? t('users.status.active') : t('users.status.pending')}
                    </Chip>
                  </div>
                )}

                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={t('users.columns.username')}
                      variant="bordered"
                      errorMessage={errors.username?.message}
                      isDisabled={isSubmitting}
                      classNames={{
                        label: "text-sm font-medium text-default-700 dark:text-gray-300",
                        input: "text-sm dark:text-white",
                        inputWrapper: "border-surface-300 dark:border-gray-600",
                      }}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      label={t('users.columns.email')}
                      variant="bordered"
                      errorMessage={errors.email?.message}
                      isDisabled={isSubmitting}
                      classNames={{
                        label: "text-sm font-medium text-default-700 dark:text-gray-300",
                        input: "text-sm dark:text-white",
                        inputWrapper: "border-surface-300 dark:border-gray-600",
                      }}
                    />
                  )}
                />

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={t('users.columns.name')}
                      variant="bordered"
                      errorMessage={errors.name?.message}
                      isDisabled={isSubmitting}
                      classNames={{
                        label: "text-sm font-medium text-default-700 dark:text-gray-300",
                        input: "text-sm dark:text-white",
                        inputWrapper: "border-surface-300 dark:border-gray-600",
                      }}
                    />
                  )}
                />

                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label={t('users.columns.role')}
                      variant="bordered"
                      selectedKeys={[field.value]}
                      onChange={(e) => field.onChange(e.target.value)}
                      errorMessage={errors.role?.message}
                      isDisabled={isSubmitting}
                      classNames={{
                        label: "text-sm font-medium text-default-700 dark:text-gray-300",
                        value: "text-sm dark:text-white",
                        trigger: "border-surface-300 dark:border-gray-600",
                      }}
                    >
                      {roles.map((role) => (
                        <SelectItem 
                          key={role.value} 
                          value={role.value}
                          className="text-sm"
                        >
                          {role.label}
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
              variant="flat"
              onPress={handleClose}
              isDisabled={isSubmitting}
              className="bg-gray-100 dark:bg-gray-700"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="bg-warning-500 text-white hover:bg-warning-600"
            >
              {t('common.update')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}