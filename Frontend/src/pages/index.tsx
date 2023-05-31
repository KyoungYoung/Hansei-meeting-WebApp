import MetaHead from '@/components/MetaHead'
import Login from '@/components/auth/Login'
import { hasCookie } from 'cookies-next'
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Home() {
  const router=useRouter();
  useEffect(()=>{
    hasCookie('sid')?router.replace('/mainpage'):router.replace('/login', '/')
  },[])
  
  return (
    <>
      <Head>
        <meta name="title" content="다과회" />
        <meta property='og:title' content='다과회'/>
        <title>다과회</title>
      </Head>
        <main>
          
        </main>
    </>
  )
}
