import axios from "axios";
import { useEffect, useState } from "react";
import CoffeeContext from './CoffeeContext';

export const CoffeeProvider = (props) => {

    const [ coffee, setCoffee ] = useState([]);
    

    const baseUrl =  'http://localhost:3000/api/coffee/';

    useEffect(() => {
        async function fetchData() {
            await getAllCoffee();
        }
        fetchData();
    }, []);

    function getAllCoffee() {
        return axios.get(baseUrl).then(response => setCoffee(response.data));
    }

    function getCoffee(id){
        return axios.get( baseUrl + id)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
        //return coffee.find(coffee => coffee.id === parseInt(id))
    }

    function addCoffee(coffee){
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myCoffeeToken')}`
        };

        return axios.post(baseUrl, coffee, { headers: myHeaders })
            .then(response => {
                getAllCoffee();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function editCoffee(coffee, id){
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myCoffeeToken')}`
        };

        return axios.put(baseUrl + id, coffee, { headers: myHeaders })
            .then(response => {
                getAllCoffee();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function deleteCoffee(id){
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myCoffeeToken')}`
        };

        return axios.delete(baseUrl + id, { headers: myHeaders })
            .then(response => {
                getAllCoffee();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    return (
        <CoffeeContext.Provider value={{
            coffee,
            getCoffee,
            addCoffee,
            editCoffee,
            deleteCoffee
        }}>
            { props.children }
        </CoffeeContext.Provider>
    )
}