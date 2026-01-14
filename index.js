/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:https://www.devio.org/
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import PropTypes from 'prop-types';
export const DURATION = {
  LENGTH_SHORT: 500,
  FOREVER: 0,
};

const { height, width } = Dimensions.get('window');

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.isShow = false;
    this.onPressCallback = undefined;
    this.handlePress = this.handlePress.bind(this);
    this.state = {
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(0),
    };
  }

  show(text, duration, callback, onPress) {
    if (this._isMounted) {
      this.timer && clearTimeout(this.timer);
      this.animation && this.animation.stop();
      this.onPressCallback = onPress || this.props.onPress;
      this.duration =
        typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
      this.callback = callback;
      this.setState({
        isShow: true,
        text: text,
      });

      this.state.opacityValue.setValue(0);
      this.animation = Animated.timing(this.state.opacityValue, {
        toValue: this.props.opacity,
        duration: this.props.fadeInDuration,
        useNativeDriver: this.props.useNativeAnimation,
      });
      this.animation.start(() => {
        this.isShow = true;
        if (duration !== DURATION.FOREVER) this.close();
      });
    }
  }

  close(duration) {
    let delay = typeof duration === 'undefined' ? this.duration : duration;

    if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

    if (!this.isShow && !this.state.isShow) return;
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.animation = Animated.timing(this.state.opacityValue, {
        toValue: 0.0,
        duration: this.props.fadeOutDuration,
        useNativeDriver: this.props.useNativeAnimation,
      });
      this.animation.start(() => {
        if (this._isMounted) {
          this.setState({
            isShow: false,
          });
        }
        this.isShow = false;
        this.onPressCallback = undefined;
        if (typeof this.callback === 'function') {
          this.callback();
        }
      });
    }, delay);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.animation && this.animation.stop();
    this.timer && clearTimeout(this.timer);
    this._isMounted = false;
  }

  handlePress(event) {
    const pressHandler = this.onPressCallback || this.props.onPress;
    if (typeof pressHandler === 'function') {
      pressHandler(event);
    }
    if (this.props.hideOnPress) {
      this.close(this.props.defaultCloseDelay);
    }
  }

  render() {
    let pos;
    switch (this.props.position) {
      case 'top':
        pos = { top: this.props.positionValue };
        break;
      case 'center':
        pos = { top: height / 2 };
        break;
      case 'bottom':
        pos = { bottom: this.props.positionValue };
        break;
    }

    const view = this.state.isShow ? (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={[styles.container, pos]} pointerEvents="auto">
          <Animated.View
            style={[
              styles.content,
              { opacity: this.state.opacityValue },
              this.props.style,
            ]}
          >
            {React.isValidElement(this.state.text) ? (
              this.state.text
            ) : (
              <Text style={this.props.textStyle}>{this.state.text}</Text>
            )}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    ) : null;
    return view;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: 'white',
  },
});

Toast.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  position: PropTypes.oneOf(['top', 'center', 'bottom']),
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number,
  ]),
  positionValue: PropTypes.number,
  fadeInDuration: PropTypes.number,
  fadeOutDuration: PropTypes.number,
  opacity: PropTypes.number,
  useNativeAnimation: PropTypes.bool,
  hideOnPress: PropTypes.bool,
  defaultCloseDelay: PropTypes.number,
  onPress: PropTypes.func,
};

Toast.defaultProps = {
  position: 'bottom',
  textStyle: styles.text,
  positionValue: 120,
  fadeInDuration: 500,
  fadeOutDuration: 500,
  opacity: 1,
  useNativeAnimation: true,
  hideOnPress: true,
  defaultCloseDelay: 250,
};
