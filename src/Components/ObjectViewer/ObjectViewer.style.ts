import styled from 'styled-components';

export const StyledObjectViewer: any = styled.div`
  ${(props: any) => props.isChild ? `margin-left: 5px` : ''}
`;

export const StyledItem = styled.div`
  margin: 10px 0;
  
  label {
    font-weight: bold;
  }

`;