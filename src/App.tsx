import React, { useState, useRef, useEffect } from 'react';
import { Menu, MessageSquare, ScanFace, Star, BadgeCheck, ChevronDown, Instagram, Facebook, Volume2, VolumeX } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const WA_LINK = 'https://wa.me/351916660005?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20Galerie%20Clinic.';

const VIDEO_SOURCES = [
  '/videos/v5.mp4',
  '/videos/v6.mp4',
  '/videos/v7.mp4',
  '/videos/v10.mp4',
  '/videos/v11.mp4',
  '/videos/v12.mp4',
  '/videos/v1.mp4',
  '/videos/v2.mp4',
  '/videos/v3.mp4',
  '/videos/v4.mp4',
  '/videos/v8.mp4',
  '/videos/v9.mp4',
];

const FAQ_ITEMS = [
  {
    question: 'Os tratamentos são muito caros na Galerie Clinic?',
    answer: 'Os nossos valores refletem a qualidade, segurança e ética dos procedimentos que realizamos. Fazemos sempre triagem de valores por telefone antes da consulta, para que venha totalmente informada e sem surpresas. O valor dos tratamentos reflete também a dedicação e acompanhamento de toda a nossa equipa após a realização do procedimento, para que se sinta sempre segura.',
  },
  {
    question: 'Tenho receio de injetáveis. Os procedimentos são seguros?',
    answer: 'Absolutamente. A nossa equipa é formada e supervisionada pela Dra. Rita Sêco, e nunca realizamos qualquer procedimento sem antes explicar cada detalhe. Começamos sempre de forma gradual e segura, respeitando o seu ritmo.',
  },
  {
    question: 'Qual o tempo de duração dos resultados?',
    answer: 'Depende do tratamento. O Botox tem duração de 3 a 6 meses, os preenchimentos de 8 a 12 meses e os bioestimuladores de colagénio têm efeito progressivo e duradouro. Em consulta, traçamos um plano personalizado para si.',
  },
];

const VideoCarousel = () => {
  const [mutedStates, setMutedStates] = useState<boolean[]>(new Array(VIDEO_SOURCES.length * 2).fill(true));

  const toggleMute = (index: number, videoElement: HTMLVideoElement) => {
    const newMutedStates = [...mutedStates];
    const newState = !videoElement.muted;
    videoElement.muted = newState;
    newMutedStates[index] = newState;
    setMutedStates(newMutedStates);
  };

  const allVideos = [...VIDEO_SOURCES, ...VIDEO_SOURCES];

  return (
    <section className="py-12 bg-[#fcfaf8] overflow-hidden border-t border-b border-[#3b2c24]/5">
      <div className="relative flex">
        <motion.div
          className="flex gap-4 px-4"
          style={{ willChange: "transform" }}
          animate={{ x: [0, -3168] }}
          transition={{
            duration: 90, // Even slower for performance
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {allVideos.map((src, i) => (
            <div key={i} className="relative min-w-[260px] h-[460px] rounded-2xl overflow-hidden bg-[#3b2c24]/10 shadow-sm transition-transform hover:scale-[1.02] duration-300">
              <LazyVideo
                src={src}
                isMuted={mutedStates[i]}
                onMuteToggle={(video) => toggleMute(i, video)}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LazyVideo = ({ src, isMuted, onMuteToggle }: { src: string, isMuted: boolean, onMuteToggle: (v: HTMLVideoElement) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "600px" });
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isInView && !hasStartedLoading) {
      setHasStartedLoading(true);
    }
  }, [isInView, hasStartedLoading]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play might be blocked or file might fail to load
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isInView, hasStartedLoading]);

  const isMov = src.toLowerCase().endsWith('.mov');

  return (
    <div ref={containerRef} className="w-full h-full relative bg-[#3b2c24]/3">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#3b2c24]/5">
          <div className="w-8 h-8 border-2 border-[#82533a]/20 border-t-[#82533a] rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover cursor-pointer transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoading(false)}
        onClick={(e) => onMuteToggle(e.currentTarget)}
      >
        {hasStartedLoading && (
          <>
            <source src={src} type={isMov ? "video/quicktime" : "video/mp4"} />
            {/* Fallback for browsers that might need specific order or extension check */}
            {!isMov && <source src={src} type="video/mp4" />}
          </>
        )}
      </video>
      <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full text-white pointer-events-none z-20">
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </div>
    </div>
  );
};

const ResultadosSection = () => {
  const results = [
    '/assets/results/photo-output.jpg',
    '/assets/results/photo-output (2).jpg',
    '/assets/results/IMG_0518.jpg',
    '/assets/results/IMG_4970.jpg',
    '/assets/results/IMG_7460.jpg',
    '/assets/results/IMG_8547.jpg',
    '/assets/results/IMG_9732.jpg',
    '/assets/results/IMG_0723.JPG',
    '/assets/results/IMG_3398.JPG',
    '/assets/results/IMG_6535.JPG',
    '/assets/results/IMG_8090.JPG',
    '/assets/results/IMG_9728.JPG',
    '/assets/results/e36ad939-8bd5-4792-ab4e-35a14322332f.JPG',
    '/assets/results/6916aa89-a0e9-4a92-8341-c0dfc19e35b0.JPG',
    '/assets/results/88adef43-856f-49df-8f67-d5009d014f6e.JPG'
  ];

  const allResults = [...results, ...results];

  return (
    <section id="resultados" className="pb-24 pt-12 bg-[#fcf9f5] overflow-hidden border-t border-[#3b2c24]/5">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#3b2c24]">
          Antes e Depois dos nossos pacientes
        </h2>
      </div>

      <div className="relative flex">
        <motion.div
          className="flex gap-6 px-4"
          style={{ willChange: "transform" }}
          animate={{ x: [0, -4560] }} // Adjusted for 15 items: (280+24)*15
          transition={{
            duration: 120, // Very slow for seamless look
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {allResults.map((src, i) => (
            <div key={i} className="relative min-w-[280px] aspect-[1/1] rounded-2xl overflow-hidden shadow-sm bg-white transition-transform hover:scale-[1.02] duration-300">
              <img 
                src={src} 
                alt={`Resultado ${i + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AboutSpaceSection = () => {
  const [currentImg, setCurrentImg] = React.useState(0);
  const images = [
    '/assets/clinic_interior_1.jpg',
    '/assets/clinic_interior_2.jpg',
    '/assets/clinic_interior_3.jpg'
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="clinica" className="bg-[#ada69a] py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-stretch">
        {/* Left Card: Slideshow of Images */}
        <div 
          className="w-full md:w-1/2 bg-[#eee9e2] rounded-[50px] overflow-hidden shadow-sm relative min-h-[500px]"
        >
          {images.map((img, idx) => (
            <img 
              key={idx}
              src={img} 
              alt={`Galerie Clinic - O nosso espaço ${idx + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                idx === currentImg ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Right Card: Text */}
        <div 
          className="w-full md:w-1/2 bg-[#eee9e2] rounded-[50px] p-12 lg:p-24 flex flex-col justify-center shadow-sm"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#3b2c24]/50 mb-8 block">
            A Nossa Clínica
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-[#3b2c24] mb-12 leading-[1.2]">
            Bem-vinda à Galerie Clinic, onde a beleza se encontra com a inovação no coração da encantadora cidade com vista para o deslumbrante Rio Douro.
          </h2>
          <div className="space-y-8 text-lg lg:text-xl text-[#3b2c24]/80 leading-relaxed font-light">
            <p>
              A nossa clínica destaca-se como um farol de excelência, oferecendo tratamentos estéticos avançados executados por uma equipa multidisciplinar de profissionais altamente qualificados.
            </p>
            <p>
              O espaço foi meticulosamente desenhado para unir a sofisticação ao conforto, criando uma atmosfera que promove o relaxamento e o bem-estar durante toda a sua jornada connosco.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    // WEB3FORMS Configuration
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // User needs to replace this
    formData.append("subject", "Novo Contacto Recebido – Galerie Clinic");
    formData.append("from_name", "Landing Page Leads");
    
    // Multiple recipients requirement: We'll add them to the subject or message 
    // note: Web3Forms free usually sends to one registered email. 
    // Pro allows multiple. I'll add a note for the user.
    formData.append("note", "Enviar também para: geral@galerieclinic.com e alpha.clientesleads@gmail.com");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError("Ocorreu um problema ao enviar a sua mensagem. Por favor, tente novamente.");
      }
    } catch (err) {
      setError("Não foi possível estabelecer ligação. Por favor, verifique a sua internet ou contacte-nos via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="contacto" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-[#f3e4d5] rounded-full flex items-center justify-center mx-auto mb-8">
            <BadgeCheck className="w-12 h-12 text-[#824A2F]" />
          </div>
          <h2 className="text-4xl font-medium text-[#3b2c24] mb-4">Mensagem Enviada!</h2>
          <p className="text-lg text-[#3b2c24]/80 mb-8">
            Obrigado pelo seu contacto. A nossa equipa irá responder-lhe com a maior brevidade possível.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-[#824A2F] font-medium hover:underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#3b2c24] mb-4">
            Inicie o seu caminho
          </h2>
          <p className="text-lg text-[#3b2c24]/80">
            Fale connosco e descubra o plano de tratamento ideal para si.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="text-sm font-medium text-[#3b2c24]/70 ml-1">Nome</label>
              <input 
                required
                type="text" 
                name="nome"
                id="nome"
                className="w-full px-6 py-4 rounded-2xl bg-[#fcf9f5] border border-[#3b2c24]/10 focus:outline-none focus:border-[#824A2F]/30 transition-colors"
                placeholder="O seu nome completo"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-[#3b2c24]/70 ml-1">E-mail</label>
              <input 
                required
                type="email" 
                name="email"
                id="email"
                className="w-full px-6 py-4 rounded-2xl bg-[#fcf9f5] border border-[#3b2c24]/10 focus:outline-none focus:border-[#824A2F]/30 transition-colors"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="telefone" className="text-sm font-medium text-[#3b2c24]/70 ml-1">Telemóvel / Contacto</label>
              <input 
                required
                type="tel" 
                name="telefone"
                id="telefone"
                className="w-full px-6 py-4 rounded-2xl bg-[#fcf9f5] border border-[#3b2c24]/10 focus:outline-none focus:border-[#824A2F]/30 transition-colors"
                placeholder="+351 --- --- ---"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="procedimento" className="text-sm font-medium text-[#3b2c24]/70 ml-1">Em que procedimento está interessado?</label>
              <select 
                required
                name="procedimento"
                id="procedimento"
                className="w-full px-6 py-4 rounded-2xl bg-[#fcf9f5] border border-[#3b2c24]/10 focus:outline-none focus:border-[#824A2F]/30 transition-colors appearance-none"
              >
                <option value="">Selecione uma opção</option>
                <option value="toxina">Toxina Botulínica</option>
                <option value="labial">Hidratação Labial</option>
                <option value="bioestimuladores">Bioestimuladores</option>
                <option value="outros">Outros Tratamentos</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mensagem" className="text-sm font-medium text-[#3b2c24]/70 ml-1">Como podemos ajudar?</label>
            <textarea 
              required
              name="mensagem"
              id="mensagem"
              rows={4}
              className="w-full px-6 py-4 rounded-2xl bg-[#fcf9f5] border border-[#3b2c24]/10 focus:outline-none focus:border-[#824A2F]/30 transition-colors resize-none"
              placeholder="Conte-nos o que procura..."
            ></textarea>
          </div>

          {error && (
            <p className="text-red-500 text-sm ml-1 bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 bg-[#824A2F] text-white rounded-full text-lg font-medium transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#6b3d27]'}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Enviando...
              </>
            ) : 'Enviar Mensagem'}
          </button>
        </form>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#fcf9f5] text-[#333333] antialiased overflow-x-hidden font-sans">
      {/* Header Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-xl font-medium tracking-[0.15em] uppercase">GALERIE CLINIC</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#tratamentos" className="text-lg text-[#3b2c24] hover:text-[#eb6625] transition-colors">Tratamentos</a>
          <a href="#como-funcionamos" className="text-lg text-[#3b2c24] hover:text-[#eb6625] transition-colors">Como Funcionamos</a>
          <a href="#resultados" className="text-lg text-[#3b2c24] hover:text-[#eb6625] transition-colors">Resultados</a>
          <a href="#contacte-nos" className="text-lg text-[#3b2c24] hover:text-[#eb6625] transition-colors">Contacte-nos</a>
        </nav>

        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#824A2F] text-white text-base font-medium hover:bg-[#6b3d27] transition-colors">
          Agendar Consulta
        </a>

        <button 
          className="md:hidden text-[#3b2c24]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </header>

      {/* Mobile Menu (Added for functionality) */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-6 bg-[#fcfaf8]">
          <nav className="flex flex-col gap-4">
            <a href="#tratamentos" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#3b2c24] hover:text-[#eb6625] transition-colors">Tratamentos</a>
            <a href="#como-funcionamos" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#3b2c24] hover:text-[#eb6625] transition-colors">Como Funcionamos</a>
            <a href="#resultados" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#3b2c24] hover:text-[#eb6625] transition-colors">Resultados</a>
            <a href="#contacte-nos" onClick={() => setIsMenuOpen(false)} className="text-lg text-[#3b2c24] hover:text-[#eb6625] transition-colors">Contacte-nos</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#824A2F] text-white text-base font-medium hover:bg-[#6b3d27] transition-colors w-full">
              Agendar Consulta
            </a>
          </nav>
        </div>
      )}

      <main>
        {/* Hero Section - Fixed background and layout duplication */}
        <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden flex items-center justify-center text-center">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover"
              src="/videos/v9.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center">
            <span className="text-xl md:text-2xl text-white mb-6 font-medium tracking-[0.2em] drop-shadow-sm uppercase">Galerie Clinic</span>
            <h1 className="text-4xl md:text-[3.8rem] font-medium tracking-tight text-white leading-[1.1] mb-8 drop-shadow-md">
              A excelência da medicina estética,<br />refletida na sua naturalidade.
            </h1>
            <p className="text-lg md:text-xl text-white/95 mb-10 leading-relaxed max-w-2xl drop-shadow-sm">
              Aqui cada detalhe é pensado para revelar a sua melhor versão com tratamentos modernos, atendimento humanizado e resultados que encantam.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 text-lg text-white bg-[#82533a] rounded-full hover:bg-[#6e4631] transition-all transform hover:scale-105 shadow-xl font-medium">
                Agendar Avaliação
              </a>
              <a href="#tratamentos" className="inline-flex items-center justify-center px-10 py-4 text-lg text-[#3b2c24] bg-white rounded-full hover:bg-white/90 transition-all transform hover:scale-105 shadow-xl font-medium">
                Ver tratamentos
              </a>
            </div>
          </div>
        </section>

        <VideoCarousel />
        
        <ResultadosSection />


        {/* Section: About - Redesigned to split screen */}
        <section className="relative w-full flex flex-col md:flex-row min-h-[600px] overflow-hidden">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-auto">
            <img 
              src="/assets/skingirls.jpg" 
              alt="Galerie Clinic - A nossa equipa" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Overlay Badge from previous design if needed, but mockup doesn't have it */}
            <div className="absolute top-8 left-8 z-20 w-32 h-32 bg-[#82533a] rounded-full hidden md:flex items-center justify-center p-2 shadow-lg scale-75 origin-top-left">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
                <path d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" id="circle-text" fill="none" />
                <text className="text-[11px] font-medium tracking-widest text-white uppercase">
                  <textPath href="#circle-text" startOffset="0%">Galerie Clinic Estética • </textPath>
                </text>
              </svg>
              <span className="absolute text-3xl font-sans font-medium text-white">G</span>
            </div>
          </div>

          {/* Right Side: Brown Content */}
          <div className="w-full md:w-1/2 bg-[#824A2F] p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-8 leading-[1.15]">
              Onde a ciência e a elegância se encontram para preservar a sua essência.
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-white/90 leading-relaxed font-light">
              <p className="font-medium text-white">
                A sua beleza merece ser celebrada, não desfigurada por exageros ou promessas vazias.
              </p>
              <p>
                Na Galerie Clinic, em Porto, a nossa equipa de especialistas, supervisionada pela Dra. Rita Sêco, oferece uma medicina estética focada em resultados naturais e seguros.
              </p>
              <p>
                Defendemos a individualidade e recusamos qualquer procedimento que prometa o impossível. Acreditamos na verdade, na ciência e em resultados visíveis ao longo do tempo. A segurança dos procedimentos e a saúde da sua pele são a nossa prioridade.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Especialidades (Bento Grid) */}
        <section id="tratamentos" className="py-24 max-w-6xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#3b2c24] text-center mb-16">
            As nossas especialidades<br />
            em Medicina Estética.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            
            {/* Toxina Botulínica (Wide) */}
            <div className="md:col-span-2 bg-[#c69d7b] rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative min-h-[300px]">
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center z-10">
                <h3 className="text-2xl font-medium tracking-tight text-white mb-4">Toxina<br />Botulínica</h3>
                <p className="text-base text-white/90 mb-6 leading-relaxed">
                  Suavize rugas de expressão e previna o envelhecimento. Aplicação precisa para um aspeto mais jovem e relaxado, mantendo a naturalidade e a expressividade da sua face.
                </p>
                <div>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-2.5 text-base text-white bg-[#824A2F] rounded-full hover:bg-[#6b3d27] transition-colors">
                    Agendar Avaliação
                  </a>
                </div>
              </div>
              <div className="h-48 md:h-auto md:w-1/2">
                <img src="/assets/specialty_botox.png" alt="Toxina Botulínica" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Hidratação Labial */}
            <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden min-h-[300px]">
              <img src="/assets/specialty_labial.png" alt="Hidratação Labial" className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">Hidratação Labial</h3>
                <p className="text-base text-white/90 leading-relaxed">
                  Realce os seus lábios com ácido hialurónico, sem exageros. Consiga um contorno elegante e devolva ao lábio o volume que já teve.
                </p>
              </div>
            </div>

            {/* Bioestimuladores */}
            <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden min-h-[300px]">
              <img src="/assets/specialty_bioestimuladores.png" alt="Bioestimuladores" className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6e4631]/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">Bioestimuladores<br />de Colagénio</h3>
                <p className="text-base text-white/90 leading-relaxed">
                  Melhore a flacidez e a qualidade da pele estimulando a sua produção natural de colagénio.
                </p>
              </div>
            </div>

            {/* Laser */}
            <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden min-h-[300px]">
              <img src="/assets/specialty_laser.png" alt="Laser" className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6e4631]/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">Laser para<br />Qualidade de Pele</h3>
                <p className="text-base text-white/90 leading-relaxed">
                  MOXI, HALO, Clear V e BBL para uma pele renovada, uniforme e radiante.
                </p>
              </div>
            </div>

            {/* PRP */}
            <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden min-h-[300px]">
              <img src="/assets/specialty_prp.png" alt="PRP Capilar" className="absolute inset-0 w-full h-full object-cover opacity-90 object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6e4631]/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-medium tracking-tight text-white mb-2">PRP<br />Capilar</h3>
                <p className="text-base text-white/90 leading-relaxed">
                  Combata a queda e melhore a densidade capilar com o seu próprio plasma.
                </p>
              </div>
            </div>

            {/* Vitaminas (Wide) */}
            <div className="md:col-span-3 bg-[#82533a] rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative min-h-[300px]">
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center z-10">
                <h3 className="text-2xl font-medium tracking-tight text-white mb-4">Vitaminas e Nutrição Dérmica</h3>
                <p className="text-base text-white/90 mb-6 leading-relaxed">
                  Infusão de vitaminas e nutrientes essenciais diretamente na pele para hidratação profunda, luminosidade e proteção antioxidante.
                </p>
                <div>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-2.5 text-base text-white bg-[#824A2F] rounded-full hover:bg-[#6b3d27] transition-colors">
                    Agendar Avaliação
                  </a>
                </div>
              </div>
              <div className="h-56 md:h-auto md:w-1/2">
                <img src="/assets/specialty_vitaminas.png" alt="Nutrição Dérmica" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </section>


        {/* Section: Como funciona a sua jornada */}
        <section id="como-funcionamos" className="py-24 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#333333] mb-4">
            Como funciona o seu acompanhamento connosco?
          </h2>
          <p className="text-lg text-[#3b2c24] mb-20 max-w-2xl">
            um processo simples, transparente e focado em si, desde o primeiro contacto.
          </p>

          <div className="relative w-full flex flex-col md:flex-row justify-between items-start mb-16 gap-12 md:gap-0">
            {/* Step 1 */}
            <div className="w-full md:w-1/3 flex flex-col items-center relative bg-[#fcfaf8]">
              <h3 className="text-2xl font-medium tracking-tight text-[#824A2F] mb-4">Triagem Inicial</h3>
              <p className="text-base text-[#3b2c24] leading-relaxed max-w-[260px]">
                Entre em contacto via WhatsApp. A nossa equipa fará uma breve triagem para entender as suas necessidades e apresentar o valor do tratamento mais indicado para si.
              </p>
            </div>

            {/* Step 2 */}
            <div className="w-full md:w-1/3 flex flex-col items-center relative bg-[#fcfaf8]">
              <h3 className="text-2xl font-medium tracking-tight text-[#824A2F] mb-4">Consulta Médica</h3>
              <p className="text-base text-[#3b2c24] leading-relaxed max-w-[260px]">
                Agende a sua consulta com a nossa equipa médica especializada para elaborar um plano de tratamento personalizado.
              </p>
            </div>

            {/* Step 3 */}
            <div className="w-full md:w-1/3 flex flex-col items-center relative bg-[#fcfaf8]">
              <h3 className="text-2xl font-medium tracking-tight text-[#824A2F] mb-4">Tratamento & Cuidado</h3>
              <p className="text-base text-[#3b2c24] leading-relaxed max-w-[260px]">
                Realização do procedimento com máximo conforto, segurança e foco em resultados naturais.
              </p>
            </div>
          </div>

          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3.5 text-lg text-white bg-[#82533a] rounded-full hover:bg-[#6e4631] transition-colors">
            Dar o primeiro passo
          </a>
        </section>


        {/* Section: Clinical Gallery */}
        <AboutSpaceSection />


        {/* Section: FAQ */}
        <section className="py-24 max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#3b2c24] text-center mb-16">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-[2rem] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full bg-[#714b38] px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-[#634031] transition-colors text-left"
                >
                  <h3 className="text-xl text-white font-medium pr-4">{item.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    strokeWidth={1.5}
                  />
                </button>
                {openFaq === i && (
                  <div className="bg-[#f3e4d5] px-8 py-6">
                    <p className="text-base text-[#3b2c24] leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section: CTA */}
        <section className="py-24 bg-[#824A2F] text-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 leading-[1.1]">
              Preparada para elevar a sua<br />beleza de forma autêntica e segura?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
              O seu caminho para uma beleza natural e duradoura começa agora. A nossa equipa aguarda para oferecer-lhe uma experiência única.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-12 py-5 bg-[#eb9c7d] text-white rounded-full text-lg font-medium hover:bg-[#d48c70] transition-all transform hover:scale-105 shadow-2xl">
              Agendar Avaliação
            </a>
          </div>
        </section>

        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="bg-[#fcfaf8] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          <div className="flex flex-col">
            <span className="text-2xl font-medium tracking-tight uppercase text-[#3b2c24] mb-4">Galerie Clinic</span>
            <p className="text-lg text-[#3b2c24] mb-8 max-w-sm">
              Medicina estética de confiança no Porto, focada em resultados naturais e na sua individualidade.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/galerieclinic/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#82533a] text-white flex items-center justify-center hover:bg-[#6e4631] transition-colors">
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a href="https://www.facebook.com/p/Galerie-Clinic-100093459514050/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#82533a] text-white flex items-center justify-center hover:bg-[#6e4631] transition-colors">
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="text-xl font-medium text-[#3b2c24] mb-6">Contactos</h4>
            <p className="text-lg text-[#3b2c24] mb-4">
              Rua do Ouro, 736<br />
              Porto, Portugal 4150-549
            </p>
            <p className="text-lg text-[#3b2c24] mb-4">+351 916 660 005</p>
            <p className="text-lg text-[#3b2c24]">geral@galerieclinic.com</p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-xl font-medium text-[#3b2c24] mb-6">Links Úteis</h4>
            <div className="flex flex-col gap-3">
              <a href="#tratamentos" className="text-lg text-[#3b2c24] hover:text-[#824A2F] transition-colors">Tratamentos</a>
              <a href="#como-funcionamos" className="text-lg text-[#3b2c24] hover:text-[#824A2F] transition-colors">Como Funcionamos</a>
              <a href="#resultados" className="text-lg text-[#3b2c24] hover:text-[#824A2F] transition-colors">Resultados</a>
              <a href="#" className="text-lg text-[#3b2c24] hover:text-[#824A2F] transition-colors">Política de Privacidade</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-[#3b2c24]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base text-[#3b2c24]">
            © 2026 Galerie Clinic. Todos os direitos reservados.
          </p>
          <p className="text-base text-[#3b2c24]">
            Site Desenvolvido por <a href="https://marketingalphadigital.com.br/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#eb6625]">Alpha Marketing Digital</a>
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Contactar via WhatsApp"
      >
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-40"></span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.837L.057 23.527a.5.5 0 0 0 .638.635l5.74-1.503A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.946a9.946 9.946 0 0 1-5.092-1.399l-.364-.217-3.773.988.999-3.671-.237-.376A9.946 9.946 0 0 1 2.054 12C2.054 6.497 6.497 2.054 12 2.054S21.946 6.497 21.946 12 17.503 21.946 12 21.946z"/>
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/page2" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
