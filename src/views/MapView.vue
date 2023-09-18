<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4"> Your Trip</h1>
        <div>
            <div class="overflow-hidden shadow sm:rouded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <GMapMap v-if="location.destination.name !== ''" :zoom="11" :center="location.destination.geometry"
                            ref="gMap" style="width: 100%; height: 256px;">
                        </GMapMap>
                        <!-- <GMapMap :zoom="11" :center="location.destination.geometry" ref="gMap"
                            style="width: 100%; height: 256px;">
                            <GMapMarker :position="location.destination.geometry" />
                        </GMapMap> -->
                    </div>
                    <div class="mt-2">
                        <p class="text-xl"> Goint to <strong> {{ location.destination.name }}</strong></p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button @click="handleConfirmClick"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
                        Let's Go</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useLocationStore } from '@/stores/location'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const location = useLocationStore()
const router = useRouter()

const gMap = ref(null)

const handleConfirmClick = () => {
    http().post('/api/trip', {
        origin: location.current.geometry,
        destination: location.destination.geometry,
        destination_name: location.destination.name
    }, {
        headers: {

        }
    }).then((response) => {
        router.push({
            name: 'trip'
        })
    }).catch((error) => {
        console.error(error)
    })
}
onMounted(async () => {
    // does the user has location set? 
    if (location.destination.name === '') {
        router.push({
            name: 'location'
        })
    }

    // lets get the user's current location 

    // navigator.geolocation.getCurrentPosition((success) => {
    //     console.log(success)
    // }, (error) => {
    //     console.error(error)
    // })
    await location.updateCurrentLocation()


    // draw map on the map 
    gMap.value.$mapPromise.then((mapObject) => {
        let currentPoint = new google.maps.LatLng(locationcurrent.geometry),
            destinationPoint = new google.maps.LatLng(location.destination.geometry),
            directionsService = new google.maps.DirectionsService,
            directionDisplay = new google.maps.DirectionsRenderer({
                map: mapObject
            })

        directionsService.route({
            origin: currentPoint,
            destination: destinationPoint,
            avoidTolls: false,
            avoidHighways: false,
            travelMode: google.maps.travelMode.DRIVING
        }, (res, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionDisplay.setDirections(res)
            } else {
                console.error(status)
            }
        })
    })
})
</script>