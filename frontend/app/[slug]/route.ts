import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const { original_url } = await api(`/api/urls/${slug}`);
    return NextResponse.redirect(original_url);
  } catch {
    return NextResponse.redirect(new URL("/", _request.url));
  }
}
