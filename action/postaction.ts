"use server"
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { postSchema } from "@/schemas/zodSchema";
import { z } from "zod";

// Définir le type des paramètres de la fonction
type PostActionParams = {
  data: z.infer<typeof postSchema>;
  image?: string;
  image2?: string;
};

export async function postAction({ data, image, image2 }: PostActionParams) {
  try {
    //Validation des données avec Zod
    const parsedData = postSchema.safeParse(data);
    if (!parsedData.success) {
      return { error: "quelque chose s'est mal passé" };
    }

    // Authentification de l'utilisateur
    const session = await auth();
    if (!session) {
      throw new Error("User not authenticated");
    }

    // Récupération de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Création de l'article
    const { categories, content, content2, title } = parsedData.data;

    // Vérifiez si la catégorie existe déjà dans la base de données
    let category = await prisma.category.findFirst({
      where: { name: categories }
    });

    // Si la catégorie n'existe pas, créez-la
    if (!category) {
      category = await prisma.category.create({ data: { name: categories } });
    }

    // Créez l'article en utilisant les données fournies et les catégories associées
    const post = await prisma.post.create({
      data: {
        title,
        content,
        content2: content2 || null,
        image: image || "",
        image2: image2 || "",
        authorId: user.id,
        published: true,
        categories: {
          connect: { id: category.id }
        }
      }
    });

    return { success: "article créé avec succès" };
  } catch (error) {
    return {
      error: 'error',
    };
  }
}
