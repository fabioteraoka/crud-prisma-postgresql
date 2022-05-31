// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) { 
  if (req.method === "POST"){
    const { id, title, content } = req.body;
  const post = await prisma.post.update({
    where:{
      id:id
    },
    data:{
      title:title,
      content:content
    }
});
  res.status(200).json(post)
}}
