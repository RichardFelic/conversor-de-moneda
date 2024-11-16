import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Home,
  LogOut,
  Building2,
  Users,
  DollarSign,
  ChevronDown,
  History,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
// import { useThemeStore } from '@/stores/themeStore';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Roles } from "@/constants/roles";
import { useTranslation } from 'react-i18next'; // useTranslation para manejar el idioma
import LanguageSelector from './LanguageSelector'; // Componente LanguageSelector para el selector de idioma 


export default function Navbar() {
  const { isAuthenticated, logout, role } = useAuthStore();
  // const { isDark, toggle } = useThemeStore();
  const navigate = useNavigate();
  const isAdmin = role === Roles.ADMIN;
  const { t } = useTranslation(); // Utiliza useTranslation para obtener la función t para traducir el texto

  const handleLogout = () => {
    logout();
    navigate("/users/login");
  };

  return (
    <NextUINavbar className="border-b border-surface-200">
      <NavbarBrand>
        <RouterLink to="/" className="flex items-center">
          <Home className="mr-2 text-primary-600 dark:text-primary-400" />
          <p className="font-semibold text-primary-600 dark:text-primary-400">
            Exchange Rate
          </p>
        </RouterLink>
      </NavbarBrand>

      {/* <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarItem>
          <RouterLink
            to="/"
            className="text-foreground hover:text-primary-600 dark:hover:text-primary-400"
          >
            Home
          </RouterLink>
        </NavbarItem>

        <NavbarItem>
          <RouterLink
            to="/exchange-rates"
            className="flex items-center gap-2 text-foreground hover:text-primary-600 dark:hover:text-primary-400"
          >
            <DollarSign size={18} />
            Our Rates
          </RouterLink>
        </NavbarItem>

        {isAuthenticated && (
          <>
            <NavbarItem>
              <RouterLink
                to="/exchange-rates/history"
                className="flex items-center gap-2 text-foreground hover:text-primary-600 dark:hover:text-primary-400"
              >
                <History size={18} />
                Rate History
              </RouterLink>
            </NavbarItem>
            <NavbarItem>
              <RouterLink
                to="/conversions/history"
                className="flex items-center gap-2 text-foreground hover:text-primary-600 dark:hover:text-primary-400"
              >
                <History size={18} />
                Conversion History
              </RouterLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent> */}

      <NavbarContent justify="end">
        {/* user */}
        <Dropdown className="">
          <DropdownTrigger>
            <Button
              variant="light"
              className="text-foreground hover:text-primary-600 dark:hover:text-primary-400"
              endContent={<ChevronDown size={16} />}
            >
            {t('menu.label')}
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {/* <DropdownItem
                key="institution-rates"
                startContent={<DollarSign size={18} />}
                as={RouterLink}
                className='text-black'
                to="/exchange-rates/institutions"
              >
                Institution Rates
              </DropdownItem> */}

            <DropdownItem
              startContent={<DollarSign size={18} />}
              as={RouterLink}
              className="text-black"
              to="/exchange-rates"
            >
            {t('menu.our_rates')}
            </DropdownItem>
            <DropdownItem
              key="exchange-rates"
              startContent={<History size={18} />}
              className="text-black"
              as={RouterLink}
              to="/exchange-rates/history"
            >
            {t('menu.rate_history')}
            </DropdownItem>
           
            <DropdownItem
              key="conversions-history"
              startContent={<History size={18} />}
              className="text-black"
              as={RouterLink}
              to="/conversions/history"
            >
              {t('menu.conversion_history')}
            </DropdownItem>
            {/* {isAuthenticated && (
              <>
              <DropdownItem
                key = "exchange-rates/history"
                startContent={<><History size={18}
                  className="text-black"
                  to="/exchange-rates/history"
                >

                  Rate History
                </DropdownItem><DropdownItem
                    key="conversions/history"
                    startContent={<History size={18}
                      className="text-black"
                      to="/conversions/history"
                    >
                      Conversion History
                    </DropdownItem>} />
                    </>
            )} */}

            {/* {isAuthenticated && (
              <>
                
                  <RouterLink
                    to="/exchange-rates/history"
                    className="flex items-center gap-2 text-foreground hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <History size={18} />
                    Rate History
                  </RouterLink>
               
                <DropdownItem>
                  <RouterLink
                    to="/conversions/history"
                    className="flex items-center gap-2 text-foreground hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <History size={18} />
                    Conversion History
                  </RouterLink>
                </DropdownItem>
              </>
            )} */}
            {/* {isAuthenticated && (
              <>
                <DropdownItem
                  key="users"
                  startContent={<Users size={18} />}
                  as={RouterLink}
                  className="text-black"
                  to="/users"
                >
                  Users
                </DropdownItem>
                <DropdownItem
                  key="institutions"
                  startContent={<Building2 size={18} />}
                  as={RouterLink}
                  className="text-black"
                  to="/institutions"
                >
                  Institutions
                </DropdownItem>
              </>
            )} */}
          </DropdownMenu>
        </Dropdown>

        {/* admin */}
        {isAuthenticated && isAdmin && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="text-foreground hover:text-primary-600 dark:hover:text-primary-400"
                endContent={<ChevronDown size={16} />}
              >
                Admin
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Admin actions" className="w-[200px]">
              <DropdownItem
                key="institutions"
                startContent={<Building2 size={18} />}
                as={RouterLink}
                className="text-black"
                to="/institutions"
              >
              {t('admin_menu.institutions')}

              </DropdownItem>
              <DropdownItem
                key="users"
                startContent={<Users size={18} />}
                as={RouterLink}
                className="text-black"
                to="/users"
              >
                {t('admin_menu.users')}

              </DropdownItem>
              <DropdownItem
                key="exchange-rates"
                startContent={<DollarSign size={18} />}
                as={RouterLink}
                className="text-black"
                to="/admin/exchange-rates"
              >
                {t('admin_menu.exchange_rates')}
              </DropdownItem>
              <DropdownItem
                key="institution-rates"
                startContent={<DollarSign size={18} />}
                as={RouterLink}
                className="text-black"
                to="/exchange-rates/institutions"
              >
                {t('admin_menu.institution_rates')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        {isAuthenticated ? (
          <>
            {/* <NavbarItem>
              <span className="text-sm text-foreground mr-4">Role: {role}</span>
            </NavbarItem> */}
            <NavbarItem>
              <Button
                variant="light"
                className="text-primary-600 dark:text-primary-400 font-medium"
                startContent={<LogOut size={18} />}
                onClick={handleLogout}
              >
                {t('auth.logout')}{ /* ejemplo de traducción de cerrar sesión*/}
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              as={RouterLink}
              to="/users/login"
              className="bg-primary-600 text-white font-medium dark:bg-primary-500"
            >
              {t('auth.login')}{/* ejemplo de traducción de iniciar sesión */}
            </Button>
          </NavbarItem>
        )}

<NavbarItem>
          <LanguageSelector />
        </NavbarItem>
        {/* <NavbarItem>
          <Button 
            isIconOnly 
            variant="light" 
            aria-label="Toggle theme"
            className="text-primary-600 dark:text-primary-400"
            onClick={toggle}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </NextUINavbar>
  );
}
