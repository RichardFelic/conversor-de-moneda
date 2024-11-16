import { memo } from 'react';
import { Button } from '@nextui-org/react';
import { RotateCcw, Info } from 'lucide-react';
import { useConversionStore } from './stores/conversionStore';
import { Tooltip } from '@nextui-org/react';

export const ConversionResult = memo(function ConversionResult() {
    const { currencyFrom, currencyTo, baseRate, reset } = useConversionStore();
  
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'GMT',
    });
  
    return (
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex-1">
          {baseRate && currencyFrom && currencyTo && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#1A1A1A] font-semibold">
                1.00 {currencyFrom} = {baseRate.toFixed(4)} {currencyTo}
              </span>
              <Tooltip
                content={
                  <div className="text-[#3D55DD] px-2 py-1 rounded-md">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold">
                        Last updated: {currentTime} GMT
                      </span>
                      <span className="text-sm">
                        Exchange rates are updated periodically throughout the day
                      </span>
                    </div>
                  </div>
                }
              >
                <Info size={16} className="cursor-help text-[#3D55DD]" />
              </Tooltip>
            </div>
          )}
        </div>
  
        <div className="flex-shrink-0">
          <Button
            variant="flat"
            onPress={reset}
            startContent={<RotateCcw size={18} />}
            className="h-12 bg-primary-600 dark:bg-primary-500 text-white font-medium"
          >
            Reset
          </Button>
        </div>
      </div>
    );
  });