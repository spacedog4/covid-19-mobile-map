import React, { useEffect, useState } from 'react'
import { Text, View, Dimensions } from 'react-native'
import MapView, {Polygon} from 'react-native-maps';

import countriesJson from '../../countries.json'
import mapTheme from './mapTheme'
import styles from './styles'

export default function Map() {
  const [brazil, setBrazil] = useState([])

  useEffect(() => {
    console.log('teste')
    
    const data = countriesJson.features.filter((item) => {
      return item.properties.ISO_A3 == 'BRA'
    })

    const newData = data[0].geometry.coordinates[0][0].map((item) => {
      return {
        latitude: item[0],
        longitude: item[1]
      }
    })

    console.log(newData)
    // setBrazil([
    //   {latitude: data[0].geometry.coordinates[0][0][0][0], longitude: data[0].geometry.coordinates[0][0][0][1]},
    //   {latitude: data[0].geometry.coordinates[0][0][1][0], longitude: data[0].geometry.coordinates[0][0][1][1]},
    // ])
    setBrazil(newData)
  }, [])

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle} 
        customMapStyle={mapTheme}
      >
        <Polygon
          coordinates={brazil}
          fillColor="#000"
        />
      </MapView>
    </View>
  )
}