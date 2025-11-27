import Link from 'next/link';
import { ArrowLeft, Users, CheckCircle, AlertCircle, Globe, Shield, Zap } from 'lucide-react';

export default function EspecificacaoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Especificação Técnica Completa</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Sumário Executivo */}
        <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">📋 Sumário Executivo</h2>
          <p className="text-lg text-emerald-50 leading-relaxed">
            <strong>GaúchoGado</strong> é um sistema completo de gestão para pecuária de corte, projetado especificamente 
            para produtores do Rio Grande do Sul. O MVP foca em resolver os principais desafios do produtor rural: 
            <strong className="text-white"> conectividade intermitente, usabilidade simplificada e gestão zootécnica/financeira eficiente</strong>.
          </p>
        </section>

        {/* Personas */}
        <section id="personas" className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">🎯 Personas e Casos de Uso</h2>
          </div>

          <div className="space-y-6">
            {/* Persona 1 */}
            <div className="border-l-4 border-emerald-500 pl-6 py-4 bg-emerald-50 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Persona 1: João - Pequeno Produtor Familiar
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-700 mb-2">📊 Perfil:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>150 cabeças de gado</li>
                    <li>Propriedade de 80 hectares</li>
                    <li>Manejo a pasto tradicional</li>
                    <li>1-2 funcionários</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">😰 Dores:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Controle manual em cadernos</li>
                    <li>Esquece vacinações importantes</li>
                    <li>Não sabe custo real por animal</li>
                    <li>Dificuldade em tomar decisões</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">✅ Necessidades:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>App simples e intuitivo</li>
                    <li>Funciona sem internet</li>
                    <li>Lembretes automáticos</li>
                    <li>Relatórios básicos</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">💰 Orçamento:</p>
                  <p className="text-gray-600">Até <strong className="text-emerald-700">R$ 150/mês</strong></p>
                  <p className="text-xs text-gray-500 mt-1">~R$ 0,33/animal/mês</p>
                </div>
              </div>
            </div>

            {/* Persona 2 */}
            <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Persona 2: Maria - Produtora Média
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-700 mb-2">📊 Perfil:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>800 cabeças de gado</li>
                    <li>3 funcionários fixos</li>
                    <li>Balança eletrônica</li>
                    <li>Gestão mais profissional</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">😰 Dores:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Planilhas desorganizadas</li>
                    <li>Dificuldade calcular ADG</li>
                    <li>Sem histórico confiável</li>
                    <li>Perda de dados importantes</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">✅ Necessidades:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Relatórios zootécnicos</li>
                    <li>Integração com balança</li>
                    <li>Exportação para contador</li>
                    <li>Controle financeiro</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">💰 Orçamento:</p>
                  <p className="text-gray-600"><strong className="text-blue-700">R$ 300-500/mês</strong></p>
                  <p className="text-xs text-gray-500 mt-1">~R$ 0,17/animal/mês (800 cabeças)</p>
                </div>
              </div>
            </div>

            {/* Persona 3 */}
            <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Persona 3: Cooperativa Vale do Pampa
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-700 mb-2">📊 Perfil:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>5.000 cabeças de gado</li>
                    <li>15 usuários simultâneos</li>
                    <li>Múltiplas propriedades</li>
                    <li>Operação corporativa</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">😰 Dores:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Falta de padronização</li>
                    <li>Dificuldade consolidar dados</li>
                    <li>Sem rastreabilidade</li>
                    <li>Múltiplos sistemas legados</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">✅ Necessidades:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Multiusuário com permissões</li>
                    <li>Dashboards executivos</li>
                    <li>API para ERP</li>
                    <li>SLA e suporte 24/7</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-2">💰 Orçamento:</p>
                  <p className="text-gray-600"><strong className="text-purple-700">R$ 1.500-3.000/mês</strong></p>
                  <p className="text-xs text-gray-500 mt-1">+ implantação personalizada</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requisitos Funcionais */}
        <section id="requisitos" className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">✅ Requisitos Funcionais - MVP</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">🏠 Cadastros Base</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Cadastro de fazenda, propriedades, pastagens e currais</li>
                <li>Cadastro individual ou em lote de animais (brinco, sexo, data nascimento, origem, genética)</li>
                <li>Upload de fotos e anexos por animal</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">📝 Eventos e Manejos</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Registro de vacinação, tratamentos, inseminação/serviço, pesagens</li>
                <li>Registro de morte/saída, transferência de lote</li>
                <li>Rondas no campo via app mobile com <strong>modo offline</strong></li>
                <li>Sincronização automática ao reconectar</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">⚖️ Pesagem e Integração</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Pesagem manual e importação via CSV</li>
                <li>Integração com balanças (Bluetooth/USB)</li>
                <li>Cálculo automático de ADG (ganho de peso médio diário)</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">📊 Relatórios e Análises</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Relatórios zootécnicos: taxa de prenhez, ADG, mortalidade, descarte</li>
                <li>Relatórios financeiros: custo por cabeça, custo por kg ganho, receitas por lote</li>
                <li>Exportação em CSV, Excel e PDF</li>
              </ul>
            </div>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">🔔 Agenda e Notificações</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Agenda de manejos com lembretes automáticos</li>
                <li>Notificações push para vacinação, inseminação, manejo de pasto</li>
                <li>Calendário visual com eventos agendados</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">👥 Multiusuário e Permissões</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Roles: proprietário, gestor, peão, técnico</li>
                <li>Permissões granulares por funcionalidade</li>
                <li>Convite de usuários por email</li>
              </ul>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">🔒 Segurança e Compliance</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Conformidade LGPD: consentimento, exportação e exclusão de dados</li>
                <li>Backup automático em nuvem</li>
                <li>Suporte para pt-BR, CEP, CNPJ, inscrições estaduais</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Requisitos Não-Funcionais */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">⚡ Requisitos Não-Funcionais</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Plataformas
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Mobile:</strong> Android + iOS (React Native ou Flutter)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Web:</strong> React/Vue com dashboards avançados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Prioridade:</strong> Android (maior uso no campo)</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Backend e Infraestrutura
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Backend:</strong> Node.js/Python com REST/GraphQL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Banco:</strong> PostgreSQL com multi-tenant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Storage:</strong> S3 compatible (MinIO/AWS)</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="font-bold text-gray-900 mb-3">🔐 Segurança</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Autenticação:</strong> OAuth2 + MFA opcional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Criptografia:</strong> TLS em trânsito, at-rest para dados sensíveis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Tokens:</strong> JWT com expiração e refresh</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="font-bold text-gray-900 mb-3">📱 Offline-First</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Mobile:</strong> SQLite local + sync engine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Sincronização:</strong> Automática ao reconectar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Conflitos:</strong> Last-write-wins com timestamp</span>
                </li>
              </ul>
            </div>

            <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
              <h3 className="font-bold text-gray-900 mb-3">📊 Escalabilidade</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">•</span>
                  <span><strong>Multi-tenant:</strong> Cada fazenda = tenant isolado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">•</span>
                  <span><strong>Particionamento:</strong> Dados por fazenda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 font-bold">•</span>
                  <span><strong>Cache:</strong> Redis para sessões e filas</span>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="font-bold text-gray-900 mb-3">📈 Monitoramento</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Telemetria:</strong> Eventos de uso, telas acessadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Logs:</strong> CloudWatch/Sentry para erros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Performance:</strong> APM para otimizações</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Funcionalidades Fase 2+ */}
        <section className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold">🚀 Funcionalidades Avançadas (Fase 2+)</h2>
          </div>
          <p className="text-gray-300 mb-4">
            Recursos planejados para versões futuras, após validação do MVP:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="font-bold mb-2 text-yellow-400">🤖 Inteligência Artificial</h3>
              <p className="text-sm text-gray-300">
                Detecção de anomalias (queda de ganho de peso, surtos sanitários) e sugestões de manejo automatizadas.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="font-bold mb-2 text-blue-400">📡 IoT e Sensores</h3>
              <p className="text-sm text-gray-300">
                Integração com coleiras e sensores para monitoramento de cio, saúde e localização em tempo real.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="font-bold mb-2 text-green-400">🛒 Marketplace Integrado</h3>
              <p className="text-sm text-gray-300">
                Compra/venda de lotes, leilões online e integração com plataformas agropecuárias locais.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <h3 className="font-bold mb-2 text-purple-400">🏷️ Rastreabilidade</h3>
              <p className="text-sm text-gray-300">
                Módulo de certificações e integração com SISBOV para rastreamento oficial do rebanho.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Próximos Passos</h3>
          <p className="text-emerald-50 mb-6">
            Explore a arquitetura técnica, wireframes e plano de sprints detalhado.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/arquitetura" 
              className="px-6 py-3 bg-white text-emerald-700 rounded-xl hover:bg-emerald-50 transition-all font-semibold shadow-lg"
            >
              🏗️ Ver Arquitetura
            </Link>
            <Link 
              href="/wireframes" 
              className="px-6 py-3 bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 transition-all font-semibold shadow-lg"
            >
              🎨 Ver Wireframes
            </Link>
            <Link 
              href="/sprints" 
              className="px-6 py-3 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-all font-semibold shadow-lg"
            >
              📅 Plano de Sprints
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
