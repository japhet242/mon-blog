"use client"
import { getPost } from "@/action/getpost";
import { getRecentPost } from "@/action/getrecentpost";
import { auth } from "@/auth";
import Card from "@/components/home/card";
import CardRecentPost from "@/components/home/recentpost";
import { PaginationDemo } from "@/components/ui/paginationdemo";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { date } from "zod";
import { motion } from "framer-motion"

// Définir le type des données des publications
type Post ={
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
}
type recentPost  = {
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
} | null
export default function Home() {
const [session ,setSession] = useState<string|undefined|null>()
   
  // Déclarer l'état pour les publications
  const [post, setPost] = useState<Post[] | null>(null);
  const [recentpost, setRecentPost] = useState<recentPost | null>(null)
  const [currnetPage, setCurrentpage]= useState<number>(1)
  const [totalPage, setTotalPage]= useState<number>(1)
  // Utiliser useRouter pour accéder à l'objet routeur Next.js
  const router = useRouter();

  // Définir la fonction pour récupérer les publications
  const save = async (page:number) => {
    try {
      // Appeler la fonction getPost pour récupérer les publications
      const {posts,currentPage,totalPage,totalPosts} = await getPost(page);
      const recent = await getRecentPost()
      // Mettre à jour l'état des publications avec les données récupérées
      setRecentPost(recent)
      setPost(posts);
      setTotalPage(totalPage)
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des publications :", error);
    }
  };

  // Utiliser useEffect pour exécuter la fonction save une fois que le composant est monté
  useEffect(() => {
    save(currnetPage);
  }, [currnetPage]);

  const handleCurrentpage= (page:number)=>{
        setCurrentpage(page)
  }
console.log(post,"king")
  // Afficher les publications dans le composant
  return (
    <main className="md max-w-[1100px] mx-auto">
      {/* Utiliser la méthode map pour parcourir chaque publication */}
      <motion.div initial={{x:100}} animate={{ x:0 }} transition={{
  ease: "linear",
  duration: 2,
  x: { duration: 1 }
}}>
<CardRecentPost post={recentpost}/>
      </motion.div>
      <Card posts={post}/>
      <div className=" mt-5 mb-3" >
         <PaginationDemo handleChange={handleCurrentpage} currentpage={currnetPage} totalpage={totalPage}/>
      </div>
    
    </main>
  );
}
