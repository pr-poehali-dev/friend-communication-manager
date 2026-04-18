import { useState } from "react";
import Icon from "@/components/ui/icon";

const allContacts = [
  { id: 1, name: "Алекс Петров", phone: "+7 (900) 123-45-67", email: "alex@mail.ru", company: "TechCorp", status: "online", avatar: "АП", color: "#a855f7", tag: "Работа" },
  { id: 2, name: "Мария Иванова", phone: "+7 (911) 234-56-78", email: "maria@gmail.com", company: "Дизайн Студия", status: "online", avatar: "МИ", color: "#00d4ff", tag: "Друзья" },
  { id: 3, name: "Дмитрий Соколов", phone: "+7 (922) 345-67-89", email: "dmitry@yandex.ru", company: "StartupXYZ", status: "away", avatar: "ДС", color: "#f72585", tag: "Работа" },
  { id: 4, name: "Елена Краснова", phone: "+7 (933) 456-78-90", email: "elena@corp.ru", company: "BigBank", status: "offline", avatar: "ЕК", color: "#06ffa5", tag: "Семья" },
  { id: 5, name: "Сергей Волков", phone: "+7 (944) 567-89-01", email: "sergey@biz.ru", company: "ConsultPro", status: "online", avatar: "СВ", color: "#fbbf24", tag: "Друзья" },
  { id: 6, name: "Анна Лебедева", phone: "+7 (955) 678-90-12", email: "anna@media.ru", company: "MediaGroup", status: "offline", avatar: "АЛ", color: "#fb923c", tag: "Работа" },
  { id: 7, name: "Павел Новиков", phone: "+7 (966) 789-01-23", email: "pavel@dev.ru", company: "DevTeam", status: "online", avatar: "ПН", color: "#34d399", tag: "Друзья" },
  { id: 8, name: "Ольга Морозова", phone: "+7 (977) 890-12-34", email: "olga@home.ru", company: "—", status: "away", avatar: "ОМ", color: "#f87171", tag: "Семья" },
];

const tags = ["Все", "Работа", "Друзья", "Семья"];

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Все");
  const [selected, setSelected] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = allContacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "Все" || c.tag === activeTag;
    return matchSearch && matchTag;
  });

  const selectedContact = allContacts.find(c => c.id === selected);
  const statusColor = (s: string) => s === "online" ? "badge-online" : s === "away" ? "badge-away" : "bg-muted-foreground/40";
  const statusLabel = (s: string) => s === "online" ? "В сети" : s === "away" ? "Недавно" : "Не в сети";

  return (
    <div className="flex h-full gap-4">
      {/* Main list */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Toolbar */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск контактов..."
                className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors neon-glow-purple">
              <Icon name="UserPlus" size={16} />
              Добавить
            </button>
            <div className="flex glass rounded-xl overflow-hidden">
              <button onClick={() => setView("grid")} className={`p-2.5 transition-colors ${view === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <Icon name="LayoutGrid" size={16} />
              </button>
              <button onClick={() => setView("list")} className={`p-2.5 transition-colors ${view === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTag === tag ? "bg-primary text-white" : "glass text-muted-foreground hover:text-foreground"}`}
              >
                {tag}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted-foreground self-center">{filtered.length} контактов</span>
          </div>
        </div>

        {/* Grid / List */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 overflow-y-auto scroll-hidden pb-2">
            {filtered.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl text-center transition-all glass-hover animate-slide-up stagger-${Math.min(i + 1, 6)} ${selected === c.id ? "tab-active" : "glass"}`}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: `linear-gradient(135deg, ${c.color}88, ${c.color})` }}>
                    {c.avatar}
                  </div>
                  <span className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-background ${statusColor(c.status)}`} />
                </div>
                <div className="min-w-0 w-full">
                  <p className="font-semibold text-sm truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.company}</p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs" style={{ background: `${c.color}22`, color: c.color }}>{c.tag}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 overflow-y-auto scroll-hidden pb-2">
            {filtered.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all glass-hover animate-slide-up stagger-${Math.min(i + 1, 6)} ${selected === c.id ? "tab-active" : "glass"}`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${c.color}88, ${c.color})` }}>
                    {c.avatar}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${statusColor(c.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.phone}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs flex-shrink-0" style={{ background: `${c.color}22`, color: c.color }}>{c.tag}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selectedContact && (
        <div className="w-72 flex-shrink-0 glass rounded-2xl p-5 flex flex-col gap-5 animate-slide-up">
          <div className="flex flex-col items-center gap-3">
            <div className="avatar-ring">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${selectedContact.color}88, ${selectedContact.color})` }}>
                {selectedContact.avatar}
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base">{selectedContact.name}</h3>
              <p className="text-xs text-muted-foreground">{selectedContact.company}</p>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className={`w-2 h-2 rounded-full ${statusColor(selectedContact.status)}`} />
                <span className="text-xs text-muted-foreground">{statusLabel(selectedContact.status)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <button className="flex flex-col items-center gap-1 glass p-3 rounded-xl hover:border-primary/40 transition-colors flex-1">
              <Icon name="MessageCircle" size={18} className="text-primary" />
              <span className="text-xs text-muted-foreground">Написать</span>
            </button>
            <button className="flex flex-col items-center gap-1 glass p-3 rounded-xl hover:border-primary/40 transition-colors flex-1">
              <Icon name="Phone" size={18} className="text-accent" />
              <span className="text-xs text-muted-foreground">Звонок</span>
            </button>
            <button className="flex flex-col items-center gap-1 glass p-3 rounded-xl hover:border-primary/40 transition-colors flex-1">
              <Icon name="Video" size={18} className="text-pink-400" />
              <span className="text-xs text-muted-foreground">Видео</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 glass p-3 rounded-xl">
              <Icon name="Phone" size={14} className="text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Телефон</p>
                <p className="text-sm font-medium">{selectedContact.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 glass p-3 rounded-xl">
              <Icon name="Mail" size={14} className="text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium truncate">{selectedContact.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 glass p-3 rounded-xl">
              <Icon name="Briefcase" size={14} className="text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Компания</p>
                <p className="text-sm font-medium">{selectedContact.company}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <button className="flex-1 glass py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              Редактировать
            </button>
            <button className="p-2 glass rounded-xl text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors">
              <Icon name="Trash2" size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
