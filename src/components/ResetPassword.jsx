import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { register, handleSubmit, watch } = useForm();

    const resetPassword = async (data) => {
        try {
            const userId = searchParams.get('userId');
            const secret = searchParams.get('secret');
            
            const session = await authService.completeReset(
                userId,
                secret,
                data.password,
                data.confirmPassword
            );
            
            if (session) {
                Swal.fire({
                    icon: "success",
                    title: "Password Reset Successful!",
                    text: "You can now login with your new password",
                    timer: 3000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Reset Failed!",
                text: error.message || "An error occurred while resetting password.",
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
                    Set New Password
                </h2>

                <form onSubmit={handleSubmit(resetPassword)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="New Password :"
                            type="password"
                            placeholder="Enter new password"
                            {...register("password", {
                                required: true,
                                minLength: 8,
                            })}
                        />
                        <Input
                            label="Confirm Password :"
                            type="password"
                            placeholder="Confirm new password"
                            {...register("confirmPassword", {
                                required: true,
                                validate: (val) => {
                                    if (watch('password') != val) {
                                        return "Passwords do not match";
                                    }
                                },
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;