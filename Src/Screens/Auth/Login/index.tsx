import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image, Pressable, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigation/RootStackPrams';
import Colors from '../../../Constans/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BodyWarpper from '../../../Components/BodyWarpper';
import { Field, Formik, } from 'formik';
import * as Yup from 'yup';
import AppFormField from '../../../Components/Form/AppFormField';


type loginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
    const [btnLoader, setBtnloader] = useState(false);
    const animatedScale = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<loginScreenProp>();

    const shakeAnimation = new Animated.Value(0)
    const startShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: false }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: false }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: false }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: false })
        ]).start();


    }
    useEffect(() => {
        animatedScale.setValue(1);

    }, []);
    const handleOnPress = () => {
        animatedScale.setValue(0.8);
        Animated.spring(animatedScale, {
            toValue: 1,
            bounciness: 24,
            speed: 20,
            useNativeDriver: true,
        }).start();
        startShake()
    };
    const validationSchema = Yup.object().shape({


        email: Yup.string()
            .email('Please enter valid email')
            .required('Email is required')
            .label('Email'),
        password: Yup.string()
            .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
            .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
            .matches(/\d/, 'Password must have a number')
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required')
            .label('Password'),

    });
    const openAlert = () => {
        Alert.alert(
            '',
            'You are successfully logged in',
            [
                { text: 'Ok', onPress: () => console.log('Yes button clicked') },
            ],
            {
                cancelable: true
            }
        );
    }
    const settime = () => {
        setBtnloader(true)
        setTimeout(() => {
            setBtnloader(false)
            openAlert()
        }, 2000)
    }
    return (
        <BodyWarpper>

            <Image source={require('../../../Assets/Icons/logo.png')} style={styles.logo} />

            <Text style={styles.subhead}>Sign in your account</Text>
            <Formik
                initialValues={{ email: '', password: '', }}
                onSubmit={(values: any) => settime()}

                validationSchema={validationSchema}>
                {({ errors, touched, handleSubmit }) =>
                    // errors.email && touched.email ?
                    <>

                        <Animated.View style={{ ...styles.textinput, marginBottom: 10, transform: errors.email && touched.email ? [{ translateX: shakeAnimation }] : [{ translateX: 0 }] }}>
                            <Field component={AppFormField}

                                name="email"
                                placeholder="Email"
                                autoCompleteType="email"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                logo={<Ionicons
                                    name="mail"
                                    color={Colors.logocolor}
                                    size={25}
                                />}

                            />
                        </Animated.View>

                        <Animated.View style={{ ...styles.textinput, marginBottom: 10, transform: errors.password && touched.password ? [{ translateX: shakeAnimation }] : [{ translateX: 0 }] }}>
                            <Field component={AppFormField}
                                name="password"
                                placeholder="Password"
                                // secureTextEntry
                                textContentType="password"
                                logo={<MaterialIcons
                                    name="lock"
                                    color={Colors.logocolor}
                                    size={25}

                                />}
                                isSecureTxt={true}
                                type={true}

                            />
                        </Animated.View>


                        <Pressable onPress={() => {
                            handleOnPress()
                            handleSubmit()

                        }}
                            disabled={btnLoader}
                            style={{ alignSelf: 'center', width: '100%', alignItems: 'center', marginTop: 20 }}>
                            <Animated.View
                                style={[styles.button, { transform: [{ scale: animatedScale }] }]}>
                                <Text style={styles.buttonText}>Sign In</Text>
                                {btnLoader ? (
                                    <ActivityIndicator size="small" color={Colors.white} />
                                ) : null}
                            </Animated.View>
                        </Pressable>
                        {/* <AppFormSubmitButton title="Submit" /> */}
                    </>}
            </Formik>

            <View
                style={{
                    marginTop: 20,
                    alignItems: 'flex-end',
                    marginRight: 25,
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                }}>
                <Text>Don't have an account ?</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Signup')
                    }
                    }>
                    <Text style={{ color: Colors.primary, fontWeight: '500' }}> Sign up</Text>
                </TouchableOpacity>
            </View>

        </BodyWarpper>
    );
}
const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    textinput: {
        width: '93%',
        marginTop: 10,
        alignSelf: 'center',
    },
    logo: {
        width: '80%',
        height: 200,
        alignSelf: 'center'
    },
    subhead: {
        fontSize: 18,
        textAlign: 'center',
        color: Colors.light_gray,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 5
    },
    touchable: {
        flex: 0.5,
        borderColor: 'black',
        borderWidth: 1
    },
    button: {
        backgroundColor: Colors.primary,
        width: '90%',
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        padding: 5,
        fontWeight: '500'
    },
    error: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#B00020',
        textAlign: 'center',
        // fontFamily: isIos ? Fonts.ios_font_bold : Fonts.androd_font_bold,
        fontWeight: '800',
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        position: 'absolute',
        bottom: 30,
        padding: 10,
        borderRadius: 5,
        maxWidth: '90%'

    },
});

export default Login;
