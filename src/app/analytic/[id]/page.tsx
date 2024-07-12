"use client"
import Navbar from '@/app/components/Navbar';
import Spinner from '@/app/components/spinner';
import { fetcher } from '@/app/utils/fetcher';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const Analytics: React.FC = () => {
   
    const currentPath=window.location.pathname
    console.log(currentPath)
    const { data, error, isLoading } = useSWR("/api/"+currentPath, fetcher)
    if (error) return (<span><Navbar/><div>failed to load</div></span>)
    if (isLoading) return (<span><Navbar/><Spinner/></span>)
  
    console.log(data,"in the links page")
  
  return (
    <span><Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Hello</h1>
    </div>
    </span>
  );
};

export default Analytics;
