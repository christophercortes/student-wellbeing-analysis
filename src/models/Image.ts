// Required Imports
import {Document, Schema, model} from 'mongoose';

// Create the document
export interface IImage extends Document
{
    name: string;
    data: Buffer;
    contentType: string;
}

// Schema Rules
const imageSchema = new Schema<IImage>
(
    {
        name:
        {
            type: String,
            required: [true, 'Image name is required'],
        },
        data:
        {
            type: Buffer,
            required: [true, 'Image data is required'],
        },
        contentType:
        {
            type: String,
            required: [true, 'Image type is required'],
        },
    },
    {
        timestamps: true,
    }
);

const Image = model<IImage>('Image', imageSchema);
export default Image;