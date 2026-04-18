import { useState } from "react";
import Icon from "@/components/ui/icon";

const conversations = [
  { id: 1, name: "Алекс Петров", avatar: "АП", status: "online", lastMsg: "Окей, договорились на завтра!", time: "14:32", unread: 2, color: "#a855f7" },
  { id: 2, name: "Мария Иванова", avatar: "МИ", status: "online", lastMsg: "Спасибо за помощь 🙌", time: "13:15", unread: 0, color: "#00d4ff" },
  { id: 3, name: "Дмитрий Соколов", avatar: "ДС", status: "away", lastMsg: "Отправил документы на почту", time: "11:48", unread: 5, color: "#f72585" },
  { id: 4, name: "Елена Краснова", avatar: "ЕК", status: "offline", lastMsg: "До встречи в пятницу!", time: "Вчера", unread: 0, color: "#06ffa5" },
  { id: 5, name: "Сергей Волков", avatar: "СВ", status: "online", lastMsg: "Можешь позвонить сейчас?", time: "Вчера", unread: 1, color: "#fbbf24" },
];

const messages: Record<number, { id: number; text: string; from: "me" | "other"; time: string }[]> = {
  1: [
    { id: 1, text: "Привет! Как дела?", from: "other", time: "14:20" },
    { id: 2, text: "Отлично, спасибо! А у тебя?", from: "me", time: "14:22" },
    { id: 3, text: "Тоже всё хорошо. Встретимся завтра?", from: "other", time: "14:28" },
    { id: 4, text: "Да, конечно!", from: "me", time: "14:30" },
    { id: 5, text: "Окей, договорились на завтра!", from: "other", time: "14:32" },
  ],
  2: [
    { id: 1, text: "Можешь помочь с задачей?", from: "other", time: "13:00" },
    { id: 2, text: "Конечно, что нужно?", from: "me", time: "13:05" },
    { id: 3, text: "Нужно разобраться с таблицей", from: "other", time: "13:10" },
    { id: 4, text: "Готово, смотри в файле", from: "me", time: "13:12" },
    { id: 5, text: "Спасибо за помощь 🙌", from: "other", time: "13:15" },
  ],
};

export default function Messages() {
  const [active, setActive] = useState<number | null>(1);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCon = conversations.find(c => c.id === active);
  const chatMessages = active ? (messages[active] || []) : [];

  const handleSend = () => {
    if (!input.trim()) return;
    setInput("");
  };

  const statusColor = (s: string) => s === "online" ? "badge-online" : s === "away" ? "badge-away" : "bg-muted-foreground/40";

  return (
    <div className="flex h-full gap-4">
      {/* Sidebar */}
      <div className="w-80 flex flex-col gap-3 flex-shrink-0">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск переписки..."
            className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto scroll-hidden flex-1">
          {filtered.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all glass-hover animate-slide-up stagger-${Math.min(i + 1, 6)} ${active === c.id ? "tab-active" : "glass"}`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${c.color}88, ${c.color})` }}>
                  {c.avatar}
                </div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${statusColor(c.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{c.name}</span>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{c.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-muted-foreground truncate">{c.lastMsg}</span>
                  {c.unread > 0 && (
                    <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-primary text-xs text-white flex items-center justify-center font-medium">{c.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col glass rounded-2xl overflow-hidden">
        {activeCon ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${activeCon.color}88, ${activeCon.color})` }}>
                  {activeCon.avatar}
                </div>
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background ${statusColor(activeCon.status)}`} />
              </div>
              <div>
                <p className="font-semibold text-sm">{activeCon.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{activeCon.status === "online" ? "В сети" : activeCon.status === "away" ? "Недавно" : "Не в сети"}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="glass p-2 rounded-lg hover:border-primary/40 transition-colors">
                  <Icon name="Phone" size={16} className="text-muted-foreground" />
                </button>
                <button className="glass p-2 rounded-lg hover:border-primary/40 transition-colors">
                  <Icon name="Video" size={16} className="text-muted-foreground" />
                </button>
                <button className="glass p-2 rounded-lg hover:border-primary/40 transition-colors">
                  <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scroll-hidden p-5 flex flex-col gap-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${msg.from === "me" ? "bg-primary text-white rounded-br-sm" : "glass rounded-bl-sm"}`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-border flex gap-3 items-center">
              <button className="glass p-2 rounded-xl hover:border-primary/40 transition-colors">
                <Icon name="Paperclip" size={16} className="text-muted-foreground" />
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Написать сообщение..."
                className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
              <button
                onClick={handleSend}
                className="bg-primary hover:bg-primary/80 text-white p-2.5 rounded-xl transition-colors neon-glow-purple"
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageCircle" size={48} className="mx-auto mb-3 opacity-30" />
              <p>Выберите переписку</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
