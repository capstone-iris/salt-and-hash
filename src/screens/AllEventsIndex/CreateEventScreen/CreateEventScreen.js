import React from "react";
import { Text, SafeAreaView, ScrollView,StyleSheet, TextInput, View , TouchableOpacity} from 'react-native';
// import styles from './styles'

export default function CreateEventForm(){

return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.inputContainer}>
            <View>
              <Text style={styles.title}>Create An Event</Text>
            </View>
            <TextInput
            style={styles.textInput}
            placeholder='Event Name'
            maxLength={20}
            />
            <TextInput
            style={styles.textInput}
            placeholder='Date Dropdown'
            maxLength={20}
            />
                <View style={styles.eventTime} >
                  <TextInput
                  style={styles.textInput}
                  placeholder='Start Time Dropdown'
                  maxLength={20}
                  />
                  <TextInput
                  style={styles.textInput}
                  placeholder='End Time Dropdown'
                  maxLength={20}
                  />
                </View>
            <TextInput
            style={styles.textInput}
            placeholder='Restaurant Selections Dropdown'
            maxLength={20}
            />
            <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder='Write a description...'
            maxLength={200}
            height={90}
            />
            <Text style={styles.preferences}>Optional Preferences</Text>


            <TouchableOpacity
                    style={styles.button}
                    // onPress={() => onLoginPress()}
                    >
                    <Text style={styles.submitBtn}>Submit</Text>
                </TouchableOpacity>
           </View>



        </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  inputContainer: {
    padding: 10
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderWidth:1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    height: 40,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    },
  preferences: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 5

  },
  title: {
    fontSize: 35,
    padding: 5
  },
  button: {
    backgroundColor: '#ddb39d',
    margin: 50,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    width: 250,
},
submitBtn: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
},
})
