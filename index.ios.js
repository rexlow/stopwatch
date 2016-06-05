import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var formatTime = require('minutes-seconds-milliseconds');
var StopWatch = React.createClass({
  getInitialState(){
    return{
      timeElapsed: null,
      running: false, //by default the timer is not running
      startTime: null,
      laps: []
    }
  },
  render(){
     return <View style={styles.container}>
       <View style={[styles.header]}> 
         <View style={[styles.timerWrapper]}>
           <Text style={styles.timerFont}>
             {formatTime(this.state.timeElapsed)}
           </Text>
         </View>
         <View style={[styles.buttonWrapper]}>
           {this.startStopButton()}
           {this.lapButton()}
         </View>
       </View>
       
       <View style={[styles.footer]}> 
         {this.laps()}
       </View>
    </View>
  },
  laps(){
    return this.state.laps.map(function(singleLapTime, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap {index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(singleLapTime)}
        </Text>
      </View>
    });
  },
  startStopButton(){
    var style = this.state.running ? styles.stopButton : styles.startButton;
    
    return <TouchableHighlight 
             underlayColor="gray"
             onPress={this.handleStartPress}
             style={[style, styles.button]}
             >
         <Text>
           {this.state.running ? 'Stop' : 'Start'}
         </Text>
       </TouchableHighlight>
  },
  lapButton(){
    return <TouchableHighlight
             underlayColor="gray"
             onPress={this.handleLapPress}
             style={styles.button}
             >
         <Text>
           Lap
         </Text>
       </TouchableHighlight>
  },
  handleStartPress(){
    if(this.state.running){
     clearInterval(this.interval); //JS function 
      this.setState({running:false});
      return
    }
  
    this.setState({startTime: new Date()});
    //update the state, setInterval is a native javascript function
    this.interval = setInterval(() =>{
      this.setState({
      timeElapsed: new Date() - this.state.startTime,
      running: true
    });
    }, 70); //execute every 30 milliseconds
  },
  handleLapPress(){
    var lap = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap]) //JS method
    })
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'stretch',
  },
  header: { //yellow area
    flex: 1,    
  },
  footer: {
    flex: 1,
  },
  timerWrapper: { 
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerFont: {
    fontSize: 60
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    borderWidth: 2,
    borderRadius: 50,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderColor: '#00CC00',
  },
  stopButton: {
    borderColor: '#CC0000',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 25
  }
});

AppRegistry.registerComponent('Project', () => StopWatch);




