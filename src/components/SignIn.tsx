import { Text, TextInput, Pressable, View, Button, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

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
};

const onSubmit = (values) => {
  console.log('Form values:', values);
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});



const SignIn = () => {
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
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={style.errorStyle}>{formik.errors.username}</Text>
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
        <Text style={style.errorStyle}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={style.button}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Sign In</Text>
      </Pressable>
    </View>
  )
};

export default SignIn;