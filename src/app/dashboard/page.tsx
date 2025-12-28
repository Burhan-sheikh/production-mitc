'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface Metrics {
  leads: number;
  visits24h: number;
  ratingsMonth: number;
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [metrics, setMetrics] = useState<Metrics>({ leads: 0, visits24h: 0, ratingsMonth: 0 });
  const [metricsLoading, setMetricsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && user?.role !== 'admin') {
      toast.error('Admin access required');
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchMetrics();
    }
  }, [user]);

  const fetchMetrics = async () => {
    try {
      // Unread leads
      const leadsSnap = await getDocs(
        query(collection(db, 'leads'), where('read', '==', false))
      );
      
      // Visits in last 24h
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const visitsSnap = await getDocs(
        query(
          collection(db, 'siteVisits'),
          where('timestamp', '>=', oneDayAgo),
          limit(10000)
        )
      );
      
      // Ratings in last 30 days
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const ratingsSnap = await getDocs(
        query(
          collection(db, 'reviews'),
          where('createdAt', '>=', thirtyDaysAgo),
          limit(10000)
        )
      );

      setMetrics({
        leads: leadsSnap.size,
        visits24h: visitsSnap.size,
        ratingsMonth: ratingsSnap.size,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
      toast.error('Failed to load metrics');
    } finally {
      setMetricsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Admin access required</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name || user.email}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Leads Card */}
          <div className="card p-8">
            <div className="text-gray-600 text-sm font-medium">Unread Leads</div>
            <div className="text-4xl font-bold text-primary-600 mt-2">
              {metricsLoading ? '...' : metrics.leads}
            </div>
            <Link href="/dashboard/leads" className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-4 inline-block">
              View Leads →
            </Link>
          </div>

          {/* Visits Card */}
          <div className="card p-8">
            <div className="text-gray-600 text-sm font-medium">Visits (24h)</div>
            <div className="text-4xl font-bold text-blue-600 mt-2">
              {metricsLoading ? '...' : metrics.visits24h}
            </div>
            <Link href="/dashboard/visits" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block">
              View Analytics →
            </Link>
          </div>

          {/* Ratings Card */}
          <div className="card p-8">
            <div className="text-gray-600 text-sm font-medium">Ratings (30d)</div>
            <div className="text-4xl font-bold text-green-600 mt-2">
              {metricsLoading ? '...' : metrics.ratingsMonth}
            </div>
            <Link href="/dashboard/ratings" className="text-green-600 hover:text-green-700 text-sm font-medium mt-4 inline-block">
              Review Ratings →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/dashboard/leads" className="btn-primary text-center">
              Manage Leads
            </Link>
            <Link href="/dashboard/users" className="btn-primary text-center">
              View Users
            </Link>
            <Link href="/dashboard/instagram" className="btn-primary text-center">
              Gallery
            </Link>
            <Link href="/dashboard/settings" className="btn-primary text-center">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
