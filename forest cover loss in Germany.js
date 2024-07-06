// define Germany boundary
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var Germany = countries.filter(ee.Filter.eq('country_na', 'Germany'));

// Add Germany's boundaries to the map
Map.addLayer(ee.Image().paint(Germany, 0, 1), {palette: ['black']}, 'Germany');
Map.centerObject(Germany, 5);

// Load Hansen Global Forest Change data for 2020 and 2023
var forest_cover_2020 = ee.Image("UMD/hansen/global_forest_change_2020_v1_8");
var forest_cover_2023 = ee.Image("UMD/hansen/global_forest_change_2023_v1_11");

// Select the 'loss' bands from both years
var loss_2020 = forest_cover_2020.select(['loss']);
var loss_2023 = forest_cover_2023.select(['loss']);

// Calculate the total loss between 2020 and 2023
var total_loss = loss_2023.and(loss_2020.not());

// Clip the total loss to Germany's boundaries
var clipped_loss = total_loss.clip(Germany);

// Add the total loss layer to the map
Map.addLayer(clipped_loss.updateMask(clipped_loss),
             {palette: ['red']}, 'Total Forest Loss (2020-2023)');