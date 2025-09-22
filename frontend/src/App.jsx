// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import RecallsList from "./pages/RecallsList";
import RecallDetail from "./pages/RecallDetail";
import IngestFDA from "./pages/IngestFDA";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="p-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/recalls" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recalls" element={<RecallsList />} />
          <Route path="/recalls/:id" element={<RecallDetail />} />
          <Route path="/ingest" element={<IngestFDA />} />
        </Routes>
      </main>
    </div>
  );
}
