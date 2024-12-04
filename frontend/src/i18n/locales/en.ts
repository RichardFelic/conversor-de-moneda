export const en = {
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    search: "Search",
    noResults: "No results found",
    confirm: "Confirm",
    actions: "Actions",
    update: "Update"
  },
  menu: {
    label: "Menu",
    our_rates: "Our Rates",
    rate_history: "Rate History",
    conversion_history: "Conversion History",
    home: "Home"
  },
  admin_menu: {
    institutions: "Institutions",
    users: "Users",
    exchange_rates: "Exchange Rates",
    institution_rates: "Institution Rates",
    management: "Management"
  },
  auth: {
    login: "Login",
    register: "Register",
    logout: "Logout",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    username: "Username",
    name: "Name",
    role: "Role",
    loginSuccess: "Login successful",
    registerSuccess: "Registration successful",
    confirmEmail: "Please confirm your email",
    passwordMismatch: "Passwords do not match",
    invalidCredentials: "Invalid credentials",
    loginRequired: "You need to login to view the history"
  },
  converter: {
    title: "Currency Converter",
    headline: "Convert currencies using real-time exchange rates. Sign in to access institutional rates.",
    institute_selector: {
      label: "Institution (Optional)",
      default_option: "Select an institution",
    },
    from_label: "Amount",
    to_label: "Converted to",
    tooltip_title: "Exchange rate at ",
    tooltip_description: "Live rates vary minute to minute. The quotes you receive here will differ from your final trade amount.",
    reset_button: "Reset",
    conversionSuccess: "Conversion successful",
    conversionError: "Error during conversion"
  },
  available_rates: {
    title: "Available exchange rates",
    currency_selector: {
      label: "Select currency",
      search_label: "Search",
    },
    noRatesFound: "No exchange rates found",
    lastUpdated: "Last updated"
  },
  exchange_rate_details: {
    title: "Exchange Rate Details",
    from: "From Currency",
    to: "To Currency",
    exchange_rate: "Exchange Rate",
    last_updated: "Last Updated",
    notFound: "Exchange rate not found",
    deleteConfirm: "Are you sure you want to delete this exchange rate?",
    columns: {
      type: "TYPE",
      from: "FROM",
      to: "TO",
      rate: "RATE",
      institution: "INSTITUTION",
      date: "DATE"
    },
    types: {
      general: "General",
      institutional: "Institutional"
    }
  },
  institutions: {
    title: "Institutions",
    create: "Create Institution",
    edit: "Edit Institution",
    delete: "Delete Institution",
    deleteConfirm: "Are you sure you want to delete this institution?",
    name: "Institution Name",
    country: "Country",
    noInstitutions: "No institutions found",
    firstInstitution: "Create your first institution",
    logo: "Institution Logo",
    columns: {
      logo: "LOGO",
      name: "NAME",
      country: "COUNTRY",
      actions: "ACTIONS"
    },
    tooltips: {
      edit: "Edit institution",
      delete: "Delete institution",
      create: "Press Ctrl+N to create new (⌘+N on Mac)"
    },
    messages: {
      createFirst: "Get started by creating your first institution. Click the button above or press Ctrl+N (⌘+N on Mac).",
      noInstitutionsYet: "No Institutions Yet",
      deleteWarning: "This action cannot be undone."
    }
  },
  users: {
    create: "Create User",
    edit: "Edit User",
    delete: "Delete User",
    deleteConfirm: "Are you sure you want to delete this user?",
    title: "Users Management",
    columns: {
      username: "USERNAME",
      name: "NAME",
      email: "EMAIL",
      role: "ROLE",
      status: "STATUS",
      actions: "ACTIONS"
    },
    status: {
      active: "Active",
      inactive: "Inactive",
      pending: "Pending Confirmation"
    },
    messages: {
      noUsers: "No users registered",
      createFirst: "Start by creating your first user"
    },
    tooltips: {
      edit: "Edit user",
      delete: "Delete user"
    },
    validation: {
      username_required: "Username is required",
      username_min: "Username must be at least 3 characters",
      username_max: "Username must be less than 20 characters",
      email_required: "Email is required",
      email_invalid: "Must be a valid email",
      name_required: "Name is required",
      name_min: "Name must be at least 3 characters",
      name_max: "Name must be less than 50 characters",
      role_required: "Role is required",
      role_invalid: "Invalid role"
    },
    roles: {
      user: "User",
      admin: "Admin"
    }
  },
  conversion_history: {
    title: "Conversion History",
    search_placeholder: "Search by currency...",
    no_history: "No history available",
    no_results: "No results match your search criteria",
    columns: {
      from: "ORIGIN",
      amount: "AMOUNT",
      to: "DESTINATION",
      result: "RESULT",
      date: "DATE"
    }
  },
  admin: {
    exchange_rates: {
      management: "Exchange Rates Management",
      add: "Add Exchange Rate",
      title: "Institutional Exchange Rates",
      create: "Create Exchange Rate",
      edit: "Edit Exchange Rate",
      delete: "Delete Exchange Rate",
      noRates: "No Exchange Rates Yet",
      addFirst: "Add First Exchange Rate",
      messages: {
        createFirst: "Get started by adding your first exchange rate.",
        tryAgain: "Try Again",
        deleteWarning: "This action cannot be undone."
      },
      columns: {
        id: "ID",
        from: "FROM",
        to: "TO",
        rate: "RATE",
        institution: "INSTITUTION",
        lastUpdate: "LAST UPDATE",
        actions: "ACTIONS"
      },
      tooltips: {
        edit: "Edit rate",
        delete: "Delete rate",
        copyId: "Copy ID to clipboard"
      },
      form: {
        fromCurrency: "From Currency (e.g., USD)",
        toCurrency: "To Currency (e.g., EUR)",
        rate: "Exchange Rate",
        currencyCodeHelp: "3-letter currency code",
        rateHelp: "Up to 4 decimal places",
        institution: "Institution"
      }
    }
  }
};
