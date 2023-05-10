import Head from 'next/head'
import Test from './component/Page'

export default function Home() {
  return (
    <>
      <Head>
        <title>Test Next App</title>
        <meta name="description" content="test page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div>
          hello~~~~~ world!!!!!!!!!!
        </div>
        <Test></Test>
      </main>
    </>
  )
}
