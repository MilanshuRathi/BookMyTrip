const locations=JSON.parse(document.getElementById('map').dataset.locations);
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRtaW5uYXRvdXJzIiwiYSI6ImNrZHhicnQ4aTMwaDcycW1xejA2dXphMGQifQ.EQJesPUFSWFjhWnty76zPA';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/adminnatours/ckdxcgjet3atw19p8x5hhf4g9',
scrollZoom: false
});
const bounds=new mapboxgl.LngLatBounds();

locations.forEach(loc => {
    const el=document.createElement('div');
    el.className='marker';
    //Add marker
    new mapboxgl.Marker({
        element:el,
        anchor:'bottom',         
    }).setLngLat(loc.coordinates).addTo(map);
    //Extend map bounds to include current location 
    bounds.extend(loc.coordinates,{

    });
    new mapboxgl.Popup({offset:30}).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}:${loc.description}</p>`).addTo(map);
    //Extend map bounds to include current location 
    bounds.extend(loc.coordinates,{

    });
});
map.fitBounds(bounds,{padding:{top:200,bottom:150,left:100,right:100}});