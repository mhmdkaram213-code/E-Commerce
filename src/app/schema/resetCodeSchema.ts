import * as zod from "zod";
export const resetCodeSchema = zod.object({
    resetCode: zod.string().nonempty("Reset code is required")
        .regex(/^\d+$/, "Reset code must contain numbers only")
        .length(6, "Reset code must be exactly 6 digits"),
});
