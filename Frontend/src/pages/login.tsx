import MetaHead from '@/components/MetaHead';
import Login from '@/components/auth/Login';
import { hasCookie, deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import React from 'react';

function login() {
    return (
        <>
        <Head>
            <title>로그인</title>
            <meta name="description" content="login" />
        </Head>
        <Login />
        </>
    );
}

export function getServerSideProps({req,res}:{req:NextApiRequest, res:NextApiResponse}){
    if(hasCookie('sid',{req,res})){
        ('/mainpage')
    }
    return {props:{}};
  }
  
export default login;