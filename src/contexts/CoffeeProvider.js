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
        return axios.get(baseUrl + ':id', coffee)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
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

    function editCoffee(coffee){
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myCoffeeToken')}`
        };

        return axios.put(baseUrl, coffee, { headers: myHeaders })
            .then(response => {
                getAllCoffee();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function deleteCoffee(id){

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