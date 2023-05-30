import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import data from "../../assets/data";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.8;

type Props = {
    item:{
        body:string,
        title:string,
        imgUrl:string,
    },
    index:number,
}

const carouselCardItem = ({item, index}: Props) =>{
    return(
        <View key={index}>
            <Image source={{uri: item.imgUrl }} style={{width: 100, height: 100}}/>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
        </View>
    );
}

const CarouselCards = () =>{
    return(
        <View>
            <Carousel
                data={data}
                renderItem={carouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                useScrollView={true} 
            />

        </View>
    );
}

export default CarouselCards;