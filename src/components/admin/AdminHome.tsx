import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, UserX, ArrowRight } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';

export default function AdminHome() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const usersRef = collection(db, 'users');
    
    // Set up real-time listeners for user statistics
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      try {
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
        setStats({
          total: users.length,
          pending: users.filter(user => user.status === 'pending').length,
          rejected: users.filter(user => user.status === 'rejected').length
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard statistics');
        setLoading(false);
      }
    }, (err) => {
      console.error('Snapshot error:', err);
      setError('Failed to connect to the database');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor and manage user activities</p>
        </div>
        <Link to="/admin/users">
          <Button variant="outline" className="flex items-center">
            Manage Users
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.total.toString()}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pending.toString()}
          icon={<UserCheck className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard
          title="Rejected Users"
          value={stats.rejected.toString()}
          icon={<UserX className="h-6 w-6" />}
          color="red"
        />
      </div>

      {stats.pending > 0 && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserCheck className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800">
                You have {stats.pending} pending registration{stats.pending === 1 ? '' : 's'} to review
              </p>
            </div>
            <Link to="/admin/users">
              <Button size="sm" variant="outline" className="text-yellow-600 hover:text-yellow-700">
                Review Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'blue' | 'yellow' | 'red';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}