import { Dimensions, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect  } from 'react'

export default function AppCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const width = Dimensions.get('window').width
  const scrollViewRef = useRef<ScrollView>(null)

  const list = [
    {
      id: 1,
      title: 'First Item',
      image: { uri: 'https://www.everydayonsales.com/wp-content/uploads/2023/11/McDonalds-Buy-1-Free-1-McCafe-Drinks-Promotion.jpg' }
    },
    {
      id: 2,
      title: 'Second Item',
      image: { uri: 'https://www.everydayonsales.com/wp-content/uploads/2023/06/Dominos-Pizza-Buy-1-Free-1-Promo.jpg' }
    },
  ]

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(scrollPosition / width)

    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % list.length
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true })
        }
        return newIndex
      })
    }, 2000) // Change image every 2 seconds

    return () => clearInterval(intervalId) // Clear interval on component unmount
  }, [])

  return (
    <View >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={{ height: 350 }}
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
    marginTop: 20,
    alignItems: 'center',
    overflow: 'hidden',
    width: Dimensions.get('window').width, // set width to screen width
  },
  img: {
    width: '90%',
    height: '100%',
    borderRadius: 15,
  }
})