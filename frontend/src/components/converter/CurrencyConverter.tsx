import { useState, useEffect } from "react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useConversion } from "./hooks/useConversion";
import type {
  ExchangeRate,
  Institution,
  InstitutionExchangeRate,
} from "./types";
import { InstitutionSelect } from "./ConversionConverterComponents/InstitutionSelect";
import { ConversionControls } from "./ConversionConverterComponents/ConversionControls";
import { ConversionResult } from "./ConversionConverterComponents/ConversionResult";

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("");
  const [currencyFrom, setCurrencyFrom] = useState<string>("");
  const [currencyTo, setCurrencyTo] = useState<string>("");
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [baseRate, setBaseRate] = useState<number | null>(null);

  const { isAuthenticated } = useAuthStore();
  const debouncedAmount = useDebounce(amount, 200);

  const { data: generalRates = [], isLoading: isLoadingGeneral } = useQuery({
    queryKey: ["exchange-rates"],
    queryFn: async () => {
      const response = await api.get("/exchange-rates");
      return response.data as ExchangeRate[];
    },
  });

  const { data: institutionalRates = [], isLoading: isLoadingInstitutional } =
    useQuery({
      queryKey: ["institution-exchange-rates"],
      queryFn: async () => {
        const response = await api.get("/institutions-exchange-rates");
        return response.data as InstitutionExchangeRate[];
      },
      enabled: isAuthenticated,
    });

  const { data: institutions = [] } = useQuery({
    queryKey: ["institutions"],
    queryFn: async () => {
      const response = await api.get("/institutions");
      return response.data;
    },
    enabled: isAuthenticated,
  });

  const convertMutation = useConversion((data) => {
    setResult(data.result);
    if (data.amount > 0) {
      setBaseRate(data.result / data.amount);
    }
  });

  useEffect(() => {
    if (selectedInstitution) {
      const institutionRates = institutionalRates.filter(
        (rate) => rate.institution._id === selectedInstitution
      );

      if (institutionRates.length > 0) {
        const firstRate = institutionRates[0];
        setCurrencyFrom(firstRate.currencyFrom);

        const availableTo = institutionRates
          .filter((rate) => rate.currencyFrom === firstRate.currencyFrom)
          .map((rate) => rate.currencyTo);

        if (availableTo.length > 0) {
          setCurrencyTo(availableTo[0]);
        }
      }
    } else {
      if (generalRates.length > 0) {
        setCurrencyFrom(generalRates[0].currencyFrom);
        const availableTo = generalRates
          .filter((rate) => rate.currencyFrom === generalRates[0].currencyFrom)
          .map((rate) => rate.currencyTo);
        if (availableTo.length > 0) {
          setCurrencyTo(availableTo[0]);
        }
      }
    }
    setResult(null);
    setBaseRate(null);
  }, [selectedInstitution, institutionalRates, generalRates]);
  
  
  useEffect(() => {
    if (debouncedAmount && currencyFrom && currencyTo) {
      handleConvert();
    } else {
      setResult(0);
      console.log(result, "midu")
      setBaseRate(null);
    }
  }, [debouncedAmount, currencyFrom, currencyTo, selectedInstitution]); 

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setResult(0);
      setBaseRate(null);
      return;
    }

    if (!currencyFrom || !currencyTo) {
      setResult(0);
      setBaseRate(null);
      return;
    }

    const conversionData = {
      amount: Number(amount),
      currencyFrom,
      currencyTo,
      ...(selectedInstitution && {
        institution_exchange_rate_id: institutionalRates.find(
          (rate) =>
            rate.institution._id === selectedInstitution &&
            rate.currencyFrom === currencyFrom &&
            rate.currencyTo === currencyTo
        )?._id,
      }),
    };

    convertMutation.mutate(conversionData);
  };

  const handleReset = () => {
    setAmount("");
    setResult(0);
    setBaseRate(null);
  };

  if (isLoadingGeneral || (isAuthenticated && isLoadingInstitutional)) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-8">
      <CardBody className="gap-6 p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          {isAuthenticated && (
            <div className="institute-selector-container">
              <InstitutionSelect
                label="Institution (Optional)"
                institutions={institutions as Institution[]}
                selectedInstitution={selectedInstitution}
                onSelect={setSelectedInstitution}
                />
            </div>
              )}

          <ConversionControls
            amount={amount}
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            result={result}
            generalRates={generalRates}
            institutionalRates={institutionalRates}
            selectedInstitution={selectedInstitution}
            onAmountChange={setAmount}
            onCurrencyFromChange={setCurrencyFrom}
            onCurrencyToChange={setCurrencyTo}
          />

          <ConversionResult
            baseRate={baseRate}
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            onReset={handleReset}
          />
        </div>
      </CardBody>
    </Card>
  );
}