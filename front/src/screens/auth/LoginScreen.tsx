import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../../components/InputField.tsx';
import CustomButton from '../../components/CustomButton.tsx';
import useForm from '../../hooks/useForm.ts';
import {validateLogin} from '../../utils';

function LoginScreen() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  //
  // const handleChangeEmail = (text: string) => {
  //   setEmail(text);
  // };
  //
  // const handleChangePassword = (text: string) => {
  //   setPassword(text);
  // };

  // const [values, setValues] = useState({
  //   email: '',
  //   password: '',
  // });
  //
  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  // });
  //
  // const handleChangeText = (name: string, text: string) => {
  //   setValues({
  //     ...values,
  //     [name]: text,
  //   });
  // };
  //
  // const handleBlur = (name: string) => {
  //   setTouched({
  //     ...touched,
  //     [name]: true,
  //   });
  // };

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    console.log('values', login?.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={login.errors.email}
          touched={login?.touched.email}
          inputMode="email"
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          // value={values.password}
          // onChangeText={text => handleChangeText('password', text)}
          // onBlur={() => handleBlur('password')}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton label="로그인" size="large" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
