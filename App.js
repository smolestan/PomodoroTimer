import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Keyboard } from 'react-native';
import Constants from 'expo-constants'
import {vibrate} from './utils'

class CountDown extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.timerTitle}>{this.props.sessionName} Timer</Text>
        <Text style={styles.timer}>{this.props.time}:{this.props.seconds}</Text>
      </View>
    )
  }
}  

class Details extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.details}>You are now on {this.props.currentSession}
        {"\n"}{"\n"}The Pomodoro Technique is a time management method. 
        {"\n"}The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks, usually 5 minutes in length. 
        {"\n"}After each fourth work session, a long interval follows and after that the cycle starts again.
        </Text>
      </View>
    )
  }
}  

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ width: '90%', margin: 10, backgroundColor: 'green' }}>
        <Button color='white' onPress={this.props.startStop} title={this.props.startStopButton} />
      </View>
    )
  }
}

class Work extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Work Time: </Text>
        <TextInput
        style={styles.title}
        placeholder="25"
        onChangeText={this.props.work} 
        required 
        keyboardType={'numeric'}
        />
        <Text style={styles.title}> minutes</Text>
      </View>
    )
  }
}

class ShortBreak extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Short Break: </Text>
        <TextInput
        style={styles.title}
        placeholder="5"
        onChangeText={this.props.shortBreak} 
        required 
        keyboardType={'numeric'}
        />
        <Text style={styles.title}> minutes</Text>
      </View>
    )
  }
}

class LongBreak extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Long Break: </Text>
        <TextInput
        style={styles.title}
        placeholder="20"
        onChangeText={this.props.longBreak} 
        required 
        keyboardType={'numeric'}
        />
        <Text style={styles.title}> minutes</Text>
      </View>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: '--',
      workTime: 25,
      longBreakTime: 20,
      shortBreakTime: '05',
      seconds: '--',
      currentSession: 'First work session',
      startStopButton: 'Start',
    }
    this.sessionCounter
    this.intervalHandle
    this.secondsRemaining
    this.changeSession = this.changeSession.bind(this)
    this.shortBreak = this.shortBreak.bind(this)
    this.longBreak = this.longBreak.bind(this)
    this.work = this.work.bind(this)
    this.startStop = this.startStop.bind(this)
    this.startCountDown = this.startCountDown.bind(this)
    this.workCountDown = this.workCountDown.bind(this)
    this.shortBreakCountDown = this.shortBreakCountDown.bind(this)
    this.longBreakCountDown = this.longBreakCountDown.bind(this)
    this.stopCountDown = this.stopCountDown.bind(this)
    this.tick = this.tick.bind(this)
    this.changeSession = this.changeSession.bind(this)
  }

  tick() {

    var min = Math.floor(this.secondsRemaining / 60)
    var sec = this.secondsRemaining - (min * 60)

    this.setState({
      time: min,
      seconds: sec,
    })

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      })
    }

    if (min < 10) {
      this.setState({
        time: "0" + min,
      })
    }

    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle)
      this.changeSession()
    }

    this.secondsRemaining--
  }

  startCountDown() {
    this.sessionCounter = 0
    this.setState({
      sessionName: 'Work',
      startStopButton: 'Stop'
    })
    Keyboard.dismiss()
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.workTime;
    this.secondsRemaining = (time * 60) - 1;
  }

  changeSession() {
    vibrate()
    this.sessionCounter++

    switch (this.sessionCounter) {
      case 1:
        this.setState({
          currentSession: 'First short break' 
        })      
        this.shortBreakCountDown()
        break
      case 2:
        this.setState({
          currentSession: 'Second work session' 
        })          
        this.workCountDown()
        break
      case 3:
        this.setState({
          currentSession: 'Second short break' 
        })        
        this.shortBreakCountDown()
        break
      case 4:
        this.setState({
          currentSession: 'Third work session' 
        })          
        this.workCountDown()
        break
      case 5:
        this.setState({
          currentSession: 'Third short break' 
        })        
        this.shortBreakCountDown()
        break
      case 6:
        this.setState({
          currentSession: 'Fourth work session' 
        })          
        this.workCountDown()
        break
      case 7:
        this.setState({
          currentSession: 'Long break' 
        })        
        this.longBreakCountDown()
        break
      default:
        this.setState({
          currentSession: 'First work session' 
        })        
        this.startCountDown()
    }
  }

  workCountDown() {
    this.setState({
      sessionName: 'Work',
    })
    Keyboard.dismiss()
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.workTime;
    this.secondsRemaining = (time * 60) - 1;
  }

  shortBreakCountDown() {
    this.setState({
      sessionName: 'Short Break',
    })
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.shortBreakTime;
    this.secondsRemaining = time * 60;
  }

  longBreakCountDown() {
    this.setState({
      sessionName: 'Long Break',
    })
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.longBreakTime;
    this.secondsRemaining = time * 60;
  }

  stopCountDown() {
    clearInterval(this.intervalHandle);
    this.setState({
      currentSession: 'First work session',
      time: '--',
      seconds: '--',
      startStopButton: 'Start'
    })
  }

  startStop() {
    if (this.state.startStopButton === 'Start') {
      this.startCountDown()
    } else {
      this.stopCountDown()
    }
  }

  shortBreak(time) {
    this.setState({
      shortBreakTime: time,
      time: '--',
      seconds: '--'
    })
  }

  longBreak(time) {
    this.setState({
      longBreakTime: time,
      time: '--',
      seconds: '--'
    })
  }

  work(time) {
    this.setState({
      workTime: time,
      time: '--',
      seconds: '--'
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <CountDown sessionName={this.state.sessionName} time={this.state.time} seconds={this.state.seconds} />
          <Buttons startStop={this.startStop} startStopButton={this.state.startStopButton} />
          <Work work={this.work} />
          <ShortBreak shortBreak={this.shortBreak} />
          <LongBreak longBreak={this.longBreak} />
          <Details currentSession={this.state.currentSession} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    margin: 10,
  },
  details: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 30
  },
  timerTitle: {
    fontSize: 40,
    textAlign: 'center',
  },
  timer: {
    fontSize: 60,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    margin: 5,
  },
})