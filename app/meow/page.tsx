'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Copy, Check } from 'lucide-react';

// Define what the backend sends back
interface User {
  id: string;
  reg_number: string;
  name: string;
  email: string;
  created_at: string;
  gender?: string;
  age?: number;
  interest?: string;
  one_line?: string;
  one_thing_to_look_for?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; 
const EVENT_ID = '14feb';

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const copyToCSV = () => {
    // Create TSV format (Tab-Separated Values) for Excel
    const headers = ['#', 'Name', 'Reg Number', 'Email', 'Gender', 'Age', 'Interest', 'One Line', 'Looking For'];
    const rows = users.map((user, index) => [
      index + 1,
      user.name,
      user.reg_number,
      user.email,
      user.gender || '',
      user.age || '',
      user.interest || '',
      user.one_line || '',
      user.one_thing_to_look_for || ''
    ]);

    // Use tabs instead of commas for proper Excel cell separation
    const tsvContent = [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\n');

    // Copy to clipboard
    navigator.clipboard.writeText(tsvContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        if (API_KEY) {
          headers['X-API-Key'] = API_KEY;
        }
        const res = await fetch(`${API_URL}/${EVENT_ID}/users`, {
          method: 'GET',
          headers,
        });

        if (!res.ok) {
          throw new Error('Failed to fetch the squad');
        }

        const data = await res.json();
        setUsers(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  return (
    <div className="min-h-screen bg-[#fff0f6] p-8 font-mono">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 border-b-2 border-black pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tighter">
            Event Roster: {EVENT_ID}
          </h1>
          <p className="text-gray-500 mt-2">Total Registrations: {users.length}</p>
        </div>
        
        {/* Copy to CSV Button */}
        {users.length > 0 && !loading && (
          <button
            onClick={copyToCSV}
            className="group relative disabled:opacity-50"
            disabled={copied}
          >
            <div className="absolute inset-0 bg-black rounded translate-y-1 translate-x-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
            <div className="relative bg-pink-500 text-white border-2 border-black px-6 py-3 rounded font-bold text-sm uppercase flex items-center gap-2 hover:-translate-y-1 transition-transform">
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy CSV
                </>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin w-10 h-10 text-pink-500" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 max-w-7xl mx-auto">
          Error: {error}
        </div>
      )}

      {/* Data Table / List */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No one has registered yet...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white text-sm uppercase">
                    <th className="p-4 border-b-2 border-black">#</th>
                    <th className="p-4 border-b-2 border-black">Name</th>
                    <th className="p-4 border-b-2 border-black">Reg Number</th>
                    <th className="p-4 border-b-2 border-black">Email</th>
                    <th className="p-4 border-b-2 border-black">Gender</th>
                    <th className="p-4 border-b-2 border-black">Age</th>
                    <th className="p-4 border-b-2 border-black">Interest</th>
                    <th className="p-4 border-b-2 border-black">One Line</th>
                    <th className="p-4 border-b-2 border-black">Looking For</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className="hover:bg-pink-50 transition-colors border-b border-gray-200 last:border-0"
                    >
                      <td className="p-4 font-bold text-gray-400">{index + 1}</td>
                      <td className="p-4 font-bold text-black">{user.name}</td>
                      <td className="p-4 text-pink-600 font-mono">{user.reg_number}</td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4 text-gray-600 uppercase">{user.gender || '-'}</td>
                      <td className="p-4 text-gray-600">{user.age || '-'}</td>
                      <td className="p-4 text-gray-600">{user.interest || '-'}</td>
                      <td className="p-4 text-gray-600 max-w-xs truncate" title={user.one_line}>{user.one_line || '-'}</td>
                      <td className="p-4 text-gray-600 max-w-xs truncate" title={user.one_thing_to_look_for}>{user.one_thing_to_look_for || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;