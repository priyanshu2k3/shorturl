"use client"
import Navbar from '@/app/components/Navbar';
import Spinner from '@/app/components/spinner';
import { fetcher } from '@/app/utils/fetcher';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import axios from 'axios';
import * as XLSX from 'xlsx';

import DeviceType from "@/components/DeviceType"
import Test from "@/components/Legends"

const Analytics: React.FC = () => {
   
    const currentPath= typeof window !== 'undefined' ?window.location.pathname:''
    console.log(currentPath)
    const { data, error, isLoading } = useSWR("/api/"+currentPath, fetcher)
    if (error) return (<span><Navbar/><div>failed to load</div></span>)
    if (isLoading) return (<span><Navbar/><Spinner/></span>)
  
    console.log(data,"in the links page")


    const handleExportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Request Logs');
      
      // Generate buffer
      const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      
      // Create a blob and trigger a download
      const blob = new Blob([buf], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'request_logs.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  
    return (
      <span><Navbar/>
      <div className='w-1/4 mx-auto'><DeviceType props={data}/>
      </div>
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Analytics</h1>
        <button
          onClick={handleExportToExcel}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Export to Excel
        </button>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">IP Address</th>
              <th className="py-2 px-4 border">User Agent</th>
              <th className="py-2 px-4 border">Referer</th>
              <th className="py-2 px-4 border">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((log:any) => (
              <tr key={log.id}>
                <td className="py-2 px-4 border">{log.id}</td>
                <td className="py-2 px-4 border">{log.ipAddress}</td>
                <td className="py-2 px-4 border">{log.userAgent}</td>
                <td className="py-2 px-4 border">{log.referer}</td>
                <td className="py-2 px-4 border">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> </span>
    );
  };




  
//   return (
//     <span><Navbar/>
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <h1 className="text-4xl font-bold text-blue-600"></h1>
//     </div>
//     </span>
//   );
// };

export default Analytics;

// 

// 'use client';



// const Analytics = ({ userId }) => {
  
//   // Function to handle exporting data to Excel
  

// export default Analytics;



