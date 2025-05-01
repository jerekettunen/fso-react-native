import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useNewReview';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5, 
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center', 
  },
  errorStyle: {
    alignSelf: 'flex-start',
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 25,
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string().optional(),
});

const ReviewForm = () => {
  const [ createReview ] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      await createReview({ ownerName, repositoryName, rating: Number(rating), text });
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.ownerName && formik.errors.ownerName && { borderColor: 'red' },
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
        autoCapitalize='none'
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorStyle}>{String(formik.errors.ownerName)}</Text>
      )}
      
      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName && { borderColor: 'red' },
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
        autoCapitalize='none'
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorStyle}>{String(formik.errors.repositoryName)}</Text>
      )}
      
      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && { borderColor: 'red' },
        ]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorStyle}>{String(formik.errors.rating)}</Text>
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
      />
      
      <View style={styles.button}>
        <Pressable
          style={styles.button}
          onPress={() => formik.handleSubmit()}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Create Review</Text>
        </Pressable>
      </View>
    </View>
  )
}
export default ReviewForm;