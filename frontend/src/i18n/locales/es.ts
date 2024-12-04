export const es = {
  common: {
    loading: "Cargando...",
    error: "Ha ocurrido un error",
    success: "Éxito",
    cancel: "Cancelar",
    save: "Guardar",
    delete: "Eliminar",
    edit: "Editar",
    create: "Crear",
    search: "Buscar",
    noResults: "No se encontraron resultados",
    confirm: "Confirmar",
    actions: "Acciones",
    update: "Actualizar"
  },
  menu: {
    label: "Menú",
    our_rates: "Nuestras Tasas",
    rate_history: "Historial de Tasas",
    conversion_history: "Historial de Conversiones",
    home: "Inicio"
  },
  admin_menu: {
    institutions: "Instituciones",
    users: "Usuarios",
    exchange_rates: "Tasas de Cambio",
    institution_rates: "Tasas Institucionales",
    management: "Administración"
  },
  auth: {
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    email: "Correo",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    username: "Nombre de usuario",
    name: "Nombre",
    role: "Rol",
    loginSuccess: "Inicio de sesión exitoso",
    registerSuccess: "Registro exitoso",
    confirmEmail: "Por favor confirma tu correo",
    passwordMismatch: "Las contraseñas no coinciden",
    invalidCredentials: "Credenciales inválidas",
    loginRequired: "Necesitas iniciar sesión para ver el historial"
  },
  converter: {
    title: "Conversor de Moneda",
    headline: "Convierte monedas utilizando tasas de cambio en tiempo real. Inicia sesión para acceder a tasas institucionales.",
    institute_selector: {
      label: "Institución (Opcional)",
      default_option: "Selecciona una institución",
    },
    from_label: "Cantidad",
    to_label: "Convertido a",
    tooltip_title: "Tasa de cambio en ",
    tooltip_description: "Las tasas en vivo varían minuto a minuto. Las cotizaciones que recibas aquí pueden diferir del monto final de tu transacción.",
    reset_button: "Restablecer",
    conversionSuccess: "Conversión exitosa",
    conversionError: "Error durante la conversión"
  },
  available_rates: {
    title: "Tasas de cambio disponibles",
    currency_selector: {
      label: "Seleccionar moneda",
      search_label: "Buscar",
    },
    noRatesFound: "No se encontraron tasas de cambio",
    lastUpdated: "Última actualización"
  },
  exchange_rate_details: {
    title: "Detalles de la Tasa de Cambio",
    from: "Moneda de Origen",
    to: "Moneda de Destino",
    exchange_rate: "Tasa de Cambio",
    last_updated: "Última Actualización",
    notFound: "Tasa de cambio no encontrada",
    deleteConfirm: "¿Estás seguro de que deseas eliminar esta tasa de cambio?",
    columns: {
      type: "TIPO",
      from: "ORIGEN",
      to: "DESTINO",
      rate: "TASA",
      institution: "INSTITUCIÓN",
      date: "FECHA"
    },
    types: {
      general: "General",
      institutional: "Institucional"
    }
  },
  institutions: {
    title: "Instituciones",
    create: "Crear Institución",
    edit: "Editar Institución",
    delete: "Eliminar Institución",
    deleteConfirm: "¿Estás seguro de que deseas eliminar esta institución?",
    name: "Nombre de la Institución",
    country: "País",
    noInstitutions: "No se encontraron instituciones",
    firstInstitution: "Crea tu primera institución",
    logo: "Logo de la Institución",
    columns: {
      logo: "LOGO",
      name: "NOMBRE",
      country: "PAÍS",
      actions: "ACCIONES"
    },
    tooltips: {
      edit: "Editar institución",
      delete: "Eliminar institución",
      create: "Presiona Ctrl+N para crear nueva (⌘+N en Mac)"
    },
    messages: {
      createFirst: "Comienza creando tu primera institución. Haz clic en el botón de arriba o presiona Ctrl+N (⌘+N en Mac).",
      noInstitutionsYet: "No hay instituciones todavía",
      deleteWarning: "Esta acción no se puede deshacer."
    }
  },
  users: {
    create: "Crear Usuario",
    edit: "Editar Usuario",
    delete: "Eliminar Usuario",
    deleteConfirm: "¿Estás seguro de que deseas eliminar este usuario?",
    title: "Gestión de Usuarios",
    columns: {
      username: "NOMBRE DE USUARIO",
      name: "NOMBRE",
      email: "CORREO",
      role: "ROL",
      status: "ESTADO",
      actions: "ACCIONES"
    },
    status: {
      active: "Activo",
      inactive: "Inactivo",
      pending: "Pendiente de Confirmación"
    },
    messages: {
      noUsers: "No hay usuarios registrados",
      createFirst: "Comienza creando tu primer usuario"
    },
    tooltips: {
      edit: "Editar usuario",
      delete: "Eliminar usuario"
    },
    validation: {
      username_required: "El nombre de usuario es requerido",
      username_min: "El nombre de usuario debe tener al menos 3 caracteres",
      username_max: "El nombre de usuario debe tener menos de 20 caracteres",
      email_required: "El correo electrónico es requerido",
      email_invalid: "Debe ser un correo electrónico válido",
      name_required: "El nombre es requerido",
      name_min: "El nombre debe tener al menos 3 caracteres",
      name_max: "El nombre debe tener menos de 50 caracteres",
      role_required: "El rol es requerido",
      role_invalid: "Rol inválido"
    },
    roles: {
      user: "Usuario",
      admin: "Administrador"
    }
  },
  conversion_history: {
    title: "Historial de Conversiones",
    search_placeholder: "Buscar por moneda...",
    no_history: "No hay historial disponible",
    no_results: "No se encontraron resultados para tu búsqueda",
    columns: {
      from: "ORIGEN",
      amount: "CANTIDAD",
      to: "DESTINO",
      result: "RESULTADO",
      date: "FECHA"
    }
  },
  admin: {
    exchange_rates: {
      management: "Gestión de Tasas de Cambio",
      add: "Agregar Tasa de Cambio",
      title: "Tasas de Cambio Institucionales",
      create: "Crear Tasa de Cambio",
      edit: "Editar Tasa de Cambio",
      delete: "Eliminar Tasa de Cambio",
      noRates: "No hay tasas de cambio todavía",
      addFirst: "Agregar Primera Tasa",
      messages: {
        createFirst: "Comienza agregando tu primera tasa de cambio.",
        tryAgain: "Intentar de nuevo",
        deleteWarning: "Esta acción no se puede deshacer."
      },
      columns: {
        id: "ID",
        from: "ORIGEN",
        to: "DESTINO",
        rate: "TASA",
        institution: "INSTITUCIÓN",
        lastUpdate: "ÚLTIMA ACTUALIZACIÓN",
        actions: "ACCIONES"
      },
      tooltips: {
        edit: "Editar tasa",
        delete: "Eliminar tasa",
        copyId: "Copiar ID al portapapeles"
      },
      form: {
        fromCurrency: "Moneda de Origen (ej., USD)",
        toCurrency: "Moneda de Destino (ej., EUR)",
        rate: "Tasa de Cambio",
        currencyCodeHelp: "Código de moneda de 3 letras",
        rateHelp: "Hasta 4 decimales",
        institution: "Institución"
      }
    }
  }
};
