import * as React from 'react';
import { View, StyleSheet, Text, Animated, Easing, TouchableOpacity } from 'react-native';

export interface SwitchProps {
  width: number;
  height: number;
  time?: number;
  value?: boolean;
  backgroundStyle?: any;
  onValueChange: any;
  activeText?: string;
  inActiveText?: string;
  activeTextStyle?: any;
  inActiveTextStyle?: any;
  activeStyle?: string;
}

export interface SwitchState {
  value: boolean;
  marginLeftAnim: any;
  offsetWidth: number;
  offsetHeight: number;
  activeText: string;
  inActiveText: string;
}

export default class Switch extends React.Component<SwitchProps, SwitchState> {
  constructor(props: SwitchProps) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : true,
      marginLeftAnim: new Animated.Value(0),
      offsetWidth: this.props.width / 2,
      offsetHeight: this.props.height,
      activeText: this.props.activeText ? this.props.activeText : 'InActive Text',
      inActiveText: this.props.inActiveText ? this.props.inActiveText : 'Active Text',
    };
  }

  public _animateSwitch = (value: boolean) => {
    Animated.timing(
      this.state.marginLeftAnim,
      {
        toValue: value ? 0 : this.state.offsetWidth,
        duration: this.props.time,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
      }
    ).start();
    this.setState({ value: value });
    console.log(this.state.value);
  }

  public _pressButtonLeft = () => {
    this._animateSwitch(true);
    this.props.onValueChange(true);
  }
  public _pressButtonRight = () => {
    this._animateSwitch(false);
    this.props.onValueChange(false);
  }

  public render() {
    let { marginLeftAnim } = this.state;
    let { activeStyle, backgroundStyle, activeTextStyle, inActiveTextStyle } = this.props;

    return (
      <View
        style={[
          styles.container,
          {
            width: this.props.width,
            height: this.props.height,
          },
          backgroundStyle,
        ]}>
        <TouchableOpacity
          onPressIn={this._pressButtonLeft}
          style={[styles.button, {
            width: this.state.offsetWidth,
            height: this.state.offsetHeight,
          }]}>
          {
            this.state.value ?
              <Text style={[styles.textActive, activeTextStyle]}>{this.state.activeText}</Text>
              :
              <Text style={[styles.textInActive, inActiveTextStyle]}>{this.state.activeText}</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={this._pressButtonRight}
          style={[styles.button, {
            width: this.state.offsetWidth,
            height: this.state.offsetHeight,
          }]}>
          {
            this.state.value ?
              <Text style={[styles.textInActive, inActiveTextStyle]}>{this.state.inActiveText}</Text>
              :
              <Text style={[styles.textActive, activeTextStyle]}>{this.state.inActiveText}</Text>
          }
        </TouchableOpacity>
        <Animated.View
          style={[
            {
              marginLeft: marginLeftAnim,
              width: this.state.offsetWidth,
              height: this.state.offsetHeight,

            },
            styles.active,
            activeStyle,
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 5,
    position: 'relative',
    zIndex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  textActive: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#215e79',
  },
  textInActive: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#215e79',
  },
  active: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dae6e8',
  },
});
