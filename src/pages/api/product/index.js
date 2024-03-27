import connectDB from "../../../../utils/db";
import { handleGetRequest, handlePostRequest } from "../../../../utils/controller/product-controller";
import util from 'util';
import upload from "../../../../utils/middleware/fileupload";
export const config = {
    api: {
        bodyParser: false, // Disable built-in body parsing to use the upload middleware
    },
};
connectDB();
const uploadPromise = util.promisify(upload.single('file'));
export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                await handleGetRequest(req, res);
                break;
            case 'POST':
                await uploadPromise(req, res);
                await handlePostRequest(req, res);
                break;
            default:
                res.status(405).json({ success: false, error: 'Method Not Allowed' });
                break;
        }
    } catch (error) {
        console.error('Error in handler:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}