// LoginCadastro.js

import React, { useState } from "react";
import { auth } from "../../firebase"; // Importe a configuração do Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function LoginCadastro({ onAuthSuccess }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, senha);
            } else {
                await createUserWithEmailAndPassword(auth, email, senha);
            }
            onAuthSuccess(); // Chame a função de callback após autenticação
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h2>{isLogin ? "Login" : "Cadastro"}</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {isLogin ? "Entrar" : "Cadastrar"}
                </button>
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Criar uma conta" : "Já tenho uma conta"}
                </button>
            </form>
        </div>
    );
}

export default LoginCadastro;
