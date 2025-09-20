import './App.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import eyeclosed from './assets/eyeclosed.png';
import eyeopened from './assets/eyeopened.png';

const loginSchema = z.object({
  username: z.string().min(2, '아이디를 입력해주세요!'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상 입력해주세요!')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!?@%*]).{6,}$/,
      '비밀번호는 영문, 숫자, 특수문자(! ? @ % *)를 모두 포함해주세요'
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('로그인한 아이디:', data);
    alert(`로그인 시도한 아이디: ${data.username}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-900 shadow-md w-full max-w-md relative">
        <div className="absolute top-1 right-20">
          <span className="bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow-md">
            Click me!
          </span>

          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        <img
          src={showPassword ? eyeclosed : eyeopened}
          alt="캐릭터"
          className="w-24 h-24 mx-auto mb-6 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-100 mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="username"
              {...register('username')}
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-100 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            className="w-full bg-purple-100 text-navy py-2 rounded hover:bg-purple-200"
            type="submit"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
