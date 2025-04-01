import { create } from "zustand";
import { axiosInstance } from "../Lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSighningUp: false,
    isLogingIng: false,
    isProfileUpdated: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check-user');
            set({ authUser: res.data });

        } catch (e) {
            console.log("Error in check-user:", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSighningUp: true });
        try {
            await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });
            toast.success('Account has been signed up')
        } catch (error) {
            console.log("Error in signup:", error);
            toast.error('Failed to signup')
        } finally {
            set({ isSighningUp: false });
        }
    },

    login: async (data) => {
        set({ isLogingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });
            toast.success('Logged in successfully')
        } catch (error) {
            console.log("Error in login:", error);
            toast.error('Failed to login')
        } finally {
            set({ isLogingIn: false });
        }
    },

    logout: async () => {
        try {
            console.log("logout");
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success('Logged out successfully')

        } catch (error) {
            console.log("Error in logout:", error);
            toast.error('Failed to logout')
        }
    },

    updateProfile: async (data) => {
        set({ isProfileUpdated: true });
        try {
            console.log(data);
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success('Profile has been updated')

        } catch (error) {
            console.log("Error in updateProfile:", error);
            toast.error('Failed to update profile')
        } finally {
            set({ isProfileUpdated: false });
        }
    }

}))