import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import { useConversionStore } from './stores/conversionStore';
import { useConversion } from './hooks/useConversion';
import { api } from '@/lib/axios';
import { ConversionControls } from './ConversionControls';
import { ConversionResult } from './ConversionResult';
import { InstitutionSelect } from './InstitutionSelect';
import type { ExchangeRate, Institution, InstitutionExchangeRate } from './types';
import './ConversionControl.css';
import { useAuthStore } from "../../stores/authStore";

export function CurrencyConverter() {
  // useConversionStore para manejar el estado de la conversion
  const {
    amount,
    currencyFrom,
    currencyTo,
    selectedInstitution,
    setResult,
    setBaseRate,
    setCurrencyFrom,
    setCurrencyTo,
  } = useConversionStore();

  // useAuthStore para verificar si el usuario esta autenticado
  const { isAuthenticated } = useAuthStore();
<<<<<<< HEAD
  const debouncedAmount = useDebounce(amount, 200);
=======
>>>>>>> fa08bdd6a66a266e4ca04b129afe4f0dcb602baa

  // Consulta a la api para obtener las tasas de cambio generales
  const { data: generalRates = [], isLoading: isLoadingGeneral } = useQuery({
    queryKey: ['exchange-rates'],
    queryFn: async () => {
      const response = await api.get<ExchangeRate[]>('/exchange-rates');
      return response.data;
    },
  });

  // Consulta a la api para obtener las instituciones
  const { data: institutions = [], isLoading: isLoadingInstitutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: async () => {
      const response = await api.get<Institution[]>('/institutions');
      return response.data;
    },
  });

  // Consulta a la api para obtener las tasas de cambio institucionales
  const { data: institutionalRates = [], isLoading: isLoadingInstitutional } = useQuery({
    queryKey: ['institution-exchange-rates'],
    queryFn: async () => {
      const response = await api.get<InstitutionExchangeRate[]>('/institutions-exchange-rates');
      return response.data;
    },
  });

  // useMutation para hacer la conversion
  const convertMutation = useConversion((data) => {
    setResult(data.result);
    if (data.amount > 0) {
      setBaseRate(data.result / data.amount);
    }
  });

  // useMemo para obtener las tasas de cambio actuales
  const currentRates = useMemo(() => 
    selectedInstitution 
      ? institutionalRates.filter(rate => rate.institution._id === selectedInstitution)
      : generalRates,
    [selectedInstitution, institutionalRates, generalRates]
  );

  // useMemo para obtener la tasa de cambio actual
  const currentRate = useMemo(() => 
    currentRates.find(
      rate => rate.currencyFrom === currencyFrom && rate.currencyTo === currencyTo
    ),
    [currentRates, currencyFrom, currencyTo]
  );

  // useEffect para inicializar las monedas
  useEffect(() => {
    if (currentRates.length === 0) return;

    const firstRate = currentRates[0];
    if (!currencyFrom) {
      setCurrencyFrom(firstRate.currencyFrom);
    }
<<<<<<< HEAD
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
=======

    const availableTo = currentRates
      .filter(rate => rate.currencyFrom === (currencyFrom || firstRate.currencyFrom))
      .map(rate => rate.currencyTo);

    if (availableTo.length > 0 && !currencyTo) {
      setCurrencyTo(availableTo[0]);
    }
  }, [currentRates, selectedInstitution]);

  // useEffect para hacer la conversion
  useEffect(() => {
    if (!amount || !currencyFrom || !currencyTo || !currentRate) {
      setResult(null);
>>>>>>> fa08bdd6a66a266e4ca04b129afe4f0dcb602baa
      setBaseRate(null);
      return;
    }

<<<<<<< HEAD
    if (!currencyFrom || !currencyTo) {
      setResult(0);
=======
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setResult(null);
>>>>>>> fa08bdd6a66a266e4ca04b129afe4f0dcb602baa
      setBaseRate(null);
      return;
    }

    const timer = setTimeout(() => {
      const conversionData = {
        amount: numAmount,
        currencyFrom,
        currencyTo,
        ...(selectedInstitution && currentRate && {
          institution_exchange_rate_id: currentRate._id,
        }),
      };

      convertMutation.mutate(conversionData);
    }, 500);

<<<<<<< HEAD
  const handleReset = () => {
    setAmount("");
    setResult(0);
    setBaseRate(null);
  };
=======
    return () => clearTimeout(timer);
  }, [amount, currencyFrom, currencyTo, currentRate, selectedInstitution]);
>>>>>>> fa08bdd6a66a266e4ca04b129afe4f0dcb602baa

  // Si esta cargando, muestra un spinner
  if (isLoadingGeneral || isLoadingInstitutions || isLoadingInstitutional) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <Card className="w-full max-w-3xl card-min-w mx-auto p-8">
        <CardBody className="gap-6 p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            {institutions.length > 0 && !!isAuthenticated &&(
              <InstitutionSelect
                institutions={institutions}
                selectedInstitution={selectedInstitution}
              />
            )}

            <ConversionControls
              generalRates={generalRates}
              institutionalRates={institutionalRates}
            />

            <ConversionResult />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}