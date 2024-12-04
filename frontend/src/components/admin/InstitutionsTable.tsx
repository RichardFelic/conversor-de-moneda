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
  CardBody
} from '@nextui-org/react';
import { Pencil, Trash2, AlertTriangle } from 'lucide-react';
import type { Institution } from '@/types/api';
import { useTranslation } from 'react-i18next';

interface InstitutionsTableProps {
  institutions: Institution[];
  onEdit: (institution: Institution) => void;
  onDelete: (id: string) => void;
}

export default function InstitutionsTable({ 
  institutions, 
  onEdit, 
  onDelete 
}: InstitutionsTableProps) {
  const { t } = useTranslation();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    institution: Institution | null;
  }>({
    isOpen: false,
    institution: null
  });

  const handleDeleteClick = (institution: Institution) => {
    setDeleteModal({
      isOpen: true,
      institution
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.institution) {
      onDelete(deleteModal.institution._id);
      setDeleteModal({
        isOpen: false,
        institution: null
      });
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      institution: null
    });
  };

  return (
    <>
      <Table 
        aria-label={t('institutions.title')}
        classNames={{
          td: "text-default-700 dark:text-default-300",
          th: "bg-default-100 dark:bg-default-50 text-default-600 dark:text-default-400"
        }}
      >
        <TableHeader>
          <TableColumn>{t('institutions.columns.logo')}</TableColumn>
          <TableColumn>{t('institutions.columns.name')}</TableColumn>
          <TableColumn>{t('institutions.columns.country')}</TableColumn>
          <TableColumn align="center">{t('institutions.columns.actions')}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={t('institutions.noInstitutions')}>
          {institutions.map((institution) => (
            <TableRow key={institution._id}>
              <TableCell>
                <img 
                  className="rounded-full max-w-16 max-h-16 object-contain"
                  src={institution.img || '-'}
                  alt={institution.name}
                />
              </TableCell>
              <TableCell className="font-medium">{institution.name}</TableCell>
              <TableCell>{institution.country || '-'}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Tooltip content={t('institutions.tooltips.edit')} color="warning">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => onEdit(institution)}
                      className="text-warning-500 hover:text-warning-600"
                    >
                      <Pencil size={18} />
                    </Button>
                  </Tooltip>
                  <Tooltip content={t('institutions.tooltips.delete')} color="danger">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => handleDeleteClick(institution)}
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
        size="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-white dark:bg-gray-900",
          header: "border-b border-[#292f46]",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <span className="text-danger">{t('institutions.delete')}</span>
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody className="gap-4">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-danger/10">
                    <AlertTriangle className="text-danger" size={24} />
                  </div>
                </div>
                <p className="text-center text-default-700 dark:text-gray-300">
                  {t('institutions.deleteConfirm')}
                  <span className="font-semibold"> {deleteModal.institution?.name}</span>?
                </p>
                <p className="text-center text-small text-default-500">
                  {t('institutions.messages.deleteWarning')}
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
            >
              {t('common.delete')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}