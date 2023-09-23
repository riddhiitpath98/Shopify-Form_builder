import React from 'react';
import {Banner} from '@shopify/polaris';

export default function ElementListBanner({title}) {
  return (
    <Banner
      title={title}
      status="warning"
    >
    </Banner>
  );
}