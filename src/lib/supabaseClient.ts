import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

if (!url || !key) {
  throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
}

export const supabase = createClient(url, key);
