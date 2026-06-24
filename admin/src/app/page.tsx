"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Connect to NestJS Backend on port 3000
    const socket: Socket = io("http://localhost:3000");

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to live data server");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("new_order", (data) => {
      setOrders((prev) => [data, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-700">DineCore Admin</h1>
            <p className="text-gray-500 mt-1">Live Restaurant Metrics</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
            <span className="text-sm font-medium">{isConnected ? "Live Sync Active" : "Disconnected"}</span>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4">Live Orders feed</h2>
            {orders.length === 0 ? (
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-400">Waiting for new orders...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, idx) => (
                  <div key={idx} className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Order #{order.id}</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">{JSON.stringify(order)}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-blue-600 text-sm font-medium">Orders Today</p>
                <p className="text-3xl font-bold text-blue-900">{orders.length}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
