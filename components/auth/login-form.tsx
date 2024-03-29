"use client";

import * as z from 'zod';


import { useState, useTransition } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from '@/components/ui/input';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSucces } from '@/components/form-succes';
import { login } from '@/actions/login';

export const LoginForm = () => {
    const [error, setError] = useState< string | undefined >('');
    const [success, setSuccess] = useState< string | undefined >('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      
      setError(''); 
      setSuccess('');
      
      startTransition(() => {
      login(values)
       .then((data) => {
        form.reset();
        setSuccess(data.success);
        setError(data.error);
       })
      })
    }

    return (
        <CardWrapper 
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account?"
          backButtonhref="/auth/register"
          showSocial>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'
            >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder='viespa.exe@example.com'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        disabled={isPending}
                        placeholder='********'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>
            <FormError  message={error}/>
            <FormSucces  message={success}/>
              <Button
              disabled={isPending}
              type='submit'
              className='w-full'
              >
                Login
              </Button>
            </form>
          </Form> 
        </CardWrapper>
    )
}

export default LoginForm;