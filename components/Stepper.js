/* eslint-disable react/prop-types */
import { IconButton, withTheme } from '@draftbit/ui';
import * as React from 'react';
import { View, Text } from 'react-native';

const Stepper = ({
  Icon,
  value = 0,
  style,
  onChange,
  theme: { colors, typography, roundness },
  iconSize = 24,
  iconColor = colors.strong,
  borderRadius = roundness,
  typeStyle,
  min = 0,
  step = 1,
  parseValue = (value) => value
}) => {
  const [stateValue, setStateValue] = React.useState(value);

  const handleMinus = () => {
    if (value || value === min) {
      onChange && onChange(value - step);
    } else {
      setStateValue(stateValue - step);
    }
  };

  const handlePlus = () => {
    if (value || value === min) {
      onChange && onChange(value + step);
    } else {
      setStateValue(stateValue + step);
    }
  };

  return (
    <View
      style={[
        { flexDirection: 'row' },
        style,
        borderRadius ? { borderRadius } : {}
      ]}
    >
      <IconButton
        Icon={Icon}
        icon='MaterialIcons/remove'
        onPress={handleMinus}
        size={iconSize}
        color={iconColor}
        disabled={value ? value === min : stateValue === min}
      />
      <Text
        style={[
          typography.body1,
          {
            textAlign: 'center',
            alignSelf: 'center',
            color: colors.medium,
            marginHorizontal: 8
          },
          typeStyle
        ]}
      >
        {parseValue(value || stateValue)}
      </Text>
      <IconButton
        Icon={Icon}
        icon='MaterialIcons/add'
        onPress={handlePlus}
        size={iconSize}
        color={iconColor}
      />
    </View>
  );
};

export default withTheme(Stepper);
