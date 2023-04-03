import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios.interceptor";
import { auth } from "../../services/fire_app";
import { EndpointBuilder } from "../../utils/endpoint_builder";

const AdminUserTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loaded, setLoaded] = useState(false);

    const builder = new EndpointBuilder();

    const navigate = useNavigate();

    useEffect(() => {
        const url = builder.addPersistentParam("auth").build();

        const fetchUserDataAdmin = async () => {
            axiosInstance
                .get<{ users: User[] }>(url, {
                    headers: {
                        Authorization:
                            "Bearer " + (await auth.currentUser?.getIdToken()),
                    },
                })
                .then(({ data: { users } }) => {
                    setUsers(users);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error(error);
                    setLoaded(true);
                });
        };

        fetchUserDataAdmin();
    }, []);

    return (
        <div className="w-max mx-auto mt-4 shadow-lg rounded flex flex-col gap-2 min-w-[300px] items-center p-4">
            <div className="text-2xl">Users</div>
            {loaded ? (
                users.length > 0 ? (
                    <table className="table-auto">
                        <thead>
                            <tr className="border-l border-t">
                                <th className="border-r border-b text-center px-4">
                                    #
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Id
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Name
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Email
                                </th>
                                <th className="border-r border-b text-center px-4">
                                    Email Verified?
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="border-r border-b border-l text-center px-4">
                                            {index + 1}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {user.uid}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {user.displayName}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {user.email}
                                        </td>
                                        <td className="border-r border-b text-center px-4">
                                            {user.emailVerified
                                                ? "true"
                                                : "false"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <div>Empty</div>
                )
            ) : (
                <TailSpin />
            )}
        </div>
    );
};

export default AdminUserTable;
