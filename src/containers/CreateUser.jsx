import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const CreateUser = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const roles  = {
    admin: "ADMIN",
    areaManager: "AREA_MANAGER",
    owner: "OWNER",
    driver: "DRIVER",
    assistantDriver: "ASSISTANT_DRIVER",
    handyman: "HANDYMAN",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    if (data.profilePic && data.profilePic[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        data.profilePic = base64String;
        data.role = selectedRole; 
        console.log('Form Data:', data);
        reset(); 
      };
      reader.readAsDataURL(data.profilePic[0]);
    } else {
      data.role = selectedRole; 
      console.log('Form Data:', data);
      reset(); 
    }
  };
  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setValue('role', value); 
  };

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name', { required: 'Name is required' })}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address',
              },
            })}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid phone number. Must be 10 digits.',
              },
            })}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <div>
          <Label htmlFor="profilePic">Profile Picture</Label>
          <Input
            id="profilePic"
            type="file"
            {...register('profilePic', { required: 'Profile picture is required' })}
          />
          {errors.profilePic && <p className="text-red-600">{errors.profilePic.message}</p>}
        </div>
        <Select onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(roles).map((role) => (
              <SelectItem key={role} value={roles[role]}>
                {roles[role].replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Create User</Button>
      </form>
    </div>
  );
};
export default CreateUser;
