import { Schema, model } from "mongoose"

const qrSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'El autor es necesario']
        },
        svg: {
            type: String,
            required: [true, 'El svg es necesario']
        },
        name: {
            type: String,
            required: [true, 'El nombre del QR es necesario']
        }
    },
    {
        timestamps: true
    }
)

const QR = model('QR', qrSchema)

export default QR