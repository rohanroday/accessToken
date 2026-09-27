import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate()
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/auth/login",{
          email,
          password
        })
        console.log(res)

        navigate("/me")
      };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Create an account</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
            
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
                Register
            </button>
        </form>
    </div>
</main>
  );
}