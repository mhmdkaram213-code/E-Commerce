import * as zod from "zod"
export const changePasswordSchema = zod.object({
    currentPassword: zod.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Invalid Password'),
    password: zod.string().nonempty('Password is Required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Invalid Password'),
    rePassword: zod.string().nonempty('rePassword is Required'),
}).refine((data)=> data.password === data.rePassword ,{path:["rePassword"] , message:'Invalid rePassword'})
