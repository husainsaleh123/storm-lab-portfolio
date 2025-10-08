const BASE_URL = '/api';

// Helper function to set JSON headers (no auth needed)
function getJsonHeaders() {
    return {
        'Content-Type': 'application/json',
    };
}

// Fetch all contact messages
export async function getAllContacts() {
    const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'GET',
        headers: getJsonHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch contacts');
    }

    return response.json();
}

// Fetch a single contact message by ID
export async function getContactById(id) {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'GET',
        headers: getJsonHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch contact');
    }

    return response.json();
}

// Create a new contact message
export async function createContact(contactData) {
    const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create contact');
    }

    return response.json();
}

// Update an existing contact message
export async function updateContact(id, contactData) {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: getJsonHeaders(),
        body: JSON.stringify(contactData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update contact');
    }

    return response.json();
}

// Delete a contact message
export async function deleteContact(id) {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: getJsonHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete contact');
    }

    return response.json();
}
