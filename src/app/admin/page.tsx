'use client';

import { useState } from 'react';
import { Download, Upload, Save, Database, FileJson, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Dados mockados do app para backup
  const appData = {
    animais: [
      { id: '1', identificador: 'BV-001', sexo: 'Macho', dataNascimento: '2022-03-15', peso: 450, lote: 'Engorda A', status: 'Ativo', pesoCompra: 400, dataCompra: '2023-12-01' },
      { id: '2', identificador: 'BV-002', sexo: 'Fêmea', dataNascimento: '2021-08-20', peso: 380, lote: 'Cria B', status: 'Ativo', pesoCompra: 350, dataCompra: '2023-11-15' },
      { id: '3', identificador: 'BV-003', sexo: 'Macho', dataNascimento: '2022-01-10', peso: 520, lote: 'Engorda A', status: 'Ativo', pesoCompra: 480, dataCompra: '2023-12-15' },
      { id: '4', identificador: 'BV-004', sexo: 'Fêmea', dataNascimento: '2021-11-05', peso: 410, lote: 'Recria C', status: 'Ativo', pesoCompra: 380, dataCompra: '2023-11-20' },
      { id: '5', identificador: 'BV-005', sexo: 'Macho', dataNascimento: '2022-05-22', peso: 390, lote: 'Engorda A', status: 'Ativo', pesoCompra: 360, dataCompra: '2023-12-10' },
    ],
    eventos: [
      { id: '1', animalId: '1', tipo: 'Vacinação', data: '2024-01-15', descricao: 'Vacina contra febre aftosa' },
      { id: '2', animalId: '1', tipo: 'Pesagem', data: '2024-01-20', descricao: 'Pesagem mensal', valor: 450 },
      { id: '3', animalId: '2', tipo: 'Tratamento', data: '2024-01-18', descricao: 'Vermífugo' },
      { id: '4', animalId: '3', tipo: 'Pesagem', data: '2024-01-20', descricao: 'Pesagem mensal', valor: 520 },
    ],
    pesagens: [
      { id: '1', animalId: '1', pesoEntrada: 400, pesoSaida: 450, dataEntrada: '2023-12-01', dataSaida: '2024-01-20', gmd: 1.0, diasPeriodo: 50 },
      { id: '2', animalId: '3', pesoEntrada: 480, pesoSaida: 520, dataEntrada: '2023-12-15', dataSaida: '2024-01-20', gmd: 1.1, diasPeriodo: 36 },
    ],
    eventosRonda: [
      { id: '1', animalId: '1', invernada: 'Invernada Norte', tipoEvento: 'Comportamento Anormal', descricao: 'Animal isolado do grupo', data: '2024-01-22', hora: '08:30', observacoes: 'Monitorar nas próximas 24h' },
      { id: '2', animalId: '2', invernada: 'Invernada Sul', tipoEvento: 'Ferimento', descricao: 'Pequeno corte na pata traseira', data: '2024-01-21', hora: '14:15', observacoes: 'Aplicado spray cicatrizante' },
    ],
    metadata: {
      appName: 'Boi Gaúcho',
      version: '1.0.0',
      lastBackup: new Date().toISOString(),
      totalAnimais: 5,
      totalEventos: 4,
    }
  };

  const handleDownloadBackup = () => {
    try {
      const dataStr = JSON.stringify(appData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `boi-gaucho-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setStatus('success');
      setMessage('Backup baixado com sucesso! Guarde este arquivo em local seguro.');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao criar backup. Tente novamente.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleSaveToLocalStorage = () => {
    try {
      localStorage.setItem('boi-gaucho-backup', JSON.stringify(appData));
      setStatus('success');
      setMessage('Dados salvos no navegador com sucesso!');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao salvar no navegador. Tente fazer download do backup.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleLoadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('boi-gaucho-backup');
      if (saved) {
        const data = JSON.parse(saved);
        setStatus('success');
        setMessage(`Backup encontrado! ${data.metadata.totalAnimais} animais, ${data.metadata.totalEventos} eventos.`);
      } else {
        setStatus('error');
        setMessage('Nenhum backup encontrado no navegador.');
      }
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao carregar backup do navegador.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Database className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
              <p className="text-gray-600">Boi Gaúcho - Gestão de Backup e Dados</p>
            </div>
          </div>

          {/* Status Message */}
          {status !== 'idle' && (
            <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
              status === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              {status === 'success' ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
              <p className={`text-sm font-medium ${
                status === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Estatísticas */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🐂</span>
              <span className="text-emerald-600 text-sm font-medium">Ativos</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{appData.metadata.totalAnimais}</h3>
            <p className="text-sm text-gray-600">Animais cadastrados</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">📋</span>
              <span className="text-blue-600 text-sm font-medium">Registros</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{appData.metadata.totalEventos}</h3>
            <p className="text-sm text-gray-600">Eventos registrados</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">⚖️</span>
              <span className="text-purple-600 text-sm font-medium">Pesagens</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{appData.pesagens.length}</h3>
            <p className="text-sm text-gray-600">Controles de peso</p>
          </div>
        </div>

        {/* Ações de Backup */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Gerenciar Backup</h2>
          <div className="space-y-4">
            {/* Download Backup */}
            <div className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-gray-900">Baixar Backup Completo</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Faça download de todos os dados em formato JSON. Guarde este arquivo em local seguro para restaurar depois.
                  </p>
                  <button
                    onClick={handleDownloadBackup}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Baixar Backup (.json)
                  </button>
                </div>
              </div>
            </div>

            {/* Salvar no Navegador */}
            <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Save className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Salvar no Navegador</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Salva os dados no armazenamento local do navegador. Útil para acesso rápido, mas pode ser perdido se limpar o cache.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveToLocalStorage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Salvar Agora
                    </button>
                    <button
                      onClick={handleLoadFromLocalStorage}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Upload className="w-4 h-4" />
                      Verificar Backup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informações do Sistema</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Nome do App</span>
              <span className="text-sm text-gray-900">{appData.metadata.appName}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Versão</span>
              <span className="text-sm text-gray-900">{appData.metadata.version}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Último Backup</span>
              <span className="text-sm text-gray-900">
                {new Date(appData.metadata.lastBackup).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <FileJson className="w-5 h-5" />
            Como Continuar Depois
          </h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              <span>Baixe o backup completo clicando no botão "Baixar Backup"</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              <span>Guarde o arquivo JSON em local seguro (Google Drive, Dropbox, etc)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              <span>Quando voltar, você pode restaurar os dados importando o arquivo</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">4.</span>
              <span>Ou use "Salvar no Navegador" para acesso rápido (menos seguro)</span>
            </li>
          </ol>
        </div>

        {/* Voltar */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            ← Voltar para o App
          </a>
        </div>
      </div>
    </div>
  );
}
