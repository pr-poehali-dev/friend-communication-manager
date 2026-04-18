import { useState } from "react";
import Icon from "@/components/ui/icon";
import Messages from "@/components/Messages";
import Contacts from "@/components/Contacts";
import Profile from "@/components/Profile";
import Reminders from "@/components/Reminders";
import Groups from "@/components/Groups";

type Tab = "messages" | "contacts" | "reminders" | "groups" | "profile";

const tabs: { id: Tab; label: string; icon: string; badge?: number }[] = [
  { id: "messages", label: "Переписка", icon: "MessageCircle", badge: 8 },
  { id: "contacts", label: "Контакты", icon: "Users" },
  { id: "reminders", label: "Напоминания", icon: "Bell", badge: 3 },
  { id: "groups", label: "Группы", icon: "Layers" },
  { id: "profile", label: "Профиль", icon: "User" },
];

const tabComponents: Record<Tab, React.ReactNode> = {
  messages: <Messages />,
  contacts: <Contacts />,
  reminders: <Reminders />,
  groups: <Groups />,
  profile: <Profile />,
};

export default function Index() {
  const [active, setActive] = useState<Tab>("contacts");

  return (
    <div className="min-h-screen bg-background gradient-mesh flex flex-col">
      {/* Top header */}
      <header className="border-b border-border glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow-purple">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-display tracking-wide">КОНТАКТ<span className="neon-text-cyan">ХАБ</span></h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Менеджер контактов</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="glass p-2 rounded-xl hover:border-primary/40 transition-colors relative">
              <Icon name="Bell" size={18} className="text-muted-foreground" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <button className="glass p-2 rounded-xl hover:border-primary/40 transition-colors">
              <Icon name="Search" size={18} className="text-muted-foreground" />
            </button>
            <button className="glass p-2 rounded-xl hover:border-primary/40 transition-colors">
              <Icon name="Settings" size={18} className="text-muted-foreground" />
            </button>
            <div className="ml-1 avatar-ring cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                ИС
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <nav className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                  active === tab.id
                    ? "tab-active"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center font-medium">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="ml-auto flex items-center">
              <button className="flex items-center gap-2 glass px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                <Icon name="RefreshCw" size={12} />
                Синхронизировать
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-6">
        <div className="h-[calc(100vh-10rem)]">
          {tabComponents[active]}
        </div>
      </main>
    </div>
  );
}
