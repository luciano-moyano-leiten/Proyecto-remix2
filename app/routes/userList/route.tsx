import { LoaderFunction } from "@remix-run/node";
import { ActionArgs } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useSubmit } from "@remix-run/react";
import * as node from "@remix-run/node";

//BACKEND - me traigo la información de los usuarios con el fetch pegandole a la api de jsonplaceholder
export let loader: LoaderFunction = async ({ request, params}) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return node.json(users);
};

//En el action me traigo el id del usuario que se seleccionó y lo mando a la ruta de detalle
export const action : node.ActionFunction = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const idUser = formData.get("idUser");
    return node.redirect(`/userList/detail/${idUser}`);
}

//FRONTEND
export default function UserList() {
    const users = useLoaderData<any[]>();

    return (
        <div>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Form method="POST" 
                                >   
                                    <input type="hidden" value={user.id} name="idUser"/>
                                    <button type="submit">Search</button>
                                </Form>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Outlet />
        </div>
    );
}