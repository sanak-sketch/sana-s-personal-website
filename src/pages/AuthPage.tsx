import React, { FormEvent, useMemo, useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Mode = 'login' | 'signup';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [values, setValues] = useState({ name: '', email: '', password: '' });

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (mode === 'signup' && !values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your email.';
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Please enter a valid email.';
    if (!values.password) next.password = 'Please enter a password.';
    else if (values.password.length < 8) next.password = 'Use at least 8 characters.';
    return next;
  }, [mode, values]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setServerMessage('');

    if (Object.keys(errors).length > 0) return;

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email.trim(),
        password: values.password,
      });

      if (error) setServerMessage(error.message);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.password,
      options: {
        data: { display_name: values.name.trim() },
      },
    });

    if (error) {
      setServerMessage(error.message);
      return;
    }

    setValues({ name: '', email: values.email.trim(), password: '' });
    setSubmitted(false);
    setServerMessage('Account created! You can now log in.');
    setMode('login');
  };

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setSubmitted(false);
    setServerMessage('');
  };

  const fieldError = (field: string) => submitted ? errors[field] : undefined;

  return (
    <main className="min-h-screen flex items-center">
      <section className="max-w-[760px] w-full mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-14 items-start">
          <div className="pt-2">
            <p className="font-hand text-2xl text-[#C8674A] mb-2">A little doorway</p>
            <h1 className="font-heading text-5xl sm:text-6xl leading-none mb-5">
              {mode === 'login' ? 'Welcome back.' : 'Come on in.'}
            </h1>
            <p className="font-body text-base sm:text-lg leading-8 text-[#6B655E] max-w-md">
              {mode === 'login'
                ? 'Log in to enter Sana’s little corner of the internet.'
                : 'Create an account to enter Sana’s little corner of the internet.'}
            </p>
          </div>

          <div className="sketch-card p-6 sm:p-8">
            <div className="flex border-b border-[#E8E8E8] mb-7">
              <button type="button" onClick={() => switchMode('login')} className={`flex-1 pb-3 font-heading text-xl transition-colors ${mode === 'login' ? 'text-[#C8674A] border-b-2 border-[#C8674A]' : 'text-[#6B655E] hover:text-[#1F1F1F]'}`}>Log in</button>
              <button type="button" onClick={() => switchMode('signup')} className={`flex-1 pb-3 font-heading text-xl transition-colors ${mode === 'signup' ? 'text-[#C8674A] border-b-2 border-[#C8674A]' : 'text-[#6B655E] hover:text-[#1F1F1F]'}`}>Sign up</button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label htmlFor="auth-name" className="block font-heading text-lg mb-1">Name</label>
                  <div className="relative">
                    <UserRound size={18} className="absolute left-3 top-3.5 text-[#6B655E]" />
                    <input id="auth-name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} className={`w-full rounded-md border bg-white py-3 pl-10 pr-3 font-body outline-none transition focus:border-[#C8674A] focus:ring-2 focus:ring-[#C8674A]/10 ${fieldError('name') ? 'border-[#C8674A]' : 'border-[#E8E8E8]'}`} autoComplete="name" />
                  </div>
                  {fieldError('name') && <p className="mt-1 font-body text-sm text-[#C8674A]">{fieldError('name')}</p>}
                </div>
              )}

              <div>
                <label htmlFor="auth-email" className="block font-heading text-lg mb-1">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-[#6B655E]" />
                  <input id="auth-email" type="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} className={`w-full rounded-md border bg-white py-3 pl-10 pr-3 font-body outline-none transition focus:border-[#C8674A] focus:ring-2 focus:ring-[#C8674A]/10 ${fieldError('email') ? 'border-[#C8674A]' : 'border-[#E8E8E8]'}`} autoComplete="email" />
                </div>
                {fieldError('email') && <p className="mt-1 font-body text-sm text-[#C8674A]">{fieldError('email')}</p>}
              </div>

              <div>
                <label htmlFor="auth-password" className="block font-heading text-lg mb-1">Password</label>
                <div className="relative">
                  <LockKeyhole size={18} className="absolute left-3 top-3.5 text-[#6B655E]" />
                  <input id="auth-password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} className={`w-full rounded-md border bg-white py-3 pl-10 pr-11 font-body outline-none transition focus:border-[#C8674A] focus:ring-2 focus:ring-[#C8674A]/10 ${fieldError('password') ? 'border-[#C8674A]' : 'border-[#E8E8E8]'}`} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 p-1.5 text-[#6B655E] hover:text-[#C8674A]" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldError('password') && <p className="mt-1 font-body text-sm text-[#C8674A]">{fieldError('password')}</p>}
              </div>

              <button type="submit" className="w-full rounded-md bg-[#1F1F1F] text-white py-3.5 font-heading text-xl hover:bg-[#C8674A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8674A]/30">
                {mode === 'login' ? 'Log in' : 'Create account'}
              </button>

              {serverMessage && <p className="font-body text-sm leading-6 text-[#C8674A] text-center">{serverMessage}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
