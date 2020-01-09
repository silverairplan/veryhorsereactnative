import React from 'react';
import {View,StyleSheet,TouchableOpacity,Text,Image} from 'react-native';
import connect from '../components/connectedcomponent';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Moment from 'moment';
import PageContainer from '../components/PageContainer';
import Service from '../service/service';
import AutoHeightImage from 'react-native-auto-height-image';
class MyRoute extends React.Component
{
    vehicle = [
        {image:require('../assets/vehiculos/vehiculo_1.png'),value:1},
        {image:require('../assets/vehiculos/vehiculo_2.png'),value:2},
        {image:require('../assets/vehiculos/vehiculo_3.png'),value:3},
        {image:require('../assets/vehiculos/vehiculo_4.png'),value:4},
        {image:require('../assets/vehiculos/vehiculo_5.png'),value:5},
        {image:require('../assets/vehiculos/vehiculo_6.png'),value:6},
        {image:require('../assets/vehiculos/vehiculo_7.png'),value:7},
        {image:require('../assets/vehiculos/vehiculo_8.png'),value:8}
    ]

    constructor(props)
    {
        super(props);
        this.state = {
            data:[],
            tab:"pending"
        }
    }

    getinformation = (state) => {
        let service = new Service();
        let self = this;
        service.getmyroute(state).then(result=>{
            self.setState({
                data:result,
                tab:state
            })
        })
    }  

    settab = (tab) => {
        this.getinformation(tab);
    }
    componentDidMount()
    {
        this.getinformation("pending");
    }
    
    componentWillReceiveProps()
    {
        this.getinformation("pending");    
    }

    getvehicle = (vehicle) => {
        for(let item in this.vehicle)
        {
            if(this.vehicle[item].value == vehicle)
            {
                return this.vehicle[item].image;
            }
        }
    }

    render()
    {
        const {intlData} = this.props;
        
        return (
            <PageContainer {...this.props} bannerenable={true}>
                <View style={style.container}>
                    <View style={style.tab}>
                        <TouchableOpacity style={this.state.tab == 'pending'?style.tabitemactive:style.tabiteminactive} onPress={()=>this.settab("pending")}>
                            <Text style={this.state.tab == 'pending'?style.tabtext:style.tabinactivetext}>{intlData.messages['PENDIENTE']}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.tab== 'confirm'?style.tabitemactive:style.tabiteminactive} onPress={()=>this.settab("confirm")}>
                            <Text style={this.state.tab == 'confirm'?style.tabtext:style.tabinactivetext}>{intlData.messages['CONFIRMADAS']}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        {
                            this.state.data.map((row,index)=>{
                                return (
                                    <TouchableOpacity key={index} style={style.contentitem} onPress={()=>this.props.navigation.navigate('MYDEMANDITEM',{id:row.id})}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View>
                                                <AutoHeightImage source={this.getvehice(row.vehicle)} width={wp('10%')}></AutoHeightImage>
                                            </View>
                                            <View>
                                                <View style={{flexDirection:'row'}}>
                                                    <Image source={{uri:'https://www.countryflags.io/' + row.pickCountry.toLowerCase() + '/flat/64.png'}} style={style.flagimage}></Image>    
                                                    <Text style={{marginLeft:10}}>{row.pickCityName}</Text>
                                                    <Text> > </Text>
                                                    <Image source={{uri:'https://www.countryflags.io/' + row.deliverCountry.toLowerCase() + '/flat/64.png'}} style={style.flagimage}></Image>
                                                    <Text style={{marginLeft:10}}>{row.deliverCityName}</Text>
                                                </View>
                                                <Text>Recogida: {Moment(new Date(row.pickDayIni)).format('DD-MMM')} - Entrega: {Moment(new Date(row.deliverDayIni)).format('DD-MMM')}</Text>    
                                            </View>
                                        </View>
                                        
                                    </TouchableOpacity>
                                )
                            })
                        }
                        {
                            this.state.data.length == 0 && (
                                <TouchableOpacity style={style.contentitem}>
                                    <Text style={{textAlign:'center'}}>{intlData.messages['NO_RESUL']}</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </PageContainer>
        )
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        marginTop:hp('2%'),
        marginBottom:hp('2%')
    },
    tab:{
        flexDirection:'row'
    },
    tabitemactive:{
        flex:1,
        backgroundColor:'#dd691b',
        paddingTop:hp('1.5%'),
        paddingBottom:hp('1.5%')
    },
    tabiteminactive:{
        flex:1,
        backgroundColor:'#E3DFB9',
        paddingTop:hp('1.5%'),
        paddingBottom:hp('1.5%')
    },
    tabtext:{
        fontSize:hp('2.3%'),
        color:'white',
        textAlign:'center'
    },
    tabinactivetext:{
        fontSize:hp('2.3%'),
        textAlign:'center'
    },
    contentitem:{
        paddingTop:hp('1.5%'),
        paddingBottom:hp('1.5%'),
        paddingLeft:wp('2%'),
        backgroundColor:'white',
        marginBottom:1
    },
    flagimage:{
        width:hp('3%'),
        height:hp('3%')
    }
})

export default connect(MyRoute);