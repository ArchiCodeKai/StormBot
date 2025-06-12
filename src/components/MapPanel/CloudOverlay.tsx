import React from 'react';
import { ImageOverlay } from 'react-leaflet';

type CloudOverlayProps = {
  url: string;
  bounds: [[number, number], [number, number]];
};

const CloudOverlay: React.FC<CloudOverlayProps> = ({ url, bounds }) => (
  <ImageOverlay url={url} bounds={bounds} opacity={0.5} />
);

export default CloudOverlay;
