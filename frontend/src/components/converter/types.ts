/**
 * Interfaz para representar un tipo de cambio entre dos monedas.
 *
 * @property _id ID del tipo de cambio.
 * @property currencyFrom Codigo de la moneda de origen.
 * @property currencyTo Codigo de la moneda de destino.
 * @property exchangeRate Tasa de cambio.
 * @property update_date Fecha de actualizacion del tipo de cambio.
 */
export interface ExchangeRate {
    _id: string;
    currencyFrom: string;
    currencyTo: string;
    exchangeRate: number;
    update_date?: string;
  }
  
/**
 * Interfaz para representar una institucion que puede tener tipos de cambio.
 *
 * @property _id ID de la institucion.
 * @property name Nombre de la institucion.
 * @property country? Pais de la institucion.
 * @property img? Imagen de la institucion.
 */
  export interface Institution {
    _id: string;
    name: string;
    country?: string;
    img?: string;
  }
  
/**
 * Interfaz para representar un tipo de cambio de una institucion.
 *
 * @property institution Institucion que tiene este tipo de cambio.
 */
  export interface InstitutionExchangeRate extends ExchangeRate {
    institution: Institution;
  }
  
/**
 * Interfaz para representar el resultado de una conversion de monedas.
 *
 * @property amount Cantidad a convertir.
 * @property currencyFrom Moneda de origen.
 * @property currencyTo Moneda de destino.
 * @property result Resultado de la conversion.
 * @property date Fecha de la conversion.
 */
  export interface ConversionResult {
    amount: number;
    currencyFrom: string;
    currencyTo: string;
    result: number;
    date: string;
  }
  
/**
 * Interfaz para representar el estado de la conversion de monedas.
 *
 * @property amount Cantidad a convertir.
 * @property currencyFrom Moneda de origen.
 * @property currencyTo Moneda de destino.
 * @property selectedInstitution Institucion seleccionada.
 * @property result Resultado de la conversion.
 * @property baseRate Tasa de cambio base.
 */
  export interface ConversionState {
    amount: string;
    currencyFrom: string;
    currencyTo: string;
    selectedInstitution: string;
    result: number | null;
    baseRate: number | null;
  }
  
/**
 * Interfaz para representar el store de la conversion de monedas.
 *
 * @property setAmount Funcion para establecer la cantidad a convertir.
 * @property setCurrencyFrom Funcion para establecer la moneda de origen.
 * @property setCurrencyTo Funcion para establecer la moneda de destino.
 * @property setSelectedInstitution Funcion para establecer la institucion seleccionada.
 * @property setResult Funcion para establecer el resultado de la conversion.
 * @property setBaseRate Funcion para establecer la tasa de cambio base.
 * @property reset Funcion para resetear el estado de la conversion.
 */
  export interface ConversionStore extends ConversionState {
    setAmount: (amount: string) => void;
    setCurrencyFrom: (currency: string) => void;
    setCurrencyTo: (currency: string) => void;
    setSelectedInstitution: (institution: string) => void;
    setResult: (result: number | null) => void;
    setBaseRate: (rate: number | null) => void;
    reset: () => void;
  }

