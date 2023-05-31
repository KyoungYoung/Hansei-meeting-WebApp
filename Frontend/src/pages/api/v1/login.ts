import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, hasCookie, setCookie } from 'cookies-next';

const LOGINAPIURL='/uers/login'

type Data = {
    succeed:boolean
    user?:{
      userId?:number,
      username:string,
    }
    error?:string
}
const TestSessionId="oefwhahiaefhiefohieawfioawe9228983gweu"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    console.log(req.body)
    console.log(req.cookies)
    const {username, password} = req.body;
    const reqData = {id:username, pw:password};
    const reqDataJSON = JSON.stringify(reqData);
    console.log("로그인 요청받음");
    console.log(reqDataJSON)
    if (req.method === 'POST') {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: reqDataJSON,
      };
      const apiURL= `${process.env.APIENDPOINT}${LOGINAPIURL}` as string
      console.log(apiURL)
      try {
        const response = await fetch(apiURL, options);
        console.log(response.ok)
        if(response.ok)
        {
          console.log("받아오긴함")
          const result = await response.json();
          console.log(result, "받아오긴함")
        }else{
          const result = await response.json();

          console.log(result," 백엔드 요청에러")
        }
      
      } catch (error) {
        console.log(error,"백엔드 연결 실패")
        if(process.env.NODE_ENV=='development'){
          console.log("임시데이터 반환")
          if(!(req.cookies?.sid)){
            if (username=='admin'&&password=='test'){
              setCookie('sid',TestSessionId,{req,res, httpOnly:true, maxAge:65536})
              res.redirect(201,'/mainpage')
              
            }else{
              res.status(401).end()
            }
          }else{
            if(req.cookies?.sid==TestSessionId){
              res.redirect(201,'/mainpage')
            }else{
              res.status(401).end()
            }
          }
        }
        
        
      }
      } else {
        console.log("비정상접근");
        res.status(400).end()
        
      }
  
}