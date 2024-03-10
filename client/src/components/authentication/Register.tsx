import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	FormErrorMessage,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { RegisterInput, login } from '../../store/auth/authActions';

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterInput>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<RegisterInput> = (data) => {
		dispatch(login(data));
		navigate('/');
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} w={'2xl'} py={12} px={6}>
				<Heading fontSize={'4xl'} textAlign={'center'}>
					Sign up
				</Heading>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl id='email' isInvalid={!!errors.email} my={4}>
								<FormLabel htmlFor='email'>Email address</FormLabel>
								<Input
									type='email'
									id='email'
									{...register('email', {
										required: 'This is required',
										minLength: {
											value: 5,
											message: 'Minimum length should be 5',
										},
									})}
								/>
								<FormErrorMessage mb={'2'}>
									{errors.email && errors.email.message}
								</FormErrorMessage>
							</FormControl>

							<FormControl id='password' isInvalid={!!errors.password} my={4}>
								<FormLabel htmlFor='password'>Password</FormLabel>
								<Input
									type='password'
									id='password'
									{...register('password', {
										required: 'This is required',
										minLength: {
											value: 5,
											message: 'Minimum length should be 5',
										},
									})}
								/>
								<FormErrorMessage mb={'2'}>
									{errors.password && errors.password.message}
								</FormErrorMessage>
							</FormControl>
							<Button
								// loadingText='Submitting'
								// size='lg'
								bg={'red.400'}
								color={'white'}
								_hover={{
									bg: 'red.500',
								}}
								type='submit'
								isLoading={isSubmitting}
							>
								Register
							</Button>
						</form>
						<Link to={'/login'}>
							<Text align={'center'}>
								Already a user?{' '}
								<Text as={'span'} color={'blue.400'}>
									Login instead
								</Text>
							</Text>
						</Link>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Register;
