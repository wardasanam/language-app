import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// --- TACTICAL ICON SYSTEM ---
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    globe: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16zM4.26 10.1a7.3 7.3 0 0 0 0 3.8M19.74 10.1a7.3 7.3 0 0 1 0 3.8M12 2a10 10 0 0 1 0 20M2 12a10 10 0 0 1 20 0" />,
    rocket: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3m3 3 2 2M12 15l2-2M9 12l2 2M9 12L7 10M12 15c4-1 6-6 6-6s-5 2-6 6zM6 6c0-2 2-4 6-4s6 2 6 4-2 6-6 6-6-2-6-4z" />,
    trophy: <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34M12 2a6 6 0 0 0-6 6v1a6 6 0 0 0 12 0V8a6 6 0 0 0-6-6z" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    target: <React.Fragment><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></React.Fragment>,
    cpu: <React.Fragment><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9zM15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" /></React.Fragment>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    monitor: <React.Fragment><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></React.Fragment>,
    lightbulb: <React.Fragment><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6M10 22h4" /></React.Fragment>,
    eraser: <React.Fragment><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.5l12-12c1-1 2.5-1 3.5 0l4.3 4.3c1 1 1 2.5 0 3.5l-7 7" /><path d="m22 21H7" /><path d="m5 11 9 9" /></React.Fragment>,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    arrowLeft: <React.Fragment><path d="m12 19-7-7 7-7" /><path d="M5 12h14" /></React.Fragment>,
    flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    layout: <React.Fragment><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></React.Fragment>,
    radio: <React.Fragment><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49" /><path d="M11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></React.Fragment>,
    award: <React.Fragment><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></React.Fragment>,
    terminal: <React.Fragment><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></React.Fragment>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

// --- VERIFIED TACTICAL DICTIONARY (STRICT NO OVERLAP, NO ARTICLES) ---
const VOCAB_DATABASE = {
  es: {
    lv1: { hello: "Hola", thanks: "Gracias", yes: "Si", no: "No", bye: "Adios" },
    lv2: { red: "Rojo", blue: "Azul", green: "Verde", white: "Blanco", black: "Negro" },
    lv3: { one: "Uno", two: "Dos", three: "Tres", four: "Cuatro", five: "Cinco" },
    lv4: { water: "Agua", fire: "Fuego", earth: "Tierra", air: "Aire", sun: "Sol" },
    lv5: { man: "Hombre", woman: "Mujer", boy: "Niño", girl: "Niña", friend: "Amigo" },
    lv6: { house: "Casa", city: "Ciudad", street: "Calle", car: "Coche", door: "Puerta" },
    lv7: { table: "Mesa", chair: "Silla", bed: "Cama", window: "Ventana", key: "Llave" },
    lv8: { work: "Trabajo", money: "Dinero", time: "Tiempo", food: "Comida", milk: "Leche" },
    lv9: { mountain: "Montaña", river: "Rio", forest: "Bosque", ocean: "Oceano", island: "Isla" },
    lv10: { freedom: "Libertad", peace: "Paz", heart: "Corazon", blood: "Sangre", truth: "Verdad" }
  },
  ru: {
    lv1: { hello: "Привет", thanks: "Спасибо", yes: "Да", no: "Нет", bye: "Пока" },
    lv2: { red: "Красный", blue: "Синий", green: "Зеленый", white: "Белый", black: "Черный" },
    lv3: { one: "Один", two: "Два", three: "Три", four: "Четыре", five: "Пять" },
    lv4: { water: "Вода", fire: "Огонь", earth: "Земля", air: "Воздух", sun: "Солнце" },
    lv5: { man: "Мужчина", woman: "Женщина", boy: "Мальчик", girl: "Девочка", friend: "Друг" },
    lv6: { house: "Дом", city: "Город", street: "Улица", car: "Машина", door: "Дверь" },
    lv7: { table: "Стол", chair: "Стул", bed: "Кровать", window: "Окно", key: "Ключ" },
    lv8: { work: "Работа", money: "Деньги", time: "Время", food: "Еда", milk: "Молоко" },
    lv9: { mountain: "Гора", river: "Река", forest: "Лес", ocean: "Океан", island: "Остров" },
    lv10: { freedom: "Свобода", peace: "Мир", heart: "Сердце", blood: "Кровь", truth: "Правда" }
  },
  fr: {
    lv1: { hello: "Bonjour", thanks: "Merci", yes: "Oui", no: "Non", bye: "Adieu" },
    lv2: { red: "Rouge", blue: "Bleu", green: "Vert", white: "Blanc", black: "Noir" },
    lv3: { one: "Un", two: "Deux", three: "Trois", four: "Quatre", five: "Cinq" },
    lv4: { water: "Eau", fire: "Feu", earth: "Terre", air: "Air", sun: "Soleil" },
    lv5: { man: "Homme", woman: "Femme", boy: "Garcon", girl: "Fille", friend: "Ami" },
    lv6: { house: "Maison", city: "Ville", street: "Rue", car: "Voiture", door: "Porte" },
    lv7: { table: "Table", chair: "Chaise", bed: "Lit", window: "Fenetre", key: "Cle" },
    lv8: { work: "Travail", money: "Argent", time: "Temps", food: "Nourriture", milk: "Lait" },
    lv9: { mountain: "Montagne", river: "Riviere", forest: "Foret", ocean: "Ocean", island: "Ile" },
    lv10: { freedom: "Liberte", peace: "Paix", heart: "Coeur", blood: "Sang", truth: "Verite" }
  },
  de: {
    lv1: { hello: "Hallo", thanks: "Danke", yes: "Ja", no: "Nein", bye: "Tschuss" },
    lv2: { red: "Rot", blue: "Blau", green: "Grun", white: "Weiss", black: "Schwarz" },
    lv3: { one: "Eins", two: "Zwei", three: "Drei", four: "Vier", five: "Funf" },
    lv4: { water: "Wasser", fire: "Feuer", earth: "Erde", air: "Luft", sun: "Sonne" },
    lv5: { man: "Mann", woman: "Frau", boy: "Junge", girl: "Madchen", friend: "Freund" },
    lv6: { house: "Haus", city: "Stadt", street: "Strasse", car: "Auto", door: "Tur" },
    lv7: { table: "Tisch", chair: "Stuhl", bed: "Bett", window: "Fenster", key: "Schlussel" },
    lv8: { work: "Arbeit", money: "Geld", time: "Zeit", food: "Essen", milk: "Milch" },
    lv9: { mountain: "Berg", river: "Fluss", forest: "Wald", ocean: "Ozean", island: "Insel" },
    lv10: { freedom: "Freiheit", peace: "Frieden", heart: "Herz", blood: "Blut", truth: "Wahrheit" }
  },
  it: {
    lv1: { hello: "Ciao", thanks: "Grazie", yes: "Si", no: "No", bye: "Addio" },
    lv2: { red: "Rosso", blue: "Blu", green: "Verde", white: "Bianco", black: "Nero" },
    lv3: { one: "Uno", two: "Due", three: "Tre", four: "Quattro", five: "Cinque" },
    lv4: { water: "Acqua", fire: "Fuoco", earth: "Terra", air: "Aria", sun: "Sole" },
    lv5: { man: "Uomo", woman: "Donna", boy: "Ragazzo", girl: "Ragazza", friend: "Amico" },
    lv6: { house: "Casa", city: "Citta", street: "Strada", car: "Auto", door: "Porta" },
    lv7: { table: "Tavolo", chair: "Sedia", bed: "Letto", window: "Finestra", key: "Chiave" },
    lv8: { work: "Lavoro", money: "Soldi", time: "Tempo", food: "Cibo", milk: "Latte" },
    lv9: { mountain: "Montagna", river: "Fiume", forest: "Foresta", ocean: "Oceano", island: "Isola" },
    lv10: { freedom: "Liberta", peace: "Pace", heart: "Cuore", blood: "Sangue", truth: "Verita" }
  },
  pt: {
    lv1: { hello: "Ola", thanks: "Obrigado", yes: "Sim", no: "Nao", bye: "Tchau" },
    lv2: { red: "Vermelho", blue: "Azul", green: "Verde", white: "Branco", black: "Preto" },
    lv3: { one: "Um", two: "Dois", three: "Tres", four: "Quatro", five: "Cinco" },
    lv4: { water: "Agua", fire: "Fogo", earth: "Terra", air: "Ar", sun: "Sol" },
    lv5: { man: "Homem", woman: "Mulher", boy: "Menino", girl: "Menina", friend: "Amigo" },
    lv6: { house: "Casa", city: "Cidade", street: "Rua", car: "Carro", door: "Porta" },
    lv7: { table: "Mesa", chair: "Cadeira", bed: "Cama", window: "Janela", key: "Chave" },
    lv8: { work: "Trabalho", money: "Dinheiro", time: "Tempo", food: "Comida", milk: "Leite" },
    lv9: { mountain: "Montanha", river: "Rio", forest: "Floresta", ocean: "Oceano", island: "Ilha" },
    lv10: { freedom: "Liberdade", peace: "Paz", heart: "Coracao", blood: "Sangue", truth: "Verdade" }
  },
  jp: {
    lv1: { hello: "Konnichiwa", thanks: "Arigato", yes: "Hai", no: "Iie", bye: "Sayonara" },
    lv2: { red: "Aka", blue: "Ao", green: "Midori", white: "Shiro", black: "Kuro" },
    lv3: { one: "Ichi", two: "Ni", three: "San", four: "Yon", five: "Go" },
    lv4: { water: "Mizu", fire: "Hi", earth: "Tsuchi", air: "Kaze", sun: "Taiyo" },
    lv5: { man: "Otoko", woman: "Onna", boy: "Otokonoko", girl: "Onnanoko", friend: "Tomodachi" },
    lv6: { house: "Ie", city: "Machi", street: "Tori", car: "Kuruma", door: "To" },
    lv7: { table: "Teburu", chair: "Isu", bed: "Beddo", window: "Mado", key: "Kagi" },
    lv8: { work: "Shigoto", money: "Kane", time: "Toki", food: "Tabemono", milk: "Gyuyu" },
    lv9: { mountain: "Yama", river: "Kawa", forest: "Mori", ocean: "Umi", island: "Shima" },
    lv10: { freedom: "Jiyu", peace: "Heiwa", heart: "Kokoro", blood: "Chi", truth: "Shinjitsu" }
  },
  nl: {
    lv1: { hello: "Hallo", thanks: "Bedankt", yes: "Ja", no: "Nee", bye: "Doei" },
    lv2: { red: "Rood", blue: "Blauw", green: "Groen", white: "Wit", black: "Zwart" },
    lv3: { one: "Een", two: "Twee", three: "Drie", four: "Vier", five: "Vijf" },
    lv4: { water: "Water", fire: "Vuur", earth: "Aarde", air: "Lucht", sun: "Zon" },
    lv5: { man: "Man", woman: "Vrouw", boy: "Jongen", girl: "Meisje", friend: "Vriend" },
    lv6: { house: "Huis", city: "Stad", street: "Straat", car: "Auto", door: "Deur" },
    lv7: { table: "Tafel", chair: "Stoel", bed: "Bed", window: "Raam", key: "Sleutel" },
    lv8: { work: "Werk", money: "Geld", time: "Tijd", food: "Eten", milk: "Melk" },
    lv9: { mountain: "Berg", river: "Rivier", forest: "Bos", ocean: "Oceaan", island: "Eiland" },
    lv10: { freedom: "Vrijheid", peace: "Vrede", heart: "Hart", blood: "Bloed", truth: "Waarheid" }
  }
};

const LANGUAGES = [
  { id: 'es', name: 'Spanish', flag: '🇪🇸' }, { id: 'ru', name: 'Russian', flag: '🇷🇺' },
  { id: 'fr', name: 'French', flag: '🇫🇷' }, { id: 'de', name: 'German', flag: '🇩🇪' },
  { id: 'it', name: 'Italian', flag: '🇮🇹' }, { id: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { id: 'jp', name: 'Japanese', flag: '🇯🇵' }, { id: 'nl', name: 'Dutch', flag: '🇳🇱' },
];

const QUEST_STAGES = [
  { id: 1, title: 'PHASE 01: FRONTIER', xpReq: 0, lv: 'lv1', keys: ['hello', 'thanks', 'yes', 'no'] },
  { id: 2, title: 'PHASE 02: SPECTRUM', xpReq: 100, lv: 'lv2', keys: ['red', 'blue', 'green', 'white'] },
  { id: 3, title: 'PHASE 03: NUMERAL', xpReq: 250, lv: 'lv3', keys: ['one', 'two', 'three', 'four'] },
  { id: 4, title: 'PHASE 04: ELEMENT', xpReq: 450, lv: 'lv4', keys: ['water', 'fire', 'earth', 'sun'] },
  { id: 5, title: 'PHASE 05: KINSHIP', xpReq: 700, lv: 'lv5', keys: ['man', 'woman', 'friend', 'boy'] },
  { id: 6, title: 'PHASE 06: HABITAT', xpReq: 1000, lv: 'lv6', keys: ['house', 'city', 'street', 'door'] },
  { id: 7, title: 'PHASE 07: UTILITY', xpReq: 1400, lv: 'lv7', keys: ['table', 'chair', 'window', 'key'] },
  { id: 8, title: 'PHASE 08: ECONOMY', xpReq: 1900, lv: 'lv8', keys: ['work', 'money', 'time', 'food'] },
  { id: 9, title: 'PHASE 09: WILDERNESS', xpReq: 2500, lv: 'lv9', keys: ['mountain', 'river', 'forest', 'island'] },
  { id: 10, title: 'PHASE 10: SINGULARITY', xpReq: 3200, lv: 'lv10', keys: ['freedom', 'peace', 'heart', 'truth'] },
];

const INITIAL_LEADERBOARD = [
  { name: 'X_Strike', xp: 8500, rank: 1 },
  { name: 'Neo_Lang', xp: 6200, rank: 2 },
  { name: 'Cipher_01', xp: 4800, rank: 3 },
];

const shuffle = (array) => {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const ArmorIntegrity = ({ integrity }) => (
  <div className="flex gap-1.5 items-center">
    <span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter mr-2">Shield Integrity</span>
    <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
        <div key={i} className={`h-4 w-2 rounded-sm transition-all duration-500 ${i < integrity ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-slate-800'}`} />
        ))}
    </div>
  </div>
);

// --- GAME: LINGO ASSEMBLER ---
const LingoAssembler = ({ language, onUpdateXP, onExit, currentTotalXp }) => {
  const [shield, setShield] = useState(5);
  const [level, setLevel] = useState(1); 
  const [current, setCurrent] = useState(null);
  const [assembled, setAssembled] = useState("");
  const [letters, setLetters] = useState([]);
  const [shaking, setShaking] = useState(false);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  
  const vocabLevels = useMemo(() => VOCAB_DATABASE[language.id] || VOCAB_DATABASE.es, [language.id]);
  const deckRef = useRef({});

  const spawn = useCallback((forceLevel) => {
    const targetLv = forceLevel || Math.min(10, Math.floor(wordsCompleted / 4) + 1);
    setLevel(targetLv);

    const targetLevelKey = `lv${targetLv}`;
    if (!deckRef.current[targetLevelKey] || deckRef.current[targetLevelKey].length === 0) {
      deckRef.current[targetLevelKey] = shuffle(Object.keys(vocabLevels[targetLevelKey]));
    }
    
    const key = deckRef.current[targetLevelKey].pop();
    if (!key) { onExit(); return; }

    const correct = vocabLevels[targetLevelKey][key].toLowerCase();
    const chars = correct.split("");
    const decoys = "abcdefghijklmnopqrstuvwxyz".split("").filter(l => !chars.includes(l)).sort(() => 0.5 - Math.random()).slice(0, 4);
    
    setCurrent({ key, translation: correct });
    setAssembled("");
    setLetters(shuffle([...chars, ...decoys]).map((char, i) => ({ char, id: i, used: false })));
  }, [vocabLevels, wordsCompleted, onExit]);

  useEffect(() => { spawn(); }, []); 

  useEffect(() => { if (shield <= 0) onExit(); }, [shield, onExit]);

  const onLetter = useCallback((letterObj) => {
    if (letterObj.used || shield <= 0 || !current) return;
    const nextCharIndex = assembled.length;
    const nextCharNeeded = current.translation[nextCharIndex];
    
    if (letterObj.char === nextCharNeeded) {
      const newAssembled = assembled + letterObj.char;
      setAssembled(newAssembled);
      setLetters(prev => prev.map(l => l.id === letterObj.id ? { ...l, used: true } : l));
      
      if (newAssembled === current.translation) {
        onUpdateXP(20); 
        setWordsCompleted(prev => {
            const nextCount = prev + 1;
            setTimeout(() => spawn(Math.min(10, Math.floor(nextCount / 4) + 1)), 400);
            return nextCount;
        });
      }
    } else {
      setShield(s => Math.max(0, s - 1));
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
    }
  }, [assembled, current, shield, onUpdateXP, spawn]);

  const useHint = () => {
    if (!current || assembled.length >= current.translation.length || currentTotalXp < 10) return;
    const nextCharIndex = assembled.length;
    const nextCharNeeded = current.translation[nextCharIndex];
    const targetTile = letters.find(l => l.char === nextCharNeeded && !l.used);
    if (targetTile) {
      onUpdateXP(-10);
      onLetter(targetTile);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center p-4 transition-all duration-300 ${shaking ? 'bg-red-950/20' : ''}`}>
      <div className="w-full max-w-4xl flex justify-between items-center bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl shadow-2xl relative z-10 mt-2">
        <div className="flex items-center gap-6">
          <button onClick={onExit} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 active:scale-90 transition-all"><Icon name="arrowLeft" size={16} className="text-blue-400"/></button>
          <ArmorIntegrity integrity={shield} />
        </div>
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-blue-600/10 px-3 py-1.5 rounded-lg border border-blue-600/30">
                <Icon name="monitor" size={14} className="text-blue-400 animate-pulse" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none">LV.{level} MISSION</span>
            </div>
            <div className="text-right">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Total System XP</p>
                <h3 className="text-xl font-black text-white leading-none tabular-nums">{currentTotalXp}</h3>
            </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl flex flex-col items-center justify-center relative z-10 text-center">
        <div className="mb-8 w-full px-4">
          <p className="text-blue-500/50 text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-2"><Icon name="terminal" size={12}/> DATA_RECON_ACTIVE</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter capitalize mb-10">{current?.key}</h2>
          <div className="flex gap-2 justify-center flex-wrap mb-10">
            {current?.translation.split('').map((char, i) => (
              <div key={i} className={`w-10 h-14 bg-slate-900/50 rounded-xl border-b-2 flex items-center justify-center text-3xl font-black uppercase transition-all duration-300 ${i < assembled.length ? 'border-blue-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.3)] bg-blue-500/10' : 'border-white/5 text-transparent'}`}>
                {assembled[i] || ""}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-7 gap-2 p-6 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-inner">
          {letters.map((letter) => (
            <button key={letter.id} disabled={letter.used || shield === 0} onClick={() => onLetter(letter)}
              className={`w-11 h-12 rounded-lg flex items-center justify-center text-lg font-black uppercase transition-all duration-200 border ${letter.used ? 'bg-transparent border-white/5 opacity-0 cursor-not-allowed scale-75' : 'bg-slate-800 border-white/10 text-white hover:bg-blue-600 hover:border-blue-400 active:scale-75'}`}
            >{letter.char}</button>
          ))}
        </div>
        <div className="mt-12 flex gap-4 items-center">
           <button onClick={() => {setAssembled(""); setLetters(l => l.map(x => ({...x, used: false})))}} className="flex items-center gap-2 text-slate-500 hover:text-white font-black text-[9px] uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl border border-white/10 transition-all hover:bg-white/10"><Icon name="eraser" size={14} /> Clear Buffer</button>
           <button onClick={useHint} className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-black text-[9px] uppercase tracking-widest bg-yellow-500/5 px-6 py-3 rounded-2xl border border-yellow-500/20 transition-all hover:bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]"><Icon name="lightbulb" size={14} /> HINT (-10 XP)</button>
        </div>
      </div>
    </div>
  );
};

// --- QUEST: HOLOGRAPHIC MCQ ---
const QuestScreen = ({ quest, language, onUpdateXP, onExit, currentTotalXp }) => {
  const [step, setStep] = useState(0);
  const [shield, setShield] = useState(5);
  const [isCorrect, setIsCorrect] = useState(null); 
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  
  const vocab = useMemo(() => (VOCAB_DATABASE[language.id] || VOCAB_DATABASE.es)[quest.lv], [language.id, quest.lv]);
  const questions = useMemo(() => {
    return quest.keys.map(key => {
      const correct = vocab[key];
      const otherPool = Object.values(vocab).filter(v => v !== correct);
      const decoys = shuffle(otherPool).slice(0, 3);
      return { key, options: shuffle([correct, ...decoys]), correct };
    });
  }, [quest, vocab]);

  useEffect(() => { if (shield <= 0) onExit(); }, [shield, onExit]);

  const handleChoice = (opt) => {
    if (isCorrect || shield <= 0 || eliminatedOptions.includes(opt)) return;
    if (opt === questions[step].correct) {
      setIsCorrect(true);
      onUpdateXP(20); 
      setTimeout(() => {
        if (step < questions.length - 1) {
          setStep(prev => prev + 1);
          setIsCorrect(null);
          setEliminatedOptions([]);
        } else {
          onExit(); 
        }
      }, 500);
    } else {
      setShield(s => Math.max(0, s - 1));
      setEliminatedOptions(prev => [...prev, opt]);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col text-white overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border-b border-white/5 relative z-10">
        <div className="flex items-center gap-6">
           <button onClick={onExit} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 active:scale-90 transition-all"><Icon name="arrowLeft" size={16}/></button>
           <ArmorIntegrity integrity={shield} />
        </div>
        <div className="text-right">
            <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest block mb-1">Mission Total XP</span>
            <span className="text-2xl font-black tabular-nums">{currentTotalXp}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
        <h3 className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 opacity-50">OBJECTIVE {step + 1} / {questions.length}</h3>
        <h2 className="text-6xl lg:text-7xl font-black mb-12 tracking-tighter capitalize drop-shadow-2xl">{questions[step].key}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl px-4">
          {questions[step].options.map((opt, i) => {
            const isEliminated = eliminatedOptions.includes(opt);
            const isRight = isCorrect && opt === questions[step].correct;
            return (
              <button key={i} disabled={isEliminated || isCorrect} onClick={() => handleChoice(opt)}
                className={`p-6 rounded-2xl border-2 font-black text-xl transition-all duration-200 ${isRight ? 'bg-green-600 border-green-400 scale-105 shadow-lg' : isEliminated ? 'bg-slate-900 border-white/5 text-slate-700 line-through opacity-30 cursor-not-allowed scale-95' : 'bg-slate-900/40 border-white/10 hover:border-blue-500 hover:bg-slate-900'}`}
              >{opt}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState({ name: 'Operative', xp: 0, streak: 0, lang: 'es' });
  const [activeQuest, setActiveQuest] = useState(null);
  const [showGame, setShowGame] = useState(false);

  const language = useMemo(() => LANGUAGES.find(l => l.id === user.lang) || LANGUAGES[0], [user.lang]);

  const updateXP = useCallback((delta) => {
    setUser(u => ({ ...u, xp: Math.max(0, u.xp + delta) }));
  }, []);

  const changeLanguage = (id) => {
    setUser(u => ({ ...u, lang: id }));
    setView('dashboard');
  };

  const leaderboard = useMemo(() => {
    const list = [...INITIAL_LEADERBOARD, { name: 'You', xp: user.xp, isUser: true }];
    return list.sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [user.xp]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[length:30px:30px]" />
      </div>

      {view !== 'landing' && (
        <aside className="fixed left-0 top-0 bottom-0 w-20 lg:w-56 bg-slate-900/80 backdrop-blur-3xl border-r border-white/5 flex flex-col p-3 z-50 shadow-2xl">
          <div className="flex items-center gap-2 mb-10 justify-center lg:justify-start px-2 cursor-pointer mt-2" onClick={() => setView('landing')}>
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-xl shadow-blue-600/40"><Icon name="radio" size={18} /></div>
            <span className="hidden lg:block font-black text-xl tracking-tighter text-blue-500 uppercase">Linguist</span>
          </div>
          <nav className="flex-1 flex flex-col gap-2">
            {[
              { id: 'dashboard', icon: 'layout', label: 'Headquarters' },
              { id: 'leaderboard', icon: 'trophy', label: 'War Room' },
              { id: 'explore', icon: 'globe', label: 'Gate Portal' }
            ].map(item => (
              <button key={item.id} onClick={() => setView(item.id)}
                className={`p-4 lg:p-4 rounded-xl flex items-center gap-4 transition-all duration-200 relative group ${view === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5'}`}
              >
                <Icon name={item.icon} size={18} />
                <span className="hidden lg:block font-black text-[9px] uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>
      )}

      <main className={`${view !== 'landing' ? 'pl-20 lg:pl-56' : ''} relative z-10`}>
        {view === 'landing' && (
          <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-950 px-8 relative overflow-hidden">
            <div className="mb-6 p-6 bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] text-blue-500 shadow-2xl border border-white/10 animate-bounce-slow"><Icon name="rocket" size={48} className="drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" /></div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-4 leading-[0.8] uppercase text-white text-center">Word<br/><span className="text-blue-600">Legend</span></h1>
            <p className="text-sm lg:text-base text-slate-400 mb-10 max-w-sm mx-auto font-black uppercase tracking-widest text-center">Synced System XP. 10 Levels of Deployment.</p>
            <button onClick={() => setView('explore')} className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-base uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Initialize Core</button>
          </div>
        )}

        {view === 'explore' && (
          <div className="p-6 lg:p-12 max-w-6xl mx-auto">
            <div className="mb-10">
               <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] mb-2">Galaxy Map</h2>
               <h1 className="text-3xl font-black tracking-tight uppercase">SELECT REALM</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 text-center">
              {LANGUAGES.map(l => (
                <button key={l.id} onClick={() => changeLanguage(l.id)}
                  className={`group p-6 bg-slate-900/40 backdrop-blur-xl rounded-2xl border-2 transition-all ${user.lang === l.id ? 'border-blue-600 bg-blue-600/5' : 'border-white/5 hover:border-white/20'}`}
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{l.flag}</div>
                  <div className="font-black text-[10px] text-white uppercase tracking-widest">{l.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="p-6 lg:p-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-10">
              <div className="bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/10 group">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 bg-blue-500/20 w-fit px-4 py-1 rounded-full border border-blue-500/30">
                    <span className="text-xl">{language.flag}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-400">{language.name} Ops</span>
                  </div>
                  <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">MISSION<br/>STATION</h2>
                  <div className="flex gap-4">
                    <button onClick={() => setShowGame(true)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-500 hover:scale-105 transition-all shadow-xl">
                      <Icon name="zap" size={16} className="fill-current" /> Initiate Blitz
                    </button>
                  </div>
                </div>
                <Icon name="cpu" size={300} className="absolute right-0 bottom-0 opacity-5 m-6 rotate-12 group-hover:scale-125 transition-transform duration-1000" />
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2 px-1">Campaign Objectives</h3>
                <div className="grid gap-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                  {QUEST_STAGES.map((quest) => {
                    const isUnlocked = user.xp >= quest.xpReq;
                    return (
                      <button key={quest.id} onClick={() => isUnlocked && setActiveQuest(quest)}
                        className={`group p-5 bg-slate-900/40 backdrop-blur-xl rounded-2xl border-2 text-left flex items-center gap-6 transition-all ${isUnlocked ? 'border-white/5 hover:border-blue-600' : 'opacity-20 grayscale border-transparent pointer-events-none'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl ${isUnlocked ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}>{quest.id}</div>
                        <div className="flex-1">
                          <h4 className="font-black text-white text-sm mb-1 uppercase tracking-tight">{quest.title}</h4>
                          <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">{isUnlocked ? 'MISSION READY' : `SYSTEM REQ: ${quest.xpReq} XP`}</p>
                        </div>
                        {isUnlocked ? <Icon name="chevronRight" size={20} className="text-blue-500" /> : <Icon name="shield" size={18} className="text-slate-800"/>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <h3 className="font-black text-[10px] mb-6 uppercase tracking-[0.4em] text-blue-500 text-center">BIOMETRICS</h3>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="bg-slate-950/80 p-5 rounded-2xl text-center border border-white/5">
                    <Icon name="flame" size={24} className="mx-auto text-orange-500 mb-1 fill-current"/>
                    <div className="text-3xl font-black text-white">{user.streak}</div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">CYCLE STREAK</div>
                  </div>
                  <div className="bg-slate-950/80 p-5 rounded-2xl text-center border border-white/5">
                    <Icon name="target" size={24} className="mx-auto text-blue-500 mb-1"/>
                    <div className="text-3xl font-black text-white">{user.xp}</div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">SYSTEM TOTAL XP</div>
                  </div>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-2xl text-center shadow-xl relative overflow-hidden group">
                    <div className="relative z-10 text-center">
                        <div className="text-[9px] font-black text-blue-200 uppercase tracking-widest mb-1">ARENA STANDING</div>
                        <div className="text-5xl font-black flex items-center justify-center gap-2">
                            <span>#{leaderboard.find(p => p.isUser)?.rank || '??'}</span>
                            <Icon name="award" size={32} className="text-white animate-pulse" />
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {view === 'leaderboard' && (
          <div className="p-8 lg:p-12 max-w-4xl mx-auto">
             <div className="text-center mb-10">
               <Icon name="trophy" size={60} className="mx-auto text-white mb-4 shadow-xl" />
               <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-2 text-center">WAR ROOM</h2>
               <p className="text-blue-500 text-[9px] font-black tracking-widest uppercase text-center">Elite Combat Division</p>
             </div>
             <div className="bg-slate-900/60 backdrop-blur-3xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
               {leaderboard.map((p, i) => (
                 <div key={i} className={`flex items-center p-6 border-b border-white/5 last:border-0 transition-all ${p.isUser ? 'bg-blue-600 text-white z-10 relative' : 'hover:bg-white/5'}`}>
                   <div className={`w-12 text-4xl font-black ${p.isUser ? 'text-white' : 'text-slate-700'}`}>#{p.rank}</div>
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black mr-8 ${p.isUser ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>{p.name[0]}</div>
                   <div className="flex-1 font-black text-xl tracking-tight uppercase">{p.name}</div>
                   <div className="text-3xl font-black flex items-baseline gap-2">
                     {p.xp} <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">XP</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </main>

      {/* Logic Overlays */}
      {showGame && <LingoAssembler language={language} onExit={() => setShowGame(false)} onUpdateXP={updateXP} currentTotalXp={user.xp} />}
      {activeQuest && <QuestScreen quest={activeQuest} language={language} onExit={() => setActiveQuest(null)} onUpdateXP={updateXP} currentTotalXp={user.xp} />}
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130,246, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}