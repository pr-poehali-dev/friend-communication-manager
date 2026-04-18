import { useState } from "react";
import Icon from "@/components/ui/icon";

const syncProviders = [
  { id: "google", name: "Google Contacts", icon: "Globe", color: "#4285f4", connected: true, lastSync: "5 мин назад", contacts: 248 },
  { id: "icloud", name: "iCloud", icon: "Cloud", color: "#3b82f6", connected: false, lastSync: null, contacts: 0 },
  { id: "outlook", name: "Outlook", icon: "Mail", color: "#0078d4", connected: true, lastSync: "1 час назад", contacts: 134 },
  { id: "vk", name: "ВКонтакте", icon: "Users", color: "#4a76a8", connected: false, lastSync: null, contacts: 0 },
];

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Иван Сидоров");
  const [email, setEmail] = useState("ivan@example.com");
  const [phone, setPhone] = useState("+7 (999) 000-11-22");
  const [bio, setBio] = useState("Менеджер проектов | Технологии и инновации");
  const [providers, setProviders] = useState(syncProviders);
  const [syncing, setSyncing] = useState<string | null>(null);

  const toggleProvider = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, connected: !p.connected } : p));
  };

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => {
      setSyncing(null);
      setProviders(prev => prev.map(p => p.id === id ? { ...p, lastSync: "только что" } : p));
    }, 2000);
  };

  const stats = [
    { label: "Контактов", value: "382", icon: "Users", color: "#a855f7" },
    { label: "Групп", value: "12", icon: "Layers", color: "#00d4ff" },
    { label: "Напоминаний", value: "8", icon: "Bell", color: "#f72585" },
    { label: "Переписок", value: "24", icon: "MessageCircle", color: "#06ffa5" },
  ];

  return (
    <div className="flex flex-col gap-6 overflow-y-auto scroll-hidden pb-4">
      {/* Header card */}
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative flex items-start gap-5">
          <div className="avatar-ring flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
              ИС
            </div>
          </div>
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="flex flex-col gap-2">
                <input value={name} onChange={e => setName(e.target.value)} className="bg-secondary/60 border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary/60 font-bold" />
                <input value={bio} onChange={e => setBio(e.target.value)} className="bg-secondary/60 border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground focus:outline-none focus:border-primary/60" />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{bio}</p>
              </>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-online w-2 h-2 rounded-full" />
              <span className="text-xs text-muted-foreground">В сети</span>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm transition-colors ${editing ? "bg-primary text-white" : "glass text-muted-foreground hover:text-foreground"}`}
          >
            <Icon name={editing ? "Check" : "Pencil"} size={14} />
            {editing ? "Сохранить" : "Редактировать"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`glass rounded-2xl p-4 text-center animate-slide-up stagger-${i + 1}`}>
            <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: `${s.color}22` }}>
              <Icon name={s.icon} size={18} style={{ color: s.color }} />
            </div>
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Contact info */}
        <div className="glass rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Icon name="User" size={16} className="text-primary" />
            Личные данные
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Email", value: email, setter: setEmail, icon: "Mail" },
              { label: "Телефон", value: phone, setter: setPhone, icon: "Phone" },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-3 glass p-3 rounded-xl">
                <Icon name={f.icon} size={14} className="text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{f.label}</p>
                  {editing ? (
                    <input value={f.value} onChange={e => f.setter(e.target.value)} className="bg-transparent text-sm font-medium w-full focus:outline-none focus:text-primary" />
                  ) : (
                    <p className="text-sm font-medium truncate">{f.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="glass rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Icon name="Shield" size={16} className="text-accent" />
            Приватность
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Кто видит мой статус", value: "Все" },
              { label: "Кто видит телефон", value: "Контакты" },
              { label: "Двухфакторная аутентификация", value: "Включена" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between glass p-3 rounded-xl">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs font-medium text-accent">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sync providers */}
      <div className="glass rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <Icon name="RefreshCw" size={16} className="text-pink-400" />
            Синхронизация
          </h3>
          <span className="text-xs text-muted-foreground">Автосинхронизация каждые 30 мин</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {providers.map(p => (
            <div key={p.id} className={`glass-hover glass rounded-xl p-4 flex flex-col gap-3 transition-all ${p.connected ? "border-primary/20" : ""}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${p.color}22` }}>
                    <Icon name={p.icon} size={16} style={{ color: p.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    {p.connected && <p className="text-xs text-muted-foreground">{p.contacts} контактов</p>}
                  </div>
                </div>
                <button
                  onClick={() => toggleProvider(p.id)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${p.connected ? "bg-primary" : "bg-secondary"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${p.connected ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
              {p.connected && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {syncing === p.id ? "Синхронизация..." : `Обновлено: ${p.lastSync}`}
                  </span>
                  <button
                    onClick={() => handleSync(p.id)}
                    className={`p-1.5 rounded-lg glass hover:border-primary/40 transition-all ${syncing === p.id ? "animate-spin" : ""}`}
                  >
                    <Icon name="RefreshCw" size={12} className="text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}