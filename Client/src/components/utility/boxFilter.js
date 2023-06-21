import React from 'react';
import { ComponentDivFilter } from './boxFilter.style';

export default props =>
  <ComponentDivFilter {...props}>
    {props.children}
  </ComponentDivFilter>;