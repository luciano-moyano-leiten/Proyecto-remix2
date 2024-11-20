import { Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const comments = await response.json();
    return json(comments);
};

    export const action: ActionFunction = async ({ request }) => {
        const formData = await request.formData();
        const idPost = formData.get("idPost");
        return redirect(`/userPost/detail/${idPost}`);
    }

export default function Comments() {

    const posts = useLoaderData<Array<{ id: number; title: string; body: string }>>();

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post: any) => (
                    <li key={post.id}>
                        <p>{post.name}</p>
                        <p>{post.body}</p>
                        <Form method="POST" 
                                >   
                                    <input type="hidden" value={post.id} name="idPost"/>
                                    <button type="submit">Search</button>
                                </Form>
                        <Outlet/>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}
