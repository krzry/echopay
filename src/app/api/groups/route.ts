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

    if (id) {
      const { data, error } = await supabase.from("groups").select("*").eq("id", id).maybeSingle();
      if (error) return NextResponse.json({ error: error.message }, { status: 400 });
      return NextResponse.json(data ?? null);
    }

    const { data, error } = await supabase.from("groups").select("*");
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data ?? []);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();
  try {
    const body = await jsonBody(request);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { description, ...rest } = body as Record<string, unknown>;
    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "`description` is required" }, { status: 400 });
    }

    const payload = { description, ...rest };

    const { data, error } = await supabase.from("groups").insert(payload).select().maybeSingle();
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
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const id = (body as any).id ?? new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "`id` is required for update" }, { status: 400 });

    const updates = { ...body } as Record<string, unknown>;
    delete updates.id;

    const { data, error } = await supabase.from("groups").update(updates).eq("id", id).select().maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data ?? null);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Treat PUT as full replace for the resource
  const supabase = await createClient();
  try {
    const body = await jsonBody(request);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const id = (body as any).id ?? new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "`id` is required for replace" }, { status: 400 });

    const { data: existing, error: fetchErr } = await supabase.from("groups").select("*").eq("id", id).maybeSingle();
    if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 400 });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const payload = { ...body } as Record<string, unknown>;
    delete payload.id;

    const { data, error } = await supabase.from("groups").update(payload).eq("id", id).select().maybeSingle();
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

    const { data, error } = await supabase.from("groups").delete().eq("id", id).select().maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data ?? null);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}


