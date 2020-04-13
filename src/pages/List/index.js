import React, { useState, useEffect } from 'react';

import axios from 'axios';
import moment from 'moment';
import * as countries from "i18n-iso-countries";
import sort from 'fast-sort';

import { Text, View, Image, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'
import api_keys from '../../../api_keys'

import styles from './styles'

export default function List() {
  const [regions, setRegions] = useState([])
  const [restCountries, setRestCountries] = useState([])
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const reportDate = moment().subtract(1, 'days').format('YYYY-MM-DD')

  countries.registerLocale(require("i18n-iso-countries/langs/en.json"))
  countries.registerLocale(require("i18n-iso-countries/langs/pt.json"))

  function handleSearch(text) {
    setSearch(text)

    let newData = allData.filter(item => {
      const itemData = item.name.toLowerCase()
      const textData = text.toLowerCase()

      return itemData.indexOf(textData) > -1
    })

    newData = sort(newData).asc('name')

    setFilteredData(newData)
  }

  async function getRegions() {
    const {data} = await axios.get(`https://who-covid-19-data.p.rapidapi.com/api/data/regions`, {
      headers: {
        "x-rapidapi-host": api_keys.rapidWHOCovid19Data,
        "x-rapidapi-key": api_keys.rapidApiKey
      }
    })

    setRegions(data.regions)
  }

  async function getAllData() {
    const {data} = await axios.get(`https://who-covid-19-data.p.rapidapi.com/api/data?reportDate=${reportDate}`, {
      headers: {
        "x-rapidapi-host": api_keys.rapidWHOCovid19Data,
        "x-rapidapi-key": api_keys.rapidApiKey
      }
    })

    let newData = data.map((item) => {
      const code = countries.getAlpha2Code(item.name, 'en')

      if (code) {
        const ptName = countries.getName(code, 'pt')
        if (ptName) {
          item.name = ptName
        }

        const countryCode = countries.alpha2ToNumeric(code)
        if (countryCode) {
          item.flag = `http://www.geognos.com/api/en/countries/flag/${code}.png`
        }

        item.code = code
      } else {
        item.code = null
        item.countryCode = null
      }

      return item
    })

    newData = sort(newData).asc('name')

    setAllData(newData)
    setFilteredData(newData)
  }

  useEffect(() => {
    getAllData()
  }, [])

  if (allData.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Casos de covid-19 pelo mundo ({
          moment().subtract(1, 'days').format('DD/MM/YYYY')
        })</Text>
        <SearchBar
          platform="android"
          style={{width: '100%'}}
          lightTheme={true}
          placeholder="Pesquise um pais"
          onChangeText={handleSearch}
          value={search}
        />
        <FlatList
          style={styles.countryList}
          data={filteredData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.name + Math.random().toString(36).substr(2, 9)}
          renderItem={({ item }) => (
            <View style={styles.countryItem}>
              <View style={{flexDirection: 'row'}}>
                <Image style={{ width: 32, height: 22, marginRight: 10 }} source={{uri: item.flag}} />
                <Text style={styles.countryItemText}>
                  {item.name}
                </Text>
                <Text style={styles.newCases}>+{item.newCases}</Text>
              </View>
              <Text style={styles.cases}>{item.cases}</Text>
            </View>
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Aguarde...</Text>
      </View>
    )
  }
}