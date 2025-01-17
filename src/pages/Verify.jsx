
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "../appwrite/auth";
import Swal from "sweetalert2";

function Verify() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('verifying');

    useEffect(() => {
        const verifyEmail = async () => {
            const secret = searchParams.get('secret');
            const userId = searchParams.get('userId');

            if (!secret || !userId) {
                Swal.fire({
                    icon: 'error',
                    title: 'Verification Failed',
                    text: 'Invalid verification link. Please request a new verification email.',
                });
                navigate('/login');
                return;
            }

            try {
                await authService.updateVerification({
                    id: userId,
                    secret: secret
                });

                setVerificationStatus('success');

                Swal.fire({
                    icon: 'success',
                    title: 'Email Verified!',
                    text: 'Your email has been successfully verified. You can now log in.',
                    confirmButtonText: 'Go to Login'
                }).then(() => {
                    navigate('/login');
                });
            } catch (error) {
                setVerificationStatus('error');
                
                Swal.fire({
                    icon: 'error',
                    title: 'Verification Failed',
                    text: error.message || 'Something went wrong during verification. Please try again.',
                    confirmButtonText: 'Back to Login'
                }).then(() => {
                    navigate('/login');
                });
            }
        };

        verifyEmail();
    }, [navigate, searchParams]);

    const renderStatus = () => {
        switch (verificationStatus) {
            case 'verifying':
                return (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-lg">Verifying your email...</p>
                        </div>
                    </div>
                );
            case 'success':
                return (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center text-green-600">
                            <p className="text-lg">Email verified successfully!</p>
                        </div>
                    </div>
                );
            case 'error':
                return (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center text-red-600">
                            <p className="text-lg">Verification failed. Please try again.</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return renderStatus();
}

export default Verify;