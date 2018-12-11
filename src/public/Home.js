import React, {Component} from 'react';
import { View, Text, TextInput, FlatList, Button, TouchableHighlight } from 'react-native';
import {Header, Body, Title, Right, Left} from 'native-base';
import axios from 'axios';

export default class ToDoScreen extends Component{
    constructor(){
        super()
        this.state ={
            text: '',
            items: [],
        }
    }

    componentDidMount(){
        axios({
            method:'get',
            url:'http://jsonplaceholder.typicode.com/todos/'
          })
            .then((res)=> {
                // dataApi = this.state.items.concat(res.data)
               this.setState({items: res.data})

                //alert(JSON.stringify(res.data))
            })
            .catch((err)=>{
                alert(err)
            })
        // http://dummy.restapiexample.com/api/v1/employees, https://jsonplaceholder.typicode.com/users,https://reqres.in/api/users
    }
	
    handleAdd (){
        // let item = this.state.items.concat(this.state.text);
        // this.setState({items: item});
        // let addData = {
            // 'title': this.state.text
        // }
        // axios({
            // method: 'post',
            // url: 'http://jsonplaceholder.typicode.com/todos',
            // body: JSON.stringify(addData),
			// headers: {
				// "Content-type":"application/json; charset=UTF-8"
			// }
          // })
	  if (this.state.text.length>0){
		axios.post('http://jsonplaceholder.typicode.com/todos/',{
			userId: 1,
			title: this.state.text,
			completed: false
		})
          .then((res)=> {
			  let item = this.state.items.concat(res.data);
			  this.setState({items: item})
			  this.setState({text: ''});
		   })
		  .then(this.textInput.clear())
          .catch((err)=> alert(err))
	  }else {
		  alert('Please type your list')
	  }
    }
	
    handleDelete (item){
		axios.delete('http://jsonplaceholder.typicode.com/todos/'+ (item))
		.then((res)=>{
			index = this.state.items.slice();
			index.splice(item, 1);
			this.setState({items: index});
			alert('deleted')
		})
    }

    render(){
        return(
            <View>
              <Header style={{height: 40, backgroundColor: '#6ef442'}}>
                <Left/>
				<Body><Title style={{fontWeight: 'bold', marginLeft: 5}}>TO DO APP</Title></Body>
              </Header>
              <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>                
                <TextInput ref={input => { this.textInput = input }} style={{borderBottomWidth: 0.3, width: 280, height: 35, marginRight: 15}} onChangeText={(text)=>this.setState({text})}/>
                <Button
					style={{}}
                    title='SAVE'
                    color='#6ef442'
                    onPress={()=>this.handleAdd()}/>
              </View>
                <FlatList
					inverted
                    data={this.state.items}
                    style={{marginLeft: 10, marginRight: 10, marginTop: 5}}
                    renderItem={({item, index})=><TouchableHighlight onLongPress={()=>this.handleDelete(index)}>
                    <Text style={{borderBottomWidth: 0.3, borderBottomColor: 'grey', marginBottom: 5}}>{item.title}</Text>
                    </TouchableHighlight>}
                    />
            </View>
        )
    }
}
