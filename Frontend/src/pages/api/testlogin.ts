import type { NextApiRequest, NextApiResponse } from 'next'

type reqData = {
  username: string,
  password: string,
}
type Data = {
    data:string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    console.log(req.body())
    const {username, password} = req.body
    if (req.method === 'POST') {
        console.log("로그인 요청받음");
        if(password ==='1')
        {
            res.status(200).json({data:`${username}님 로그인 환영합니다` });
        }
      } else {
        console.log("비정상접근");
      }
  
}