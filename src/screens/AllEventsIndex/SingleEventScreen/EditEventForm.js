import React from 'react';
import {Text, View, Button, TouchableOpacity, Alert, Modal, SafeAreaView, ScrollView} from 'react-native';
import {Input, Label, Form, Item , Root} from 'native-base'
import { firebase } from '../../../firebase/config'
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class EditEventForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
			name: '',
			date: '',
			eventStartTime: '',
			description: '',
			votingDeadline: '',
			eventEndTime: '',
			isLoading: false,
			visibleModal: false
		};
		this.renderModalContent = this.renderModalContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  componentDidMount(){
    console.log('THIS.PROPS==>', this.props.firebase)
    const {event, convertDateTime} = this.props
    this.setState({
      date: convertDateTime(event.date.seconds, 'date'),
      name: event.name,
      description: event.description,
      eventStartTime: convertDateTime(event.eventStartTime.seconds,'time'),
      eventEndTime: convertDateTime(event.eventEndTime.seconds, 'time'),
      votingDeadline: convertDateTime(event.votingDeadline.seconds, 'date')
    })
  }

 handleChange(text, key){
   this.setState({
     [key]: text
   })

 }

  handleSubmit(event){

    const eventsRef = firebase.firestore().collection('events').doc(event.docId)
    .update({
      name:this.state.name,
      description: this.state.description,
    })




    this.setState({
      visibleModal: false
    })

  }

  renderModalContent(){
		const {event} = this.props
    // console.log('this.state.name', this.state.name)
		return (

		<Root style={{backgroundColor: '#ffffff'}}>
			<ScrollView contentContainerStyle={styles.modalView} >
				<Form style={styles.modalForm} onSubmit={this.handleSubmit}>
					{/* <Text>Event Name</Text> */}
					<Item fixedLabel style={styles.modalInput}>
						<Label>Event Name</Label>
						<Input
						  	style={styles.input}
								placeholder={this.state.name}
								placeholderTextColor='#aaaaaa'
                onChangeText={(text)=> {this.handleChange(text, 'name')}}
								underlineColorAndroid='transparent'
								autoCapitalize='none'
								value={this.state.name}
								maxLength={50}
								clearButtonMode='always'
						/>
          	</Item>
            {/* <Item fixedLabel style={styles.modalInput}>
            	<Label>Event Date</Label>
                <Input
                    style={styles.input}
                    placeholder={this.state.date}
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(text) => this.handleChange(text, 'date')}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    value={this.state.date}
                    name='name'
                    maxLength={20}
                    clearButtonMode='always'
                />
				  	</Item> */}
            {/* <Item fixedLabel style={styles.modalInput}>
            	<Label>Start Time</Label>
                <Input
                    style={styles.input}
                    // placeholder={event.eventStartTime}
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(text) => this.updateEvent(text)}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    value={this.state.eventStartTime}
                    maxLength={10}
                    clearButtonMode='always'
                />
				  	</Item>
            <Item fixedLabel style={styles.modalInput}>
            	<Label>End Time</Label>
                <Input
                    style={styles.input}
                    // placeholder={event.eventEndTime}
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(text) => this.updateEvent(text)}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    value={this.state.eventEndTime}
                    maxLength={10}
                    clearButtonMode='always'
                />
				  	</Item>
            <Item fixedLabel style={styles.modalInput}>
            	<Label>Voting Deadline</Label>
                <Input
                    style={styles.input}
                    // placeholder={event.votingDeadline}
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(text) => this.updateEvent(text)}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    value={this.state.votingDeadline}
                    maxLength={10}
                    clearButtonMode='always'
                />
				  	</Item> */}

            <Item fixedLabel style={styles.modalInput}>
            	<Label>Description</Label>
                <Input
                    style={styles.input}
                    // placeholder={event.description}
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(text) => this.handleChange(text, 'description')}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    value={this.state.description}
                    maxLength={20}
                    clearButtonMode='always'
                />
				  	</Item>


					<Button type='submit' title='Update Event' style={styles.modalButton}
						onPress={() => {
							this.handleSubmit(event)}
						}
					>
					</Button>
					<Button title='Cancel' style={styles.modalButton}
						onPress={() => {
							this.setState({
								visibleModal: false,
							})
						}}
					>
					</Button>
				</Form>
			</ScrollView>
			</Root>
		)
	}

  render(){
    // const {event} = this.props
    console.log('this.state.name==>', this.state.name)
    return(
      <View style={styles.container}>

      {this.state.visibleModal ?

        <View style={{backgroundColor: '#ffffff'}}>
        <Modal transparent={true} visible={this.state.visibleModal} animationType="slide">
          {this.renderModalContent()}
        </Modal>
        </View>

        :

        <View style={{backgroundColor: '#ffffff'}}>
          <Button title='Edit Event' onPress={()=> {this.setState({
              visibleModal: true,
            })}}>
          </Button>
        </View>

      }

    </View>


    )
  }

}
