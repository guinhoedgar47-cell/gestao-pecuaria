'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, Activity, FileText, Settings, Plus, Search, 
  TrendingUp, AlertCircle, Calendar, Weight, Syringe, 
  MapPin, Download, Filter, ChevronRight, Menu, X, Edit, Trash2, LogOut
} from 'lucide-react';

// Tipos
type Animal = {
  id: string;
  identificador: string;
  sexo: 'Macho' | 'Fêmea';
  dataNascimento: string;
  peso: number;
  lote: string;
  status: 'Ativo' | 'Vendido' | 'Morto';
};

type Evento = {
  id: string;
  animalId: string;
  tipo: 'Vacinação' | 'Pesagem' | 'Tratamento' | 'Inseminação';
  data: string;
  descricao: string;
  valor?: number;
};

type Pesagem = {
  id: string;
  animalId: string;
  pesoEntrada: number;
  pesoSaida: number;
  dataEntrada: string;
  dataSaida: string;
  gmd: number;
  diasPeriodo: number;
};

// Função para formatar data de forma consistente
const formatarData = (dataString: string): string => {
  const [ano, mes, dia] = dataString.split('-');
  return `${dia}/${mes}/${ano}`;
};

// Função para calcular GMD
const calcularGMD = (pesoEntrada: number, pesoSaida: number, dataEntrada: string, dataSaida: string): { gmd: number; dias: number } => {
  const entrada = new Date(dataEntrada);
  const saida = new Date(dataSaida);
  const dias = Math.floor((saida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24));
  
  if (dias <= 0) return { gmd: 0, dias: 0 };
  
  const ganhoPeso = pesoSaida - pesoEntrada;
  const gmd = ganhoPeso / dias;
  
  return { gmd: parseFloat(gmd.toFixed(2)), dias };
};

export default function BoiGauchoApp() {
  const router = useRouter();
  const [montado, setMontado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [telaAtiva, setTelaAtiva] = useState<'dashboard' | 'animais' | 'eventos' | 'relatorios' | 'pesagem'>('dashboard');
  const [modalAberto, setModalAberto] = useState<'animal' | 'evento' | 'pesagem' | null>(null);
  const [busca, setBusca] = useState('');
  const [pesagemEditando, setPesagemEditando] = useState<string | null>(null);

  // Garantir que o componente está montado no cliente
  useEffect(() => {
    setMontado(true);
  }, []);

  // Função de logout
  const handleLogout = async () => {
    if (confirm('Deseja realmente sair do sistema?')) {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  };

  // Dados mockados realistas
  const [animais, setAnimais] = useState<Animal[]>([
    { id: '1', identificador: 'BV-001', sexo: 'Macho', dataNascimento: '2022-03-15', peso: 450, lote: 'Engorda A', status: 'Ativo' },
    { id: '2', identificador: 'BV-002', sexo: 'Fêmea', dataNascimento: '2021-08-20', peso: 380, lote: 'Cria B', status: 'Ativo' },
    { id: '3', identificador: 'BV-003', sexo: 'Macho', dataNascimento: '2022-01-10', peso: 520, lote: 'Engorda A', status: 'Ativo' },
    { id: '4', identificador: 'BV-004', sexo: 'Fêmea', dataNascimento: '2021-11-05', peso: 410, lote: 'Recria C', status: 'Ativo' },
    { id: '5', identificador: 'BV-005', sexo: 'Macho', dataNascimento: '2022-05-22', peso: 390, lote: 'Engorda A', status: 'Ativo' },
  ]);

  const [eventos, setEventos] = useState<Evento[]>([
    { id: '1', animalId: '1', tipo: 'Vacinação', data: '2024-01-15', descricao: 'Vacina contra febre aftosa' },
    { id: '2', animalId: '1', tipo: 'Pesagem', data: '2024-01-20', descricao: 'Pesagem mensal', valor: 450 },
    { id: '3', animalId: '2', tipo: 'Tratamento', data: '2024-01-18', descricao: 'Vermífugo' },
    { id: '4', animalId: '3', tipo: 'Pesagem', data: '2024-01-20', descricao: 'Pesagem mensal', valor: 520 },
  ]);

  const [pesagens, setPesagens] = useState<Pesagem[]>([
    { 
      id: '1', 
      animalId: '1', 
      pesoEntrada: 400, 
      pesoSaida: 450, 
      dataEntrada: '2023-12-01', 
      dataSaida: '2024-01-20',
      gmd: 1.0,
      diasPeriodo: 50
    },
    { 
      id: '2', 
      animalId: '3', 
      pesoEntrada: 480, 
      pesoSaida: 520, 
      dataEntrada: '2023-12-15', 
      dataSaida: '2024-01-20',
      gmd: 1.1,
      diasPeriodo: 36
    },
  ]);

  // Formulários
  const [novoAnimal, setNovoAnimal] = useState({
    identificador: '',
    sexo: 'Macho' as 'Macho' | 'Fêmea',
    dataNascimento: '',
    peso: '',
    lote: '',
  });

  const [novoEvento, setNovoEvento] = useState({
    animalId: '',
    tipo: 'Vacinação' as 'Vacinação' | 'Pesagem' | 'Tratamento' | 'Inseminação',
    data: '',
    descricao: '',
    valor: '',
  });

  const [novaPesagem, setNovaPesagem] = useState({
    animalId: '',
    pesoEntrada: '',
    pesoSaida: '',
    dataEntrada: '',
    dataSaida: '',
  });

  // Funções
  const adicionarAnimal = () => {
    if (!novoAnimal.identificador || !novoAnimal.dataNascimento || !novoAnimal.peso || !novoAnimal.lote) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const animal: Animal = {
      id: Date.now().toString(),
      identificador: novoAnimal.identificador,
      sexo: novoAnimal.sexo,
      dataNascimento: novoAnimal.dataNascimento,
      peso: parseFloat(novoAnimal.peso),
      lote: novoAnimal.lote,
      status: 'Ativo',
    };

    setAnimais([...animais, animal]);
    setNovoAnimal({ identificador: '', sexo: 'Macho', dataNascimento: '', peso: '', lote: '' });
    setModalAberto(null);
  };

  const adicionarEvento = () => {
    if (!novoEvento.animalId || !novoEvento.data || !novoEvento.descricao) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const evento: Evento = {
      id: Date.now().toString(),
      animalId: novoEvento.animalId,
      tipo: novoEvento.tipo,
      data: novoEvento.data,
      descricao: novoEvento.descricao,
      valor: novoEvento.valor ? parseFloat(novoEvento.valor) : undefined,
    };

    setEventos([...eventos, evento]);
    setNovoEvento({ animalId: '', tipo: 'Vacinação', data: '', descricao: '', valor: '' });
    setModalAberto(null);
  };

  const adicionarPesagem = () => {
    if (!novaPesagem.animalId || !novaPesagem.pesoEntrada || !novaPesagem.pesoSaida || !novaPesagem.dataEntrada || !novaPesagem.dataSaida) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const pesoEntrada = parseFloat(novaPesagem.pesoEntrada);
    const pesoSaida = parseFloat(novaPesagem.pesoSaida);
    
    if (pesoSaida <= pesoEntrada) {
      alert('O peso de saída deve ser maior que o peso de entrada');
      return;
    }

    const { gmd, dias } = calcularGMD(pesoEntrada, pesoSaida, novaPesagem.dataEntrada, novaPesagem.dataSaida);

    if (dias <= 0) {
      alert('A data de saída deve ser posterior à data de entrada');
      return;
    }

    const pesagem: Pesagem = {
      id: Date.now().toString(),
      animalId: novaPesagem.animalId,
      pesoEntrada,
      pesoSaida,
      dataEntrada: novaPesagem.dataEntrada,
      dataSaida: novaPesagem.dataSaida,
      gmd,
      diasPeriodo: dias,
    };

    setPesagens([...pesagens, pesagem]);
    
    // Atualizar peso do animal
    setAnimais(animais.map(a => 
      a.id === novaPesagem.animalId ? { ...a, peso: pesoSaida } : a
    ));

    setNovaPesagem({ animalId: '', pesoEntrada: '', pesoSaida: '', dataEntrada: '', dataSaida: '' });
    setModalAberto(null);
  };

  const editarPesagem = (id: string) => {
    const pesagem = pesagens.find(p => p.id === id);
    if (pesagem) {
      setNovaPesagem({
        animalId: pesagem.animalId,
        pesoEntrada: pesagem.pesoEntrada.toString(),
        pesoSaida: pesagem.pesoSaida.toString(),
        dataEntrada: pesagem.dataEntrada,
        dataSaida: pesagem.dataSaida,
      });
      setPesagemEditando(id);
      setModalAberto('pesagem');
    }
  };

  const atualizarPesagem = () => {
    if (!pesagemEditando) return;

    const pesoEntrada = parseFloat(novaPesagem.pesoEntrada);
    const pesoSaida = parseFloat(novaPesagem.pesoSaida);
    
    if (pesoSaida <= pesoEntrada) {
      alert('O peso de saída deve ser maior que o peso de entrada');
      return;
    }

    const { gmd, dias } = calcularGMD(pesoEntrada, pesoSaida, novaPesagem.dataEntrada, novaPesagem.dataSaida);

    if (dias <= 0) {
      alert('A data de saída deve ser posterior à data de entrada');
      return;
    }

    setPesagens(pesagens.map(p => 
      p.id === pesagemEditando 
        ? { ...p, pesoEntrada, pesoSaida, dataEntrada: novaPesagem.dataEntrada, dataSaida: novaPesagem.dataSaida, gmd, diasPeriodo: dias }
        : p
    ));

    // Atualizar peso do animal
    setAnimais(animais.map(a => 
      a.id === novaPesagem.animalId ? { ...a, peso: pesoSaida } : a
    ));

    setNovaPesagem({ animalId: '', pesoEntrada: '', pesoSaida: '', dataEntrada: '', dataSaida: '' });
    setPesagemEditando(null);
    setModalAberto(null);
  };

  const excluirPesagem = (id: string) => {
    if (confirm('Deseja realmente excluir esta pesagem?')) {
      setPesagens(pesagens.filter(p => p.id !== id));
    }
  };

  // Cálculos
  const totalAnimais = animais.filter(a => a.status === 'Ativo').length;
  const pesoMedio = animais.filter(a => a.status === 'Ativo').reduce((acc, a) => acc + a.peso, 0) / totalAnimais || 0;
  const gmdMedio = pesagens.length > 0 ? pesagens.reduce((acc, p) => acc + p.gmd, 0) / pesagens.length : 0;
  const taxaMortalidade = 2.1; // % (mockado)

  const animaisFiltrados = animais.filter(a => 
    a.identificador.toLowerCase().includes(busca.toLowerCase()) ||
    a.lote.toLowerCase().includes(busca.toLowerCase())
  );

  // Prevenir hydration mismatch - renderizar apenas após montagem
  if (!montado) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e16c024c-6e17-4dbb-9bba-143d7418359f.jpg" 
              alt="Boi Gaúcho Mascote" 
              className="w-16 h-16 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Boi Gaúcho</h1>
              <p className="text-xs text-gray-500">Fazenda São José</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setTelaAtiva('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              telaAtiva === 'dashboard' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => setTelaAtiva('animais')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              telaAtiva === 'animais' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-2xl">🐂</span>
            <span className="font-medium">Animais</span>
          </button>
          <button
            onClick={() => setTelaAtiva('pesagem')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              telaAtiva === 'pesagem' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Weight className="w-5 h-5" />
            <span className="font-medium">Pesagem</span>
          </button>
          <button
            onClick={() => setTelaAtiva('eventos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              telaAtiva === 'eventos' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium">Eventos</span>
          </button>
          <button
            onClick={() => setTelaAtiva('relatorios')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              telaAtiva === 'relatorios' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Relatórios</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Menu Mobile */}
      {menuAberto && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setMenuAberto(false)}>
          <div className="w-64 bg-white h-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e16c024c-6e17-4dbb-9bba-143d7418359f.jpg" 
                  alt="Boi Gaúcho Mascote" 
                  className="w-12 h-12 object-contain rounded-lg"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Boi Gaúcho</h1>
                  <p className="text-xs text-gray-500">Fazenda São José</p>
                </div>
              </div>
              <button onClick={() => setMenuAberto(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <nav className="p-4 flex-1">
              <button
                onClick={() => { setTelaAtiva('dashboard'); setMenuAberto(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  telaAtiva === 'dashboard' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => { setTelaAtiva('animais'); setMenuAberto(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  telaAtiva === 'animais' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">🐂</span>
                <span className="font-medium">Animais</span>
              </button>
              <button
                onClick={() => { setTelaAtiva('pesagem'); setMenuAberto(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  telaAtiva === 'pesagem' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Weight className="w-5 h-5" />
                <span className="font-medium">Pesagem</span>
              </button>
              <button
                onClick={() => { setTelaAtiva('eventos'); setMenuAberto(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  telaAtiva === 'eventos' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span className="font-medium">Eventos</span>
              </button>
              <button
                onClick={() => { setTelaAtiva('relatorios'); setMenuAberto(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  telaAtiva === 'relatorios' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Relatórios</span>
              </button>
            </nav>

            <div className="p-4 border-t border-gray-200 absolute bottom-0 w-full bg-white">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setMenuAberto(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
                <div className="flex items-center gap-3">
                  <img 
                    src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e16c024c-6e17-4dbb-9bba-143d7418359f.jpg" 
                    alt="Boi Gaúcho" 
                    className="w-12 h-12 object-contain lg:hidden"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {telaAtiva === 'dashboard' && 'Dashboard'}
                      {telaAtiva === 'animais' && 'Gestão de Animais'}
                      {telaAtiva === 'pesagem' && 'Controle de Pesagem'}
                      {telaAtiva === 'eventos' && 'Registro de Eventos'}
                      {telaAtiva === 'relatorios' && 'Relatórios Zootécnicos'}
                    </h2>
                    <p className="text-sm text-gray-500">Bem-vindo ao sistema de gestão</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Online</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Dashboard */}
          {telaAtiva === 'dashboard' && (
            <div className="space-y-6">
              {/* Cards de Métricas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🐂</span>
                    </div>
                    <span className="text-emerald-600 text-sm font-medium">+12%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{totalAnimais}</h3>
                  <p className="text-sm text-gray-500">Animais Ativos</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Weight className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-blue-600 text-sm font-medium">+8%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{pesoMedio.toFixed(0)} kg</h3>
                  <p className="text-sm text-gray-500">Peso Médio</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-purple-600 text-sm font-medium">{gmdMedio > 0 ? 'Ótimo' : 'N/A'}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{gmdMedio > 0 ? gmdMedio.toFixed(2) : '0.00'} kg/dia</h3>
                  <p className="text-sm text-gray-500">GMD Médio do Rebanho</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-orange-600 text-sm font-medium">Baixo</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{taxaMortalidade}%</h3>
                  <p className="text-sm text-gray-500">Taxa de Mortalidade</p>
                </div>
              </div>

              {/* Eventos Recentes e Ações Rápidas */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Eventos Recentes</h3>
                    <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
                      Ver todos
                    </button>
                  </div>
                  <div className="space-y-3">
                    {eventos.slice(0, 5).map(evento => {
                      const animal = animais.find(a => a.id === evento.animalId);
                      return (
                        <div key={evento.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            evento.tipo === 'Vacinação' ? 'bg-blue-100' :
                            evento.tipo === 'Pesagem' ? 'bg-purple-100' :
                            evento.tipo === 'Tratamento' ? 'bg-orange-100' :
                            'bg-pink-100'
                          }`}>
                            {evento.tipo === 'Vacinação' && <Syringe className="w-5 h-5 text-blue-600" />}
                            {evento.tipo === 'Pesagem' && <Weight className="w-5 h-5 text-purple-600" />}
                            {evento.tipo === 'Tratamento' && <AlertCircle className="w-5 h-5 text-orange-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{animal?.identificador} - {evento.tipo}</p>
                            <p className="text-xs text-gray-500">{evento.descricao}</p>
                          </div>
                          <span className="text-xs text-gray-400">{formatarData(evento.data)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setModalAberto('animal')}
                      className="flex flex-col items-center gap-2 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      <Plus className="w-6 h-6 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">Novo Animal</span>
                    </button>
                    <button
                      onClick={() => setModalAberto('evento')}
                      className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Novo Evento</span>
                    </button>
                    <button 
                      onClick={() => setModalAberto('pesagem')}
                      className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <Weight className="w-6 h-6 text-purple-600" />
                      <span className="text-sm font-medium text-purple-700">Nova Pesagem</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                      <MapPin className="w-6 h-6 text-orange-600" />
                      <span className="text-sm font-medium text-orange-700">Ronda</span>
                    </button>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg text-white">
                    <h4 className="font-bold mb-2">Próxima Vacinação</h4>
                    <p className="text-sm text-emerald-100">Lote Engorda A - 15/02/2024</p>
                    <p className="text-xs text-emerald-200 mt-1">Vacina contra clostridioses</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gestão de Animais */}
          {telaAtiva === 'animais' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex-1 w-full sm:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por identificador ou lote..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filtros</span>
                  </button>
                  <button
                    onClick={() => setModalAberto('animal')}
                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Novo Animal</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Identificador</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peso</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {animaisFiltrados.map(animal => {
                        const idade = Math.floor((new Date().getTime() - new Date(animal.dataNascimento).getTime()) / (1000 * 60 * 60 * 24 * 30));
                        return (
                          <tr key={animal.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                  <span className="text-emerald-700 font-bold text-sm">{animal.identificador.split('-')[1]}</span>
                                </div>
                                <span className="font-medium text-gray-900">{animal.identificador}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{animal.sexo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{idade} meses</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{animal.peso} kg</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                                {animal.lote}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                animal.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                                animal.status === 'Vendido' ? 'bg-gray-100 text-gray-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {animal.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                                Ver detalhes
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Controle de Pesagem */}
          {telaAtiva === 'pesagem' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Controle individual de peso de entrada, saída e GMD de cada animal</p>
                <button
                  onClick={() => {
                    setNovaPesagem({ animalId: '', pesoEntrada: '', pesoSaida: '', dataEntrada: '', dataSaida: '' });
                    setPesagemEditando(null);
                    setModalAberto('pesagem');
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Nova Pesagem</span>
                </button>
              </div>

              <div className="grid gap-4">
                {pesagens.map(pesagem => {
                  const animal = animais.find(a => a.id === pesagem.animalId);
                  const ganhoPeso = pesagem.pesoSaida - pesagem.pesoEntrada;
                  
                  return (
                    <div key={pesagem.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Weight className="w-8 h-8 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{animal?.identificador}</h4>
                            <p className="text-sm text-gray-600">{animal?.lote} • {animal?.sexo}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editarPesagem(pesagem.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => excluirPesagem(pesagem.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-xs text-blue-600 font-medium mb-1">Peso de Entrada</p>
                          <p className="text-2xl font-bold text-blue-900">{pesagem.pesoEntrada} kg</p>
                          <p className="text-xs text-blue-600 mt-1">{formatarData(pesagem.dataEntrada)}</p>
                        </div>

                        <div className="bg-emerald-50 rounded-lg p-4">
                          <p className="text-xs text-emerald-600 font-medium mb-1">Peso de Saída</p>
                          <p className="text-2xl font-bold text-emerald-900">{pesagem.pesoSaida} kg</p>
                          <p className="text-xs text-emerald-600 mt-1">{formatarData(pesagem.dataSaida)}</p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4">
                          <p className="text-xs text-purple-600 font-medium mb-1">Ganho Total</p>
                          <p className="text-2xl font-bold text-purple-900">+{ganhoPeso} kg</p>
                          <p className="text-xs text-purple-600 mt-1">em {pesagem.diasPeriodo} dias</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4">
                          <p className="text-xs text-orange-600 font-medium mb-1">GMD</p>
                          <p className="text-2xl font-bold text-orange-900">{pesagem.gmd} kg/dia</p>
                          <p className="text-xs text-orange-600 mt-1">
                            {pesagem.gmd >= 1.5 ? 'Excelente' : pesagem.gmd >= 1.0 ? 'Bom' : pesagem.gmd >= 0.7 ? 'Regular' : 'Baixo'}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-600 font-medium mb-1">Período</p>
                          <p className="text-2xl font-bold text-gray-900">{pesagem.diasPeriodo}</p>
                          <p className="text-xs text-gray-600 mt-1">dias de confinamento</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {pesagens.length === 0 && (
                  <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
                    <Weight className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhuma pesagem registrada</h3>
                    <p className="text-gray-600 mb-4">Comece registrando a primeira pesagem dos seus animais</p>
                    <button
                      onClick={() => setModalAberto('pesagem')}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Registrar Primeira Pesagem</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Eventos */}
          {telaAtiva === 'eventos' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Registre vacinações, pesagens, tratamentos e outros eventos</p>
                <button
                  onClick={() => setModalAberto('evento')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Novo Evento</span>
                </button>
              </div>

              <div className="grid gap-4">
                {eventos.map(evento => {
                  const animal = animais.find(a => a.id === evento.animalId);
                  return (
                    <div key={evento.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          evento.tipo === 'Vacinação' ? 'bg-blue-100' :
                          evento.tipo === 'Pesagem' ? 'bg-purple-100' :
                          evento.tipo === 'Tratamento' ? 'bg-orange-100' :
                          'bg-pink-100'
                        }`}>
                          {evento.tipo === 'Vacinação' && <Syringe className="w-6 h-6 text-blue-600" />}
                          {evento.tipo === 'Pesagem' && <Weight className="w-6 h-6 text-purple-600" />}
                          {evento.tipo === 'Tratamento' && <AlertCircle className="w-6 h-6 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-gray-900">{evento.tipo}</h4>
                              <p className="text-sm text-gray-600">{animal?.identificador} - {animal?.lote}</p>
                            </div>
                            <span className="text-sm text-gray-500">{formatarData(evento.data)}</span>
                          </div>
                          <p className="text-gray-700">{evento.descricao}</p>
                          {evento.valor && (
                            <p className="text-sm text-gray-600 mt-2">Peso registrado: <span className="font-medium">{evento.valor} kg</span></p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Relatórios */}
          {telaAtiva === 'relatorios' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Análises zootécnicas e financeiras da sua propriedade</p>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Exportar PDF</span>
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Indicadores Zootécnicos</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">GMD Médio do Rebanho</span>
                      <span className="font-bold text-emerald-600">{gmdMedio > 0 ? gmdMedio.toFixed(2) : '0.00'} kg/dia</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Taxa de Mortalidade</span>
                      <span className="font-bold text-orange-600">{taxaMortalidade}%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Peso Médio do Rebanho</span>
                      <span className="font-bold text-blue-600">{pesoMedio.toFixed(0)} kg</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Taxa de Prenhez</span>
                      <span className="font-bold text-purple-600">87%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Análise Financeira</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Custo por Cabeça</span>
                      <span className="font-bold text-gray-900">R$ 1.850,00</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Custo por kg Ganho</span>
                      <span className="font-bold text-gray-900">R$ 8,50</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Receita Estimada</span>
                      <span className="font-bold text-emerald-600">R$ 285.000,00</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Margem de Lucro</span>
                      <span className="font-bold text-emerald-600">18,5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Distribuição por Lote</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-bold text-emerald-700 mb-2">Engorda A</h4>
                    <p className="text-2xl font-bold text-gray-900">3 animais</p>
                    <p className="text-sm text-gray-600">Peso médio: 453 kg</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-700 mb-2">Cria B</h4>
                    <p className="text-2xl font-bold text-gray-900">1 animal</p>
                    <p className="text-sm text-gray-600">Peso médio: 380 kg</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-bold text-purple-700 mb-2">Recria C</h4>
                    <p className="text-2xl font-bold text-gray-900">1 animal</p>
                    <p className="text-sm text-gray-600">Peso médio: 410 kg</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal Novo Animal */}
      {modalAberto === 'animal' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModalAberto(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cadastrar Novo Animal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identificador *</label>
                <input
                  type="text"
                  value={novoAnimal.identificador}
                  onChange={(e) => setNovoAnimal({...novoAnimal, identificador: e.target.value})}
                  placeholder="Ex: BV-006"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexo *</label>
                <select
                  value={novoAnimal.sexo}
                  onChange={(e) => setNovoAnimal({...novoAnimal, sexo: e.target.value as 'Macho' | 'Fêmea'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
                <input
                  type="date"
                  value={novoAnimal.dataNascimento}
                  onChange={(e) => setNovoAnimal({...novoAnimal, dataNascimento: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg) *</label>
                <input
                  type="number"
                  value={novoAnimal.peso}
                  onChange={(e) => setNovoAnimal({...novoAnimal, peso: e.target.value})}
                  placeholder="Ex: 450"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lote *</label>
                <input
                  type="text"
                  value={novoAnimal.lote}
                  onChange={(e) => setNovoAnimal({...novoAnimal, lote: e.target.value})}
                  placeholder="Ex: Engorda A"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModalAberto(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={adicionarAnimal}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Evento */}
      {modalAberto === 'evento' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setModalAberto(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Registrar Novo Evento</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Animal *</label>
                <select
                  value={novoEvento.animalId}
                  onChange={(e) => setNovoEvento({...novoEvento, animalId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Selecione um animal</option>
                  {animais.filter(a => a.status === 'Ativo').map(animal => (
                    <option key={animal.id} value={animal.id}>
                      {animal.identificador} - {animal.lote}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento *</label>
                <select
                  value={novoEvento.tipo}
                  onChange={(e) => setNovoEvento({...novoEvento, tipo: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="Vacinação">Vacinação</option>
                  <option value="Pesagem">Pesagem</option>
                  <option value="Tratamento">Tratamento</option>
                  <option value="Inseminação">Inseminação</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
                <input
                  type="date"
                  value={novoEvento.data}
                  onChange={(e) => setNovoEvento({...novoEvento, data: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
                <textarea
                  value={novoEvento.descricao}
                  onChange={(e) => setNovoEvento({...novoEvento, descricao: e.target.value})}
                  placeholder="Descreva o evento..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              {novoEvento.tipo === 'Pesagem' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    value={novoEvento.valor}
                    onChange={(e) => setNovoEvento({...novoEvento, valor: e.target.value})}
                    placeholder="Ex: 450"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModalAberto(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={adicionarEvento}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nova Pesagem */}
      {modalAberto === 'pesagem' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setModalAberto(null); setPesagemEditando(null); }}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {pesagemEditando ? 'Editar Pesagem' : 'Registrar Nova Pesagem'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Animal *</label>
                <select
                  value={novaPesagem.animalId}
                  onChange={(e) => setNovaPesagem({...novaPesagem, animalId: e.target.value})}
                  disabled={!!pesagemEditando}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Selecione um animal</option>
                  {animais.filter(a => a.status === 'Ativo').map(animal => (
                    <option key={animal.id} value={animal.id}>
                      {animal.identificador} - {animal.lote}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso de Entrada (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={novaPesagem.pesoEntrada}
                    onChange={(e) => setNovaPesagem({...novaPesagem, pesoEntrada: e.target.value})}
                    placeholder="Ex: 400"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Entrada *</label>
                  <input
                    type="date"
                    value={novaPesagem.dataEntrada}
                    onChange={(e) => setNovaPesagem({...novaPesagem, dataEntrada: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso de Saída (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={novaPesagem.pesoSaida}
                    onChange={(e) => setNovaPesagem({...novaPesagem, pesoSaida: e.target.value})}
                    placeholder="Ex: 450"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Saída *</label>
                  <input
                    type="date"
                    value={novaPesagem.dataSaida}
                    onChange={(e) => setNovaPesagem({...novaPesagem, dataSaida: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              {novaPesagem.pesoEntrada && novaPesagem.pesoSaida && novaPesagem.dataEntrada && novaPesagem.dataSaida && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-purple-700 font-medium mb-2">Prévia do Cálculo:</p>
                  <div className="space-y-1">
                    <p className="text-xs text-purple-600">
                      Ganho: {(parseFloat(novaPesagem.pesoSaida) - parseFloat(novaPesagem.pesoEntrada)).toFixed(1)} kg
                    </p>
                    <p className="text-xs text-purple-600">
                      Período: {calcularGMD(
                        parseFloat(novaPesagem.pesoEntrada), 
                        parseFloat(novaPesagem.pesoSaida), 
                        novaPesagem.dataEntrada, 
                        novaPesagem.dataSaida
                      ).dias} dias
                    </p>
                    <p className="text-lg font-bold text-purple-900">
                      GMD: {calcularGMD(
                        parseFloat(novaPesagem.pesoEntrada), 
                        parseFloat(novaPesagem.pesoSaida), 
                        novaPesagem.dataEntrada, 
                        novaPesagem.dataSaida
                      ).gmd} kg/dia
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setModalAberto(null); setPesagemEditando(null); }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={pesagemEditando ? atualizarPesagem : adicionarPesagem}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                {pesagemEditando ? 'Atualizar' : 'Registrar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
