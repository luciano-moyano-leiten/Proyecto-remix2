/* Crear un nuevo archivo que pertenezca a esta ruta nasted, donde obtenga el idUser y muestre debajo del detalle, los post del user en forma de lista. */
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

import { Form, useNavigation } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
    const { idUser } = params;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${idUser}`);
    const posts = await response.json();
    return json(posts);
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
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
