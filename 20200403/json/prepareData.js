//ndjson-cat stecroix.json \
//| ndjson-split "d.features" \
//| ndjson-filter "d.geometry.type === 'Point'" \
//| ndjson-filter "d.properties.amenity === 'fast_food'" \
//| ndjson-reduce \
//| ndjson-map "{type: 'FeatureCollection', features: d}" \
//> fast_food.json