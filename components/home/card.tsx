import Image from "next/image"
import Link from "next/link";
import { date } from "zod";
import { SkeletonCard } from "../ui/skeletoncard";
import { motion } from "framer-motion"

export default function Card({ posts }: { posts: {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  content2: string | null;
  image: string;
  image2: string | null;
  published: boolean;
  authorId: string;
  author: { id: string; name: string | null; password: string | null; email: string | null; emailVerified: Date | null; image: string | null; role: string; };
   categories: { id: string; name: string; }[]
}[] | null}) {
  return posts ? 
  <motion.div className="bg-white py-5 sm:py-5" initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{
    ease: "linear",
    duration: 0.5,
    x: { duration: 0.5 }
  }}>
     <div className=" text-3xl italic text-center">
          Toutes les Post
      </div>
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts?.map((post) => (
          <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
             {post.image && (
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
               <Link href={`/post/${post.id}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center"
                />
               </Link>
              </div>
            )}
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <Link href={`/post/${post.id}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
            </div>
           
            <div className="flex items-center gap-x-4 text-xs mt-2">
              <time dateTime={post.updatedAt.toString()} className="text-gray-500">
                {post.updatedAt.toDateString()}
              </time>
              <div>
                {post.categories.map((date,index)=>{
                  return(
                    <div key={index} className="rounded-sm p-2 text-white" style={{ backgroundColor: randomColor()}}>
                      {date.name}
                    </div>
                  )
                })}
              </div>
              <div>
                
              </div>
            </div>
            
          </article>
        ))}
      </div>
    </div>
  </motion.div> : <div className="mx-auto max-w-7xl px-6 lg:px-8">
  <div className=" text-3xl italic text-center">
          Toutes les Post
      </div>
<div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
  <SkeletonCard/>
  <SkeletonCard/>
  <SkeletonCard/>
  <SkeletonCard/>
  <SkeletonCard/>
  <SkeletonCard/>
  </div>
  </div>
}
function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}