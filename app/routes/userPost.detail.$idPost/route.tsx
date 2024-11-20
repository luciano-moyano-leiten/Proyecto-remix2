import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { useParams } from "@remix-run/react"
import { json, LoaderFunction, redirect, ActionFunction } from "@remix-run/node";


export const loader: LoaderFunction = async ({ params }) => {
    const { idPost } = params;

const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${idPost}`);
const userData = await commentsResponse.json();

//SEGUNDO FERCH SOBRE CADA COMENTARIO PARA OBTENER EL NOMBRE DLE USUARIO

const comentariosConUsuario = await Promise.all(userData.map(async (comment: any) => {
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users?id=${comment.id}`);
    const user = await userResponse.json();
    console.log(user)
    return { ...comment, user : {...user[0]} };
}));

console.log(comentariosConUsuario)
return json(comentariosConUsuario);
 
};
//necesito filtrar los comentarios por el id del usuario
export const action: ActionFunction = async ({ request, params }) => {
    const {idPost} = params;
    return redirect(`/userPost/detail/${idPost}`);
};

//necesito mostrar los comentarios del usuario en un formulario que no se pueda modificar 


export default function Detail(){
    const {idPost} = useParams();
    const comentariosConUsuario = useLoaderData<any>();
    return (
        <>
        <ul>
            {comentariosConUsuario.map((comment: any) => (
                <li key={comment.id}>
                    <p>nombre : {comment.user.name}</p>
                    <p>{comment.email}</p>
                    <p>{comment.body}</p>
                </li>
            ))}
        </ul>
            
        </>
    )
}