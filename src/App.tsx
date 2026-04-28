/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Flame, 
  Trophy, 
  ArrowRight, 
  Verified, 
  MessageCircle, 
  Camera, 
  Star,
  Droplet,
  Check,
  Users,
  Share2
} from 'lucide-react';
import { AppHeader, BottomNav } from './components/Navigation';
import { PROJECTS, FEED_ITEMS, MOCK_USER } from './constants';
import { Project } from './types';

type Screen = 'onboarding' | 'home' | 'feed' | 'profile' | 'detail' | 'donate' | 'success';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [donationAmount, setDonationAmount] = useState<number | null>(3000);

  // Auto-scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen, selectedProject]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentScreen('detail');
  };

  const handleDonateClick = () => {
    setCurrentScreen('donate');
  };

  const currentTab = ['home', 'feed', 'profile'].includes(currentScreen) ? currentScreen : 'home';

  return (
    <div className="h-screen bg-neutral-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="h-full max-h-[calc(100dvh-2rem)] aspect-[9/19.5] max-w-[430px] bg-background shadow-2xl relative overflow-hidden rounded-[48px] border-[14px] border-neutral-950 ring-4 ring-neutral-800/30">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 inset-x-0 h-7 bg-neutral-950 z-50 flex justify-center items-start pt-1 rounded-b-3xl w-36 mx-auto">
          <div className="w-3 h-3 rounded-full bg-neutral-900 mt-0.5 mr-2 border border-neutral-800/30"></div>
          <div className="w-12 h-1 bg-neutral-800 rounded-full mt-1.5"></div>
        </div>
        <AnimatePresence mode="wait">
          {currentScreen === 'onboarding' && (
            <OnboardingScreen key="onboarding" onStart={() => setCurrentScreen('home')} />
          )}

          {(['home', 'feed', 'profile', 'detail'].includes(currentScreen)) && (
            <motion.div 
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col"
            >
              <AppHeader 
                title={selectedProject?.title || "GoodLoop"} 
                showBack={currentScreen === 'detail'} 
                onBack={() => setCurrentScreen('home')}
              />

              <main className="flex-1 overflow-y-auto pt-16 pb-20 px-4 no-scrollbar">
                <div className="max-w-md mx-auto">
                  {currentScreen === 'home' && (
                    <HomeScreen onProjectClick={handleProjectClick} />
                  )}
                  {currentScreen === 'feed' && <FeedScreen />}
                  {currentScreen === 'profile' && <ProfileScreen onProjectClick={handleProjectClick} />}
                  {currentScreen === 'detail' && selectedProject && (
                    <DetailScreen project={selectedProject} onDonate={handleDonateClick} />
                  )}
                </div>
              </main>

              {['home', 'feed', 'profile'].includes(currentScreen) && (
                <div className="absolute bottom-0 w-full">
                  <BottomNav 
                    activeTab={currentTab} 
                    onChange={(tab) => setCurrentScreen(tab as Screen)} 
                  />
                </div>
              )}
            </motion.div>
          )}

          {currentScreen === 'donate' && selectedProject && (
            <DonateScreen 
              key="donate"
              project={selectedProject} 
              amount={donationAmount}
              onSelectAmount={setDonationAmount}
              onCancel={() => setCurrentScreen('detail')} 
              onConfirm={() => setCurrentScreen('success')}
            />
          )}

          {currentScreen === 'success' && (
            <SuccessScreen key="success" onFinish={() => setCurrentScreen('feed')} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** 
 * SCREEN COMPONENTS 
 */

const OnboardingScreen = ({ onStart }: { onStart: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0, y: -20 }}
    className="h-full flex flex-col relative overflow-hidden pt-8"
  >
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" alt="Joy" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background"></div>
    </div>
    
    <div className="relative z-10 flex flex-col h-full justify-end px-6 pb-20">
      <div className="bg-white/60 backdrop-blur-xl rounded-[24px] p-8 shadow-warm border border-white/20 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart fill="#ff7f6b" stroke="none" size={24} />
          <span className="font-bold text-xl text-primary-container">GoodLoop</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight mb-3">
          가볍게 기부하고,<br />인증하며 함께<br />
          <span className="text-primary-container">변화를 만들어요</span>
        </h1>
        <p className="text-on-surface-variant font-medium text-base leading-relaxed">
          작은 마음이 모여 만드는 큰 기적.<br />지금 바로 나만의 선순환을 시작해보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-secondary-container/30 backdrop-blur-md rounded-xl p-4 border border-secondary-container/50">
          <Heart className="text-secondary mb-1" size={24} />
          <span className="text-xs font-bold text-secondary">투명한 임팩트</span>
        </div>
        <div className="bg-tertiary-container/20 backdrop-blur-md rounded-xl p-4 border border-tertiary-container/30">
          <Users className="text-tertiary mb-1" size={24} />
          <span className="text-xs font-bold text-tertiary">따뜻한 커뮤니티</span>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="w-full py-4 bg-primary-container text-white font-bold text-lg rounded-[20px] shadow-warm flex items-center justify-center gap-2"
      >
        시작하기 <ArrowRight size={24} />
      </button>
    </div>
  </motion.div>
);

const HomeScreen = ({ onProjectClick }: { onProjectClick: (p: Project) => void }) => (
  <div className="space-y-8 py-4">
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-1">Discover Projects</h2>
      <p className="text-on-surface-variant font-medium text-sm">Find a cause you care about and help make it happen.</p>
    </div>

    <div className="space-y-8">
      {PROJECTS.map((project, idx) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => onProjectClick(project)}
          className="bg-white rounded-xl overflow-hidden shadow-ambient border border-surface-container-high group cursor-pointer"
        >
          <div className="h-56 relative overflow-hidden">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary-container shadow-sm border border-primary-container/20">
              {project.category}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold mb-1">{project.title}</h3>
            <p className="text-on-surface-variant text-xs line-clamp-2 mb-3 leading-relaxed">{project.description}</p>
            
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs font-bold text-on-surface-variant">현재 {Math.round((project.currentAmount / project.targetAmount) * 100)}% 완성</span>
              <span className="text-xs font-bold text-secondary">{project.statusText}</span>
            </div>
            
            <div className="w-full h-3 bg-secondary-container/20 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-secondary rounded-full" 
                style={{ width: `${(project.currentAmount / project.targetAmount) * 100}%` }}
              />
            </div>
            
            <button className="w-full py-4 bg-primary-container text-white font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all">
              Support this project
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const DetailScreen = ({ project, onDonate }: { project: Project; onDonate: () => void }) => (
  <div className="space-y-8 py-4">
    <div className="h-80 -mx-5 -mt-4 relative overflow-hidden rounded-b-xl">
      <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <span className="text-xs font-bold tracking-widest opacity-80 uppercase">{project.category}</span>
        <h2 className="text-xl font-bold mt-1 leading-tight">{project.title}</h2>
      </div>
    </div>

    <section className="bg-white rounded-2xl p-6 shadow-ambient border border-surface-container-high relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Heart size={64} className="text-primary-container" fill="currentColor" />
      </div>
      <h3 className="text-lg font-bold mb-4">Current Progress</h3>
      <div className="flex justify-between items-end mb-3">
        <div>
          <span className="text-xl font-bold text-primary-container">${project.currentAmount.toLocaleString()}</span>
          <span className="text-xs font-semibold text-on-surface-variant ml-1">raised</span>
        </div>
        <span className="text-xs font-bold text-on-surface-variant">Goal: ${project.targetAmount.toLocaleString()}</span>
      </div>
      <div className="w-full h-4 bg-surface-container-high rounded-full overflow-hidden mb-4">
        <div className="h-full bg-primary-container rounded-full" style={{ width: '73%' }} />
      </div>
      <div className="flex justify-between text-xs font-bold text-on-surface-variant">
        <div className="flex items-center gap-1"><Users size={14} /> {project.backers} Backers</div>
        <div className="text-primary-container">73% Funded</div>
        <div className="flex items-center gap-1"><Flame size={14} /> {project.daysLeft} Days Left</div>
      </div>
    </section>

    <section className="space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <span className="p-1 bg-tertiary-container/20 rounded-lg text-tertiary">
          <Star size={20} fill="currentColor" />
        </span>
        Why It's Needed
      </h3>
      <p className="text-on-surface-variant leading-relaxed text-base">{project.whyNeeded}</p>
      <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800" className="w-full h-48 object-cover rounded-xl mt-4" alt="Impact" />
    </section>
    
    <div className="absolute bottom-0 left-0 w-full p-5 bg-white/80 backdrop-blur-md border-t border-surface-container-high z-50">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={onDonate}
          className="w-full py-4 bg-primary-container text-white font-bold text-lg rounded-xl shadow-warm flex items-center justify-center gap-2"
        >
          기부하기 <Heart size={20} fill="currentColor" />
        </button>
      </div>
    </div>
  </div>
);

const DonateScreen = ({ project, amount, onSelectAmount, onCancel, onConfirm }: { 
  project: Project; 
  amount: number | null; 
  onSelectAmount: (a: number | null) => void; 
  onCancel: () => void;
  onConfirm: () => void;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: '100%' }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: '100%' }}
    className="absolute inset-0 z-[100] bg-background flex flex-col pt-8"
  >
    <AppHeader title="Donate" showBack onBack={onCancel} />
    
    <main className="flex-grow p-6 pt-24 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-1">Choose an amount</h2>
        <p className="text-on-surface-variant font-medium mb-8">Your contribution creates real impact.</p>

        <div className="bg-surface-container-low rounded-2xl p-4 flex items-center mb-8 border border-surface-container-high">
          <img src={project.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt="Thumb" />
          <div className="ml-4">
            <h3 className="font-bold text-sm">{project.title}</h3>
            <p className="text-xs font-semibold text-secondary mt-1">One-time donation</p>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {[1000, 3000, 5000].map(val => (
            <button 
              key={val}
              onClick={() => onSelectAmount(val)}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                amount === val 
                  ? 'border-primary-container bg-primary-container/10' 
                  : 'border-surface-container-high bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-lg font-bold ${amount === val ? 'text-primary' : 'text-on-surface'}`}>{val.toLocaleString()}원</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${amount === val ? 'border-primary-container bg-primary-container' : 'border-surface-container-high'}`}>
                  {amount === val && <Check size={14} color="white" />}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${amount === val ? 'bg-primary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                {val === 1000 ? 'Provides a small snack' : val === 3000 ? '아이 한 명의 하루 간식이 될 수 있어요' : 'Provides a full meal'}
              </div>
            </button>
          ))}
        </div>

        <button 
          onClick={onConfirm}
          className="w-full py-4 bg-primary-container text-white font-bold text-lg rounded-full shadow-warm flex items-center justify-center gap-2 mt-auto"
        >
          결제하기 <ArrowRight size={20} />
        </button>
      </div>
    </main>
  </motion.div>
);

const SuccessScreen = ({ onFinish }: { onFinish: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="absolute inset-0 z-[100] bg-background flex flex-col p-6 pt-20"
  >
    <div className="max-w-md mx-auto w-full flex flex-col h-full">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-primary-container/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-container">
          <Heart size={48} fill="currentColor" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Thank You!</h1>
        <p className="text-on-surface-variant text-base font-medium">Your contribution makes a real difference.<br />Let's capture this moment.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-surface-container-high shadow-warm relative overflow-hidden flex-grow flex flex-col">
        <div className="h-1 w-full bg-gradient-to-r from-primary-container to-tertiary-container absolute top-0 left-0" />
        <h2 className="text-xl font-bold mb-6">오늘 나의 착한 행동 기록하기</h2>
        
        <label className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-surface-container-high rounded-2xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors group">
          <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Camera size={28} className="text-primary-container" />
          </div>
          <span className="font-bold text-on-surface">Upload a photo</span>
          <span className="text-xs font-semibold text-on-surface-variant/70 mt-1">Optional</span>
          <input type="file" className="hidden" />
        </label>

        <textarea 
          placeholder="How did giving today make you feel? Share your thoughts..."
          className="w-full h-32 mt-6 p-4 bg-surface-container-low border-surface-container-high rounded-xl text-on-surface focus:ring-1 focus:ring-primary-container-dim outline-none resize-none"
        />
      </div>

      <div className="mt-8 space-y-4">
        <button 
          onClick={onFinish}
          className="w-full py-5 bg-primary text-white font-bold text-lg rounded-xl shadow-warm flex items-center justify-center gap-2"
        >
          피드에 공유하기
        </button>
        <button 
          onClick={onFinish}
          className="w-full py-3 text-on-surface-variant font-bold text-md hover:text-on-surface"
        >
          Skip for now
        </button>
      </div>
    </div>
  </motion.div>
);

const FeedScreen = () => (
  <div className="space-y-8 pt-4">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Community Impact</h2>
      <div className="flex gap-2">
        <button className="px-5 py-2 bg-primary-container text-white rounded-full text-sm font-bold shadow-sm">All</button>
        <button className="px-5 py-2 bg-surface-container text-on-surface-variant rounded-full text-sm font-bold">Following</button>
      </div>
    </div>

    <div className="space-y-6 pb-4">
      {FEED_ITEMS.map((item, idx) => (
        <motion.article 
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-ambient border border-surface-container-high"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-surface-container-high">
              <img src={item.userAvatar} className="w-full h-full object-cover" alt={item.userName} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm">{item.userName}</h4>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">{item.action} • {item.timeAgo}</p>
            </div>
          </div>
          
          <p className="text-on-surface mb-6 font-medium leading-relaxed">{item.message}</p>
          
          <div className="rounded-xl overflow-hidden aspect-video mb-4 bg-surface-container-low">
            <img src={item.impactImageUrl} className="w-full h-full object-cover" alt="Impact" />
          </div>

          {item.isVerified && (
            <div className="bg-secondary-container/10 p-3 rounded-xl flex items-center gap-3 mb-6 border border-secondary-container/20">
              <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
                <Verified size={16} fill="currentColor" />
              </div>
              <div className="text-[11px] font-bold">
                <p className="text-on-surface">Impact Verified</p>
                {item.matchInfo && <p className="text-secondary mt-0.5">{item.matchInfo}</p>}
              </div>
            </div>
          )}

          <div className="flex items-center gap-6 pt-4 border-t border-surface-container-high">
            <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary-container transition-colors font-bold text-sm">
              <Heart size={18} fill={idx === 1 ? 'currentColor' : 'none'} className={idx === 1 ? 'text-primary-container' : ''} /> {item.likes}
            </button>
            <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-secondary transition-colors font-bold text-sm">
              <MessageCircle size={18} /> {item.comments}
            </button>
            <button className="ml-auto text-on-surface-variant">
              <Share2 size={18} />
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  </div>
);

const ProfileScreen = ({ onProjectClick }: { onProjectClick: (p: Project) => void }) => (
  <div className="space-y-12 pt-8 pb-4">
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img src="https://i.pravatar.cc/300?u=me" className="w-full h-full object-cover" alt="Me" />
        </div>
        <div className="absolute -bottom-2 right-0 bg-tertiary-container text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 border-2 border-white">
          <Star size={12} fill="currentColor" /> Lvl {MOCK_USER.level}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-3xl font-bold">Sarah Jenkins</h2>
        <p className="text-on-surface-variant font-bold text-sm mt-1 uppercase tracking-widest">Community Builder</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl p-6 shadow-ambient border border-surface-container-high flex flex-col justify-between h-40">
        <div className="flex items-center gap-2 text-primary-container font-bold text-xs uppercase">
          <Heart size={14} fill="currentColor" /> Total Impact
        </div>
        <div>
          <div className="text-3xl font-bold">${MOCK_USER.totalImpact.toLocaleString()}</div>
          <div className="text-[10px] font-bold text-on-surface-variant mt-1 uppercase tracking-wider">across {MOCK_USER.causesCount} causes</div>
        </div>
      </div>
      <div className="bg-primary-container rounded-2xl p-6 shadow-warm flex flex-col justify-between text-white h-40">
        <div className="flex items-center gap-2 font-bold text-xs uppercase opacity-80">
          <Flame size={14} fill="currentColor" /> Current Streak
        </div>
        <div>
          <div className="text-3xl font-bold">{MOCK_USER.streakMonths} Mo.</div>
          <div className="text-[10px] font-bold mt-1 uppercase tracking-wider opacity-80">Consecutive giving</div>
        </div>
      </div>
    </div>

    <section className="bg-white rounded-2xl p-6 shadow-ambient border border-surface-container-high">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
          <Trophy size={16} className="text-tertiary" fill="currentColor" /> Badges Earned
        </h3>
        <button className="text-xs font-bold text-primary-container">View All</button>
      </div>
      <div className="flex gap-6 overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
        {MOCK_USER.badges.map(badge => (
          <div key={badge.id} className={`flex flex-col items-center gap-2 min-w-[80px] ${badge.isLocked ? 'opacity-30' : ''}`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-on-surface ${badge.color} shadow-sm border border-black/5`}>
              <Droplet />
            </div>
            <span className="text-[10px] font-bold text-center leading-tight">{badge.name}</span>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-6">
      <h3 className="text-xl font-bold">Participated Projects</h3>
      <div className="space-y-4">
        {PROJECTS.slice(0, 2).map((project, idx) => (
          <div 
            key={project.id}
            onClick={() => onProjectClick(project)} 
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-surface-container flex h-32 cursor-pointer hover:shadow-ambient transition-shadow"
          >
            <div className="w-32 h-full flex-shrink-0">
              <img src={project.imageUrl} className="w-full h-full object-cover" alt="Thumb" />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${idx === 0 ? 'text-tertiary' : 'text-secondary'}`}>
                  {project.category}
                </span>
                <h4 className="font-bold text-md leading-tight mt-1 line-clamp-1">{project.title}</h4>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-medium text-on-surface-variant">You gave <span className="font-bold text-on-surface">$50</span></span>
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-4 border-2 border-primary-container text-primary-container font-bold rounded-xl hover:bg-primary-container/5 transition-colors">
        View Past Impact
      </button>
    </section>
  </div>
);
