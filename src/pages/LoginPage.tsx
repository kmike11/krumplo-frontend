import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { loginRequest } from "../services/api";
import type { AuthResponse } from "../types/api";

interface LoginFormState {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });

  const mutation = useMutation<AuthResponse, Error, LoginFormState>({
    mutationFn: async (credentials) => {
      return loginRequest(credentials);
    },
    onSuccess: (auth) => {
      login(auth);
      navigate("/boards");
    }
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ email: form.email.trim(), password: form.password });
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        padding: "2rem"
      }}
    >
      <div
        className="card-surface"
        style={{ width: "min(420px, 100%)", padding: "2.25rem" }}
      >
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Login</h1>
          <p className="helper-text" style={{ marginTop: "0.5rem" }}>
            Sign in to access your product workspaces.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="form-control"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="form-control"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {mutation.isError && mutation.error ? (
            <p className="error-text" role="alert">
              {mutation.error.message}
            </p>
          ) : null}
          <button
            type="submit"
            className="button"
            style={{ width: "100%", marginTop: "1.25rem" }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p
          className="helper-text"
          style={{ textAlign: "center", marginTop: "1.5rem" }}
        >
          Need an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};
