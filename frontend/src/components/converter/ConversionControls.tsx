import { memo } from 'react';
import { useConversionStore } from './stores/conversionStore';
import { Button } from '@nextui-org/react';
import { ArrowLeftRight } from 'lucide-react';
import type { ExchangeRate, InstitutionExchangeRate } from './types';
import './ConversionControl.css';

interface ConversionControlsProps {
  generalRates: ExchangeRate[];
  institutionalRates: InstitutionExchangeRate[];
}

/**
 * Componente que maneja la logica de conversion de monedas.
 * Recibe como props los tipos de cambio generales y los tipos de cambio
 * institucionales.
 */
export const ConversionControls = memo(function ConversionControls({
  generalRates,
  institutionalRates,
}: ConversionControlsProps) {
  /**
   * Estados y funciones del store de la conversion.
   */
  const {
    amount,
    currencyFrom,
    currencyTo,
    selectedInstitution,
    result,
    setAmount,
    setCurrencyFrom,
    setCurrencyTo,
  } = useConversionStore();

  /**
   * Rates actuales segun la seleccion de la institucion.
   * Si la institucion esta seleccionada, se filtran los rates
   * institucionales por la institucion seleccionada.
   * Si no esta seleccionada, se toman los rates generales.
   */
  const currentRates = selectedInstitution
    ? institutionalRates.filter((rate) => rate.institution._id === selectedInstitution)
    : generalRates;

  /**
   * Monedas disponibles para la seleccion de "From".
   * Se crea un Set de las monedas disponibles y se convierte
   * a un array para poder ordenarlo.
   */
  const availableFromCurrencies = Array.from(
    new Set(currentRates.map((rate) => rate.currencyFrom))
  ).sort();

  /**
   * Monedas disponibles para la seleccion de "To".
   * Se filtran los rates actuales por la moneda seleccionada
   * en "From" y se crea un Set de las monedas disponibles.
   * Se convierte a un array para poder ordenarlo.
   */
  const availableToCurrencies = Array.from(
    new Set(
      currentRates
        .filter((rate) => rate.currencyFrom === currencyFrom)
        .map((rate) => rate.currencyTo)
    )
  ).sort();

  /**
   * Funcion para intercambiar las monedas de "From" y "To".
   * Solo se puede hacer si la moneda seleccionada en "From" es
   * igual a la moneda seleccionada en "To".
   */
  const handleSwap = () => {
    if (!currencyFrom || !currencyTo) return;

    const canSwap = currentRates.some(
      (rate) => rate.currencyFrom === currencyTo && rate.currencyTo === currencyFrom
    );

    if (!canSwap) return;

    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="w-full md:w-[45%] space-y-2">
        <div className="currency-input">
          <div className="flex gap-2">
            <div className="amount-input">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={0}
              />
            </div>
            <div className="divider"></div>
            <div className="currency-selector">
              <select
                value={currencyFrom}
                onChange={(e) => setCurrencyFrom(e.target.value)}
              >
                <option value="">Select currency</option>
                {availableFromCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center md:w-[10%]">
        <Button
          isIconOnly
          variant="light"
          onPress={handleSwap}
          isDisabled={!currencyFrom || !currencyTo}
        >
          <ArrowLeftRight className="rotate-90 md:rotate-0" />
        </Button>
      </div>

      <div className="w-full md:w-[45%] space-y-2">
        <div className="currency-input">
          <div className="flex gap-2">
            <div className="amount-input">
              <label>Converted</label>
              <input
                type="text"
                value={result?.toFixed(2) ?? ''}
                readOnly
              />
            </div>
            <div className="divider"></div>
            <div className="currency-selector">
              <select
                value={currencyTo}
                onChange={(e) => setCurrencyTo(e.target.value)}
                disabled={!currencyFrom}
              >
                <option value="">Select currency</option>
                {availableToCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});