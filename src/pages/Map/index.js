import React, { useEffect, useState } from 'react'
import { Text, View, Dimensions } from 'react-native'
import MapView, {Polygon} from 'react-native-maps';

import countriesJson from '../../countries.json'
import mapTheme from './mapTheme'
import styles from './styles'

export default function Map() {
  const [brazil, setBrazil] = useState([])
  const [polygons, setPolygons] = useState([])

  useEffect(() => {
    console.log('teste')
    
    const data = countriesJson.features.filter((item) => {
      return item.properties.ISO_A3 == 'GNQ'
    })

    // const newData = data[0].geometry.coordinates[0][1].map((item) => {
    //   return {
    //     latitude: item[0],
    //     longitude: item[1]
    //   }
    // })

    let newPolygons = []

    data[0].geometry.coordinates.forEach((polygon) => {
      console.log(polygon)
      newPolygons.push(polygon[0].map((item) => {
        // console.log(item[0])
        return {
          latitude: item[0],
          longitude: item[1]
        }
      }))
    })
    // console.log(data[0].geometry.coordinates[0][0])

    // console.log(newPolygons)
    // setBrazil([
    //   {latitude: data[0].geometry.coordinates[0][0][0][0], longitude: data[0].geometry.coordinates[0][0][0][1]},
    //   {latitude: data[0].geometry.coordinates[0][0][1][0], longitude: data[0].geometry.coordinates[0][0][1][1]},
    // ])
    setPolygons(newPolygons)
    // setBrazil(newData)
  }, [])

  function renderPolygons(coords, index){
    // console.log(coords)
    return (
      <Polygon
        key={`polygon-${index}`}
        coordinates={coords}
        fillColor="#000"
      />
    )
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle} 
        customMapStyle={mapTheme}
      >
        {
          polygons.map((polygon, index) => {
            return renderPolygons(polygon, index)
          })
        }
        {/* <Polygon
          coordinates={brazil}
          fillColor="#000"
        /> */}
      </MapView>
    </View>
  )
}