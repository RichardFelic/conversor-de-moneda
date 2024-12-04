import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Chip,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import type { ExchangeRate } from '@/types/api';
import { useTranslation } from 'react-i18next';

interface ExchangeRatesTableProps {
  rates: ExchangeRate[];
}

export default function ExchangeRatesTable({ rates }: ExchangeRatesTableProps) {
  const navigate = useNavigate();
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
      aria-label={t('exchange_rates.table.aria_label')}
      classNames={{
        wrapper: "shadow-sm",
        th: "bg-default-100 text-default-600",
        td: "text-default-700"
      }}
    >
      <TableHeader>
        <TableColumn>{t('exchange_rates.table.from')}</TableColumn>
        <TableColumn>{t('exchange_rates.table.to')}</TableColumn>
        <TableColumn>{t('exchange_rates.table.rate')}</TableColumn>
        <TableColumn>{t('exchange_rates.table.last_update')}</TableColumn>
      </TableHeader>
      <TableBody emptyContent={t('exchange_rates.table.no_rates')}>
        {rates.map((rate) => (
          <TableRow 
            key={rate._id}
            className="cursor-pointer"
            onClick={() => navigate(`/exchange-rates/${rate._id}`)}
          >
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
              {rate.exchangeRate.toFixed(4)}
            </TableCell>
            <TableCell>
              {formatDate(rate.update_date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}