// pages/api/products/add.js

import connectDB from '../../../utils/db';
import Product from '../../../models/product-model';
import multer from 'multer';

connectDB();

const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            upload.single('image')(req, res, async (err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).json({ success: false, message: 'File upload failed' });
                }
                const product = new Product(req.body);
                await product.save();
                res.status(201).json({ success: true, product });
            });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
