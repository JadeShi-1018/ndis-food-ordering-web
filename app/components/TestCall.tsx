'use client';

import { useEffect } from 'react';
import axiosInstance from '../../libs/axiosInstance';

export default function TestPage() {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get('/ProviderServiceLocation/invalid-id');
        console.log(res.data); // Only logs if succeed
      } catch (err) {
        console.error('Handled error:', err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Testing Response Handler with Axios</h1>
    </div>
  );
}
