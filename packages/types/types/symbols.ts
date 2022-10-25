import React from 'react';

export type ManaSymbolMapping = Record<
  string,
  {
    component: React.ComponentType<{
      shadow?: boolean;
      children?: number | string;
    }>;
    regex?: boolean;
    passProps?: boolean;
  }
>;
