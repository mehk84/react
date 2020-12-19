
import React, { useState } from 'react';

import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DataTable } from 'react-native-paper';





const Discount = ({ navigation }) => {

  const [original, setOriginal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [getRecord, setRecord] = useState([]);

  //const [final, setFinal] = useState(0);
  //const [usave, setUsave] = useState(0);

  
  const youSave = () => {
    
    if (discount >= 0 && discount <= 100 && original >= 0) {
      var saving = (original * discount) / 100;
    }
    
    return saving.toFixed(2);
    //setUsave(saving.toFixed(2));
  };

  
  
  const finalPrice = () => {
    
    if (original >= 0) {
      var final = original - youSave();
    }
    return final.toFixed(2);
  };

 
 
  const buttonColor = () => {
    
    if (original.length <= 0 && discount.length <= 0) 
      return false;
    else 
      return true;
  };

  
  
  const saveButton = () => {
    
    setRecord([
      ...getRecord,
      { op: original, dp: discount, final: finalPrice() },
    ]);
    setOriginal('');
    setDiscount('');
  };

  
  
  return (
    
    
    <ScrollView style={styles.scroll}>
      
      <View style={styles.container}>
        <Button
          onPress={() =>
            navigation.navigate('historyScreen', {
              record: getRecord,
            })
          }
          title="history"
        />

       
        <Text style={styles.heading}>DISCOUNT CALCULATOR</Text>

        
        
        <View
          style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'center', justifyContent: 'center', }}>
          
          <Text style={styles.textinput}> Original </Text>

          <TextInput
            style={{
              height: 40,
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 10,
            }}
            placeholder="Enter original price "
            keyboardType={'number-pad'}
            onChangeText={(val) => setOriginal(val)}
          />
        </View>

        
        
        
        
        <View
          style={{flexDirection: 'row', paddingTop: 20, alignItems: 'center', justifyContent: 'center', }}>
          
          <Text style={styles.textinput}> Discount </Text>

          <TextInput
            style={{
              height: 40,
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 10,
            }}
            placeholder="Enter discount "
            keyboardType={'number-pad'}
            onChangeText={(val) => setDiscount(val)}
          />
        </View>

        
        
        <Text style={styles.text}>{'\n'}{'\n'} YOU SAVE : {youSave()}{' '}</Text>
        <Text style={styles.text}>{'\n'} FINAL PRICE : {finalPrice()}{' '}</Text>

        <Text>{'\n'}</Text>

        
        
        <TouchableOpacity
          style={styles.save}
          onPress={() => saveButton()}
          /*
          disabled={
            buttonColor() === false
              ? (styles.save.color = 'grey')
              : (styles.save.color = 'teal')
          }*/
        >
          <Text style={{ color: 'white' }}> SAVE </Text>
        </TouchableOpacity>
      
      
      
      </View>
    </ScrollView>
  );
};





const styles = StyleSheet.create({
  save: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 100,
    backgroundColor: 'teal',
    borderRadius: 5,
  },

  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    flex: 1,
    color: 'teal',
    fontWeight: 'bold',
    padding: 20,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textinput: {
    padding: 10,
    fontSize: 18,
    color: 'black',
    //flexDirection:"row",
  },

  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});




const HistoryRecord = ({ route, navigation }) => {
  
  const [data, setdata] = useState(route.params.record);
  
  
  const removeItem=(key)=>{
    setdata((list) => data.filter((item) =>data.indexOf(item) != key))
  }

   const clearRecord = () => {
    setdata([])
  }


  const renderTableData = () => {

    return data.map((record, index) => {
      const { op, dp, fp } = record; //destructuring

      return (
        
     
          <DataTable.Row>
          <DataTable.Cell>{op}</DataTable.Cell>
          <DataTable.Cell>{dp}</DataTable.Cell>
          <DataTable.Cell>{op - (op / 100) * dp}</DataTable.Cell>

          <DataTable.Cell>
            <Button
              key={index}
              title="X"
              color="#ff0000"
              accessibilityLabel="Delete Record"
              onPress={()=>removeItem(index)}
            />
          </DataTable.Cell>
          </DataTable.Row>
        
      );
    });
  };

  return (
    
    <ScrollView style={{backgroundColor:"lightblue"}}>
      
      <DataTable>
        
        <View style={styles.container}>
          <Button 
            title="clear" 
            //color="blue" 
            onPress={()=> clearRecord()}
          />
        </View>
        
        <DataTable.Header>
          <DataTable.Title>Original Price</DataTable.Title>
          <DataTable.Title>Discount%</DataTable.Title>
          <DataTable.Title>Final Price</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
        
        {renderTableData()}
        

      </DataTable>
    </ScrollView>
  );
};




const Stack = createStackNavigator();

function App() {
  
  return (
    
    
    <NavigationContainer>
      
      <Stack.Navigator initialRoutName="Start">
        
        <Stack.Screen
          name="Start"
          component={Discount}
          options={{
            title: 'Start Screen',
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />

        <Stack.Screen
          name="historyScreen"
          component={HistoryRecord}
          options={{
            headerStyle: { backgroundColor: 'teal' },
            headerTintColor: '#fff',
            //headerRight: () => 
             //,
          }}

        />
      
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}

export default App;






