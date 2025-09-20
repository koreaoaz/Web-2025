import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// import { supabase } from "@/lib/supabaseClient"; // ← anon 클라라면 권한 이슈날 수 있어 서버용 별도 생성 권장

const ROW_ID = 1;


// KST YYYY-MM-DD
const yyyymmddKST = (d: Date | string) =>
  new Date(d).toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });

export async function GET() {
  const { data, error } = await supabase
    .from("today_visitor")
    .select("visitor, updated_at")
    .eq("id", ROW_ID)
    .single();

  if (error) {
    console.error("❌ GET error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const todayKST = yyyymmddKST(new Date());
  const lastDateKST = data.updated_at ? yyyymmddKST(data.updated_at) : null;

  if (lastDateKST !== todayKST) {
    const { data: resetData, error: resetError } = await supabase
      .from("today_visitor")
      .update({ visitor: 0, updated_at: new Date().toISOString() })
      .eq("id", ROW_ID)
      .select("visitor")
      .single();

    if (resetError) {
      console.error("❌ Reset error", resetError.message);
      return NextResponse.json({ error: resetError.message }, { status: 500 });
    }

    return NextResponse.json({ count: resetData.visitor, date: todayKST });
  }

  return NextResponse.json({ count: data.visitor, date: todayKST });
}

export async function POST() {
  // ✅ 원자적 증가 (RPC)
  const { data, error } = await supabase.rpc("increment_visit", { row_id: ROW_ID });

  if (error) {
    console.error("❌ POST error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    count: typeof data === "number" ? data : Number(data),
    date: yyyymmddKST(new Date()),
  });
}
