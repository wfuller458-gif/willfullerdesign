import type { StyleSpecification } from 'mapbox-gl';

export type Planet = 'earth' | 'mars' | 'moon' | 'mercury';

export const PLANETS: Planet[] = ['earth', 'mars', 'moon', 'mercury'];

export const PLANET_LABEL: Record<Planet, string> = {
  earth: '🌍 Earth',
  mars: '🔴 Mars',
  moon: '🌙 Moon',
  mercury: '☿️ Mercury',
};

const EARTH_STYLE = 'mapbox://styles/mapbox/outdoors-v12';

// All NASA Trek bodies below share one quirk: their WMTS tiling is equirectangular
// (a 2:1 whole-body grid that doubles each zoom level) while Mapbox raster sources
// assume a square Web Mercator grid. Forced through Mapbox's pipeline, the surfaces
// come out mildly warped near the poles — a visual flourish at the globe's default
// zoomed-out angle, not scientifically accurate viewers of these bodies.
function trekRasterStyle(opts: {
  id: string;
  body: string;
  layer: string;
  maxzoom: number;
  attribution: string;
}): StyleSpecification {
  return {
    version: 8,
    sources: {
      [opts.id]: {
        type: 'raster',
        tiles: [
          `https://trek.nasa.gov/tiles/${opts.body}/EQ/${opts.layer}/1.0.0/default/default028mm/{z}/{y}/{x}.jpg`,
        ],
        tileSize: 256,
        bounds: [-180, -90, 180, 90],
        maxzoom: opts.maxzoom,
        attribution: opts.attribution,
      },
    },
    layers: [{ id: `${opts.id}-surface`, type: 'raster', source: opts.id }],
  };
}

// Viking MDIM 2.1 global color mosaic, ~232 m/px, zoom levels 0-7.
const MARS_STYLE = trekRasterStyle({
  id: 'mars',
  body: 'Mars',
  layer: 'Mars_Viking_MDIM21_ClrMosaic_global_232m',
  maxzoom: 7,
  attribution: 'Imagery: NASA / JPL / USGS — Mars Trek (Viking MDIM 2.1)',
});

// Lunar Reconnaissance Orbiter wide-angle-camera global mosaic, ~303 px/degree, zoom levels 0-8.
const MOON_STYLE = trekRasterStyle({
  id: 'moon',
  body: 'Moon',
  layer: 'LRO_WAC_Mosaic_Global_303ppd_v02',
  maxzoom: 8,
  attribution: 'Imagery: NASA / GSFC / Arizona State University — Moon Trek (LRO WAC)',
});

// MESSENGER MDIS basemap global mosaic, ~166 m/px, zoom levels 0-7.
const MERCURY_STYLE = trekRasterStyle({
  id: 'mercury',
  body: 'Mercury',
  layer: 'Mercury_MESSENGER_MDIS_Basemap_BDR_Mosaic_Global_166m',
  maxzoom: 7,
  attribution: 'Imagery: NASA / JHUAPL / CIW — Mercury Trek (MESSENGER MDIS)',
});

export const PLANET_STYLE: Record<Planet, string | StyleSpecification> = {
  earth: EARTH_STYLE,
  mars: MARS_STYLE,
  moon: MOON_STYLE,
  mercury: MERCURY_STYLE,
};
