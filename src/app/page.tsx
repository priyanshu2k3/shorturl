"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter} from 'next/navigation';
import Navbar from './components/Navbar';


const Home = () => {


  const router =useRouter();

  const cookieStore = document.cookie.includes("token");
  const token= cookieStore;
  console.log(token)
  if (!token){
    router.push("/signin")}
  const [url, setUrl] = useState('');

  const [shortenedUrl, setShortenedUrl] = useState('');
  const currentUrl = typeof window !== 'undefined' ? window.location.host + '/api/$' : '';
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      console.log("domain",currentUrl)
      const response = await axios.post('/api/generate', { "original":url});

      if(!response){alert("some error occured")}
      setShortenedUrl(currentUrl+response.data.sid);
    } catch (error) {
      alert("some error occured You can check the console ")
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert('Shortened URL copied to clipboard!');
  };

  return (
    <span>
      <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">Original URL </label>
            <label className='text-green-700'>eg:https://example.com or http://example.com </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="https://example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Shorten URL
          </button>
        </form>
        {shortenedUrl && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p className="text-gray-700">Shortened URL:</p>
            <div className="flex items-center space-x-2">
              <span
                onClick={handleCopy}
                className="text-indigo-600 underline cursor-pointer"
              >
                {shortenedUrl}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
    </span>
  );
};

export default Home;
