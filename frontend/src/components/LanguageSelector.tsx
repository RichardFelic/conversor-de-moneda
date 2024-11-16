import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Languages } from "lucide-react";
import { useLanguageStore } from "@/stores/languageStore";
import './LanguageSelector.css'
import { flags } from "@/i18n/locales/flags";

const languages = [
  { key: "en", name: "English", flag: flags.en},
  { key: "es", name: "Español", flag: flags.es},
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  return (
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light" className="text-primary-600 ">
            <Languages size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Language selection"
          selectedKeys={[language]}
          onAction={(key) => setLanguage(key as string)}
        >
          {languages.map((lang) => (
            <DropdownItem key={lang.key} className="text-black">
              <div className="language-name gap-2">{lang.name} <img src={lang.flag}/></div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
  );
}
