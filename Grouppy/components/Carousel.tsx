import { Dimensions, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'

export default function AppCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const width = Dimensions.get('window').width

  const list = [
    {
      id: 1,
      title: 'First Item',
      image: { uri: 'https://assets-global.website-files.com/62d84e447b4f9e7263d31e94/6557420216a456cfaef685c0_6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1-p-1600.jpg' }
    },
    {
      id: 2,
      title: 'Second Item',
      image: { uri: 'https://assets-global.website-files.com/62d84e447b4f9e7263d31e94/6399a303b3be9e0757bfbb67_edi-libedinsky-1bhp9zBPHVE-unsplash-1-1024x683.jpeg' }
    },
  ]

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(scrollPosition / width)

    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {list.map((item, index) => (
          <View key={index} style={styles.CarouselItem}>
            <Image style={styles.img} source={item.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  CarouselItem: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    width: Dimensions.get('window').width, // set width to screen width
  },
  img: {
    width: '100%',
    height: '100%'
  }
})