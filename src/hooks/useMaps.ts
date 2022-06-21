function getPlaceById (placeId: string): Promise<google.maps.GeocoderResult> {
  return new Promise((resolve) => {
    new google.maps.Geocoder().geocode({
      placeId
    }, (r) => {
      if (!r || r.length === 0) return

      return resolve(r[0])
    })
  })
}

function getPlaceByCoords (lat: number, lng: number): Promise<google.maps.GeocoderResult> {
  return new Promise(resolve => {
    new google.maps.Geocoder().geocode({
      location: new google.maps.LatLng(lat, lng)
    }, (r) => {
      if (!r || r.length === 0) return

      return resolve(r[0])
    })
  })
}

export function useMaps () {
  return {
    getPlaceById,
    getPlaceByCoords
  }
}
