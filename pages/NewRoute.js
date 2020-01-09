import React from 'react';
import {View,Text,StyleSheet,TextInput} from 'react-native';
import PageContainer from '../components/PageContainer';
import connect from '../components/connectedcomponent';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
class NewRoute extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const {intlData} = this.props;
        return (
            <PageContainer bannerenable={true}>
                <View style={style.container}>
                    <View style={style.formgroup}>
                        <Text style={style.label}>Origin</Text>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            minLength={2}
                            autoFocus={false}
                            returnKeyType={'search'}
                            keyboardAppearance={'light'}
                            listViewDisplayed={false}
                            fetchDetails={true}
                            keyboardShouldPersistTaps="handled"
                            renderDescription={row => row.description}
                            onPress={(data, details = null) => {
                                this.props.handleChange(this.props.param1,details.formatted_address);
                                let countryname = "";
                                let countrycode = "";
                                let cityname = "";
                                for(let item in details.address_components)
                                {
                                    if(details.address_components[item].types.indexOf("locality") > -1)
                                    {
                                        cityname = details.address_components[item].long_name;
                                    }

                                    if(details.address_components[item].types.indexOf("country") > -1)
                                    {
                                        countryname = details.address_components[item].long_name;
                                        countrycode = details.address_components[item].short_name;
                                    }
                                }

                                console.log(cityname)
                                if(this.props.param1 == 'pickCity')
                                {
                                    this.props.handleChange("pickCityName",cityname);
                                    this.props.handleChange('pickCountry',countrycode);
                                    this.props.handleChange('pickCountryName',countryname);
                                }
                                else
                                {
                                    this.props.handleChange("deliverCityName",cityname);
                                    this.props.handleChange('deliverCountry',countrycode);
                                    this.props.handleChange('deliverCountryName',countryname);
                                }
                            }}
                            enablePoweredByContainer={false}
                            getDefaultValue={() => this.props.data[this.props.param1]}
                            textInputProps={{
                                ref: (input) => {this.fourthTextInput = input}
                            }}
                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyDbsOXv4sPiyPY1p-RGsRtMCwoKZdBMXCM',
                                language: intlData.locale,
                                types: 'geocode', // default: 'geocode'
                            }}
                            styles={{
                                container: {width:wp('84%'),backgroundColor:'white',borderRadius:5,zIndex:100},
                                textInputContainer: {
                                backgroundColor: 'transparent',
                                margin: 0,
                                width: wp('84%'),
                                padding:0,
                                borderTopWidth: 0,
                                borderBottomWidth:0
                                },
                                textInput: {
                                minWidth: wp('25%'), 
                                borderColor: "#cbb4c0",
                                borderBottomWidth: 1,
                                color: '#5d5d5d',
                                fontSize: 14,
                                },
                                description: {
                                color:'#000',
                                fontWeight: '300',
                                zIndex:100
                                },
                                predefinedPlacesDescription: {
                                color: '#1faadb'
                                }
                            }}
                            currentLocation={false} 
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GoogleReverseGeocodingQuery={{// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }}
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                type: 'cafe'
                            }}    
                            GooglePlacesDetailsQuery={{
                                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                fields: 'formatted_address,address_component,name',
                            }}
                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                            debounce={200}
                            />
                    </View>
                    <View style={style.formgroup}>
                        <Text style={style.label}>Departure De Day</Text>
                        <TextInput style={style.input}></TextInput>
                    </View>
                    <View style={style.formgroup}>
                        <Text style={style.label}>Destination</Text>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            minLength={2}
                            autoFocus={false}
                            returnKeyType={'search'}
                            keyboardAppearance={'light'}
                            listViewDisplayed={false}
                            fetchDetails={true}
                            keyboardShouldPersistTaps="handled"
                            renderDescription={row => row.description}
                            onPress={(data, details = null) => {
                                this.props.handleChange(this.props.param1,details.formatted_address);
                                let countryname = "";
                                let countrycode = "";
                                let cityname = "";
                                for(let item in details.address_components)
                                {
                                    if(details.address_components[item].types.indexOf("locality") > -1)
                                    {
                                        cityname = details.address_components[item].long_name;
                                    }

                                    if(details.address_components[item].types.indexOf("country") > -1)
                                    {
                                        countryname = details.address_components[item].long_name;
                                        countrycode = details.address_components[item].short_name;
                                    }
                                }

                                console.log(cityname)
                                if(this.props.param1 == 'pickCity')
                                {
                                    this.props.handleChange("pickCityName",cityname);
                                    this.props.handleChange('pickCountry',countrycode);
                                    this.props.handleChange('pickCountryName',countryname);
                                }
                                else
                                {
                                    this.props.handleChange("deliverCityName",cityname);
                                    this.props.handleChange('deliverCountry',countrycode);
                                    this.props.handleChange('deliverCountryName',countryname);
                                }
                            }}
                            enablePoweredByContainer={false}
                            getDefaultValue={() => this.props.data[this.props.param1]}
                            textInputProps={{
                                ref: (input) => {this.fourthTextInput = input}
                            }}
                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyDbsOXv4sPiyPY1p-RGsRtMCwoKZdBMXCM',
                                language: intlData.locale,
                                types: 'geocode', // default: 'geocode'
                            }}
                            styles={{
                                container: {width:wp('84%'),backgroundColor:'white',borderRadius:5,zIndex:100},
                                textInputContainer: {
                                backgroundColor: 'transparent',
                                margin: 0,
                                width: wp('84%'),
                                padding:0,
                                borderTopWidth: 0,
                                borderBottomWidth:0
                                },
                                textInput: {
                                minWidth: wp('25%'), 
                                borderColor: "#cbb4c0",
                                borderBottomWidth: 1,
                                color: '#5d5d5d',
                                fontSize: 14,
                                },
                                description: {
                                color:'#000',
                                fontWeight: '300',
                                zIndex:100
                                },
                                predefinedPlacesDescription: {
                                color: '#1faadb'
                                }
                            }}
                            currentLocation={false} 
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GoogleReverseGeocodingQuery={{// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }}
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                type: 'cafe'
                            }}    
                            GooglePlacesDetailsQuery={{
                                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                                fields: 'formatted_address,address_component,name',
                            }}
                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                            debounce={200}
                            />
                    </View>
                </View>
            </PageContainer>    
        )
        
    }
}

const style = StyleSheet.create({
    container:{flex:1},
    formgroup:{
        flexDirection:'row',
        marginTop:hp('2%')
    },
    label:{
        fontSize:hp('2.2%'),
        color:'#605e00',
        fontWeight:'700',
        paddingBottom:hp('0.5%')
    },
    input:{
        paddingLeft:wp('3%'),
        paddingTop:hp('1%'),
        paddingBottom:hp('1%'),
        backgroundColor:'white',
        borderRadius:5
    }
})
export default connect(NewRoute);