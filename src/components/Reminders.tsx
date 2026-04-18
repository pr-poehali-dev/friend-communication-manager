import { useState } from "react";
import Icon from "@/components/ui/icon";

type Priority = "high" | "medium" | "low";

interface Reminder {
  id: number;
  title: string;
  contact: string;
  date: string;
  time: string;
  done: boolean;
  priority: Priority;
  type: string;
}

const initialReminders: Reminder[] = [
  { id: 1, title: "Позвонить Алексу по проекту", contact: "Алекс Петров", date: "2026-04-19", time: "10:00", done: false, priority: "high", type: "Звонок" },
  { id: 2, title: "Отправить документы Марии", contact: "Мария Иванова", date: "2026-04-19", time: "14:30", done: false, priority: "medium", type: "Задача" },
  { id: 3, title: "День рождения Елены", contact: "Елена Краснова", date: "2026-04-20", time: "09:00", done: false, priority: "high", type: "Событие" },
  { id: 4, title: "Встреча с командой", contact: "Дмитрий Соколов", date: "2026-04-21", time: "11:00", done: false, priority: "medium", type: "Встреча" },
  { id: 5, title: "Согласовать бюджет", contact: "Сергей Волков", date: "2026-04-22", time: "15:00", done: true, priority: "low", type: "Задача" },
  { id: 6, title: "Презентация для клиента", contact: "Анна Лебедева", date: "2026-04-23", time: "13:00", done: true, priority: "high", type: "Встреча" },
];

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  high: { label: "Высокий", color: "#f72585", bg: "#f7258522" },
  medium: { label: "Средний", color: "#fbbf24", bg: "#fbbf2422" },
  low: { label: "Низкий", color: "#06ffa5", bg: "#06ffa522" },
};

const typeIcons: Record<string, string> = {
  "Звонок": "Phone",
  "Задача": "CheckSquare",
  "Событие": "Gift",
  "Встреча": "Users",
};

export default function Reminders() {
  const [reminders, setReminders] = useState(initialReminders);
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");

  const toggleDone = (id: number) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  const deleteReminder = (id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const addReminder = () => {
    if (!newTitle.trim()) return;
    const r: Reminder = {
      id: Date.now(),
      title: newTitle,
      contact: newContact,
      date: newDate || "2026-04-25",
      time: newTime || "12:00",
      done: false,
      priority: newPriority,
      type: "Задача",
    };
    setReminders(prev => [r, ...prev]);
    setNewTitle(""); setNewContact(""); setNewDate(""); setNewTime("");
    setShowForm(false);
  };

  const filtered = reminders.filter(r =>
    filter === "all" ? true : filter === "done" ? r.done : !r.done
  );

  const upcoming = filtered.filter(r => !r.done);
  const completed = filtered.filter(r => r.done);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["all", "active", "done"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-primary text-white" : "glass text-muted-foreground hover:text-foreground"}`}>
              {f === "all" ? "Все" : f === "active" ? "Активные" : "Выполненные"}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors neon-glow-purple"
        >
          <Icon name="Plus" size={16} />
          Добавить
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="glass rounded-2xl p-4 flex flex-col gap-3 animate-slide-up">
          <h3 className="font-semibold text-sm">Новое напоминание</h3>
          <div className="grid grid-cols-2 gap-3">
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Заголовок" className="bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60 col-span-2" />
            <input value={newContact} onChange={e => setNewContact(e.target.value)} placeholder="Контакт" className="bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
            <div className="flex gap-2">
              <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="flex-1 bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60 text-foreground" />
              <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-24 bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60 text-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Приоритет:</span>
            {(["high", "medium", "low"] as Priority[]).map(p => (
              <button key={p} onClick={() => setNewPriority(p)} className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${newPriority === p ? "text-white" : "glass text-muted-foreground"}`} style={newPriority === p ? { background: priorityConfig[p].color } : {}}>
                {priorityConfig[p].label}
              </button>
            ))}
            <button onClick={addReminder} className="ml-auto bg-primary text-white px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-primary/80 transition-colors">
              Сохранить
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto scroll-hidden flex flex-col gap-5">
        {upcoming.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Предстоящие</p>
            {upcoming.map((r, i) => (
              <div key={r.id} className={`glass glass-hover rounded-2xl p-4 flex items-center gap-4 animate-slide-up stagger-${Math.min(i + 1, 6)}`}>
                <button onClick={() => toggleDone(r.id)} className="w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all hover:border-primary" style={{ borderColor: priorityConfig[r.priority].color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{r.title}</p>
                    <span className="px-1.5 py-0.5 rounded-md text-xs flex-shrink-0" style={{ background: priorityConfig[r.priority].bg, color: priorityConfig[r.priority].color }}>
                      {priorityConfig[r.priority].label}
                    </span>
                  </div>
                  {r.contact && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Icon name="User" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{r.contact}</span>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#a855f722" }}>
                      <Icon name={typeIcons[r.type] || "Bell"} size={12} className="text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{r.type}</span>
                  </div>
                  <p className="text-xs text-accent mt-1">{formatDate(r.date)} · {r.time}</p>
                </div>
                <button onClick={() => deleteReminder(r.id)} className="p-1.5 glass rounded-lg text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {completed.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Выполненные</p>
            {completed.map((r, i) => (
              <div key={r.id} className={`glass rounded-2xl p-4 flex items-center gap-4 opacity-50 animate-slide-up stagger-${Math.min(i + 1, 6)}`}>
                <button onClick={() => toggleDone(r.id)} className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: priorityConfig[r.priority].color }}>
                  <Icon name="Check" size={10} className="text-white" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate line-through text-muted-foreground">{r.title}</p>
                  {r.contact && <p className="text-xs text-muted-foreground mt-0.5">{r.contact}</p>}
                </div>
                <p className="text-xs text-muted-foreground flex-shrink-0">{formatDate(r.date)}</p>
                <button onClick={() => deleteReminder(r.id)} className="p-1.5 glass rounded-lg text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
