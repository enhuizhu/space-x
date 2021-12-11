import React, { FC } from 'react';
import { map, isObject } from 'lodash';
import { formatKey } from '../../util';
import { StyledObjectViewer, StyledItem } from './ObjectViewer.style';

interface ObjectViewerProps {
  obj: object
  isChild: boolean
};

export const ObjectViewer: FC<ObjectViewerProps> = ({ obj, isChild = false}) => {
  return <StyledObjectViewer isChild={isChild}>
    {
      map(obj, (value, key) => {
        if (!isObject(value)) {
          return <StyledItem key={key}>
            <label>{formatKey(key)}:</label>
              &nbsp;
            <span>{value}</span></StyledItem>;
        } else {
          return <ObjectViewer obj={value} key={key} isChild={true}/>
        }
      })
    }
  </StyledObjectViewer>
}
