import Head from 'next/head';
import React, { ReactNode } from 'react';

function MetaHead({children}:{children:ReactNode}) {
    return (
        <Head>
            <title>다과회</title>
            <meta name="description" content="test page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
    );
}

export default MetaHead;