import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { Children } from 'react'

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BodywarperProps } from '../Componentprops';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
type Props = React.ComponentProps<typeof SafeAreaView> & BodywarperProps;
const BodyWarpper: React.FC<BodywarperProps> = ({ children
}) => {

  return (
    <SafeAreaView style={{ ...styles.container, }} edges={['top']}>

      <KeyboardAwareScrollView enableAutomaticScroll={true} extraScrollHeight={50} >
        <StatusBar
          animated={true}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
        />
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView >
  )
}

export default BodyWarpper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
})