const BASE_URL = '/api';

// Helper function to set JSON headers (no auth needed)
function getJsonHeaders() {
    return {
        'Content-Type': 'application/json',
    };
}

// Fetch all reviews
export async function getAllReviews() {
    const response = await fetch(`${BASE_URL}/reviews`, {
        method: 'GET',
        headers: getJsonHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch reviews');
    }

    return response.json();
}

// Fetch a single review by ID
export async function getReviewById(id) {
    const response = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: 'GET',
        headers: getJsonHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch review');
    }

    return response.json();
}

// Create a new review
export async function createReview(reviewData) {
    const response = await fetch(`${BASE_URL}/reviews`, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create review');
    }

    return response.json();
}

// Update an existing review
export async function updateReview(id, reviewData) {
    const response = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: 'PUT',
        headers: getJsonHeaders(),
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update review');
    }

    return response.json();
}

// Delete a review
export async function deleteReview(id) {
    const response = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: getJsonHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete review');
    }

    return response.json();
}
