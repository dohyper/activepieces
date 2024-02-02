import { getAuthenticationToken } from "./authentication";
import { HYPER_INTERFACE_URL } from "./config";

export type AuthContext = {
    username: string;
    password: string;
}


export async function getResources(auth: AuthContext) {
    const token = await getAuthenticationToken(auth.username, auth.password);
    const response = await fetch(`${HYPER_INTERFACE_URL}/resource`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return await response.json();
}

export async function readManyResource(resource: string, auth: AuthContext) {
    const token = await getAuthenticationToken(auth.username, auth.password);
    const response = await fetch(`${HYPER_INTERFACE_URL}/${resource}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return await response.json();
}

export async function readOneResource(resource: string, id: any, auth: AuthContext) {
    const token = await getAuthenticationToken(auth.username, auth.password);
    const response = await fetch(`${HYPER_INTERFACE_URL}/${resource}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return await response.json();
}

export async function createResource(resource: string, data: any, auth: AuthContext) {
    const token = await getAuthenticationToken(auth.username, auth.password);
    const response = await fetch(`${HYPER_INTERFACE_URL}/${resource}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

export async function updateResource(resource: string, id: any, data: any, auth: AuthContext) {
    const token = await getAuthenticationToken(auth.username, auth.password);
    const response = await fetch(`${HYPER_INTERFACE_URL}/${resource}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

export async function deleteResource(resource: string, id: any, auth: AuthContext) {
    const token = await getAuthenticationToken(auth.username, auth.password);
    const response = await fetch(`${HYPER_INTERFACE_URL}/${resource}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return await response.json();
}