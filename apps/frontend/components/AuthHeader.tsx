"use client";
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthHeader() {
  const { data: session, status } = useSession();
  if (status === 'loading') return null;
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '8px 20px', borderBottom: '1px solid #eee', minHeight: 48 }}>
      {session ? (
        <>
          {session.user?.image && (
            <img src={session.user.image} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }} />
          )}
          <span style={{ marginRight: 12 }}>{session.user?.name || session.user?.email}</span>
          <button onClick={() => signOut()} style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>ログアウト</button>
        </>
      ) : (
        <button onClick={() => signIn('github')} style={{ padding: '4px 12px', borderRadius: 4, border: '1px solid #333', background: '#222', color: '#fff', cursor: 'pointer' }}>GitHubでログイン</button>
      )}
    </header>
  );
}
