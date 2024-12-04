import { 
    Table, 
    TableHeader, 
    TableBody, 
    TableColumn, 
    TableRow, 
    TableCell,
    Chip
  } from '@nextui-org/react';
  import { Conversion } from '@/types/api';
  import { useTranslation } from 'react-i18next';
  
  interface ConversionHistoryTableProps {
    history: Conversion[];
  }
  
  export default function ConversionHistoryTable({ history }: ConversionHistoryTableProps) {
    const { t } = useTranslation();
  
    const formatDate = (dateString: string) => {
      try {
        return new Date(dateString).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
      }
    };
  
    return (
      <Table 
        aria-label={t('conversion_history.title')}
        classNames={{
          wrapper: "shadow-md",
          th: "bg-default-100 dark:bg-default-50 text-default-600 dark:text-default-400",
          td: "text-default-700 dark:text-default-300"
        }}
      >
        <TableHeader>
          <TableColumn>{t('conversion_history.columns.from')}</TableColumn>
          <TableColumn>{t('conversion_history.columns.amount')}</TableColumn>
          <TableColumn>{t('conversion_history.columns.to')}</TableColumn>
          <TableColumn>{t('conversion_history.columns.result')}</TableColumn>
          <TableColumn>{t('conversion_history.columns.date')}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={t('conversion_history.no_history')}>
          {history.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <Chip size="sm" variant="flat" color="primary">
                  {item.currencyFrom}
                </Chip>
              </TableCell>
              <TableCell>
                {item.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat" color="secondary">
                  {item.currencyTo}
                </Chip>
              </TableCell>
              <TableCell className="font-medium">
                {item.result.toFixed(4)}
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {formatDate(item.date)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }