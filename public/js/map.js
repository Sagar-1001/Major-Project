mapboxgl.accessToken =  mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [72.8777, 19.0760], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
 
    console.log(map.center);

    const marker1 = new mapboxgl.Marker()
    .setLngLat([12.554729, 55.70651])
    .addTo(map);