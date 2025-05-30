import React from "react";
import Button from "../Common/Button/Button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <main className="min-h-screen bg-white text-sky-900 flex flex-col items-center justify-center px-6">
            <section className="max-w-4xl text-center space-y-8">
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-bold leading-tight text-sky-800"
                >
                    Welcome to <span className="text-sky-600">LendEase</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg text-sky-700"
                >
                    A smarter, faster, and simpler way to manage your loans. Experience the future of lending.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex gap-4 justify-center"
                >
                    <Button
                        buttonName={"Get Started"}
                        className="bg-sky-600 hover:bg-sky-700 text-white text-lg px-6 py-3 rounded-2xl shadow-md"
                        onClick={() => navigate("/customer/loan-application")}
                    />
                    <Button
                        buttonName={"Learn More"}
                        className="bg-sky-600 hover:bg-sky-700 text-white text-lg px-6 py-3 rounded-2xl shadow-md"
                    />


                </motion.div>
            </section>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-16"
            >
                <Sparkles className="text-sky-400 w-16 h-16 animate-pulse" />
            </motion.div>
        </main>
    );
};

export default HomePage;
