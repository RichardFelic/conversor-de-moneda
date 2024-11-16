import { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input } from '@nextui-org/react';
import { ChevronDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExchangeRateCard } from './ExchangeRateCard';
import type { ExchangeRate } from '@/types/api';
import { useTranslation } from 'react-i18next';


interface ExchangeRatesGridProps {
  rates: ExchangeRate[];
}

export function ExchangeRatesGrid({ rates }: ExchangeRatesGridProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();

  
  const filteredRates: ExchangeRate[] = rates.filter(rate => {
    return (rate.currencyFrom as string)?.includes(searchQuery.toUpperCase()) ||
           (rate.currencyTo as string)?.includes(searchQuery.toUpperCase());
  });

  const handleRateSelect = (rateId: string) => {
    navigate(`/exchange-rates/${rateId}`);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Dropdown */}
      <div className="sm:hidden w-full">
        <Dropdown 
          isOpen={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
          className="w-full"
        >
          <DropdownTrigger>
            <Button
              variant="flat"
              className="w-full h-12"
              endContent={<ChevronDown />}
            >
            {t('available_rates.currency_selector.label')}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Exchange rates"
            className="w-[calc(100vw-175px)]"
            closeOnSelect={true}
          >
            <DropdownItem key="search" className="h-12 gap-2" isReadOnly>
              <Input
                placeholder={t('available_rates.currency_selector.search_label')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search size={18} className="text-default-400" />}
                classNames={{
                  input: "text-medium",
                  inputWrapper: "h-10"
                }}
                size="sm"
              />
            </DropdownItem>
            {filteredRates.map((rate) => (
              <DropdownItem 
                key={rate._id}
                onClick={() => handleRateSelect(rate._id)}
              >
                <div className="flex flex-col py-1 items-center text-center">
                  <div className="flex justify-between">
                    <span className="font-medium text-black">
                      {rate.currencyFrom} → {rate.currencyTo}
                    </span>
                  </div>
                  
                </div>
              </DropdownItem>
            ))}
            {filteredRates.length === 0 && (
              <DropdownItem key="no-results" className="text-default-500" isReadOnly>
                No exchange rates found
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRates.map((rate) => (
          <ExchangeRateCard key={rate._id} rate={rate} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredRates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No exchange rates found for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}