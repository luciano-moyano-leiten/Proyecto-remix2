import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { useParams } from "@remix-run/react"

/* Crear un Loader que obtenta el idUser de la URL con la propiedad params, y haga un fetch del tipo get a la api de placeholder para obtener la data de un solo usuario. Retornar toda esa informacion al FRONT y mostrar los datos dentro de un formaulario que no este habilitado para su modificacion. */

import { json, LoaderFunction, redirect, ActionFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
    const { idUser } = params;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${idUser}`);
    const userData = await response.json();
    return json(userData);
};

export const action: ActionFunction = async ({ request, params }) => {
    
    //idUser es el nombre del input que se encuentra en el formulario, le pongo las llaves para que busque el valor del input con ese nombre y me traiga el valor(en este caso los post)
    const {idUser} = params;
    return redirect(`/userList/detail/${idUser}/userPost`);
}

/* Crear un nuevo archivo que pertenezca a esta ruta nasted, donde obtenga el idUser y muestre debajo del detalle, los post del user en forma de lista. */

export default function Detail(){
    const {idUser} = useParams();
    const userData = useLoaderData<{ id: number; name: string; username: string; email: string; phone: string; website: string }>();
    return (
        <>
            <Form method="POST">
                <label>
                    Name:
                    <input type="text" value={userData.name} readOnly />
                </label>
                <br />
                <label>
                    Username:
                    <input type="text" value={userData.username} readOnly />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" value={userData.email} readOnly />
                </label>
                <br />
                <label>
                    Phone:
                    <input type="text" value={userData.phone} readOnly />
                </label>
                <br />
                <label>
                    Website:
                    <input type="text" value={userData.website} readOnly />
                </label>
                {idUser && <input type="hidden" value={idUser} name="idUser"/>}
                <button type="submit">Search</button>
            </Form>
            <Outlet />
        </>
    )
}