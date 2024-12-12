import React from 'react';
import ReactDom from 'react-dom';
// import '@yandex/ymaps3-default-ui-theme';
// import '@yandex/ymaps3-clusterer';

const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);
export const reactify = ymaps3React.reactify.bindTo(React, ReactDom);
export const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, 
    YMapControls, YMapControl} 
    = reactify.module(ymaps3);

export const {YMapDefaultMarker} = await import('@yandex/ymaps3-default-ui-theme');
// export const {YMapZoomControl} = reactify.module(await ymaps3.import('@yandex/ymaps3-default-ui-theme'));
export const { YMapZoomControl, YMapGeolocationControl } = reactify.module(await ymaps3.import('@yandex/ymaps3-controls@0.0.1'));
// export const {YMapClusterer, clusterByGrid} = reactify.module(await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1'));

// НЕПРАВИЛЬНО ИМПОРТИРУЮ
// export const {YMapZoomControl} = reactify.module(await ymaps3.import('@yandex/ymaps3-default-ui-theme'));

// Load the control package and extract the zoom control from it
