// import React, { useState, useEffect } from 'react';
// import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
// import styles from './styles';
// import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen';
// import { useNavigation } from '@react-navigation/native';
// import { firebase } from './../../../firebase/config';

// export default function EventsInvitedToScreen() {

// 	const navigation = useNavigation();
// 	const [usersData, setUsersData] = useState([]);
// 	const [guestsData, setGuestsData] = useState([]);
//   const [eventsData, setEventsData] = useState([]);
  
//   async function fetchUser() {
//     if (!firebase.auth().currentUser) {
//       return;
//     }
//     const currentUser = await firebase.auth().currentUser;
//     console.log('currentUser', currentUser)
//     let result = [];

//     const unsubscribe = firebase
//       .firestore()
//       .collection('users')
//       .where('id', '==', currentUser)
//       .onSnapshot((snapshot) => {
//         snapshot.forEach((doc) => {
//           result.push(doc.data());
//         });
//         setUsersData(result);
//       });
//       console.log('in fetch user', usersData)
//     return () => unsubscribe();
//   }

//   async function fetchGuests() {
//     let result = [];

//     const guestsRef = await firebase
//       .firestore()
//       .collection('eventGuests')
//       .doc(usersData[0].phoneNumber)
//       .collection('eventsInvitedTo');
//     guestsRef.get().then((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         result.push(doc.data());
//       });
//     })
//     setGuestsData(result);
//     console.log('in fetch guests', guestsData);

//   }

//   async function fetchEvents() {
//     let result = [];

//     guestsData.forEach(async (event) => {
//       const eventsRef = await firebase
//         .firestore()
//         .collection('events')
//         .where('docId', '==', event.eventId)
//         .onSnapshot((snapshot) => {
//           snapshot.forEach((doc) => {
//             result.push(doc.data());
//           });
//         });
//     });
//     setEventsData(result);
//     console.log('in fetchEvents', eventsData);
//   }

// 	useEffect(() => {
//     fetchUser();
//     fetchGuests();
//     fetchEvents();
//   },[]);


//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>
//         {'\n'}
//         Events Invited To Screen
//         {'\n'}
//       </Text>
//       {eventsData.map((event, index) => {
//         return (
//           <TouchableOpacity
//             style={styles.singleEventContainer}
//             activeOpacity={0.5}
//             key={index}
//             onPress={() => navigation.navigate('Single Event', { event })}
//           >
//             <Text style={styles.txt}>{event.name}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </SafeAreaView>
//   );
// }




import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import RestaurantSwipeScreen from '../../RestaurantsIndex/RestaurantSwipeScreen/RestaurantSwipeScreen';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './../../../firebase/config';

export default class EventsInvitedTo extends React.Component {
  constructor() {
    super();
    this.state = {
      // usersData: {},
      // guestsData: [],
      eventsData: [],
    };
   
    this.fetchData = this.fetchData.bind(this)
    // this.fetchUser = this.fetchUser.bind(this)
    // this.fetchGuests = this.fetchGuests.bind(this)
    // this.fetchEvents = this.fetchEvents.bind(this)

  }

 async componentDidMount() {
   //test 1 await 
   await this.fetchData()
  //  await this.fetchUser();
  //  await this.fetchGuests();
  //  await this.fetchEvents();
  }

  async fetchData() {
      try {
      if (!firebase.auth().currentUser) {
        return;
      }
      const currentUser = await firebase.auth().currentUser.uid;
      let userResult;
      let guestsResult = [];
      let eventsResult = [];
  
      const userData = await firebase
        .firestore()
        .collection('users')
        .where('id', '==', currentUser)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            userResult = doc.data();
            firebase.firestore()
          .collection('eventGuests')
          .doc(userResult.phoneNumber)
          .collection('eventsInvitedTo')
          // .get()
          .onSnapshot((snapshot) => {
            console.log('inguestsdata')
            snapshot.forEach((doc) => {
              guestsResult.push(doc.data());
              guestsResult.forEach(async (event) => {
                     await firebase
                      .firestore()
                      .collection('events')
                      .where('docId', '==', event.eventId)
                      .onSnapshot((snapshot) => {
                        snapshot.forEach((doc) => {
                          eventsResult.push(doc.data());
                          console.log('eventsResult', eventsResult, doc.data())
                        });
                        this.setState({eventsData: eventsResult})
                        console.log('eventsData', this.state.eventsData)

            });

          });
          ///move outside of onsnapshot, test 2
        });
      })

      // const guestsData = await firebase.firestore()
      //     .collection('eventGuests')
      //     .doc(userResult.phoneNumber)
      //     .collection('eventsInvitedTo')
      //     // .get()
      //     .onSnapshot((snapshot) => {
      //       console.log('inguestsdata')
      //       snapshot.forEach((doc) => {
      //         guestResult.push(doc.data());
      //       });
      //       console.log('guestsResult', guestsResult)
      //     });
    })
  })
          } catch (error) {
            console.log(error)
      }
    }

  // async fetchUser() {
  //   try {
  //   if (!firebase.auth().currentUser) {
  //     return;
  //   }
  //   const currentUser = await firebase.auth().currentUser.uid;
  //   let result;

  //   const userRef = await firebase
  //     .firestore()
  //     .collection('users')
  //     .where('id', '==', currentUser)
  //     .onSnapshot((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         result = doc.data();
  //         console.log('user result', result)
  //       });
  //       this.setState({ usersData: result });
  //       ///move outside of onsnapshot, test 2
  //     });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  

  // async fetchGuests() {
  //   try {
  //   console.log('in fetch guests', this.state.usersData.phoneNumber)
  //   let result = [];

  //   const guestsRef = await firebase
  //     .firestore()
  //     .collection('eventGuests')
  //     .doc(this.state.usersData.phoneNumber)
  //     .collection('eventsInvitedTo')
  //     // .get()
  //     .onSnapshot((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         result.push(doc.data());
  //       });
  //       this.setState({ guestsData: result });
  //     });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async fetchEvents() {
  //   try {
  //   let result = [];

  //   this.state.guestsData.forEach(async (event) => {
  //     const eventsRef = await firebase
  //       .firestore()
  //       .collection('events')
  //       .where('docId', '==', event.eventId)
  //       .onSnapshot((snapshot) => {
  //         snapshot.forEach((doc) => {
  //           result.push(doc.data());
  //         });
  //         this.setState({ eventsData: result });
  //       });
  //   });
  // } catch (error) {
  //   console.log(error)
  // }
  // }

  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* {this.state.eventsData.length < 1 ? ( */}
          <View styles={{ marginTop: 100 }}>
            <Text style={styles.txt}>You don't have any hosted events. </Text>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.Btn}
                onPress={() => navigation.navigate('Create Event Index')}
                >
                Please Create An Event
              </Text>
            </TouchableOpacity>
          </View>
        {/* ) : (
          <View style={styles.container}>
            <Text>
              {'\n'}
              Events Invited To Screen
              {'\n'}
            </Text>
            {this.state.eventsData.map((event, index) => {
              return (
                <TouchableOpacity
                style={styles.singleEventContainer}
                activeOpacity={0.5}
                key={index}
                onPress={() => navigation.navigate('Single Event', { event })}
                >
                  <Text style={styles.txt}>{event.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )} */}
      </SafeAreaView>
    );
  }
}

  
  // export default function EventsInvitedToScreen () {
  // 	const navigation = useNavigation();
  // 	const [usersData, setUsersData] = useState({});
  // 	const [guestsData, setGuestsData] = useState([]);
  // 	const [eventsData, setEventsData] = useState([]);

  // 	useEffect(() => {
  // 		(async function fetchUser() {
  // 			if (!firebase.auth().currentUser) {
  // 				return;
  // 			}
  // 			const currentUser = await firebase.auth().currentUser.uid;
  // 			let result;

  // 			const unsubscribe = firebase
  // 				.firestore()
  // 				.collection('users')
  // 				.where('id', '==', currentUser)
  // 				.onSnapshot((snapshot) => {
  // 					snapshot.forEach((doc) => {
  // 						result = doc.data();
  // 					});
  //           setUsersData(result);
  //         });
  // 			return () => unsubscribe();
  //     })()
  //     console.log('in fetch user', usersData)

  // 		// fetchUser();
  //   },[firebase.auth().currentUser]);

  // 	useEffect(() => {
  // 		(async function fetchGuests() {
  // 			let result = [];
  // 	useEffect(() => {
    // ebase
  // 				.firestore()
  // 				.collection('eventGuests')
  // 				.doc(usersData.phoneNumber)
  // 				.collection('eventsInvitedTo')
  // 			.get().then((snapshot) => {
  // 				snapshot.docs.forEach((doc) => {
  // 					result.push(doc.data());
  // 				});
  // 				setGuestsData(result);
  // 				console.log('in fetch guests', guestsData);
  //       });
  //       return () => unsubscribe();

  // 		})()
  // 		// fetchGuests();
  // 	}, []);

  // 	useEffect(() => {
  // 		(async function fetchEvents() {
  // 			let result = [];

  // 			guestsData.forEach(async (event) => {
  // 				const unsubscribe = firebase
  // 					.firestore()
  // 					.collection('events')
  // 					.where('docId', '==', event.eventId)
  // 					.onSnapshot((snapshot) => {
  // 						snapshot.forEach((doc) => {
  // 							result.push(doc.data());
  //             });
  //             setEventsData(result);
  //             console.log('in fetchEvents', eventsData);

  //           });
  //       });
  //       return () => unsubscribe();
  // 		})()
  // 		// fetchEvents();
  // 	}, []);