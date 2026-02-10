import * as zod from "zod"
export const payOrdersSchema = zod.object({
    details: zod.string().nonempty('Details is Required').regex(/^[\u0600-\u06FFa-zA-Z0-9\s,.\-\/]{5,200}$/, 'Invalid Details'),
    city: zod.string().nonempty('City is Required').regex(/^[\u0600-\u06FFa-zA-Z\s]{2,50}$/, 'Invalid City'),
    phone: zod.string().nonempty('Phone is Required').regex(/^01[0125][0-9]{8}$/, 'Invalid Phone'),
})
