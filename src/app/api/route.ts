
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "visitors.json");

function readVisitorData() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function writeVisitorData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const data = readVisitorData();
  const count = data[today] ?? 0;
  return NextResponse.json({ date: today, count });
}

export async function POST() {
  const today = new Date().toISOString().slice(0, 10);
  const data = readVisitorData();
  data[today] = (data[today] ?? 0) + 1;
  writeVisitorData(data);
  return NextResponse.json({ date: today, count: data[today] });
}
