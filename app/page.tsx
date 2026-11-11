"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight, BadgeCheck, BarChart3, Building2, Check, ChevronDown,
  CircleDollarSign, Clock3, FileSearch, Landmark, LayoutDashboard,
  Menu, Play, Search, ShieldCheck, Sparkles, X
} from "lucide-react";

const benefits = [
  { icon: Search, title: "Localização pelo CNPJ", text: "Cadastre sua empresa e o RecebeGov busca os contratos federais vinculados ao CNPJ." },
  { icon: CircleDollarSign, title: "Recebimentos organizados", text: "Identifique valor, data, unidade e contrato de origem de cada pagamento." },
  { icon: LayoutDashboard, title: "Visão gerencial", text: "Acompanhe emissões, recebimentos e evolução mensal em dashboards intuitivos." },
  { icon: Building2, title: "Múltiplas unidades", text: "Centralize contratos atendidos por diferentes órgãos e unidades federais." },
  { icon: Clock3, title: "Menos trabalho manual", text: "Reduza consultas repetitivas, conferências dispersas e dependência de planilhas." },
  { icon: ShieldCheck, title: "Acesso pela web", text: "Use a plataforma online, sem instalação, com uma experiência simples para sua equipe." }
];

const faqs = [
  ["O RecebeGov atende contratos estaduais e municipais?", "Neste momento, o MVP atende contratos da esfera federal. A expansão para estados e municípios faz parte do roadmap e dependerá de parcerias e integrações com os respectivos entes."],
  ["Como os contratos são encontrados?", "Após o cadastro da empresa, o RecebeGov busca os contratos federais vinculados ao CNPJ e organiza os dados na plataforma."],
  ["Preciso instalar algum programa?", "Não. O RecebeGov é uma solução SaaS e funciona pela web."],
  ["Quanto custa participar do programa piloto?", "A participação será gratuita para as empresas selecionadas durante o período de validação."],
  ["O RecebeGov substitui meu ERP?", "Não. A plataforma complementa os sistemas existentes, com foco no acompanhamento de contratos federais, notas e recebimentos."],
  ["Posso sugerir funcionalidades?", "Sim. O objetivo do piloto é validar o produto em cenários reais e priorizar melhorias com base no feedback dos participantes."]
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error();
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="RecebeGov, início">
          <span className="brand-mark"><Landmark size={21} /></span>
          <span>Recebe<span>Gov</span></span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#beneficios" onClick={() => setMenuOpen(false)}>Benefícios</a>
          <a href="#demonstracao" onClick={() => setMenuOpen(false)}>Demonstração</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>Dúvidas</a>
          <a className="button small" href="#piloto" onClick={() => setMenuOpen(false)}>Participar do piloto</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={16}/> Programa piloto para fornecedores do Governo Federal</div>
          <h1>Controle os recebimentos dos seus <span>contratos federais</span></h1>
          <p className="lead">Cadastre o CNPJ. O RecebeGov localiza os contratos federais vinculados à sua empresa e organiza notas, pagamentos e indicadores em um único lugar.</p>
          <div className="hero-actions">
            <a className="button" href="#piloto">Quero participar <ArrowRight size={18}/></a>
            <a className="button ghost" href="#demonstracao"><Play size={17} fill="currentColor"/> Ver demonstração</a>
          </div>
          <div className="trust-row">
            <span><Check size={16}/> Sem instalação</span>
            <span><Check size={16}/> Implantação simples</span>
            <span><Check size={16}/> Piloto gratuito</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glow"></div>
          <Image src="/dashboard-recebimentos.png" alt="Dashboard do RecebeGov com indicadores de recebimentos" width={1500} height={670} priority />
          <div className="floating-card"><BadgeCheck size={20}/><span><b>Busca automática</b><small>Contratos pelo CNPJ</small></span></div>
        </div>
      </section>

      <section className="logo-strip" aria-label="Destaques do produto">
        <span>Contratos federais</span><i></i><span>Notas de pagamento</span><i></i><span>Ordens bancárias</span><i></i><span>Dashboards financeiros</span>
      </section>

      <section className="section problem">
        <div className="section-heading centered">
          <span className="kicker">O desafio</span>
          <h2>Muitos contratos. Várias unidades. Informações dispersas.</h2>
          <p>Quando uma empresa atende diferentes órgãos federais, descobrir quais notas foram pagas, quando e por qual contrato exige tempo e controles paralelos.</p>
        </div>
        <div className="problem-grid">
          <div className="problem-card"><FileSearch/><h3>Consultas repetitivas</h3><p>Informações espalhadas entre portais, documentos, e-mails e planilhas.</p></div>
          <div className="problem-card"><Building2/><h3>Muitas unidades</h3><p>Dificuldade para relacionar pagamentos aos contratos e locais atendidos.</p></div>
          <div className="problem-card"><BarChart3/><h3>Pouca previsibilidade</h3><p>Visão limitada dos recebimentos e do fluxo financeiro dos contratos.</p></div>
        </div>
      </section>

      <section className="section how" id="como-funciona">
        <div className="section-heading">
          <span className="kicker">Simples desde o primeiro acesso</span>
          <h2>Do CNPJ ao painel em poucos passos</h2>
          <p>O RecebeGov reduz o esforço inicial para que sua equipe possa se concentrar no acompanhamento financeiro.</p>
        </div>
        <div className="steps">
          {[
            ["01", "Cadastre a empresa", "Informe os dados da empresa e o CNPJ que será monitorado."],
            ["02", "Localizamos os contratos", "A plataforma busca os contratos federais vinculados ao CNPJ."],
            ["03", "Organizamos os dados", "Contratos, unidades, notas e movimentações ficam centralizados."],
            ["04", "Acompanhe os recebimentos", "Consulte valores, datas e indicadores em painéis intuitivos."]
          ].map(([n,t,d]) => <div className="step" key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></div>)}
        </div>
        <div className="scope-note"><Landmark/><div><b>Foco atual: esfera federal</b><p>A cobertura de estados e municípios está prevista no roadmap e dependerá de parcerias e integrações com os respectivos entes públicos.</p></div></div>
      </section>

      <section className="section benefits" id="beneficios">
        <div className="section-heading centered"><span className="kicker">Benefícios</span><h2>Mais clareza para sua operação financeira</h2></div>
        <div className="benefit-grid">{benefits.map(({icon:Icon,title,text}) => <article className="benefit" key={title}><span><Icon/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section video-section" id="demonstracao">
        <div className="section-heading centered"><span className="kicker">Veja o produto em ação</span><h2>Entenda o RecebeGov em menos de 2 minutos</h2><p>Substitua o endereço abaixo pelo vídeo final publicado no YouTube ou Vimeo.</p></div>
        <div className="video-frame">
          <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="Demonstração do RecebeGov" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <div className="video-placeholder"><span><Play fill="currentColor"/></span><b>Vídeo de demonstração</b><small>Troque VIDEO_ID em app/page.tsx pelo código do seu vídeo</small></div>
        </div>
      </section>

      <section className="section showcase">
        <div className="showcase-row">
          <div><span className="kicker">Dashboard de recebimentos</span><h2>Saiba quanto recebeu e acompanhe a evolução mensal</h2><p>Visualize o total recebido, ordens bancárias, notas de pagamento e a distribuição dos valores ao longo do tempo.</p><ul><li><Check/> Indicadores consolidados</li><li><Check/> Evolução mensal dos recebimentos</li><li><Check/> Consulta por contrato e unidade</li></ul></div>
          <Image src="/dashboard-recebimentos.png" alt="Dashboard de recebimentos do RecebeGov" width={1500} height={670}/>
        </div>
        <div className="showcase-row reverse">
          <div><span className="kicker">Dashboard de emissões</span><h2>Acompanhe o faturamento dos contratos</h2><p>Analise valores emitidos, médias mensais e histórico de registros para apoiar o planejamento financeiro.</p><ul><li><Check/> Visão consolidada do período</li><li><Check/> Filtros para análises específicas</li><li><Check/> Comparação entre emissões e recebimentos</li></ul></div>
          <Image src="/dashboard-emissoes.png" alt="Dashboard de emissões do RecebeGov" width={1500} height={670}/>
        </div>
      </section>

      <section className="section pilot" id="piloto">
        <div className="pilot-copy">
          <span className="kicker light">Programa piloto</span>
          <h2>Ajude a construir a melhor experiência para fornecedores do Governo Federal</h2>
          <p>Estamos selecionando empresas para testar o MVP em cenários reais e contribuir com a evolução do RecebeGov.</p>
          <ul>
            <li><Check/> Acesso gratuito durante o piloto</li>
            <li><Check/> Implantação e apoio direto da equipe</li>
            <li><Check/> Canal aberto para sugestões</li>
            <li><Check/> Influência no roadmap do produto</li>
            <li><Check/> Condições especiais no lançamento</li>
          </ul>
          <div className="ideal"><b>Perfil ideal</b><p>Empresas com contratos federais ativos, múltiplas unidades atendidas ou volume relevante de notas mensais.</p></div>
        </div>
        <form className="lead-form" onSubmit={submitLead}>
          <div className="form-heading"><h3>Solicite participação</h3><p>Conte um pouco sobre sua empresa. A equipe entrará em contato para apresentar os próximos passos.</p></div>
          <div className="form-grid">
            <label>Nome da empresa<input name="empresa" required placeholder="Razão social ou nome fantasia"/></label>
            <label>CNPJ<input name="cnpj" required placeholder="00.000.000/0000-00"/></label>
            <label>Nome do responsável<input name="responsavel" required placeholder="Seu nome"/></label>
            <label>Cargo<input name="cargo" required placeholder="Ex.: Financeiro, Diretor"/></label>
            <label>E-mail corporativo<input type="email" name="email" required placeholder="nome@empresa.com.br"/></label>
            <label>WhatsApp<input name="whatsapp" required placeholder="(00) 00000-0000"/></label>
            <label>Contratos federais ativos<select name="contratos" required defaultValue=""><option value="" disabled>Selecione</option><option>1 a 3</option><option>4 a 10</option><option>11 a 30</option><option>Mais de 30</option></select></label>
            <label>Notas emitidas por mês<select name="notas" required defaultValue=""><option value="" disabled>Selecione</option><option>Até 10</option><option>11 a 30</option><option>31 a 100</option><option>Mais de 100</option></select></label>
            <label className="full">Principal dificuldade<textarea name="dificuldade" rows={4} placeholder="Como sua empresa acompanha os pagamentos atualmente?"></textarea></label>
          </div>
          <label className="consent"><input type="checkbox" name="consentimento" required/><span>Autorizo o contato da Gestão Maker sobre o programa piloto e concordo com o tratamento dos dados para esta finalidade.</span></label>
          <button className="button submit" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Quero participar do piloto"}<ArrowRight/></button>
          {status === "success" && <p className="form-message success">Inscrição enviada. A equipe entrará em contato.</p>}
          {status === "error" && <p className="form-message error">Não foi possível enviar. Verifique as variáveis do Resend no Vercel.</p>}
        </form>
      </section>

      <section className="section faq" id="faq">
        <div className="section-heading centered"><span className="kicker">Perguntas frequentes</span><h2>Dúvidas sobre o RecebeGov</h2></div>
        <div className="faq-list">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="final-cta"><div><span>Pronto para simplificar o acompanhamento?</span><h2>Participe do programa piloto do RecebeGov.</h2></div><a className="button white" href="#piloto">Solicitar participação <ArrowRight/></a></section>

      <footer>
        <div className="footer-main">
          <div><a className="brand light-brand" href="#inicio"><span className="brand-mark"><Landmark size={21}/></span><span>Recebe<span>Gov</span></span></a><p>Gestão de recebíveis para empresas fornecedoras do Governo Federal.</p></div>
          <div><b>Navegação</b><a href="#como-funciona">Como funciona</a><a href="#beneficios">Benefícios</a><a href="#demonstracao">Demonstração</a><a href="#piloto">Programa piloto</a></div>
          <div><b>Responsável</b><span>Gestão Maker Soluções e Negócios</span><span>CNPJ 51.719.861/0001-65</span></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Gestão Maker Soluções e Negócios. Todos os direitos reservados.</span><span>O RecebeGov é uma plataforma privada e não possui vínculo institucional com órgãos da Administração Pública.</span></div>
      </footer>
    </main>
  );
}
