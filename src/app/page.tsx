import Link from 'next/link';
import { FileText, Code, Rocket, DollarSign, Users, Database, Smartphone, Globe, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🐂</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GaúchoGado</h1>
                <p className="text-sm text-gray-600">Sistema de Gestão para Pecuária de Corte</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link 
                href="/especificacao" 
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Ver Especificação
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-6">
            MVP - Produto Mínimo Viável
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Gestão Completa de Pecuária de Corte para o Rio Grande do Sul
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Sistema mobile + web com modo offline, relatórios zootécnicos, integração com balanças 
            e foco em usabilidade para o produtor rural gaúcho.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/especificacao" 
              className="px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105"
            >
              📄 Especificação Completa
            </Link>
            <Link 
              href="/wireframes" 
              className="px-8 py-4 bg-white text-emerald-700 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              🎨 Wireframes
            </Link>
            <Link 
              href="/arquitetura" 
              className="px-8 py-4 bg-white text-blue-700 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              🏗️ Arquitetura
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-emerald-600 mb-2">R$ 250k</div>
            <div className="text-gray-600 font-medium">Investimento MVP</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">6-7 meses</div>
            <div className="text-gray-600 font-medium">Até Lançamento</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">R$ 1.1M</div>
            <div className="text-gray-600 font-medium">ARR Ano 2</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">300%</div>
            <div className="text-gray-600 font-medium">ROI em 24 meses</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Navegação Rápida
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link href="/especificacao#personas" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-300 transition-all h-full">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Personas</h4>
              <p className="text-gray-600">
                Pequeno, médio e grande produtor. Perfis detalhados e necessidades específicas.
              </p>
            </div>
          </Link>

          <Link href="/especificacao#requisitos" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-300 transition-all h-full">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Requisitos</h4>
              <p className="text-gray-600">
                Funcionais e não-funcionais. Cadastros, eventos, offline-first e compliance LGPD.
              </p>
            </div>
          </Link>

          <Link href="/arquitetura" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-300 transition-all h-full">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Arquitetura</h4>
              <p className="text-gray-600">
                Stack técnico, banco de dados, infraestrutura AWS e estratégia offline.
              </p>
            </div>
          </Link>

          <Link href="/wireframes" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-pink-300 transition-all h-full">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                <Smartphone className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Wireframes</h4>
              <p className="text-gray-600">
                Telas mobile e web. Login, dashboard, ronda de campo, ficha do animal e relatórios.
              </p>
            </div>
          </Link>

          <Link href="/sprints" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-orange-300 transition-all h-full">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <Rocket className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Sprints</h4>
              <p className="text-gray-600">
                Plano de desenvolvimento em 6 sprints. User stories, tarefas e entregáveis.
              </p>
            </div>
          </Link>

          <Link href="/monetizacao" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-green-300 transition-all h-full">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Monetização</h4>
              <p className="text-gray-600">
                3 planos (R$ 99, R$ 349, R$ 1.499). Análise de mercado e projeção de receita.
              </p>
            </div>
          </Link>

          <Link href="/user-stories" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-indigo-300 transition-all h-full">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <Code className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">User Stories</h4>
              <p className="text-gray-600">
                26 user stories detalhadas com acceptance criteria e notas técnicas.
              </p>
            </div>
          </Link>

          <Link href="/testes" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-red-300 transition-all h-full">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Testes</h4>
              <p className="text-gray-600">
                Estratégia de testes, casos críticos e validação com fazendas piloto.
              </p>
            </div>
          </Link>

          <Link href="/lancamento" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-teal-300 transition-all h-full">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Lançamento</h4>
              <p className="text-gray-600">
                Fase piloto, lançamento soft e estratégia de go-to-market completa.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Diferenciais Competitivos
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="text-lg font-bold text-white mb-2">Offline-First</h4>
              <p className="text-emerald-100 text-sm">
                Sincronização robusta para zonas rurais
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-3">🗺️</div>
              <h4 className="text-lg font-bold text-white mb-2">Regional</h4>
              <p className="text-emerald-100 text-sm">
                Focado no produtor gaúcho
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="text-lg font-bold text-white mb-2">Preço</h4>
              <p className="text-emerald-100 text-sm">
                30-40% mais acessível
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-lg font-bold text-white mb-2">Usabilidade</h4>
              <p className="text-emerald-100 text-sm">
                Interface simplificada
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-4xl mb-3">🤝</div>
              <h4 className="text-lg font-bold text-white mb-2">Suporte</h4>
              <p className="text-emerald-100 text-sm">
                Conhecimento local
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pronto para Começar o Desenvolvimento?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Documentação técnica completa, arquitetura validada e plano de execução detalhado.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/especificacao" 
              className="px-8 py-4 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl"
            >
              📖 Ler Especificação Completa
            </Link>
            <a 
              href="#contato" 
              className="px-8 py-4 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl"
            >
              💬 Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="mb-2">
            <strong>GaúchoGado</strong> - Sistema de Gestão para Pecuária de Corte
          </p>
          <p className="text-sm">
            Especificação Técnica Completa v1.0 | Maio 2024
          </p>
          <p className="text-sm mt-2">
            Desenvolvido para produtores do Rio Grande do Sul
          </p>
        </div>
      </footer>
    </div>
  );
}
