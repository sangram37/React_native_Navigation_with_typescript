import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TextInput, View, Platform, Pressable, Text } from 'react-native';

import Colors from '../../Constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const AppFormField = (props: any) => {
    const {
        placeholder,
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props;
    const [open, setOpen] = useState<boolean | null>(props.isSecureTxt)
    const hasError = errors[name] && touched[name];
    console.log(errors, touched, "sangram")

    return (
        <>
            <View
                style={{
                    backgroundColor: props.backgroundColor,
                    marginTop: props.marginTop || null,
                    opacity: 1,
                    borderWidth: props.borderWidth || 1,
                    padding: Platform.OS === 'ios' ? 5 : 0,
                    borderColor: props.borderColor || Colors.light_dark,
                    borderRadius: props.borderRadius || 50,
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'row'

                }
                }>
                <View style={{ paddingLeft: 10, justifyContent: 'flex-start', width: '10%' }}>
                    {
                        props.logo
                    }
                </View>
                <TextInput
                    style={{
                        color: Colors.black,
                        marginLeft: 15,

                        // marginTop: -7,
                        // alignItems: 'center',
                        fontSize: 16,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        alignSelf: 'center',
                        // fontFamily: 'Roboto-Regular',
                        width: props.type ? '72%' : '80%'
                    }}
                    placeholder={placeholder}
                    onChangeText={text => onChange(name)(text)}
                    onBlur={() => {
                        setFieldTouched(name);
                        onBlur(name);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    {...inputProps}
                    placeholderTextColor={Colors.black}
                    secureTextEntry={open || false}
                    keyboardType={props.keyboardType || 'default'}


                />
                {props.type ? <Pressable style={{ paddingLeft: 10, justifyContent: 'flex-start', width: '10%' }} onPress={() => setOpen(!open)}>
                    <Ionicons
                        name={open ? "eye-off" : "eye"}
                        color={Colors.light_dark}
                        size={25}
                    />
                </Pressable> : null}
            </View>
            {hasError && <Text style={{
                fontSize: 13,
                color: '#B00020',
                marginLeft: 15,
                marginTop: 10,
                marginBottom: -5,
                // fontFamily: isIos ? Fonts.ios_font_bold : Fonts.androd_font_bold,
                fontWeight: '500',
            }}>{errors[name]}</Text>}
        </>
    );
};
export default AppFormField;
