import {StyleSheet} from 'react-native';

export var common = StyleSheet.create({
  fontitle: {
    fontFamily: 'FjallaOne-Regular',
    fontSize: 14
  },
  fontbody: {
    fontFamily: 'PT_Sans-Web-Regular',
    fontSize: 14
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    color: '#fe9d07',
    fontSize: 12,
    letterSpacing: .5,
    paddingHorizontal: 10,
    width: '100%',
    height: 38,
    borderRadius: 4,
    // backgroundColor: '#f4f4f4',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fe9d07'
  }
});
