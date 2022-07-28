import styled from 'styled-components';

export const Container = styled.div`
    background-color: ${({theme}) => theme.colors.white.gray};
    padding: ${({theme}) => theme.spacing.sm}px 0;
    display: flex;
    justify-content: space-between;
`;

export const Nav = styled.nav`
    display: flex;
`