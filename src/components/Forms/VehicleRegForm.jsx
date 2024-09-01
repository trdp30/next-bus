import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
const VehicleRegForm = () => {
    const location = useLocation();
    const initialValues = location?.state?.data || {
        gender: 'female',
        email:"abc@gmial.com",
        drivers: [
            { name: 'Driver 1', phoneNumber: '1234567890' }
        ]
    };;
    console.log("location", location?.state?.data)
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({ defaultValues: initialValues });
    const onSubmit = (data) => {
        console.log({ data });
    };
    const password = watch('password');
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'drivers'
    });
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <select className='border-2 w-full h-10' {...register("gender")}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
            </select>
            <div>
                <Input
                    type="date"
                    label="Date of Birth"
                    {...register('dateOfBirth', { required: 'Date of Birth is required' })}
                />
                {errors?.dateOfBirth && <p className="text-red-600">{errors?.dateOfBirth?.message}</p>}
            </div>
            <div>
                <Input
                    type="email"
                    label="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'Invalid email address'
                        }
                    })}
                />
                {errors?.email && <p className="text-red-600">{errors?.email?.message}</p>}
            </div>
            <div>
                <Input
                    type="password"
                    label="Password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        }
                    })}
                />
                {errors?.password && <p className="text-red-600">{errors?.password.message}</p>}
            </div>
            <div>
                <Input
                    type="password"
                    label="Verify Password"
                    {...register('verifyPassword', {
                        required: 'Verify Password is required',
                        validate: value => value === password || 'Passwords must match'
                    })}
                />
                {errors?.verifyPassword && <p className="text-red-600">{errors?.verifyPassword?.message}</p>}
            </div>
            <div>
                {fields.map((field, index) => (
                    <div key={field.id} className='my-3'>
                        <Input
                            type="text"
                            label={`Driver Name ${index + 1}`}
                            {...register(`drivers.${index}.name`)}
                        />
                        <Input
                            className='my-3'
                            type="text"
                            label={`Phone Number ${index + 1}`}
                            {...register(`drivers.${index}.phoneNumber`)}
                        />
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ name: '', phoneNumber: '' })}>Add Driver</button>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};
export default VehicleRegForm;
