// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { object, string } from "yup";
// import Title from "../../components/additional-components/Title";
// import Input from "../../components/authentication-components/Input";
// import { FaGoogle, MdArrowBack } from "../../icons";
// import LogoColored from "../../images/LogoColored";
// import { basicSignIn, googleProviderSignIn } from "../../services/auth_service";
// import { auth } from "../../services/fire_app";

// const validation = object({
//     email: string().email().required(),
//     password: string().required(),
// });

// interface LoginStateProps {
//     email: string;
//     password: string;
// }

// const ProfileDeletion = () => {
//     const [error, setError] = useState(false);
//     const [visibility, setVisibility] = useState(false);

//     const navigate = useNavigate();

//     const [credentials, setCredentials] = useState<LoginStateProps>({
//         email: "",
//         password: "",
//     });

//     const createErrorMessage = () => {
//         setError(true);
//         setTimeout(() => setError(false), 2000);
//     };

//     console.log(auth.currentUser?.providerData)

//     const handleLogin = async () => {
//         try {
//             const { email, password } = await validation.validate(credentials);
//             await basicSignIn(email, password, r);
//             navigate("/");
//         } catch (error) {
//             console.error(error);
//             createErrorMessage();
//         }
//     };

//     const handleGoogleAuthentication = async () => {
//         try {
//             await googleProviderSignIn();
//             navigate("/");
//         } catch (error) {
//             throw error;
//         }
//     };

//     return (
//         <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-100">
//             <div className="h-max py-8 rounded shadow-md p-4 bg-white w-[500px] min-w-[300px] gap-4 flex flex-col">
//                 <div
//                     onClick={() => navigate(-1)}
//                     className="hover:bg-blue-100 w-max h-max p-1 rounded-full hover:cursor-pointer"
//                 >
//                     <MdArrowBack />
//                 </div>
//                 <div className="flex justify-center items-center flex-col gap-4">
//                     <LogoColored />
//                     <Title>Login Page</Title>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     {error && (
//                         <div className="text-red-600 text-xs">Login failed</div>
//                     )}
//                     <Input
//                         placeholder="Email"
//                         name="email"
//                         value={credentials.email}
//                         onChange={({ target: { value } }) =>
//                             setCredentials({ ...credentials, email: value })
//                         }
//                     />
//                     <Input
//                         placeholder="Password"
//                         type={!visibility ? "password" : "text"}
//                         value={credentials.password}
//                         onChange={({ target: { value } }) =>
//                             setCredentials({ ...credentials, password: value })
//                         }
//                     />
//                 </div>
//                 <div className="flex gap-2">
//                     <input
//                         type={"checkbox"}
//                         checked={visibility}
//                         onChange={() => setVisibility((prev) => !prev)}
//                     />
//                     <div>Show Password</div>
//                 </div>
//                 <div>
//                     <button
//                         className="outline-none w-full p-2 bg-blue-500 text-white rounded"
//                         onClick={handleLogin}
//                     >
//                         Login
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfileDeletion;
export default () => <div></div>