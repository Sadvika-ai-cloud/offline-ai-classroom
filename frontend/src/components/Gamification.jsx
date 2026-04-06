import React from 'react';
import { Target, Zap, Award, Flame } from 'lucide-react';

export default function Gamification() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Progress</h1>
        <p className="text-slate-500 mt-2">Track your learning journey totally offline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-[-10%] top-[-10%] opacity-20 transform rotate-12 mix-blend-overlay">
            <Zap size={120} />
          </div>
          <div className="relative z-10">
            <div className="bg-white/20 w-max p-2 rounded-xl mb-4">
              <Zap size={24} />
            </div>
            <p className="text-indigo-100 font-medium">Questions Asked</p>
            <h2 className="text-4xl font-bold mt-1">124</h2>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-[-10%] top-[-10%] opacity-20 transform -rotate-12 mix-blend-overlay">
            <Award size={120} />
          </div>
          <div className="relative z-10">
            <div className="bg-white/20 w-max p-2 rounded-xl mb-4">
              <Award size={24} />
            </div>
            <p className="text-purple-100 font-medium">Quizzes Passed</p>
            <h2 className="text-4xl font-bold mt-1">42</h2>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-[-10%] top-[-10%] opacity-20 transform rotate-12 mix-blend-overlay">
            <Flame size={120} />
          </div>
          <div className="relative z-10">
            <div className="bg-white/20 w-max p-2 rounded-xl mb-4">
              <Flame size={24} />
            </div>
            <p className="text-emerald-50 font-medium">Current Streak</p>
            <h2 className="text-4xl font-bold mt-1">8 Days</h2>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-white/50">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Award className="text-orange-500" />
          Earned Badges
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-3">
              <Target size={32} />
            </div>
            <h4 className="font-bold text-slate-700 text-sm">Physics Pro</h4>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">10/10 Quiz</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-2xl opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
            <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-3">
              <Award size={32} />
            </div>
            <h4 className="font-bold text-slate-700 text-sm">Math Wizard</h4>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Locked</p>
          </div>
        </div>
      </div>
    </div>
  );
}
