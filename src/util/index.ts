import { upperFirst } from 'lodash';

export const formatKey = (key: string): string => {
  if (!key.split) {
    return key;
  }   

  return key?.split('_')?.reduce((acc, current, currentIndex) => {
    if (currentIndex === 0) {
      return upperFirst(current);
    }    
    
    return `${acc} ${upperFirst(current)}`;
  }, '');
}

