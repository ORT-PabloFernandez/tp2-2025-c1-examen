import { findAllUsers, findUserById, registerUser, findByCredentials } from "../data/userData.js";

export const getUsers = async () => {
    return await findAllUsers();
}

export const getUserById = async (id) => {
    return await findUserById(id);
}

export const registerUserService = async ({ username, email, password }) => {
    try {
        return await registerUser({ username, email, password });
    } catch (error) {
        if (error.message === "El email ya está registrado") {
            throw error;
        }
        throw new Error("Error al registrar el usuario");
    }
}

export const loginUserService = async ({ email, password }) => {
    const user = await findByCredentials(email, password);
    if (!user) {
        throw new Error("Credenciales inválidas");
    }
    // No devolver password
    const { password: _pw, ...userWithoutPassword } = user;
    return userWithoutPassword;
}