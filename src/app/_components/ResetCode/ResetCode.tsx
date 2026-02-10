'use client'
import { resetCodeSchema } from "@/app/schema/resetCodeSchema";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
export default function ResetCode() {
    const [isLoading, setIsLoading] = useState(false) 
    const form = useForm({
        defaultValues: {
            resetCode: '',
        },
        resolver: zodResolver(resetCodeSchema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })
    async function submitForm(values: zod.infer<typeof resetCodeSchema>) {
        console.log(values);
        setIsLoading(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        console.log(data);
        form.reset({
            resetCode: ''
        })
        if (response?.ok) {
            toast.success('Success  Code') 
            // eslint-disable-next-line react-hooks/immutability
            window.location.href = '/newPassword'
        } else {
            toast.error('Error...')
        }
        setIsLoading(false)
    }
    return (
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-10 my-10 bg-gray-200 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-green-600 ">Verify Reset Code</h2>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <div className="flex flex-col justify-center items-center gap-6 mt-4">
                    <div className="w-full">
                        <Controller
                            name="resetCode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Verification Code :</FieldLabel>
                                    <Input
                                    type='text'
                                        className="bg-white"
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter 6-digit Code"
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
                            : 'Verify Code'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
