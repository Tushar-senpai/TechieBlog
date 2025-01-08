import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function ForgotPassword() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const forgotPassword = async (data) => {
        try {
            const session = await authService.resetPassword(data.email);
            
            if (session) {
                Swal.fire({
                    icon: "success",
                    title: "Reset Link Sent!",
                    text: "Please check your email for password reset instructions.",
                    timer: 3000,
                    showConfirmButton: false,
                });

                // Redirect to login page after showing success message
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Reset Failed!",
                text: error.message || "An error occurred while sending reset link.",
                confirmButtonText: "Try Again",
            });
        }
    };

    return (
        <div className="flex items-center justify-center w-full p-8">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" className="justify-center" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Reset Your Password
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Remember your password?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                <form onSubmit={handleSubmit(forgotPassword)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email :"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Send Reset Link
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;