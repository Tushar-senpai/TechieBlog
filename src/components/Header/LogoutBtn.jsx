import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const logoutHandler = () => {
        // Display SweetAlert confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with logout
                authService.logout().then(() => {
                    dispatch(logout());
                    Swal.fire('Logged Out!', 'You have been logged out successfully.', 'success');
                    setTimeout(() => {
                        window.location.href = '/';
                        // navigate("/")
                    }, 1500); // Wait 1.5 seconds before redirect
                });
            }
        });
    };

    return (
        <button
            className="flex justify-center items-center gap-2 px-6 py-2 duration-200 rounded-full w-full font-semibold md:text-lg"
            onClick={logoutHandler}
        >
            <span>Logout</span> <LogOut size={20} />
        </button>
    );
}

export default LogoutBtn;
