'use client';

import React, { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    department: '',
    studentId: '',
    generation: '',
    email: '',
    phone_number: ''
  });

  const [isAllowed, setIsAllowed] = useState<'allowed' | 'denied' | null>(null);
  const [isRegistered, setIsRegistered] = useState<'registered' | 'unregistered' | null>(null);
  const isFormFilled =
      form.name.trim() !== '' &&
      form.department.trim() !== '' &&
      form.studentId.trim() !== '' &&
      form.generation.trim() !== '' &&
      form.email.trim() !== '' &&
      form.phone_number.trim() !== '';

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    
    
    if (name === 'email') {
      // check if email is already registered
      const { data: registered } = await supabase
        .from('registered_member')
        .select('email')
        .eq('email', value)
        .maybeSingle();

      if (registered) {
        setIsRegistered('registered');
        setIsAllowed(null);
        return;
      }else{
        setIsRegistered('unregistered');        
      }

      // check if email is allowed
      const { data: allowed } = await supabase
        .from('allowed_user')
        .select('email')
        .eq('email', value)
        .maybeSingle();

      if (allowed) {
        setIsAllowed('allowed');
      } else {
        setIsAllowed('denied');
      }
    }
  };

  const handleGithubLogin = async () => {
    localStorage.setItem('registration_data', JSON.stringify(form));

    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'https://www.oazkorea-demo.co.kr/oauth_callback',
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Register</h1>

        <input
          name="email"
          type="text"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        {isAllowed === 'allowed' && (
          <p className="text-sm text-red-500">⭕ 나머지 정보를 기입 부탁드립니다.</p>
        )}
        {isAllowed === 'denied' && (
          <p className="text-sm text-red-500">❌ 허용되지 않은 이메일입니다.</p>
        )}
        {isRegistered === 'registered' && (
          <p className="text-sm text-red-500">❌ 이미 가입된 이메일입니다.</p>
        )}

        <input
          name="name"
          type="text"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          name="department"
          type="text"
          placeholder="소속 학과"
          value={form.department}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          name="studentId"
          type="text"
          placeholder="학번 ex) 2022048098"
          value={form.studentId}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          name="phone_number"
          type="text"
          placeholder="연락처 ex) 010-xxxx-xxxx"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          name="generation"
          type="text"
          placeholder="기수 ex) 34, (2025년은 35기 입니다.)"
          value={form.generation}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={isAllowed !== 'allowed' || isRegistered === 'registered' || !isFormFilled}
          className={`w-full flex justify-center items-center py-2 rounded-md space-x-2 ${
            isAllowed === 'allowed' && isRegistered === 'unregistered' && isFormFilled
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Github className="w-5 h-5" />
          <span>Sign in with GitHub</span>
        </button>
      </form>
    </div>
  );
}
