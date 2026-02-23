/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  BookOpen, 
  Zap, 
  Calendar, 
  ChevronLeft, 
  Globe, 
  MapPin, 
  User, 
  Users, 
  Home, 
  Briefcase, 
  Clock,
  Heart,
  Smile,
  Star,
  Flame,
  Coffee,
  Frown,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Bell,
  Calculator,
  BarChart3
} from 'lucide-react';
import { MenuButton, SubMenuButton, Character } from './components/UI';

type Screen = 'home' | 'diagnostico' | 'clase' | 'refuerzo' | 'horario';
type DiagnosticoSub = 'root' | 'online' | 'presencial';
type RefuerzoSub = 'root' | 'sick' | 'lazy' | 'couldnt' | 'notmyself';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [diagSub, setDiagSub] = useState<DiagnosticoSub>('root');
  const [refSub, setRefSub] = useState<RefuerzoSub>('root');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showLoyaltyMsg, setShowLoyaltyMsg] = useState(false);

  // Navigation helper
  const goBack = () => {
    if (currentScreen === 'home') return;
    if (currentScreen === 'diagnostico' && diagSub !== 'root') {
      setDiagSub('root');
    } else if (currentScreen === 'refuerzo' && refSub !== 'root') {
      setRefSub('root');
    } else if (currentScreen === 'clase' && selectedLevel) {
      setSelectedLevel(null);
    } else {
      setCurrentScreen('home');
    }
  };

  const renderHeader = (title?: string) => (
    <div className="flex items-center gap-4 mb-8">
      {currentScreen !== 'home' && (
        <button onClick={goBack} className="p-2 rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors">
          <ChevronLeft size={20} />
        </button>
      )}
      <div className="flex-1">
        <h1 className="font-display font-bold text-2xl text-slate-900">
          {title || "Got It"}
        </h1>
      </div>
      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 overflow-hidden">
        <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
      </div>
    </div>
  );

  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-4xl font-display font-bold tracking-tight text-slate-900">Hey! What’s up?</h2>
        <p className="text-lg text-slate-500 font-medium">What can we do for you today?</p>
      </div>

      <div className="grid gap-4">
        <MenuButton 
          title="Programar diagnóstico" 
          icon={ClipboardCheck} 
          colorClass="gradient-blue" 
          characterType="studious"
          onClick={() => setCurrentScreen('diagnostico')} 
        />
        <MenuButton 
          title="Programar clase" 
          icon={BookOpen} 
          colorClass="gradient-red" 
          characterType="happy"
          onClick={() => setCurrentScreen('clase')} 
        />
        <MenuButton 
          title="Programar refuerzo" 
          icon={Zap} 
          colorClass="gradient-yellow" 
          characterType="cool"
          onClick={() => setCurrentScreen('refuerzo')} 
        />
        <MenuButton 
          title="Descargar mi horario" 
          icon={Calendar} 
          colorClass="gradient-green" 
          characterType="studious"
          onClick={() => setCurrentScreen('horario')} 
        />
      </div>

      <div className="pt-4">
        <div className="p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-display font-bold text-xl mb-2">Keep it up!</h3>
            <p className="text-slate-400 text-sm">You've completed 85% of your weekly goal.</p>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <TrendingUp size={80} />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderDiagnostico = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {renderHeader("Diagnóstico")}
      
      {diagSub === 'root' && (
        <div className="space-y-4">
          <SubMenuButton title="Agendar diagnóstico online" onClick={() => setDiagSub('online')} colorClass="bg-blue-50" />
          <SubMenuButton title="Agendar diagnóstico presencial" onClick={() => setDiagSub('presencial')} colorClass="bg-blue-50" />
        </div>
      )}

      {diagSub === 'online' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Globe size={20} />
            <span className="font-bold">Online Options</span>
          </div>
          <SubMenuButton title="Programar diagnóstico con un docente" onClick={() => {}} />
          <SubMenuButton title="Generar diagnóstico independiente" onClick={() => {}} />
        </div>
      )}

      {diagSub === 'presencial' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <MapPin size={20} />
            <span className="font-bold">Presencial Options</span>
          </div>
          <SubMenuButton title="Quiero un docente que venga a mi casa" onClick={() => {}} />
          <SubMenuButton title="Quiero encontrarme con un docente en un espacio público" onClick={() => {}} />
          <SubMenuButton title="Quiero que un docente venga a mi universidad/trabajo" onClick={() => {}} />
        </div>
      )}
    </motion.div>
  );

  const renderClase = () => {
    const levels = [
      { id: 'first', title: 'Es mi primera clase. Please be free!', msg: 'Welcome to the family! Let\'s start this journey together.', durations: ['30 min', '45 min', '60 min', '90 min', '110 min'], icon: Smile },
      { id: 'liked', title: 'I liked it! (2nd clase)', msg: 'We knew you would! Ready for more?', durations: ['30 min', '45 min', '60 min', '90 min', '110 min'], icon: Heart },
      { id: 'enjoy', title: 'I enjoy this!', msg: 'The best way to learn is having fun!', durations: ['45 min', '60 min', '90 min'], icon: Star },
      { id: 'fun', title: 'This is fun!', msg: 'You\'re getting better every day!', durations: ['45 min', '60 min', '90 min'], icon: Zap },
      { id: 'need', title: 'I need more! (30 días)', msg: 'Consistency is key. You\'re doing great!', durations: ['45 min', '60 min', '90 min'], icon: Flame },
      { id: 'love', title: 'I love it! (90 días)', msg: 'You\'re a pro now! We love having you.', durations: ['45 min', '60 min', '90 min'], icon: Heart },
      { id: 'crazy', title: 'Crazy in love! (180 días)', msg: 'Unstoppable! You\'ve earned your place.', durations: ['45 min', '60 min', '90 min'], icon: Flame, loyalty: true },
    ];

    const currentLevel = levels.find(l => l.id === selectedLevel);

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {renderHeader("Programar Clase")}

        {!selectedLevel ? (
          <div className="space-y-3">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => {
                  setSelectedLevel(level.id);
                  if (level.loyalty) setShowLoyaltyMsg(true);
                }}
                className="w-full p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <level.icon size={20} />
                </div>
                <span className="font-bold text-slate-700 flex-1">{level.title}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-red-50 border border-red-100 text-center space-y-4">
              <Character type="happy" className="mx-auto" />
              <h3 className="font-display font-bold text-xl text-red-600">{currentLevel?.title}</h3>
              <p className="text-red-500 font-medium italic">"{currentLevel?.msg}"</p>
              {currentLevel?.loyalty && (
                <div className="bg-red-500 text-white p-3 rounded-xl text-sm font-bold animate-bounce">
                  🎁 ¡Recibes 2 clases gratis por tu fidelidad!
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Clock size={18} /> Selecciona la duración:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {currentLevel?.durations.map((d) => (
                  <button key={d} className="p-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderRefuerzo = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 pb-12"
    >
      {renderHeader("Refuerzo")}

      {refSub === 'root' && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'sick', title: 'Sick Day', char: 'sick', color: 'bg-slate-100' },
            { id: 'lazy', title: 'Lazy Day', char: 'lazy', color: 'bg-amber-50' },
            { id: 'couldnt', title: 'Couldn’t make it', char: 'sad', color: 'bg-blue-50' },
            { id: 'notmyself', title: 'I was not myself', char: 'sad', color: 'bg-red-50' },
            { id: 'understand', title: 'I need to understand better', char: 'studious', color: 'bg-green-50' },
            { id: 'test', title: 'I have a test', char: 'cool', color: 'bg-indigo-50' },
            { id: 'homework', title: 'I have homework', char: 'studious', color: 'bg-purple-50' },
            { id: 'workshop', title: 'My workshop is due', char: 'cool', color: 'bg-pink-50' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setRefSub(opt.id as RefuerzoSub)}
              className={`p-6 rounded-3xl ${opt.color} flex flex-col items-center gap-3 hover:shadow-md transition-all active:scale-95`}
            >
              <Character type={opt.char as any} />
              <span className="font-bold text-slate-700 text-center text-sm leading-tight">{opt.title}</span>
            </button>
          ))}
        </div>
      )}

      {refSub === 'sick' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4">
            <Character type="sick" className="mx-auto" />
            <h3 className="font-display font-bold text-2xl">We got you!</h3>
            <p className="text-slate-400">Esperamos que estés mejor.</p>
          </div>
          <div className="space-y-3">
            <SubMenuButton title="Recuperar clase perdida" onClick={() => {}} />
            <SubMenuButton title="Recuperar clase + refuerzo" onClick={() => {}} />
            <SubMenuButton title="Perdí dos clases" onClick={() => {}} />
            <SubMenuButton title="Dos clases + refuerzo" onClick={() => {}} />
            <SubMenuButton title="Perdí más de dos clases" onClick={() => {}} />
          </div>
        </div>
      )}

      {refSub === 'lazy' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-amber-50 border border-amber-100 text-center space-y-4">
            <Character type="lazy" className="mx-auto" />
            <h3 className="font-display font-bold text-2xl text-amber-700">Take it easy!</h3>
            <p className="text-amber-600 italic">"It's okay to have slow days. Let's adjust."</p>
          </div>
          <div className="space-y-3">
            <SubMenuButton title="Reponer lección anterior" onClick={() => {}} />
            <SubMenuButton title="Adelantar futura lección" onClick={() => {}} />
            <SubMenuButton title="Hoy quiero estudiar" onClick={() => {}} />
          </div>
        </div>
      )}

      {refSub === 'couldnt' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 text-center space-y-4">
            <Character type="sad" className="mx-auto" />
            <h3 className="font-display font-bold text-2xl text-blue-700">No worries!</h3>
            <p className="text-blue-600">"Life happens. Let's find another time."</p>
          </div>
          <div className="space-y-3">
            <SubMenuButton title="Cambiar a la mañana" onClick={() => {}} />
            <SubMenuButton title="Cambiar a la tarde" onClick={() => {}} />
            <SubMenuButton title="Tomarla otro día" onClick={() => {}} />
            <SubMenuButton title="Dejarla para mañana" onClick={() => {}} />
          </div>
        </div>
      )}

      {refSub === 'notmyself' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-red-50 border border-red-100 text-center space-y-4">
            <Character type="sad" className="mx-auto" />
            <h3 className="font-display font-bold text-2xl text-red-700">We are here for you</h3>
            <p className="text-red-600 italic">"Your well-being comes first. How can we help?"</p>
          </div>
          <div className="space-y-3">
            <SubMenuButton title="Quiero hablar" onClick={() => {}} />
            <SubMenuButton title="Recuperar clase" onClick={() => {}} />
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderHorario = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {renderHeader("Mi Horario")}

      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-emerald-900">Weekly Progress</h3>
            <p className="text-emerald-700 text-sm">You're doing amazing!</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent flex items-center justify-center font-bold text-emerald-700">
            85%
          </div>
        </div>
        
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <div key={d} className={`flex-1 h-2 rounded-full ${d < 6 ? 'bg-emerald-500' : 'bg-emerald-200'}`} />
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        <button className="w-full p-5 rounded-2xl bg-white border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
            <Bell size={20} />
          </div>
          <span className="font-bold text-slate-700 flex-1 text-left">Envíame notificaciones</span>
        </button>
        <button className="w-full p-5 rounded-2xl bg-white border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
            <Calculator size={20} />
          </div>
          <span className="font-bold text-slate-700 flex-1 text-left">Calcular mi tiempo de estudio</span>
        </button>
        <button className="w-full p-5 rounded-2xl bg-white border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
            <TrendingUp size={20} />
          </div>
          <span className="font-bold text-slate-700 flex-1 text-left">Calcular mi tiempo de estudio extra</span>
        </button>
        <button className="w-full p-5 rounded-2xl bg-white border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
            <BarChart3 size={20} />
          </div>
          <span className="font-bold text-slate-700 flex-1 text-left">Calcular mi progreso a futuro</span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {/* Top Branding Bar */}
        <div className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
              GI
            </div>
            <span className="font-display font-bold text-slate-900 tracking-tight">Got It First</span>
          </div>
          <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Colombia</div>
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentScreen === 'home' && renderHome()}
            {currentScreen === 'diagnostico' && renderDiagnostico()}
            {currentScreen === 'clase' && renderClase()}
            {currentScreen === 'refuerzo' && renderRefuerzo()}
            {currentScreen === 'horario' && renderHorario()}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation (Floating) */}
        <div className="p-6 pt-0">
          <nav className="bg-slate-900 rounded-3xl p-2 flex items-center justify-around shadow-lg">
            <button 
              onClick={() => setCurrentScreen('home')}
              className={`p-3 rounded-2xl transition-all ${currentScreen === 'home' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
              <Home size={20} />
            </button>
            <button 
              onClick={() => setCurrentScreen('clase')}
              className={`p-3 rounded-2xl transition-all ${currentScreen === 'clase' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <BookOpen size={20} />
            </button>
            <button 
              onClick={() => setCurrentScreen('refuerzo')}
              className={`p-3 rounded-2xl transition-all ${currentScreen === 'refuerzo' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Zap size={20} />
            </button>
            <button 
              onClick={() => setCurrentScreen('horario')}
              className={`p-3 rounded-2xl transition-all ${currentScreen === 'horario' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Calendar size={20} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
