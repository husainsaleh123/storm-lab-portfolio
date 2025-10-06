// controllers/api/review.js
import Review from '../../models/review.js';

//data controller

const dataController = {
    //Purpose: Retrieve single review by ID Process: Find by ID → Check existence → Store in locals → Continue Response: Single review object
    async index(req, res, next) {
        try {
            const reviews = await Review.find({});
            res.locals.data.reviews = reviews;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    //Purpose: Retrieve single review by ID Process: Find by ID → Check existence → Store in locals → Continue Response: Single review object
    async show(req, res, next) {
        try {
            const review = await Review.findById(req.params.id);
            if (!review) throw new Error('Review not found');
            res.locals.data.review = review;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    //Purpose: Create new review in database Process: Create from request body → Store in locals → Continue Response: Newly created reviews
    async create(req, res, next) {
        try {
            const review = await Review.create(req.body);
            res.locals.data.review = review;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    //Purpose: Update existing reviews:
    async update(req, res, next) {
        try {
            const review = await Review.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!review) throw new Error('Item not found');
            res.locals.data.review = review;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    //Purpose: Remove review from database Process: Find and delete → Store deleted review in locals → Continue
    async delete(req, res, next) {
        try {
            const review = await Review.findByIdAndDelete(req.params.id);
            if (!review) throw new Error('Item not found');
            res.locals.data.review = review;
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

//creating the apiController
const apiController = {
    index(req, res) {
        res.json(res.locals.data.reviews);
    },

    show(req, res) {
        res.json(res.locals.data.review);
    },

    create(req, res) {
        res.status(201).json(res.locals.data.review);
    },

    update(req, res) {
        res.json(res.locals.data.review);
    },

    delete(req, res) {
        res.json({ message: 'Review deleted successfully' });
    }
};

export { dataController, apiController };