import Review from '../../models/review.js';

const dataController = {
    // Purpose: Retrieve all reviews
    async index(req, res, next) {
        try {
            const reviews = await Review.find({});
            res.locals.data.reviews = reviews;
            next();  // Pass to the API controller for the response
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Purpose: Retrieve a single review by ID
    async show(req, res, next) {
        try {
            const review = await Review.findById(req.params.id);
            if (!review) throw new Error('Review not found');
            res.locals.data.review = review;
            next();  // Pass to the API controller for the response
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Purpose: Create a new review in the database
    async create(req, res, next) {
        try {
            // Ensure the user is logged in before allowing review submission
            if (!req.user) throw new Error('You must be logged in to submit a review');
            
            // Create the review and associate it with the logged-in user's ID
            const review = await Review.create({
                ...req.body,  // Spread the request body to get the message, rating, etc.
                userId: req.user._id  // Attach the logged-in user's ID to the review
            });

            // Store the newly created review in locals to pass to the next controller
            res.locals.data.review = review;
            next();  // Pass to the API controller for the response
        } catch (error) {
            console.error("Error creating review:", error);
            res.status(400).json({ error: error.message });
        }
    },

    // Purpose: Update an existing review by ID
    async update(req, res, next) {
        try {
            // Find the review by ID
            const review = await Review.findById(req.params.id);
            if (!review) throw new Error('Review not found');
            
            // Ensure the logged-in user is the owner of the review
            if (review.userId.toString() !== req.user._id.toString()) {
                throw new Error('You are not authorized to edit this review');
            }

            // Update the review with the provided data
            const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            res.locals.data.review = updatedReview;  // Store the updated review in locals
            next();  // Pass to the API controller for the response
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Purpose: Delete an existing review by ID
    async delete(req, res, next) {
        try {
            // Find the review by ID
            const review = await Review.findById(req.params.id);
            if (!review) throw new Error('Review not found');
            
            // Ensure the logged-in user is the owner of the review
            if (review.userId.toString() !== req.user._id.toString()) {
                throw new Error('You are not authorized to delete this review');
            }

            // Delete the review from the database
            await Review.findByIdAndDelete(req.params.id);

            res.locals.data.review = review;  // Store the deleted review in locals for response
            next();  // Pass to the API controller for the response
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

const apiController = {
    // Purpose: Respond with the list of all reviews
    index(req, res) {
        res.json(res.locals.data.reviews);
    },

    // Purpose: Respond with a single review
    show(req, res) {
        res.json(res.locals.data.review);
    },

    // Purpose: Respond with the newly created review
    create(req, res) {
        res.status(201).json(res.locals.data.review);
    },

    // Purpose: Respond with the updated review
    update(req, res) {
        res.json(res.locals.data.review);
    },

    // Purpose: Respond with a message indicating successful deletion
    delete(req, res) {
        res.json({ message: 'Review deleted successfully', review: res.locals.data.review });
    }
};

export { dataController, apiController };
