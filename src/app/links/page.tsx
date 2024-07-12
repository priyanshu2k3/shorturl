"use client"
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import useSWR from 'swr'
import {fetcher} from "@/app/utils/fetcher"
import Spinner from '../components/spinner';


interface Link {
  original: string;
  short: string;
}
const currentUrl = typeof window !== 'undefined' ? window.location.host + '/api/$' : '';
const LinksPage: React.FC = () => {
  // Hard-coded list of old generated short links

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (shortLink: string, index: number) => {
    navigator.clipboard.writeText(shortLink);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);   };

  const { data, error, isLoading } = useSWR('/api/links', fetcher)
  if (error) return (<span><Navbar/><div>failed to load</div></span>)
  if (isLoading) return (<span><Navbar/><Spinner/></span>)

  console.log(data,"in the links page")

  return (
    <span>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">Old Generated Short Links</h1>
        <div className="max-h-96 overflow-y-auto">
          <ul className="space-y-4">
            {data.map((element:any) => (
              <li
                key={element.id} 
                className="bg-blue-50 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex justify-between items-center"
              >
                <div>
                  <div className="text-gray-800 mb-2">
                    <span className="font-bold">Original URL:</span>
                    <a
                      href={element.original}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2"
                    >
                      {element.original}
                    </a>
                  </div>
                  <div className="text-gray-800">
                    <span className="font-bold">Short URL:</span>
                    <a
                      href={currentUrl  +element.short}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-2"
                    >
                      {currentUrl +element.short}
                    </a>
                  </div>
                </div>
                <div className="flex">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                    onClick={() => copyToClipboard(currentUrl+element.short, element.id)}
                  >
                    {copiedIndex === element.id ? 'Copied!' : 'Copy'}
                  </button>
                  <a
                    href={"/analytic/"+ element.short}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Analytics
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </span>
  );
};

export default LinksPage;
