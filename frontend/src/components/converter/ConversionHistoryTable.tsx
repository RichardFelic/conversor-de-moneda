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
  
  interface ConversionHistoryTableProps {
    history: Conversion[];
  }
  
  export default function ConversionHistoryTable({ history }: ConversionHistoryTableProps) {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleString();
    };
  
    return (
      <Table 
        aria-label="Conversion history table"
        classNames={{
          wrapper: "shadow-md",
          th: "bg-default-100 dark:bg-default-50 text-default-600 dark:text-default-400",
          td: "text-default-700 dark:text-default-300"
        }}
      >
        <TableHeader>
          <TableColumn>FROM</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>TO</TableColumn>
          <TableColumn>RESULT</TableColumn>
          <TableColumn>DATE</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No conversion history found">
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