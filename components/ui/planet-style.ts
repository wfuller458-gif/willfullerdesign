import type { StyleSpecification } from 'mapbox-gl';

export type Planet = 'earth' | 'mars';

const EARTH_STYLE = 'mapbox://styles/mapbox/outdoors-v12';

// NASA Mars Trek WMTS — Viking MDIM 2.1 global color mosaic (~232 m/px).
// Its tiling is equirectangular while Mapbox raster sources assume Web Mercator,
// so the surface is mildly warped near the poles — a visual flourish for the
// globe's default zoomed-out angle, not a scientifically accurate Mars viewer.
const MARS_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    mars: {
      type: 'raster',
      tiles: [
        'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
      ],
      tileSize: 256,
      bounds: [-180, -90, 180, 90],
      maxzoom: 7,
      attribution: 'Imagery: NASA / JPL / USGS — Mars Trek (Viking MDIM 2.1)',
    },
  },
  layers: [{ id: 'mars-surface', type: 'raster', source: 'mars' }],
};

export const PLANET_STYLE: Record<Planet, string | StyleSpecification> = {
  earth: EARTH_STYLE,
  mars: MARS_STYLE,
};
