'use client'

import React, { useEffect, useState } from 'react';

export default function GroupsList() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/groups');
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (mounted) setGroups(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  async function createGroup() {
    setCreating(true);
    try {
      // Match the table structure: id, description, isActive, created_at
      const payload = {
        description: "New group",
        isactive: true,
        // let the DB set created_at by default if available; otherwise send now
        created_at: new Date().toISOString(),
      } as Record<string, unknown>;

      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const created = await res.json();
      setGroups(prev => [created, ...prev]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <ul>
      <div style={{ marginBottom: 12 }}>
        <button onClick={createGroup} disabled={creating}>
          {creating ? 'Creating…' : 'Create group'}
        </button>
      </div>
      {groups.map(g => (
        <li key={g.id}>{`${g.description} group-${g.id}`}</li>
      ))}
    </ul>
  );
}