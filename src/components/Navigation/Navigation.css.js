import styled from 'styled-components';

import Wrapper from '../Wrapper';

export const NavigationWrapper = styled(Wrapper)`
    display: flex;
    justify-content: space-between;
`

export const Container = styled.div`
    background-color: ${({theme}) => theme.colors.white.gray};
    padding: ${({theme}) => theme.spacing.sm}px 0;
    display: flex;
    justify-content: space-between;
`;

export const List = styled.nav`
    display: flex;
`