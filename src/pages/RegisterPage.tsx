import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { registerRequest } from "../services/api";
import type { AuthResponse } from "../types/api";

interface RegisterFormState {
  email: string;
  password: string;
  displayName: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<RegisterFormState>({
    email: "",
    password: "",
    displayName: ""
  });

  const mutation = useMutation<AuthResponse, Error, RegisterFormState>({
    mutationFn: async (credentials) => {
      return registerRequest(credentials);
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
    mutation.mutate({
      email: form.email.trim(),
      password: form.password,
      displayName: form.displayName.trim()
    });
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
        style={{ width: "min(460px, 100%)", padding: "2.5rem" }}
      >
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.6rem" }}>
            Create your workspace
          </h1>
          <p className="helper-text" style={{ marginTop: "0.5rem" }}>
            Invite your team by creating the first workspace member.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="displayName">Full name</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              className="form-control"
              required
              value={form.displayName}
              onChange={handleChange}
            />
          </div>
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
              autoComplete="new-password"
              className="form-control"
              minLength={8}
              required
              value={form.password}
              onChange={handleChange}
            />
            <span className="helper-text">Must be at least 8 characters.</span>
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
            {mutation.isPending ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p
          className="helper-text"
          style={{ textAlign: "center", marginTop: "1.5rem" }}
        >
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
