import Link from 'next/link';
import { ArrowLeft, Database, Server, Cloud, Lock, Zap, RefreshCw } from 'lucide-react';

export default function ArquiteturaPage() {
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
            <h1 className="text-xl font-bold text-gray-900">Arquitetura Técnica</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Visão Geral */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">🏗️ Visão Geral da Arquitetura</h2>
          <p className="text-lg text-blue-50 leading-relaxed mb-4">
            Arquitetura moderna, escalável e resiliente baseada em microserviços, 
            com foco em <strong className="text-white">offline-first</strong> para o mobile e 
            <strong className="text-white"> multi-tenant</strong> para isolamento de dados por fazenda.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-bold mb-1">Mobile-First</h3>
              <p className="text-sm text-blue-100">React Native com SQLite local e sincronização inteligente</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">☁️</div>
              <h3 className="font-bold mb-1">Cloud Native</h3>
              <p className="text-sm text-blue-100">AWS com containers, auto-scaling e alta disponibilidade</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-bold mb-1">Seguro</h3>
              <p className="text-sm text-blue-100">Multi-tenant, criptografia end-to-end e compliance LGPD</p>
            </div>
          </div>
        </section>

        {/* Diagrama de Componentes */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📐 Diagrama de Componentes</h2>
          
          <div className="space-y-4">
            {/* Camada de Apresentação */}
            <div className="border-2 border-purple-300 rounded-xl p-6 bg-purple-50">
              <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📱</span>
                CAMADA DE APRESENTAÇÃO
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2">Mobile App (React Native)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Offline-first com SQLite</li>
                    <li>• Push notifications (FCM)</li>
                    <li>• Camera integration</li>
                    <li>• Bluetooth (balanças)</li>
                    <li>• Geolocalização</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2">Web Dashboard (Next.js 15)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Server-side rendering</li>
                    <li>• Static generation</li>
                    <li>• Advanced charts (Recharts)</li>
                    <li>• Export features</li>
                    <li>• Admin panel</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* API Gateway */}
            <div className="border-2 border-blue-300 rounded-xl p-6 bg-blue-50">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🚪</span>
                API GATEWAY (Kong / AWS API Gateway)
              </h3>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
                  <Lock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Authentication</p>
                  <p className="text-xs text-gray-600">JWT validation</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
                  <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Rate Limiting</p>
                  <p className="text-xs text-gray-600">100 req/min</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
                  <Server className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Logging</p>
                  <p className="text-xs text-gray-600">Request tracking</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
                  <RefreshCw className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">WebSocket</p>
                  <p className="text-xs text-gray-600">Real-time sync</p>
                </div>
              </div>
            </div>

            {/* Camada de Aplicação */}
            <div className="border-2 border-emerald-300 rounded-xl p-6 bg-emerald-50">
              <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                CAMADA DE APLICAÇÃO
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <h4 className="font-bold text-gray-900 mb-2">REST API (Node.js + Express)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Auth service</li>
                    <li>• Animal CRUD</li>
                    <li>• Event service</li>
                    <li>• Report service</li>
                    <li>• User management</li>
                    <li>• Multi-tenant logic</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <h4 className="font-bold text-gray-900 mb-2">Background Jobs (Bull + Redis)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• CSV import processor</li>
                    <li>• Report generator</li>
                    <li>• Sync conflict resolver</li>
                    <li>• Notification sender</li>
                    <li>• Backup scheduler</li>
                    <li>• Analytics aggregator</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Camada de Dados */}
            <div className="border-2 border-orange-300 rounded-xl p-6 bg-orange-50">
              <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">💾</span>
                CAMADA DE DADOS
              </h3>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <Database className="w-8 h-8 text-orange-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">PostgreSQL 14+</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Multi-tenant schema</li>
                    <li>• Particionamento</li>
                    <li>• Replicação</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <Zap className="w-8 h-8 text-orange-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Redis</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Sessions</li>
                    <li>• Job queue</li>
                    <li>• Rate limiting</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <Cloud className="w-8 h-8 text-orange-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">MinIO/S3</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Photos</li>
                    <li>• Reports</li>
                    <li>• Backups</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <Server className="w-8 h-8 text-orange-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Elasticsearch</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Animal search</li>
                    <li>• Event search</li>
                    <li>• Autocomplete</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Infraestrutura */}
            <div className="border-2 border-gray-300 rounded-xl p-6 bg-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">☁️</span>
                INFRAESTRUTURA (AWS São Paulo)
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <h4 className="font-bold text-gray-900 mb-2">Compute</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• ECS/Fargate (containers)</li>
                    <li>• Auto-scaling</li>
                    <li>• Load balancer (ALB)</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <h4 className="font-bold text-gray-900 mb-2">Storage & DB</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• RDS PostgreSQL (Multi-AZ)</li>
                    <li>• S3 (fotos, backups)</li>
                    <li>• ElastiCache (Redis)</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <h4 className="font-bold text-gray-900 mb-2">Monitoring</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• CloudWatch (logs, metrics)</li>
                    <li>• CloudFront (CDN)</li>
                    <li>• SNS (notificações)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modelo de Dados */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🗄️ Modelo de Dados Principal</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">📊 Tabela: fazendas</h3>
              <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-blue-200 overflow-x-auto">
                <div className="space-y-1">
                  <div><span className="text-blue-600">id</span> UUID PRIMARY KEY</div>
                  <div><span className="text-blue-600">nome</span> VARCHAR(200) NOT NULL</div>
                  <div><span className="text-blue-600">cnpj</span> VARCHAR(18)</div>
                  <div><span className="text-blue-600">inscricao_estadual</span> VARCHAR(50)</div>
                  <div><span className="text-blue-600">endereco</span> JSONB</div>
                  <div><span className="text-blue-600">area_total_ha</span> DECIMAL(10,2)</div>
                  <div><span className="text-blue-600">plano</span> VARCHAR(50) -- starter, pro, enterprise</div>
                  <div><span className="text-blue-600">ativo</span> BOOLEAN DEFAULT true</div>
                  <div><span className="text-blue-600">created_at</span> TIMESTAMP DEFAULT NOW()</div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">👤 Tabela: usuarios</h3>
              <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-emerald-200 overflow-x-auto">
                <div className="space-y-1">
                  <div><span className="text-emerald-600">id</span> UUID PRIMARY KEY</div>
                  <div><span className="text-emerald-600">fazenda_id</span> UUID REFERENCES fazendas(id)</div>
                  <div><span className="text-emerald-600">nome</span> VARCHAR(200) NOT NULL</div>
                  <div><span className="text-emerald-600">email</span> VARCHAR(200) UNIQUE NOT NULL</div>
                  <div><span className="text-emerald-600">senha_hash</span> VARCHAR(255)</div>
                  <div><span className="text-emerald-600">role</span> VARCHAR(50) -- proprietario, gestor, peao, tecnico</div>
                  <div><span className="text-emerald-600">telefone</span> VARCHAR(20)</div>
                  <div><span className="text-emerald-600">ativo</span> BOOLEAN DEFAULT true</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">🐂 Tabela: animais</h3>
              <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-purple-200 overflow-x-auto">
                <div className="space-y-1">
                  <div><span className="text-purple-600">id</span> UUID PRIMARY KEY</div>
                  <div><span className="text-purple-600">fazenda_id</span> UUID REFERENCES fazendas(id)</div>
                  <div><span className="text-purple-600">identificador</span> VARCHAR(50) UNIQUE NOT NULL -- brinco</div>
                  <div><span className="text-purple-600">sexo</span> CHAR(1) CHECK (sexo IN ('M', 'F'))</div>
                  <div><span className="text-purple-600">data_nascimento</span> DATE</div>
                  <div><span className="text-purple-600">origem</span> VARCHAR(200)</div>
                  <div><span className="text-purple-600">raca</span> VARCHAR(100)</div>
                  <div><span className="text-purple-600">genetica</span> JSONB -- pai, mãe, linhagem</div>
                  <div><span className="text-purple-600">lote_atual_id</span> UUID</div>
                  <div><span className="text-purple-600">status</span> VARCHAR(50) -- ativo, vendido, morto</div>
                  <div><span className="text-purple-600">fotos</span> TEXT[] -- URLs S3</div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">📝 Tabela: eventos</h3>
              <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-orange-200 overflow-x-auto">
                <div className="space-y-1">
                  <div><span className="text-orange-600">id</span> UUID PRIMARY KEY</div>
                  <div><span className="text-orange-600">animal_id</span> UUID REFERENCES animais(id)</div>
                  <div><span className="text-orange-600">tipo</span> VARCHAR(50) NOT NULL -- vacinacao, tratamento, pesagem</div>
                  <div><span className="text-orange-600">data_evento</span> TIMESTAMP NOT NULL</div>
                  <div><span className="text-orange-600">usuario_id</span> UUID REFERENCES usuarios(id)</div>
                  <div><span className="text-orange-600">dados</span> JSONB NOT NULL -- campos específicos por tipo</div>
                  <div><span className="text-orange-600">sincronizado</span> BOOLEAN DEFAULT false -- controle offline</div>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-xl">
              <h3 className="font-bold text-gray-900 mb-2">⚖️ Tabela: pesagens</h3>
              <div className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-pink-200 overflow-x-auto">
                <div className="space-y-1">
                  <div><span className="text-pink-600">id</span> UUID PRIMARY KEY</div>
                  <div><span className="text-pink-600">animal_id</span> UUID REFERENCES animais(id)</div>
                  <div><span className="text-pink-600">data_pesagem</span> DATE NOT NULL</div>
                  <div><span className="text-pink-600">peso_kg</span> DECIMAL(8,2) NOT NULL</div>
                  <div><span className="text-pink-600">metodo</span> VARCHAR(50) -- manual, balanca_eletronica</div>
                  <div><span className="text-pink-600">usuario_id</span> UUID REFERENCES usuarios(id)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-100 rounded-xl p-4 border border-gray-300">
            <h3 className="font-bold text-gray-900 mb-2">🔑 Índices para Performance</h3>
            <div className="text-sm text-gray-700 font-mono space-y-1">
              <div>CREATE INDEX idx_animais_fazenda ON animais(fazenda_id);</div>
              <div>CREATE INDEX idx_animais_status ON animais(status);</div>
              <div>CREATE INDEX idx_eventos_animal ON eventos(animal_id);</div>
              <div>CREATE INDEX idx_eventos_data ON eventos(data_evento);</div>
              <div>CREATE INDEX idx_pesagens_animal ON pesagens(animal_id);</div>
            </div>
          </div>
        </section>

        {/* Estratégia Offline */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📱 Estratégia Offline-First</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔄 Fluxo de Sincronização</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Ação do Usuário (Offline)</h4>
                    <p className="text-sm text-gray-700">Dados salvos em SQLite local com flag <code className="bg-white px-2 py-1 rounded">sincronizado: false</code></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Reconexão de Rede</h4>
                    <p className="text-sm text-gray-700">Sync Engine detecta conexão e inicia processo automático</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Envio de Operações Pendentes</h4>
                    <p className="text-sm text-gray-700">Fila processada em ordem cronológica (FIFO) com retry automático</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Resolução de Conflitos</h4>
                    <p className="text-sm text-gray-700">Last-write-wins baseado em timestamp. Conflitos críticos logados para revisão</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Atualização Local</h4>
                    <p className="text-sm text-gray-700">Baixa mudanças do servidor desde último sync e aplica no SQLite</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <h3 className="font-bold text-gray-900 mb-3">✅ Vantagens</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Funciona 100% sem internet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Zero perda de dados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Sincronização transparente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Performance nativa</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h3 className="font-bold text-gray-900 mb-3">⚠️ Desafios</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Conflitos de dados simultâneos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Gestão de espaço local (SQLite)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Complexidade de testes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Retry logic e error handling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stack Tecnológico */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Stack Tecnológico Recomendado</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Frontend</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="font-semibold text-gray-900">Mobile</p>
                  <p className="text-sm text-gray-600">React Native 0.73+</p>
                  <p className="text-xs text-gray-500">ou Flutter 3.x</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="font-semibold text-gray-900">Web</p>
                  <p className="text-sm text-gray-600">Next.js 15 + React 19</p>
                  <p className="text-xs text-gray-500">Tailwind CSS v4</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="font-semibold text-gray-900">Charts</p>
                  <p className="text-sm text-gray-600">Recharts / Victory</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Backend</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-emerald-100">
                  <p className="font-semibold text-gray-900">Runtime</p>
                  <p className="text-sm text-gray-600">Node.js 20 LTS</p>
                  <p className="text-xs text-gray-500">Express 4.x</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-emerald-100">
                  <p className="font-semibold text-gray-900">Database</p>
                  <p className="text-sm text-gray-600">PostgreSQL 14+</p>
                  <p className="text-xs text-gray-500">PostGIS para geo</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-emerald-100">
                  <p className="font-semibold text-gray-900">Queue</p>
                  <p className="text-sm text-gray-600">Bull + Redis 7+</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-4 text-center">DevOps</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-purple-100">
                  <p className="font-semibold text-gray-900">Cloud</p>
                  <p className="text-sm text-gray-600">AWS (São Paulo)</p>
                  <p className="text-xs text-gray-500">ECS/Fargate</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-100">
                  <p className="font-semibold text-gray-900">CI/CD</p>
                  <p className="text-sm text-gray-600">GitHub Actions</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-100">
                  <p className="font-semibold text-gray-900">Monitoring</p>
                  <p className="text-sm text-gray-600">Sentry + CloudWatch</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Próximos Passos</h3>
          <p className="text-blue-50 mb-6">
            Explore os wireframes das telas e o plano detalhado de sprints.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/wireframes" 
              className="px-6 py-3 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-all font-semibold shadow-lg"
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
