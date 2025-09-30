import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

async function jsonBody(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const supabase = await createClient();
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const groupId = url.searchParams.get("groupId");

    if (id) {
      const { data, error } = await supabase.from("group_users").select("*").eq("id", id).maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json(data ?? null);
    }

    let query = supabase.from("group_users").select("*");
    if (groupId) query = query.eq("groupId", groupId);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data ?? []);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();
  try {
    const body = await jsonBody(request);
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

    const { groupId, userId, isActive } = body as any;
    if (!groupId || !userId) return NextResponse.json({ error: "`groupId` and `userId` are required" }, { status: 400 });

    const payload = { groupId, userId, isActive } as Record<string, unknown>;
    const { data, error } = await supabase.from("group_users").insert(payload).select().maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  try {
    const body = await jsonBody(request);
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

    const id = (body as any).id ?? new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "`id` is required for update" }, { status: 400 });

    const updates = { ...body } as Record<string, unknown>;
    delete updates.id;

    const { data, error } = await supabase.from("group_users").update(updates).eq("id", id).select().maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data ?? null);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "`id` query parameter is required" }, { status: 400 });

    const { data, error } = await supabase.from("group_users").delete().eq("id", id).select().maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data ?? null);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}


