'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { shipping } from "@/app/types/cart-response";
import payCashOrders from "@/app/services/cart/pay-cash";
import toast from "react-hot-toast";
import payOnlineOrders from "@/app/services/cart/pay-online";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { payOrdersSchema } from "@/app/schema/payOrdersSchema";
import { Spinner } from "@/components/ui/spinner";
export default function CheckoutForm({ cartId }: { cartId: string }) {
    const [loadingType, setLoadingType] = useState<'cash' | 'online' | null>(null)
    async function payCash(cardId: string, shippingAddress: shipping) {
        const response = await payCashOrders(cardId, shippingAddress)
        console.log(response);
        if (response.status === 'success') {
            toast.success('Order will deliver soon...')
            // eslint-disable-next-line react-hooks/immutability
            window.location.href = '/'
        } else {
            toast.error('Error...')
        }
    }
    async function payOnline(cardId: string, shippingAddress: shipping) {
        const response = await payOnlineOrders(cardId, shippingAddress)
        console.log(response);
        if (response.status === 'success') {
            toast.success('Success')
            // eslint-disable-next-line react-hooks/immutability
            window.location.href = response.session.url
        } else {
            toast.error('Error...')
        }
    }
    const form = useForm<zod.infer<typeof payOrdersSchema>>({
        defaultValues: {
            details: '',
            city: '',
            phone: ''
        },
        resolver: zodResolver(payOrdersSchema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })
    async function submitForm(values: zod.infer<typeof payOrdersSchema>) {
        const shippingAddress: shipping = {
            details: values.details,
            city: values.city,
            phone: values.phone
        }
        if (loadingType === 'cash') {
            payCash(cartId, shippingAddress)
        } else if (loadingType === 'online') {
            payOnline(cartId, shippingAddress)
        }

        setLoadingType(null)
    }
    return (
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-10 my-10 bg-gray-200 rounded-2xl shadow">
            <h2 className="text-2xl font-bold text-green-600 ">Checkout</h2>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <div className="flex flex-col justify-center items-center gap-6 mt-4">
                    <div className="w-full">
                        <Controller
                            name="details"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Details :</FieldLabel>
                                    <Input
                                        className="bg-white"
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your details"
                                    />
                                </Field>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <Controller
                            name="city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>City :</FieldLabel>
                                    <Input
                                        className="bg-white"
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your city"
                                    />
                                </Field>
                            )}
                        />
                    </div>
                    <div className="w-full">
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Phone :</FieldLabel>
                                    <Input
                                        className="bg-white"
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your phone"
                                    />
                                </Field>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-4 justify-center items-center">
                        {/* button Pay Cash */}
                        <Button className="w-full hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600 "
                            type="button"
                            onClick={() => {
                                setLoadingType('cash')
                                form.handleSubmit(values => payCash(cartId, values))()
                            }}>
                            {loadingType === 'cash' ? <Spinner /> : 'Pay Cash'}
                        </Button>
                        {/* button Pay Online */}
                        <Button className="w-full bg-white text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white"
                            type="button"
                            onClick={() => {
                                setLoadingType('online')
                                form.handleSubmit(values => payOnline(cartId, values))()
                            }}>
                            {loadingType === 'online' ? <Spinner /> : 'Pay Online'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
