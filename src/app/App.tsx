import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import whilabLogo from "@/imports/LOGO_1.png";
import {
  Globe,
  Palette,
  Instagram,
  Star,
  ArrowRight,
  Menu,
  X,
  Send,
  Twitter,
  Linkedin,
  Youtube,
  ChevronDown,
} from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const NAV_LINKS = ["Serviços", "Portfólio", "Sobre", "Contato"];

const SERVICES = [
  {
    icon: Globe,
    title: "Criação de Sites",
    desc: "Experiências digitais que convertem visitantes em clientes. Design responsivo, performance e identidade únicas.",
    tag: "WEB",
  },
  {
    icon: Palette,
    title: "Identidade Visual",
    desc: "Marcas que ficam na memória. Do logotipo ao manual de marca completo com visão estratégica.",
    tag: "BRAND",
  },
  {
    icon: Instagram,
    title: "Social Media",
    desc: "Artes e conteúdos visuais que param o scroll. Criatividade consistente para todas as plataformas.",
    tag: "SOCIAL",
  },
  {
    icon: Star,
    title: "Gestão para Criadores",
    desc: "Construímos a imagem de influenciadores e criadores de conteúdo com estratégia, estética e autoridade.",
    tag: "CREATOR",
  },
];

const PORTFOLIO = [
  { id: "photo-1558618666-fcd25c85cd64", name: "Aura Studios", cat: "Identidade Visual" },
  { id: "photo-1547658719-da2b51169166", name: "Flux Commerce", cat: "Site" },
  { id: "photo-1611532736597-de2d4265fba3", name: "@karenvibes", cat: "Gestão Creator" },
  { id: "photo-1634942537034-2531766767d1", name: "Nova Clínica", cat: "Social Media" },
  { id: "photo-1618005182384-a83a8bd57fbe", name: "Drift Agency", cat: "Identidade Visual" },
  { id: "photo-1677442135703-1787eea5ce01", name: "Vertex App", cat: "Site" },
];

const TESTIMONIALS = [
  {
    name: "Camila Rocha",
    handle: "@camilarocha",
    role: "Influenciadora de Moda",
    text: "A Whilab transformou minha presença digital. Em 3 meses meu engajamento triplicou e as marcas me procuram com muito mais frequência. Parceria top!",
    avatar: "CR",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Rafael Matos",
    handle: "CEO, Vertix Co.",
    role: "Startup de Tecnologia",
    text: "O site entregue superou todas as expectativas. Processo ágil, comunicação impecável e resultado final que realmente representa nossa marca.",
    avatar: "RM",
    color: "from-purple-500 to-violet-600",
  },
  {
    name: "Bia Ferreira",
    handle: "@biaferreira.fit",
    role: "Criadora de Conteúdo",
    text: "Finalmente encontrei uma agência que entende a linguagem dos criadores. A identidade visual que criaram pra mim é exatamente quem eu sou.",
    avatar: "BF",
    color: "from-fuchsia-500 to-pink-500",
  },
];

function Noise() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] w-full h-full" aria-hidden>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

function GlowOrb({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] opacity-25 ${className}`}
      aria-hidden
    />
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">
      <span className="h-px w-6 bg-accent" />
      {children}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0b0b12]/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => scrollTo("hero")} className="flex items-center" aria-label="Whilab — página inicial">
          <ImageWithFallback src={whilabLogo} alt="Whilab" className="h-8 w-auto object-contain" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contato")}
            className="ml-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/80 transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            Fale conosco
          </button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0b0b12]/95 backdrop-blur-md border-b border-border px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))}
              className="text-left text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contato")}
            className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
          >
            Fale conosco
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <GlowOrb className="w-[600px] h-[600px] bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <GlowOrb className="w-[300px] h-[300px] bg-fuchsia-500 top-[20%] right-[10%]" />
      <GlowOrb className="w-[200px] h-[200px] bg-violet-400 bottom-[20%] left-[5%]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Agência criativa para marcas que querem ser lembradas
        </div>

        <h1 className="mb-6 text-foreground">
          Criamos experiências digitais{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #c084fc 50%, #e879f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            extraordinárias.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          A Whilab une estratégia, design e tecnologia para criar experiências digitais que conquistam audiências e constroem marcas inesquecíveis.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/85 transition-all duration-300 hover:shadow-[0_0_32px_rgba(139,92,246,0.5)]"
          >
            Fale com a gente
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            Ver portfólio
          </button>
        </div>

        <button
          onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-16 text-muted-foreground/60 hover:text-muted-foreground transition-colors animate-bounce"
          aria-label="Scroll para baixo"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
}

function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="servicos" className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <SectionLabel>O que fazemos</SectionLabel>
          <h2 className="text-foreground max-w-xl">
            Tudo que sua marca precisa pra{" "}
            <span className="text-primary">dominar</span> o digital.
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SERVICES.map(({ icon: Icon, title, desc, tag }, i) => (
            <div
              key={title}
              style={{
                transitionDelay: `${i * 80}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/40 cursor-default flex flex-col gap-4 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] transition-all duration-300"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground/60">{tag}</span>

              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                <Icon size={20} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>

              <div className="mt-auto pt-2">
                <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Saiba mais <ArrowRight size={12} />
                </span>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const { ref, inView } = useInView();

  return (
    <section id="portfolio" className="py-28 px-6 relative overflow-hidden">
      <GlowOrb className="w-[500px] h-[500px] bg-fuchsia-600 top-1/2 right-[-10%] -translate-y-1/2 opacity-15" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <SectionLabel>Portfólio</SectionLabel>
            <h2 className="text-foreground">
              Trabalhos que{" "}
              <span className="text-primary">falam</span>{" "}
              por si.
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group shrink-0">
            Ver todos os projetos
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PORTFOLIO.map(({ id, name, cat }, i) => (
            <div
              key={name}
              style={{
                transitionDelay: `${i * 70}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0.96)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border aspect-[4/3] cursor-pointer"
            >
              <img
                src={`https://images.unsplash.com/${id}?w=600&h=450&fit=crop&auto=format`}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12]/90 via-[#0b0b12]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent/80 block mb-1">
                  {cat}
                </span>
                <h3 className="text-foreground text-base font-bold">{name}</h3>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <ArrowRight size={14} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();

  return (
    <section id="sobre" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <SectionLabel>Sobre a Whilab</SectionLabel>
            <h2 className="text-foreground mb-6">
              Não somos mais uma agência.<br />
              Somos seus{" "}
              <span className="text-primary">parceiros</span>{" "}
              criativos.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              A Whilab nasceu da crença de que toda marca tem uma história incrível pra contar — e o mundo digital é o melhor palco. Somos uma equipe jovem, apaixonada e sem filtro para criar.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nossa abordagem mistura visão estratégica com execução criativa impecável. Não entregamos templates. Entregamos identidade. Entregamos presença. Entregamos resultado.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { n: "80+", l: "Projetos entregues" },
                { n: "3x", l: "Crescimento médio de engajamento" },
                { n: "100%", l: "Clientes satisfeitos" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <div className="text-2xl font-extrabold text-primary font-['Plus_Jakarta_Sans'] mb-1">{n}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto border border-border">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop&auto=format"
                alt="Equipe Whilab trabalhando"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-md hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star size={18} className="text-primary" fill="currentColor" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Nota média 5.0</div>
                  <div className="text-xs text-muted-foreground">em todos os projetos</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-primary/30 hidden lg:block" aria-hidden />
            <div className="absolute top-8 right-8 w-8 h-8 rounded-full border border-accent/40 hidden lg:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { ref, inView } = useInView();

  return (
    <section id="depoimentos" className="py-28 px-6 relative overflow-hidden">
      <GlowOrb className="w-[400px] h-[400px] bg-violet-600 bottom-0 left-1/4 opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <SectionLabel>Depoimentos</SectionLabel>
          <h2 className="text-foreground">
            Quem trabalhou com a gente{" "}
            <span className="text-primary">conta.</span>
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {TESTIMONIALS.map(({ name, handle, role, text, avatar, color }, i) => (
            <div
              key={name}
              style={{
                transitionDelay: `${i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="text-accent" fill="currentColor" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{name}</div>
                  <div className="text-xs text-muted-foreground">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ nome: "", email: "", mensagem: "" });
  };

  return (
    <section id="contato" className="py-28 px-6 relative overflow-hidden">
      <GlowOrb className="w-[500px] h-[500px] bg-primary top-0 right-1/3 opacity-15" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div
            ref={ref}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <SectionLabel>Contato</SectionLabel>
            <h2 className="text-foreground mb-4">
              Pronto pra{" "}
              <span className="text-primary">começar?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Conta pra gente sobre seu projeto. A gente entra em contato em até 24h.
            </p>

            <div className="flex gap-4 mb-10">
              {[
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Twitter, label: "Twitter / X", href: "#" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { label: "Email", value: "oi@whilab.com.br" },
                { label: "WhatsApp", value: "+55 (11) 99999-0000" },
                { label: "Localização", value: "São Paulo, SP — Brasil" },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-xs text-muted-foreground/60 uppercase tracking-widest w-24 shrink-0 pt-0.5">{label}</span>
                  <span className="text-sm text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-primary/30 bg-primary/5">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Send size={24} className="text-primary" />
                </div>
                <h3 className="text-foreground mb-2">Mensagem enviada!</h3>
                <p className="text-muted-foreground text-sm">Em breve entraremos em contato. 🚀</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "nome", label: "Seu nome", type: "text", placeholder: "Como posso te chamar?" },
                  { key: "email", label: "Seu email", type: "email", placeholder: "seu@email.com" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-medium tracking-wide">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-medium tracking-wide">Mensagem</label>
                  <textarea
                    placeholder="Fala sobre seu projeto, sua marca, seus objetivos..."
                    rows={5}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/85 transition-all duration-300 hover:shadow-[0_0_28px_rgba(139,92,246,0.45)]"
                >
                  Enviar mensagem
                  <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <ImageWithFallback src={whilabLogo} alt="Whilab" className="h-7 w-auto object-contain" />
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Whilab. Todos os direitos reservados.
        </p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
          <a href="#" className="hover:text-foreground transition-colors">Termos</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
      <Noise />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
