

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
  isDisabled?: boolean;
}

export function CurrencySelector({
  value,
  onChange,
  currencies,
  isDisabled,
}: CurrencySelectorProps) {


  return (
    <div className="currency-selector">
      <select value={value || ""} onChange={(event) => onChange(event.target.value)} disabled={isDisabled}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

    </div>

    // <Select
    //   selectedKeys={value ? [value] : []}
    //   onChange={(e) => onChange(e.target.value)}
    //   className="w-32"
    //   isDisabled={isDisabled}
    //   classNames={{
    //     trigger: "h-12",
    //     value: "text-small",
    //   }}
    // >
    //   {currencies.map((currency) => (
    //     <SelectItem key={currency} value={currency}>
    //       {currency}
    //     </SelectItem>
    //   ))}
    // </Select>
  );
}
