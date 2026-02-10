'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
import { signOut } from "next-auth/react";
import { changePasswordSchema } from "@/app/schema/changePasswordSchema";
import changePassword from "@/app/services/password/changePassword";
export default function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(changePasswordSchema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })
    async function submitForm(values: zod.infer<typeof changePasswordSchema>) {
        console.log(values);
        setIsLoading(true)
        const response = await changePassword(values.currentPassword, values.password, values.rePassword)
        console.log(response);
        form.reset({
            currentPassword: "",
            password: "",
            rePassword: ""
        })
        if (response?.message === "success") {
            toast.success("Password changed successfully")
            signOut({ callbackUrl: "/login" })
        } else {
            toast.error('Error...')
        }
        setIsLoading(false)
    }
    return (
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-10 my-10 bg-gray-200 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-green-600 ">Change Password</h2>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <div className="flex flex-col justify-center items-center gap-6 mt-4">
                    <div className="w-full">
                        <Controller
                            name="currentPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Current Password :</FieldLabel>
                                    <Input
                                        type="password"
                                        className="bg-white"
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter Your Current Password"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>New Password :</FieldLabel>
                                    <Input
                                        type="password"
                                        className="bg-white"
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter Your New Password"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <Controller
                            name="rePassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Confirm Password :</FieldLabel>
                                    <Input
                                        type="password"
                                        className="bg-white"
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter Your Confirm Password"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 animate-spin">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                            : 'Change Password'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
