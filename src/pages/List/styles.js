import Constants from 'expo-constants'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight + 20
  },
  regionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40
  },
  countryList: {
    width: '100%',
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd'
  },
  countryItemText: {
    fontSize: 16
  },
  cases: {
    fontSize: 16,
    color: '#F03A47',
    fontWeight: 'bold'
  },
  newCases: {
    fontSize: 16,
    color: '#F03A47',
    marginLeft: 10
  }
});


export default styles