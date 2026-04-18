import { useState } from "react";
import Icon from "@/components/ui/icon";

const groupsData = [
  {
    id: 1, name: "Рабочая команда", emoji: "💼", color: "#a855f7", members: [
      { name: "Алекс Петров", avatar: "АП", status: "online" },
      { name: "Дмитрий Соколов", avatar: "ДС", status: "away" },
      { name: "Анна Лебедева", avatar: "АЛ", status: "offline" },
      { name: "Павел Новиков", avatar: "ПН", status: "online" },
    ], description: "Основная команда разработки", lastActivity: "5 мин назад"
  },
  {
    id: 2, name: "Семья", emoji: "❤️", color: "#f72585", members: [
      { name: "Елена Краснова", avatar: "ЕК", status: "offline" },
      { name: "Ольга Морозова", avatar: "ОМ", status: "away" },
    ], description: "Близкие люди", lastActivity: "1 час назад"
  },
  {
    id: 3, name: "Друзья", emoji: "🎉", color: "#00d4ff", members: [
      { name: "Мария Иванова", avatar: "МИ", status: "online" },
      { name: "Сергей Волков", avatar: "СВ", status: "online" },
      { name: "Павел Новиков", avatar: "ПН", status: "online" },
    ], description: "Лучшие друзья", lastActivity: "20 мин назад"
  },
  {
    id: 4, name: "Клиенты VIP", emoji: "⭐", color: "#fbbf24", members: [
      { name: "Алекс Петров", avatar: "АП", status: "online" },
      { name: "Дмитрий Соколов", avatar: "ДС", status: "away" },
    ], description: "Приоритетные клиенты", lastActivity: "2 дня назад"
  },
];

export default function Groups() {
  const [selected, setSelected] = useState<number | null>(1);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [groups, setGroups] = useState(groupsData);

  const selectedGroup = groups.find(g => g.id === selected);
  const statusColor = (s: string) => s === "online" ? "badge-online" : s === "away" ? "badge-away" : "bg-muted-foreground/40";

  const addGroup = () => {
    if (!newName.trim()) return;
    const emojis = ["🌟", "🚀", "💡", "🔥", "🌈"];
    const colors = ["#a855f7", "#00d4ff", "#f72585", "#06ffa5", "#fbbf24"];
    const idx = groups.length % emojis.length;
    setGroups(prev => [...prev, {
      id: Date.now(),
      name: newName,
      emoji: emojis[idx],
      color: colors[idx],
      members: [],
      description: newDesc,
      lastActivity: "только что",
    }]);
    setNewName(""); setNewDesc("");
    setShowForm(false);
  };

  return (
    <div className="flex h-full gap-4">
      {/* Sidebar */}
      <div className="w-72 flex flex-col gap-3 flex-shrink-0">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors neon-glow-purple w-full justify-center"
        >
          <Icon name="Plus" size={16} />
          Создать группу
        </button>

        {showForm && (
          <div className="glass rounded-xl p-4 flex flex-col gap-3 animate-slide-up">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Название группы" className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60 text-foreground placeholder:text-muted-foreground" />
            <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Описание" className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60 text-foreground placeholder:text-muted-foreground" />
            <button onClick={addGroup} className="bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/80 transition-colors">
              Создать
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2 overflow-y-auto scroll-hidden flex-1">
          {groups.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setSelected(g.id)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all glass-hover animate-slide-up stagger-${Math.min(i + 1, 6)} ${selected === g.id ? "tab-active" : "glass"}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${g.color}22` }}>
                {g.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.members.length} участников</p>
              </div>
              <div className="flex-shrink-0">
                <div className="flex">
                  {g.members.slice(0, 3).map((m, mi) => (
                    <div key={mi} className="w-5 h-5 rounded-full text-white flex items-center justify-center text-[8px] font-bold -ml-1 first:ml-0 border border-background" style={{ background: `${g.color}cc` }}>
                      {m.avatar[0]}
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 glass rounded-2xl overflow-hidden flex flex-col">
        {selectedGroup ? (
          <>
            {/* Header */}
            <div className="relative overflow-hidden p-6 border-b border-border" style={{ background: `linear-gradient(135deg, ${selectedGroup.color}15, transparent)` }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${selectedGroup.color}22` }}>
                  {selectedGroup.emoji}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedGroup.name}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{selectedGroup.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Активность: {selectedGroup.lastActivity}</p>
                </div>
                <div className="flex gap-2">
                  <button className="glass p-2.5 rounded-xl hover:border-primary/40 transition-colors">
                    <Icon name="MessageCircle" size={18} className="text-primary" />
                  </button>
                  <button className="glass p-2.5 rounded-xl hover:border-primary/40 transition-colors">
                    <Icon name="Settings" size={18} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Members */}
            <div className="p-5 flex flex-col gap-4 flex-1 overflow-y-auto scroll-hidden">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  Участники ({selectedGroup.members.length})
                </h3>
                <button className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                  <Icon name="UserPlus" size={12} />
                  Добавить
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {selectedGroup.members.map((m, i) => (
                  <div key={i} className={`glass glass-hover rounded-xl p-4 flex items-center gap-3 animate-slide-up stagger-${Math.min(i + 1, 6)}`}>
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${selectedGroup.color}88, ${selectedGroup.color})` }}>
                        {m.avatar}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${statusColor(m.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{m.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{m.status === "online" ? "В сети" : m.status === "away" ? "Недавно" : "Не в сети"}</p>
                    </div>
                    <button className="p-1.5 glass rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="MoreHorizontal" size={12} />
                    </button>
                  </div>
                ))}
                {/* Add member placeholder */}
                <button className="glass rounded-xl p-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all border-dashed">
                  <Icon name="Plus" size={16} />
                  <span className="text-sm">Добавить</span>
                </button>
              </div>

              {/* Group actions */}
              <div className="mt-auto pt-4 border-t border-border grid grid-cols-3 gap-3">
                <button className="glass rounded-xl p-3 flex flex-col items-center gap-2 hover:border-primary/40 transition-colors">
                  <Icon name="Bell" size={18} className="text-accent" />
                  <span className="text-xs text-muted-foreground">Уведомления</span>
                </button>
                <button className="glass rounded-xl p-3 flex flex-col items-center gap-2 hover:border-primary/40 transition-colors">
                  <Icon name="Share2" size={18} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Поделиться</span>
                </button>
                <button className="glass rounded-xl p-3 flex flex-col items-center gap-2 hover:border-destructive/40 transition-colors">
                  <Icon name="LogOut" size={18} className="text-destructive" />
                  <span className="text-xs text-muted-foreground">Покинуть</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="Users" size={48} className="mx-auto mb-3 opacity-30" />
              <p>Выберите группу</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
