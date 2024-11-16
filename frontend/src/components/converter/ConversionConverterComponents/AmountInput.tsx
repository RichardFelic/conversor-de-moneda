// import { Input } from "@nextui-org/react";


type AmountInputProps = {
  type: string;
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  // This is to disable editting on the 'Converted to' input.
  readOnly?: boolean;
}

export function AmountInput({ type, label, value, onChange, readOnly }: AmountInputProps) {
  //console.table({type, label, value, onChange, readOnly});
  return (
    <div className="amount-input text-sm">
      <label>{label}</label>
      <input type={type} value={value||""} onChange={(e) => onChange(e.target.value)} min={0} readOnly={readOnly}/>
    </div>
    // <Input
    //   type="number"
    //   placeholder="Amount"
    //   value={value}
    //   onChange={(e) => onChange(e.target.value)}
    //   min={0}
    //   size="lg"
    //   startContent={
    //     <div className="pointer-events-none flex items-center">
    //       <span className="text-default-400">$</span>
    //     </div>
    //   }
    //   classNames={{
    //     input: "text-medium",
    //     inputWrapper: "h-12",
    //   }}
    // />
  );
}
