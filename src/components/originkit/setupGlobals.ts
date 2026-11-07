import React from 'react';
import * as motion from 'framer-motion';
import * as jsxRuntime from 'react/jsx-runtime';

if (typeof globalThis !== 'undefined') {
  (globalThis as any).__compifyGlobals = {
    react: React,
    'framer-motion': motion,
    'react/jsx-runtime': jsxRuntime,
  };
}

