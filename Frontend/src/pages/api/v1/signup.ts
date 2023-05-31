import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, hasCookie, setCookie } from 'cookies-next';


type Data = {
    succeed:boolean
    signup?:{
      username:string,
      option?:{

      }
    }
    error?:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    console.log(req.body)
    console.log(req.cookies)
    const {email, password, studentNumber,userMajor} = req.body;
    const reqData = {};
    const reqDataJSON = JSON.stringify(reqData);
    console.log("회원가입 요청받음");
    console.log(reqDataJSON)
    if (req.method === 'POST') {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: reqDataJSON,
      };
      const apiURL= process.env.APIENDPOINT as string
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
        }
        
        
      }
      } else {
        console.log("비정상접근");
        res.status(400).end()
        
      }
  
}