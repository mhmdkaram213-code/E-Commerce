import * as zod from "zod"
export const registerSchema = zod.object({
    name: zod.string().nonempty('Name is Required').min(3, 'Name min 3 char').max(8, 'Name is max 8 char'),
    email: zod.string().nonempty('Email is Required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),
    password: zod.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Invalid Password'),
    rePassword: zod.string().nonempty('rePassword is Required'),
    phone:zod.string().nonempty('Phone is Required').regex(/^01[0125][0-9]{8}$/ , 'Invalid Phone')
}).refine((data)=> data.password === data.rePassword ,{path:["rePassword"] , message:'Invalid rePassword'})
