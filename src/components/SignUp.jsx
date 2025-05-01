import { Text, TextInput, Pressable, View, Button, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import React from 'react';
import { useNavigate } from 'react-router-native';

const style = StyleSheet.create({
    container: {
    padding: 10,
    backgroundColor: theme.colors.cardColor,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    shadowColor: "#00000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    width: '90%',
    borderRadius: 5, // Added to make input corners rounded
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center', // Ensures text is centered horizontally
  },
  errorStyle: {
    alignSelf: 'flex-start',
    color: theme.colors.errorRed,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 25,
  },
});


const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};
const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(5, 'Username must be at least 5 characters long'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});


export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={style.container}>
      <TextInput
        style={[
          style.input,
          formik.touched.username && formik.errors.username && { borderColor: theme.colors.errorRed },
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        autoCapitalize='none'
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={style.errorStyle}>{String(formik.errors.username)}</Text>
      )}
      <TextInput 
        style={[
          style.input,
          formik.touched.password && formik.errors.password && { borderColor: theme.colors.errorRed },
        ]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={style.errorStyle}>{String(formik.errors.password)}</Text>
      )}
      <TextInput 
        style={[
          style.input,
          formik.touched.confirmPassword && formik.errors.confirmPassword && { borderColor: theme.colors.errorRed },
        ]}
        placeholder="Confirm Password"
        secureTextEntry
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={style.errorStyle}>{String(formik.errors.confirmPassword)}</Text>
      )}
      <Pressable
        style={style.button}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
      </Pressable>
    </View>
  )
}


const SignUp = () => {
  const [ signUp ] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signUp({ username, password });
      // Show success notification or navigate to login
      console.log('Sign up successful', data);
      navigate('/signin'); // Navigate to sign-in page after successful registration

    } catch (e) {
      console.log(e);
    } 
  };


  return (
    <SignUpContainer onSubmit={onSubmit} />
  )
 
};

export default SignUp;