import { PieceAuth } from "@activepieces/pieces-framework";
import { HYPER_IDENTITY_URL, HYPER_IDENTITY_REALM, HYPER_IDENTITY_CLIENT_ID } from "./config";

export async function getAuthenticationToken(username: string, password: string) {
    // Construct the token endpoint URL
    const tokenEndpoint = `${HYPER_IDENTITY_URL}/realms/${HYPER_IDENTITY_REALM}/protocol/openid-connect/token`;

    // Set up the request payload
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', HYPER_IDENTITY_CLIENT_ID);
    formData.append('username', username);
    formData.append('password', password);

    // Make the request to Keycloak
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })
    const data = await response.json();

    return data.access_token;
}


export const authentication = PieceAuth.BasicAuth({
    description: "Enter your username and password",
    required: true,
    username: {
        displayName: "Username",
        description: "Enter your username",
    },
    password: {
        displayName: "Password",
        description: "Enter your password",
    },
    validate: async ({ auth }) => {
        try {
            const token = await getAuthenticationToken(auth.username, auth.password);
            if (token) {
                return {
                    valid: true,
                }
            }
        } catch (_) {
            return {
                valid: false,
                error: "Error in authentication server"
            }
        }
        return {
            valid: false,
            error: "Invalid username or password"
        }
    }
})