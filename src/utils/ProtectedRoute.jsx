import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../states/AuthContext"

export default function ProtectedRoute() {
    const { currentUser } = useAuth()
    return currentUser ? <Outlet /> : <Navigate to="/login" />
}
