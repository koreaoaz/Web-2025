'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function OAuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storeData = async () => {
      const sessionRes = await supabase.auth.getSession();
      const session = sessionRes.data?.session;

      if (!session) {
        console.log('⛔ 세션 없음 — 아직 로그인되지 않았습니다.');
        setLoading(false);
        return;
      }

      const user = session.user;
      const uuid = user.id;

      const stored = JSON.parse(localStorage.getItem('registration_data') || '{}');

      if (uuid && stored.name) {
        const { error } = await supabase.from('registered_member').insert({
          name: stored.name,
          department: stored.department,
          student_id: stored.studentId,
          generation: stored.generation,
          email: stored.email,
          uuid,
        });

        if (error) {
          console.error('❌ 등록 실패:', error.message);
        } else {
          localStorage.removeItem('registration_data');
          setSuccess(true);
        }
      }

      setLoading(false);
    };

    storeData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">등록 중입니다...</p>;
  }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white shadow-md rounded-2xl p-9 w-full max-w-md text-center">
        {success ? (
            <>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">회원가입이 완료되었습니다!</h1>
            <button
                onClick={() => router.push('/')}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                메인으로 돌아가기
            </button>
            </>
        ) : (
            <>
            <h1 className="text-red-500 text-xl">회원가입 처리 중 오류가 발생했습니다.</h1>
            <button
                onClick={() => router.push('/')}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                메인으로 돌아가기
            </button>
            </>
        )}
        </div>
    </div>
    );
}
