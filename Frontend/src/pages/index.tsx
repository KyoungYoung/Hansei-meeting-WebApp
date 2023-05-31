import Login from '@/components/Login'
import Head from 'next/head'
import Mainpage from '@/components/main/Mainpage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Test Next App</title>
        <meta name="description" content="test page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
         <Mainpage/>
      </main>
    </>
  )
}
