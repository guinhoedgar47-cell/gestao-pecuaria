'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [supabaseReady, setSupabaseReady] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setSupabaseReady(isSupabaseConfigured());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verificar se o Supabase está configurado
    if (!supabase || !supabaseReady) {
      setError('Supabase não está configurado. Por favor, configure suas credenciais.');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        
        if (data.user) {
          router.push('/');
        }
      } else {
        // Cadastro
        if (formData.password !== formData.confirmPassword) {
          setError('As senhas não coincidem');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('A senha deve ter no mínimo 6 caracteres');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        if (data.user) {
          setError('');
          alert('Cadastro realizado com sucesso! Verifique seu email para confirmar.');
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      {/* Banner de Configuração do Supabase */}
      {!supabaseReady && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full mx-4">
          <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 mb-1">
                  Configuração do Supabase Necessária
                </h3>
                <p className="text-sm text-orange-800 mb-3">
                  Para usar a autenticação, você precisa configurar suas credenciais do Supabase.
                </p>
                <div className="space-y-2 text-sm text-orange-800">
                  <p><strong>Opção 1 (Recomendado):</strong> Vá em <strong>Configurações do Projeto → Integrações → Conectar Supabase</strong></p>
                  <p><strong>Opção 2:</strong> Forneça suas credenciais aqui no chat (URL e Anon Key)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Lado Esquerdo - Personagem e Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-6 p-8">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full"></div>
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e16c024c-6e17-4dbb-9bba-143d7418359f.jpg" 
              alt="Boi Gaúcho Mascote" 
              className="relative w-80 h-80 object-contain drop-shadow-2xl animate-bounce-slow"
            />
          </div>
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold text-gray-900">Boi Gaúcho</h1>
            <p className="text-xl text-gray-600">Sistema de Gestão Pecuária</p>
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Plataforma Profissional</span>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário de Login */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-gray-100">
            {/* Header Mobile */}
            <div className="lg:hidden flex flex-col items-center space-y-4 mb-6">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e16c024c-6e17-4dbb-9bba-143d7418359f.jpg" 
                alt="Boi Gaúcho" 
                className="w-24 h-24 object-contain"
              />
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Boi Gaúcho</h1>
                <p className="text-sm text-gray-600">Gestão Pecuária</p>
              </div>
            </div>

            {/* Título do Formulário */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Bem-vindo de volta!' : 'Criar sua conta'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Entre com suas credenciais para acessar' 
                  : 'Preencha os dados para começar'}
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    disabled={!supabaseReady}
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    disabled={!supabaseReady}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha (apenas no cadastro) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      disabled={!supabaseReady}
                    />
                  </div>
                </div>
              )}

              {/* Mensagem de Erro */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Botão de Submit */}
              <button
                type="submit"
                disabled={loading || !supabaseReady}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processando...</span>
                  </>
                ) : !supabaseReady ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>Configure o Supabase</span>
                  </>
                ) : (
                  <>
                    {isLogin ? (
                      <>
                        <LogIn className="w-5 h-5" />
                        <span>Entrar</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>Criar Conta</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </form>

            {/* Toggle Login/Cadastro */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                {' '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({ email: '', password: '', confirmPassword: '' });
                  }}
                  className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                >
                  {isLogin ? 'Criar conta' : 'Fazer login'}
                </button>
              </p>
            </div>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
              </p>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              🐂 Gestão completa do seu rebanho
            </p>
            <p className="text-sm text-gray-600">
              📊 Relatórios zootécnicos em tempo real
            </p>
            <p className="text-sm text-gray-600">
              🔒 Seus dados seguros e protegidos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
