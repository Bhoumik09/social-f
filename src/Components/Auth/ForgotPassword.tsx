import axios from 'axios';
import  { FormEvent, useRef } from 'react'
import { backend } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

const forgotPasssword = () => {
    let userRef=useRef<HTMLInputElement>(null);
    let passwordRef=useRef<HTMLInputElement|null>(null);
    let emailRef=useRef<HTMLInputElement|null>(null);
    let confirmRef=useRef<HTMLInputElement|null>(null);
    let navigate=useNavigate();
    let handleChangePass = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let username: string | undefined = userRef.current?.value;
        let password: string | undefined = passwordRef.current?.value;
        let email: string | undefined = emailRef.current?.value;
        let confirmPassword: string | undefined = confirmRef.current?.value;

        try {
          // Make a POST request to send username and password
          console.log(password)
          console.log(confirmPassword)
          if(password!==confirmPassword){
            alert('Password and the Cionfrim Password should be same');
            return;
          }
          await axios.put(
            `${backend}/forgot-password`, // Login endpoint
            {
              username, // Data payload: username
              password, // Data payload: password
              email
            },
            {
              headers: {
                "Content-Type": "application/json", // Specify content type
                // Include Authorization only if required by the API
                // Authorization: "Bearer YOUR_TOKEN_HERE",
              },
            }
          );

          navigate('/');
      
        } catch (error) {
          console.error("Login failed", error);
        }
      };
      
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    
                    <form className="mt-12 flex flex-col items-center" onSubmit={handleChangePass}>
                        <h1 className="text-2xl xl:text-3xl font-extrabold text-orange-600">Create new password</h1>
                        <div className="w-full flex-1 mt-8">
                            
                            <div className="mx-auto max-w-xs flex flex-col gap-2 ">

                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Username"
                                    required
                                    ref={userRef}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    ref={emailRef}
                                />
                                
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    ref={passwordRef}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    ref={confirmRef}
                                />
                                <button className="mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3 ">Change Password</span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center text-[1rem] ">
                                    Have an Account?&nbsp;
                                    <Link to="/" className="border-b text-orange-600 font-bold text-[1rem] border-gray-500 border-dotted">
                                        Login
                                    </Link>
                                    <div>
                                    
                                    </div>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
                        }}
                    ></div>
                </div>
            </div>
        </div>


    )
}

export default forgotPasssword;
