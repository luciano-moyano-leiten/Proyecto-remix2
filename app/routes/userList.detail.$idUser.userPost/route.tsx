/* Crear un nuevo archivo que pertenezca a esta ruta nasted, donde obtenga el idUser y muestre debajo del detalle, los post del user en forma de lista. */
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

import { Form, useNavigation } from "@remix-run/react";


export const loader: LoaderFunction = async ({ params }) => {
    // Extrae el idUser de los parámetros
    const { idUser } = params;
        // Realiza una solicitud para obtener los posts del usuario con idUser

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${idUser}`);
    const posts = await response.json(); // Convierte la respuesta a formato JSON

    // Realiza una solicitud para obtener los comentarios del primer post
    const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`);
        // Mapea cada post para agregarle sus comentarios correspondientes
    const postsWithComments = await Promise.all(posts.map(async (post: any) => {
                // Realiza una solicitud para obtener los comentarios del post actual
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
        const comments = await commentsResponse.json();
                // Retorna el post con sus comentarios agregados
        return { ...post, comments };
    }));
    // Retorna los posts con sus comentarios en formato JSON

    return json(postsWithComments);
};


export const action: LoaderFunction = async ({ request, params }) => {
    const formData = await request.formData();
    const idUser = formData.get("idUser");
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${idUser}`);
    const posts = await response.json();
    return json(posts);
};

export default function UserPosts() {
    const posts = useLoaderData<Array<{ id: string; title: string }>>();
    

    const navigation = useNavigation();

    
    return (
        <div>
            <h2>User Posts</h2>
            <Form method="post">
                <label>
                    User ID:
                    <input type="text" name="idUser" />
                </label>
                <button type="submit">Fetch Posts</button>
            </Form>
            {navigation.state === "submitting" ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {posts.map((post: any) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <ul>
                                {post.comments.map((comment: any) => (
                                    <li key={comment.id}>
                                        <p><strong>{comment.name}</strong> ({comment.email}): {comment.body}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    {posts.map((post: any) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
