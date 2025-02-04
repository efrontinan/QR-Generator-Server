import { Schema, model } from "mongoose"

const qrSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'El autor es necesario']
        },
        scg: {
            type: String,
            required: [true, 'El svg es necesario']
        }
    },
    {
        timestamps: true
    }
)

const QR = model('QR', qrSchema)

export default QR