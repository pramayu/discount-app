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
  fontbodybold: {
    fontSize: 14,
    fontFamily: 'PT_Sans-Web-Bold',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    color: '#444',
    fontSize: 14,
    letterSpacing: .5,
    paddingHorizontal: 10,
    width: '100%',
    height: 38,
    borderRadius: 4,
    backgroundColor: '#f6f5f3',
    marginBottom: 12,
  }
});
