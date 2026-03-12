import React, { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Calculator, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface Product {
  id: string;
  name: string;
  type: '냉동고' | '냉장고';
  capacity: string;
  tempRange: string;
  pricePerMonth: number;
  image: string;
  features: string[];
  objectPosition?: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '산업용 급속 냉동고X1',
    type: '냉동고',
    capacity: '1200L',
    tempRange: '-18°C ~ -25°C',
    pricePerMonth: 450000,
    image: 'https://lh3.googleusercontent.com/d/1vOG4Nv4gTgSDcLg3iMz5fdCKqgnz03Ue',
    features: ['디지털 온도 제어', '급속 냉동 시스템', '에너지 효율 등급 1등급']
  },
  {
    id: '2',
    name: '워크인대형냉장고',
    type: '냉장고',
    capacity: '5000L',
    tempRange: '2°C ~ 8°C',
    pricePerMonth: 1200000,
    image: 'https://lh3.googleusercontent.com/d/1DvWdgS9oro0qKZ39M4W7Eqagv3CgW47B',
    features: ['자동 제상 기능', '고휘도 LED 조명', '고하중 선반 시스템'],
    objectPosition: '60% center'
  },
  {
    id: '3',
    name: '컴팩트 쇼케이스 냉장고',
    type: '냉장고',
    capacity: '450L',
    tempRange: '0°C ~ 10°C',
    pricePerMonth: 250000,
    image: 'https://lh3.googleusercontent.com/d/1tVtI22ov5osNsaekQq3gcWn_pTIaJVTo',
    features: ['강화 유리 도어', '내부 순환 팬', '조절 가능한 선반']
  },
  {
    id: '4',
    name: '초저온 특수 냉동고',
    type: '냉동고',
    capacity: '800L',
    tempRange: '-40°C ~ -86°C',
    pricePerMonth: 850000,
    image: 'https://lh3.googleusercontent.com/d/1EXadbDyPRby0CRhNgCAzYiR_A4d6iLMl',
    features: ['의료용 등급 인증', '백업 배터리 시스템', '데이터 로깅 지원']
  }
];

// Components
const LogoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 3L21 8V16L12 21L3 16V8L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M9 8V16M12 7V17M15 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [estimateType, setEstimateType] = useState<string>('산업용 급속 냉동고X1');
  const [estimateDuration, setEstimateDuration] = useState(3);
  const [estimateTotal, setEstimateTotal] = useState(0);
  const [estimatorEmail, setEstimatorEmail] = useState('');
  const [estimatorSubmitted, setEstimatorSubmitted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Real-time Estimator Logic
  useEffect(() => {
    const prices: Record<string, number> = {
      '산업용 급속 냉동고X1': 450000,
      '워크인대형냉장고': 1200000,
      '컴팩트 쇼케이스 냉장고': 250000,
      '초저온 특수 냉동고': 850000
    };
    const basePrice = prices[estimateType] || 400000;
    const durationMultiplier = estimateDuration >= 12 ? 0.85 : estimateDuration >= 6 ? 0.92 : 1;
    setEstimateTotal(Math.round(basePrice * estimateDuration * durationMultiplier));
  }, [estimateType, estimateDuration]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleEstimatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEstimatorSubmitted(true);
    setTimeout(() => setEstimatorSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-blue selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 group cursor-pointer">
              <LogoIcon className="text-brand-blue w-9 h-9 group-hover:scale-105 transition-transform" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black tracking-tighter text-brand-blue leading-none">COOL</span>
                <span className="text-base font-bold tracking-widest text-slate-400">LINK</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">제품 안내</a>
              <a href="#estimator" onClick={(e) => scrollToSection(e, 'estimator')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">견적 계산기</a>
              <a href="#support" onClick={(e) => scrollToSection(e, 'support')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">고객 지원</a>
              <button 
                onClick={(e) => {
                  const target = document.getElementById('estimator');
                  if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                  }
                }}
                className="bg-brand-blue text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-brand-blue/20"
              >
                무료 견적 받기
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="block text-lg font-medium text-slate-900">제품 안내</a>
                <a href="#estimator" onClick={(e) => scrollToSection(e, 'estimator')} className="block text-lg font-medium text-slate-900">견적 계산기</a>
                <a href="#support" onClick={(e) => scrollToSection(e, 'support')} className="block text-lg font-medium text-slate-900">고객 지원</a>
                <button 
                  onClick={(e) => {
                    const target = document.getElementById('estimator');
                    if (target) {
                      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-brand-blue text-white py-3 rounded-xl font-semibold"
                >
                  무료 견적 받기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 skew-x-12 translate-x-1/4" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
                  <Zap className="w-3 h-3" />
                  스마트 렌탈 시스템
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
                  산업용 냉각 솔루션 <br />
                  더 쉽고 빠르게.
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                  비즈니스를 위한 고성능<br className="sm:hidden" /> 산업용 냉동고 및 냉장고.<br />
                  유연한 렌탈 플랜,<br className="sm:hidden" /> 24/7 우선 지원 서비스,<br />
                  그리고 신속한 설치를 약속합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      const target = document.getElementById('products');
                      if (target) {
                        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                      }
                    }}
                    className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-bold text-base lg:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    제품 목록 보기 <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      const target = document.getElementById('support');
                      if (target) {
                        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                      }
                    }}
                    className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-base lg:text-lg hover:bg-slate-50 transition-colors"
                  >
                    상담 신청하기
                  </button>
                </div>
                <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-8 grayscale opacity-50">
                  <div className="font-black text-xl lg:text-2xl italic">LOGISTICS+</div>
                  <div className="font-black text-xl lg:text-2xl italic">FRESHCORP</div>
                  <div className="font-black text-xl lg:text-2xl italic">GLOBALFOOD</div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
                    alt="산업용 냉동고" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex gap-4">
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/30">
                        <div className="text-white/70 text-xs uppercase font-bold mb-1">가동률</div>
                        <div className="text-white text-xl font-bold">99.9%</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/30">
                        <div className="text-white/70 text-xs uppercase font-bold mb-1">지원</div>
                        <div className="text-white text-xl font-bold">24/7</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <CheckCircle2 className="text-emerald-600 w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">품질 인증 완료</div>
                      <div className="text-sm font-bold text-slate-900">ISO 9001:2015</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-4">프리미엄 렌탈 라인업</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                다양한 비즈니스 요구사항에 맞춰 설계된 산업용<br className="sm:hidden" /> 냉각 솔루션을 확인해보세요.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {PRODUCTS.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 group"
                >
                  <div className="relative aspect-square sm:aspect-auto sm:h-[400px] overflow-hidden bg-slate-50 p-4 sm:p-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply sm:mix-blend-normal"
                      style={{ objectPosition: product.objectPosition || 'center' }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        product.type === '냉동고' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {product.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3" /> {product.tempRange}
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {product.capacity}
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-brand-blue" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">월 렌탈료</div>
                        <div className="text-xl font-bold text-brand-blue">₩{product.pricePerMonth.toLocaleString()}</div>
                      </div>
                      <button className="p-2 bg-slate-100 rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-time Estimator */}
        <section id="estimator" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-blue rounded-[3rem] p-8 lg:p-16 text-white overflow-hidden relative">
              {/* Background Accents */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

              <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6">
                    <Calculator className="w-3 h-3" />
                    실시간 견적
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-bold mb-6">실시간 렌탈 견적 계산기</h2>
                  <p className="text-white/70 text-base lg:text-lg mb-10">
                    필요한 냉각 장비의 예상 비용을<br className="sm:hidden" /> 즉시 확인하세요.<br />
                    장기 렌탈 시 더 큰 할인 혜택을<br className="sm:hidden" /> 받으실 수 있습니다.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="bg-white/10 p-4 rounded-2xl">
                        <Truck className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="font-bold text-xl">무료 배송 및 설치</div>
                        <div className="text-white/60 text-sm">6개월 이상 렌탈 시 적용</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="bg-white/10 p-4 rounded-2xl">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="font-bold text-xl">유지보수 포함</div>
                        <div className="text-white/60 text-sm">24/7 전담 기술팀 관리 서비스</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-2xl">
                  <AnimatePresence mode="wait">
                    {estimatorSubmitted ? (
                      <motion.div 
                        key="estimator-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12 h-full flex flex-col justify-center"
                      >
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="text-emerald-600 w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">요청이 완료되었습니다.</h3>
                        <p className="text-slate-500">최대한 빠른 시간이내 이메일로 견적서 보내드리겠습니다.</p>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="estimator-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleEstimatorSubmit}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">장비 유형</label>
                          <div className="flex flex-col gap-3">
                            {['산업용 급속 냉동고X1', '워크인대형냉장고', '컴팩트 쇼케이스 냉장고', '초저온 특수 냉동고'].map((type) => (
                              <button 
                                key={type}
                                type="button"
                                onClick={() => setEstimateType(type)}
                                className={`py-4 px-6 rounded-2xl font-bold text-left transition-all border-2 flex justify-between items-center ${
                                  estimateType === type 
                                  ? 'bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                                  : 'bg-white border-slate-100 text-slate-600 hover:border-brand-blue/30'
                                }`}
                              >
                                <span>{type}</span>
                                {estimateType === type && <CheckCircle2 className="w-5 h-5" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-3">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">렌탈 기간</label>
                            <span className="text-brand-blue font-bold">{estimateDuration}개월</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="24" 
                            value={estimateDuration}
                            onChange={(e) => setEstimateDuration(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
                          />
                          <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase">
                            <span>1개월</span>
                            <span>12개월 (15% 할인)</span>
                            <span>24개월</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">견적 받으실 이메일</label>
                          <input 
                            required 
                            type="email" 
                            value={estimatorEmail}
                            onChange={(e) => setEstimatorEmail(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" 
                            placeholder="example@coollink.com" 
                          />
                        </div>

                        <div className="pt-8 border-t border-slate-100">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                            <div>
                              <div className="text-sm font-bold text-slate-400 uppercase">예상 총 비용</div>
                              <div className="text-4xl font-black text-slate-900">₩{estimateTotal.toLocaleString()}</div>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                              <div className="text-xs font-bold text-emerald-600 uppercase">유지보수 포함</div>
                              <div className="w-1 h-1 bg-slate-300 rounded-full" />
                              <div className="text-slate-400 text-xs italic">부가세 별도</div>
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-brand-blue text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-brand-blue/20">
                            공식 견적서 요청하기
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AS Request Form Section */}
        <section id="support" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
                  <ShieldCheck className="w-3 h-3" />
                  사후 관리 서비스
                </div>
                <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-6">전문 기술 지원 요청</h2>
                <p className="text-slate-600 text-base lg:text-lg mb-10">
                  장비에 문제가 발생했나요?<br />
                  당사의 기술 팀은 24시간 대기 중입니다.<br />
                  모든 렌탈 고객에게는 4시간 이내 현장 방문을 보장하는 우선 지원 서비스가 제공됩니다.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                      <Clock className="text-brand-blue w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">4시간 이내 대응</div>
                      <div className="text-slate-500 text-sm">중대한 고장 발생 시 즉시 출동 보장</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                      <MapPin className="text-brand-blue w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">전국 서비스망</div>
                      <div className="text-slate-500 text-sm">전국 주요 도시 서비스 센터 운영</div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-brand-blue/5 rounded-3xl border border-brand-blue/10">
                  <div className="flex items-center gap-4">
                    <div className="bg-brand-blue text-white p-4 rounded-2xl">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-blue uppercase">긴급 서비스 핫라인</div>
                      <div className="text-2xl font-black text-brand-blue">1588-COOL-LINK</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 lg:p-12 shadow-xl border border-slate-100 relative">
                {/* Priority Badge */}
                <div className="absolute -top-4 -right-4 bg-brand-blue text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 우선 지원 대상
                </div>

                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-emerald-600 w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">접수 완료</h3>
                      <p className="text-slate-500">담당 기술 엔지니어가 15분 이내에 연락드릴 예정입니다.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleFormSubmit} 
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">업체명</label>
                          <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" placeholder="예: (주)쿨푸드" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">담당자 성함</label>
                          <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" placeholder="홍길동" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">이메일 주소</label>
                        <input required type="email" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" placeholder="example@coollink.com" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">문의 유형</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all appearance-none">
                          <option>온도 조절 이상</option>
                          <option>전원 및 가동 중단</option>
                          <option>외관 파손 및 부품 교체</option>
                          <option>정기 점검 요청</option>
                          <option>기타 문의</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">상세 내용</label>
                        <textarea rows={4} className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" placeholder="발생한 문제에 대해 상세히 적어주세요..."></textarea>
                      </div>
                      <button type="submit" className="w-full bg-brand-blue text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-brand-blue/20">
                        지원 요청 제출하기
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section: Logo & Description (Shown on sm+) */}
          <div className="hidden sm:block mb-12 pb-12 border-b border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-2 group cursor-pointer">
                <LogoIcon className="text-white w-8 h-8 group-hover:scale-105 transition-transform" />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black tracking-tighter text-white leading-none">COOL</span>
                  <span className="text-xs font-bold tracking-widest text-white/50">LINK</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                산업용 냉각 솔루션의 선두주자.<br />
                고객의 비즈니스 성공을 위한 최적의 인프라를 제공합니다.
              </p>
              <div className="flex gap-4">
                <Mail className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <PhoneCall className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          {/* Bottom Section: Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 mb-12 lg:mb-16">
            {/* Solutions */}
            <div className="col-span-1">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-slate-500">솔루션</h4>
              <ul className="space-y-4 text-slate-400 text-xs">
                <li className="hover:text-white transition-colors cursor-pointer">산업용 냉동고</li>
                <li className="hover:text-white transition-colors cursor-pointer">워크인 냉장고</li>
                <li className="hover:text-white transition-colors cursor-pointer">쇼케이스 냉장고</li>
                <li className="hover:text-white transition-colors cursor-pointer">콜드체인 솔루션</li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-1 text-right sm:text-left">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-slate-500">회사 소개</h4>
              <ul className="space-y-4 text-slate-400 text-xs">
                <li className="hover:text-white transition-colors cursor-pointer">회사 개요</li>
                <li className="hover:text-white transition-colors cursor-pointer">성공 사례</li>
                <li className="hover:text-white transition-colors cursor-pointer">서비스 지역</li>
                <li className="hover:text-white transition-colors cursor-pointer">채용 안내</li>
              </ul>
            </div>

            {/* Newsletter - Shown on sm+ grid, hidden on mobile (handled below) */}
            <div className="hidden sm:block col-span-1">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-slate-500">뉴스레터</h4>
              <p className="text-slate-400 text-xs mb-6">
                최신 산업 트렌드와 렌탈 혜택 정보를 받아보세요.
              </p>
              <div className="flex gap-2">
                <input type="email" placeholder="이메일" className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[10px] focus:outline-none focus:border-brand-blue w-full" />
                <button className="bg-brand-blue p-2 rounded-xl">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Only: Logo and Newsletter */}
          <div className="sm:hidden pt-8 border-t border-white/5 flex flex-col gap-8 mb-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <LogoIcon className="text-white w-7 h-7 group-hover:scale-105 transition-transform" />
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">COOL</span>
                <span className="text-[10px] font-bold tracking-widest text-white/50">LINK</span>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="email" placeholder="뉴스레터 구독 (이메일)" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue w-full" />
              <button className="bg-brand-blue px-6 py-2.5 rounded-xl text-xs font-bold">구독</button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px]">
            <p>© 2020 Cool Link Rental Solutions. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer">개인정보 처리방침</span>
              <span className="hover:text-white cursor-pointer">이용 약관</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
