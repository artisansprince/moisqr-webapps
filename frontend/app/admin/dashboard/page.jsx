"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/admin/login");
        }
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-2xl p-6 space-y-4 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-800">Dashboard Admin</h2>
                <p className="text-center text-gray-600">Selamat datang di halaman dashboard.</p>
            </div>
        </div>
    );
}
